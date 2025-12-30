import { Box, Spinner, Text } from "@chakra-ui/react";
import React, { Suspense } from "react";
import AsyncCharacters from "../../_components/AsyncCharacters";
import { isNumber } from "lodash";
import { GameType } from "@prisma/client";
import { LeaderboardFilters } from "./LeaderboardFilters";

interface LeaderboardProps {
  wowClass?: string;
  gameTypeQp?: string;
}
const gameTypes = ["NORMAL", "SEASONAL", "ERA", "HARDCORE"];

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameTypeQp, wowClass }) => {
  const gameType =
    gameTypeQp != null && gameTypes.includes(gameTypeQp) ? gameTypeQp : GameType.NORMAL;

  const queries: {
    title: string;
    query: any;
    statToShow: "itemLevel" | "gearscore" | "achievementPoints" | "honorableKills";
  }[] =
    gameType === GameType.NORMAL
      ? [
          {
            title: "Gearscore",
            query: constructQuery(GEARSCORE_QUERY, gameType, wowClass),
            statToShow: "gearscore",
          },
          {
            title: "Achievement points",
            query: constructQuery(ACHIEVEMENT_QUERY, gameType, wowClass),
            statToShow: "achievementPoints",
          },
          {
            title: "Honorable kills",
            query: constructQuery(HK_QUERY, gameType, wowClass),
            statToShow: "honorableKills",
          },
        ]
      : [
          {
            title: "Item level",
            query: constructQuery(ITEM_LEVEL_QUERY, gameType, wowClass),
            statToShow: "itemLevel",
          },
          {
            title: "Honorable kills",
            query: constructQuery(HK_QUERY, gameType, wowClass),
            statToShow: "honorableKills",
          },
        ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      p={4}
      marginRight={"auto"}
      marginLeft="auto"
      maxW={"1300px"}
    >
      <Text textAlign={"center"} fontSize={"xx-large"}>
        Leaderboards
      </Text>
      <LeaderboardFilters gameType={gameType} />
      <Box display={"flex"} gap={3} justifyContent={"space-around"} flexWrap={"wrap"}>
        {queries.map((query) => (
          <Box w={350} key={query.title}>
            <Text textAlign={"center"} mb={2} fontSize={"x-large"}>
              {query.title}
            </Text>
            <Suspense
              fallback={
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  height={"100%"}
                >
                  <Spinner size={"xl"} />
                </Box>
              }
            >
              <AsyncCharacters args={query.query} statToShow={query.statToShow} />
            </Suspense>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

function constructQuery(args: any, gameType?: string, wowClass?: string) {
  const query = { ...args };
  if (gameType && gameTypes.includes(gameType)) {
    query.where = { ...query.where, gameType: gameType };
  }
  if (wowClass && isNumber(Number(wowClass))) {
    query.where = { ...query.where, class: Number(wowClass) };
  }
  return query;
}

const ACHIEVEMENT_QUERY = {
  where: {
    achievementPoints: { not: null },
  },
  orderBy: { achievementPoints: "desc" },
  take: 5,
};

const GEARSCORE_QUERY = {
  where: {
    gearscore: { not: null },
  },
  orderBy: { gearscore: "desc" },
  take: 5,
};

const HK_QUERY = {
  where: {
    honorableKills: { not: null },
  },
  orderBy: { honorableKills: "desc" },
  take: 5,
};

const ITEM_LEVEL_QUERY = {
  where: {
    itemLevel: { not: null },
  },
  orderBy: { itemLevel: "desc" },
  take: 5,
};
