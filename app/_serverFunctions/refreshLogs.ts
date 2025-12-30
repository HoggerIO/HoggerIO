"use server";
import { revalidatePath } from "next/cache";
import { GameType } from "@prisma/client";
import { MopSpec, Profile } from "../_types/types";

export interface Props {
  name: string;
  realm: string;
  region: string;
  parse?: Profile["parse"];
  gameType: GameType;
  id: number;
  talents: Profile["talents"];
}
export async function refreshLogs(props: Props) {
  await refreshCharacterLogs({ ...props, lastUpdated: props.parse?.lastUpdated });
  revalidatePath(`/character/${props.region}/${props.realm}/${props.name}`);
}

async function fetchWarcraftLogs(
  access_token: string,
  name: string,
  server: string,
  region: string,
  specName: string,
  gameType: GameType,
  size?: number
): Promise<ParseResponse> {
  const variables: any = {
    name: name,
    server: server,
    region: region,
    metric: SPEC_NAME_TO_METRIC[specName],
    specName: specName,
    diff: 4, // For SOD only - MC has difficulty
  };
  if (size != null) {
    variables.size = size;
  }

  const response = await fetch(
    `https://${
      gameType === GameType.SEASONAL ? "sod" : gameType === GameType.NORMAL ? "classic" : "vanilla"
    }.warcraftlogs.com/api/v2/client`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query:
          size == null
            ? `
        query($name: String!, $server: String!, $region: String!, $metric: CharacterRankingMetricType!, $specName: String!, $diff: Int!) {
          characterData {
            character(name: $name, serverSlug: $server, serverRegion: $region) {
              id
              zoneRankings(byBracket: true, metric: $metric, specName: $specName, difficulty: $diff)
            }
          }
        }
      `
            : `
        query($name: String!, $server: String!, $region: String!, $metric: CharacterRankingMetricType!, $specName: String!, $size: Int!) {
          characterData {
            character(name: $name, serverSlug: $server, serverRegion: $region) {
              id
              zoneRankings(byBracket: true, metric: $metric, specName: $specName, size: $size)
              }
              }
              }
              `,

        variables: variables,
      }),
    }
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    const errorText = await response.text();
    throw new Error(errorText);
  }
}

interface ParseResponse {
  data: {
    characterData: {
      character: {
        id: Number;
        zoneRankings: {
          bestPerformanceAverage: number | undefined;
          allstars: [{}];
          rankings: [
            {
              encounter: {
                id: number;
                name: string;
              };
              allStars: {
                rankPercent: number;
              };
            }
          ];
        };
      };
    };
  };
}

async function refreshCharacterLogs(args: {
  name: string;
  realm: string;
  region: string;
  gameType: GameType;
  talents: Profile["talents"];
  lastUpdated: Date | undefined;
  id: number;
}) {
  const { name, realm, region, gameType, talents, lastUpdated, id } = args;

  const access_token = await fetchAccessToken(gameType);
  let specName = getSpecName(talents, true);
  if (specName == null) {
    console.error(`No spec for ${name}`);
    return;
  }
  if (SPEC_NAME_TO_METRIC[specName] == null) {
    console.error(`No metric for spec ${specName}`);
    return;
  }

  if (
    lastUpdated != null &&
    new Date().getTime() - new Date(lastUpdated).getTime() < 1000 * 60 * 60 * 24
  ) {
    console.error("attempted to refresh data too soon");
    return;
  }

  let parses = await fetchWarcraftLogs(
    access_token.access_token,
    name,
    realm,
    region,
    specName,
    gameType
  );

  if (parses?.data?.characterData?.character?.zoneRankings?.bestPerformanceAverage == null) {
    let hasParseData = false;
    // If normal try for 10 size - this fallback to 25 size if no data is found
    if (gameType === GameType.NORMAL) {
      parses = await fetchWarcraftLogs(
        access_token.access_token,
        name,
        realm,
        region,
        specName,
        gameType,
        10
      );
      hasParseData =
        parses?.data?.characterData?.character?.zoneRankings?.bestPerformanceAverage != null;

      if (!hasParseData) {
        // Try other specs
        specName = getSpecName(talents, false);
        if (specName != null) {
          parses = await fetchWarcraftLogs(
            access_token.access_token,
            name,
            realm,
            region,
            specName,
            gameType
          );
          hasParseData =
            parses?.data?.characterData?.character?.zoneRankings?.bestPerformanceAverage != null;
        }
      }
    } else if (gameType === GameType.SEASONAL) {
      specName = getSpecName(talents, false);
      if (specName != null) {
        parses = await fetchWarcraftLogs(
          access_token.access_token,
          name,
          realm,
          region,
          specName,
          gameType
        );
        hasParseData =
          parses?.data?.characterData?.character?.zoneRankings?.bestPerformanceAverage != null;
      }
    }
    if (!hasParseData) {
      // No parses found for this spec - store in the DB that we tried and failed
      await prisma.characterMetadata.update({
        data: {
          parse: {
            lastUpdated: new Date(),
            noLogs: true,
          },
        },
        where: {
          characterId: id,
        },
      });
      return;
    }
  }

  const parseData = {
    specName: specName,
    metric: SPEC_NAME_TO_METRIC[specName],
    lastUpdated: new Date(),
    encounters: parses.data.characterData.character.zoneRankings.rankings.map((ranking) => {
      return {
        encounter: ranking.encounter.name,
        id: ranking.encounter.id,
        percent: ranking.allStars == null ? undefined : ranking.allStars.rankPercent,
      };
    }),
  };

  await prisma.characterMetadata.update({
    data: {
      parse: parseData,
    },
    where: {
      characterId: id,
    },
  });
}

function getSpecName(talents: Profile["talents"], checkIsActive: boolean): string | undefined {
  if (MopSpec.is(talents)) {
    return talents.find((spec) => (checkIsActive ? spec.isActive : !spec.isActive))?.name;
  }
  const spec = talents.find((spec) => (checkIsActive ? spec.isActive : !spec.isActive));
  if (spec == null) {
    return undefined;
  }
  let max = 0;
  let name = "";

  spec.talentTree.forEach((tree) => {
    if (tree.pointsSpent > max) {
      max = tree.pointsSpent;
      name = tree.name;
    }
  });

  if (name === "") {
    return undefined;
  }
  return name;
}

const SPEC_NAME_TO_METRIC = {
  Restoration: "hps",
  Holy: "hps",
  Discipline: "hps",
  Mistweaver: "hps",
  "Beast Mastery": "dps",
  Marksmanship: "dps",
  Survival: "dps",
  Frost: "dps",
  Unholy: "dps",
  Blood: "dps",
  Havoc: "dps",
  Vengeance: "dps",
  Balance: "dps",
  Feral: "dps",
  Guardian: "dps",
  Arcane: "dps",
  Fire: "dps",
  Affliction: "dps",
  Demonology: "dps",
  Destruction: "dps",
  Elemental: "dps",
  Enhancement: "dps",
  Arms: "dps",
  Fury: "dps",
  Protection: "dps",
  Assassination: "dps",
  Outlaw: "dps",
  Subtlety: "dps",
  Shadow: "dps",
  Brewmaster: "dps",
  Windwalker: "dps",
  Retribution: "dps",
  Combat: "dps",
  "Feral Combat": "dps",
};

async function fetchAccessToken(gameType: GameType) {
  const AUTH_URL = `https://${
    gameType === GameType.SEASONAL ? "sod" : gameType === GameType.NORMAL ? "classic" : "vanilla"
  }.warcraftlogs.com/oauth/token`;
  const CLIENT_ID = process.env.WARCRAFTLOGS_CLIENT_ID;
  const CLIENT_SECRET = process.env.WARCRAFTLOGS_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing Warcraft Logs API credentials. Please set WARCRAFTLOGS_CLIENT_ID and WARCRAFTLOGS_CLIENT_SECRET in your .env file."
    );
  }

  const authResponse = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    cache: "no-cache",
  });

  if (authResponse.ok) {
    const authData = await authResponse.json();
    return authData;
  } else {
    console.error("Error:", authResponse.statusText);
  }
}
