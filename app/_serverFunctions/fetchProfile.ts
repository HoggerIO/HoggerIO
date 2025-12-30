import {
  Profile,
  EquippedItem,
  EquippedItemResponse,
  Spec,
  TalentTree,
  Talent,
  MopTalent,
  MopSpec,
} from "../_types/types";
import { prisma } from "@/app/prisma";
import { calculateGearScore } from "@/app/_utils/gearscore";
import { getGameType } from "@/app/_utils/realm";
import { Achievement, AchievementResponse } from "../_types/achievements";
import { GameType } from "@prisma/client";
import { compact } from "lodash";
import { Achievements } from "../_types/achievements";
import { getItemsByIds } from "@/app/_utils/itemsData";
import { isDatabaseAvailable } from "@/app/_utils/isDatabaseAvailable";
import {
  AuthTokenSchema,
  EquipmentResponseSchema,
  ProfileResponseSchema,
  MediaResponseSchema,
  PvpResponseSchema,
  MopSpecsResponseSchema,
  ClassicSpecsResponseSchema,
} from "../_types/blizzardApiSchemas";

const CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  throw new Error(
    "Missing Blizzard API credentials. Please set BLIZZARD_CLIENT_ID and BLIZZARD_CLIENT_SECRET in your .env file."
  );
}

export async function fetchProfile(
  character: string,
  realm: string,
  region: string,
  breakCache = false,
  isEra = false
): Promise<Profile> {
  const cleanCharacterName = decodeURIComponent(character.toLowerCase());
  const gameType = getGameType(realm, isEra);

  // Only check database cache if database is available
  const maybeProfile =
    breakCache || !isDatabaseAvailable()
      ? undefined
      : await maybeFetchExisitingProfile(cleanCharacterName, realm, region, gameType);

  if (maybeProfile != null) {
    return maybeProfile;
  }

  const authResponse = await fetch("https://oauth.battle.net/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    cache: "no-cache",
  });

  if (!authResponse.ok) {
    throw new Error("Failed to obtain auth token from Blizzard API");
  }

  // Validate auth token response
  const authData = await authResponse.json();
  const authResult = AuthTokenSchema.safeParse(authData);

  if (!authResult.success) {
    console.warn("Auth token validation failed:", authResult.error.errors);
    throw new Error("Invalid auth token response from Blizzard API");
  }

  const { access_token } = authResult.data;
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };

  function getApiUrl(extension?: string) {
    return `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${cleanCharacterName}${extension}?namespace=profile-classic${
      isEra ? "1x" : ""
    }-${region}&locale=en_US`;
  }

  const equipmentApi = getApiUrl("/equipment");
  const genericProfileApi = getApiUrl("");
  const mediaApi = getApiUrl("/character-media");
  const achievementApi = getApiUrl("/achievements/statistics");
  const specApi = getApiUrl("/specializations");
  const pvpApi = getApiUrl("/pvp-summary");

  // Construct promises
  const equipmentFetch = fetch(equipmentApi, {
    headers,
    next: { revalidate: 300 },
  });
  const achievementFetch = isEra
    ? Promise.resolve(new Response())
    : fetch(achievementApi, { headers, next: { revalidate: 300 } });
  const genericProfileFetch = fetch(genericProfileApi, {
    headers,
    next: { revalidate: 300 },
  });
  const mediaFetch = fetch(mediaApi, { headers, next: { revalidate: 300 } });
  const specFetch = fetch(specApi, { headers, next: { revalidate: 300 } });
  const pvpFetch = fetch(pvpApi, { headers, next: { revalidate: 300 } });

  const [
    equipmentResponse,
    achievementResponse,
    genericProfileResponse,
    mediaResponse,
    specResponse,
    pvpResponse,
  ] = await Promise.all([
    equipmentFetch,
    achievementFetch,
    genericProfileFetch,
    mediaFetch,
    specFetch,
    pvpFetch,
  ]);

  if (equipmentResponse.ok) {
    // Parse and validate all responses
    const [equipmentJson, mediaJson, profileJson, specJson, pvpJson] = await Promise.all([
      equipmentResponse.json(),
      mediaResponse.ok ? mediaResponse.json() : undefined,
      genericProfileResponse.json(),
      specResponse.json(),
      pvpResponse.json(),
    ]);

    const achievementJson = isEra ? undefined : await achievementResponse.json();

    // Validate critical responses
    const equipmentResult = EquipmentResponseSchema.safeParse(equipmentJson);
    const profileResult = ProfileResponseSchema.safeParse(profileJson);

    if (!equipmentResult.success) {
      console.error("Equipment validation failed:", equipmentResult.error.errors);
      throw new Error("Invalid equipment data received from Blizzard API");
    }

    if (!profileResult.success) {
      console.error("Profile validation failed:", profileResult.error.errors);
      throw new Error("Invalid profile data received from Blizzard API");
    }

    // Validate non-critical responses (log but continue)
    const mediaResult = mediaJson
      ? MediaResponseSchema.safeParse(mediaJson)
      : { success: true as const, data: undefined };
    const pvpResult = PvpResponseSchema.safeParse(pvpJson);
    const specResult = isEra
      ? ClassicSpecsResponseSchema.safeParse(specJson)
      : MopSpecsResponseSchema.safeParse(specJson);

    if (!mediaResult.success) {
      console.warn("Media validation failed:", mediaResult.error.errors);
    }
    if (!pvpResult.success) {
      console.warn("PVP validation failed:", pvpResult.error.errors);
    }
    if (!specResult.success) {
      console.warn("Specializations validation failed:", specResult.error.errors);
    }

    const equipmentData = equipmentResult.data;
    const profileData = profileResult.data;
    const mediaData = mediaResult.success ? mediaResult.data : undefined;
    const pvpData = pvpResult.success ? pvpResult.data : undefined;
    const specData = specResult.success ? specResult.data : undefined;

    // Type assertion is safe here because Zod validated the structure
    const equippedItems: EquippedItemResponse[] =
      equipmentData.equipped_items as EquippedItemResponse[];

    // Get item data from JSON instead of database
    const itemIds = equippedItems.map((item) => item.item.id);
    const items = getItemsByIds(itemIds, isEra);

    const itemIDToItemLevel: ItemIdToInfo = items.reduce((acc, item) => {
      acc[item.id] = {
        itemLevel: item.itemLevel,
        displayId: item.displayId ?? undefined,
        icon: item.icon ?? undefined,
      };
      return acc;
    }, {} as ItemIdToInfo);

    const itemLevel = getItemLevel(equippedItems, itemIDToItemLevel);
    const gearscore = isEra ? undefined : getGearScore(equippedItems, itemIDToItemLevel);

    const cleanPVPData: Profile["pvp"] = pvpData
      ? {
          rank: pvpData.pvp_rank,
          honorable_kills: pvpData.honorable_kills,
          mapStats: pvpData.pvp_map_statistics?.map((m: any) => ({
            map: m.world_map.name,
            played: m.match_statistics.played,
            wins: m.match_statistics.won,
            losses: m.match_statistics.lost,
          })),
        }
      : undefined;

    // Only save to database if database is available
    let databaseCharacter;
    if (isDatabaseAvailable()) {
      databaseCharacter = await prisma.character.upsert({
        create: {
          name: cleanCharacterName,
          realm: realm ?? "",
          race: profileData.race.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          gender: profileData.gender.type === "MALE" ? 0 : 1,
          class: profileData.character_class.id,
          profileImageUrl: mediaData?.assets?.[0]?.value,
          level: profileData.level,
          guild: profileData?.guild?.name,
          gearscore: gearscore,
          itemLevel,
          achievementPoints: profileData.achievement_points,
          honorableKills: cleanPVPData?.honorable_kills,
          region,
          gameType,
        },
        update: {
          gearscore: gearscore,
          itemLevel,
          level: profileData.level,
          updatedAt: new Date(),
          achievementPoints: profileData.achievement_points,
          guild: profileData?.guild?.name,
          honorableKills: cleanPVPData?.honorable_kills,
        },
        where: {
          name_realm_region_gameType: {
            name: cleanCharacterName,
            realm: realm ?? "",
            region,
            gameType,
          },
        },
      });
    } else {
      // Mock database character for when DB is not available
      databaseCharacter = createMockCharacter(
        profileData,
        cleanCharacterName,
        realm,
        region,
        gameType,
        gearscore,
        itemLevel,
        cleanPVPData,
        mediaData
      );
    }
    const cleanItems: EquippedItem[] = equippedItems.map((item) => ({
      id: item.item.id,
      inventory_type: item.inventory_type.type,
      enchantments: cleanEnchantments(item.enchantments),
      slot: item.slot,
      itemLevel: itemIDToItemLevel[item.item.id]?.itemLevel,
      displayId: itemIDToItemLevel[item.item.id]?.displayId,
      icon: itemIDToItemLevel[item.item.id]?.icon,
      name: item.name,
      set: cleanSet(item.set),
      quality: item.quality,
    }));
    const characterSpecs =
      // TODO better way to check if talent data is not MOP
      isEra ? formatCharacterspecs(specData) : formatMopTalents(specData);

    // Achievement data is optional - validate if present but don't fail if missing/invalid
    const cleanedAchievementData: Achievements | undefined = isEra
      ? undefined
      : achievementJson
      ? cleanAchievementData(achievementJson as AchievementResponse)
      : undefined;

    const metadata = {
      achievements: cleanedAchievementData ?? undefined,
      pvp: cleanPVPData,
      items: cleanItems,
      talents: characterSpecs,
    };

    // Only save metadata to database if database is available
    let databaseMetadata;
    if (isDatabaseAvailable()) {
      databaseMetadata = await prisma.characterMetadata.upsert({
        create: {
          character: {
            connect: {
              id: databaseCharacter.id,
            },
          },
          ...metadata,
        },
        update: metadata,
        where: {
          characterId: databaseCharacter.id,
        },
      });
    } else {
      // Mock metadata for when DB is not available
      databaseMetadata = {
        characterId: databaseCharacter.id,
        achievements: cleanedAchievementData ?? undefined,
        pvp: cleanPVPData,
        items: cleanItems,
        talents: characterSpecs,
        parse: null,
      };
    }

    const parse = isParse(databaseMetadata.parse) ? databaseMetadata.parse : undefined;

    const profile: Profile = {
      ...databaseCharacter,
      // not derived from db
      items: cleanItems,
      // todo reduce this
      achievements: cleanedAchievementData,
      pvp: cleanPVPData,
      talents: characterSpecs,
      region,
      parse,
    };
    return profile;
  } else {
    // maybe delete character if not found
    const errorText = await equipmentResponse.text();
    if (equipmentResponse.status === 404) {
      // delete character if in db
    }
    throw new Error(
      equipmentResponse.status === 404
        ? "Character not found"
        : `Failed to fetch character equipment ${errorText}`
    );
  }
}

function getItemLevel(
  equippedItems: EquippedItemResponse[],
  itemIDToItemLevel: ItemIdToInfo
): number {
  if (equippedItems == null) return 0;
  let itemLevel = 0;
  let count = 0;
  equippedItems.forEach((ei) => {
    const item = itemIDToItemLevel[ei.item.id];
    if (item && !ITEMS_IGNORE_ITEM_LEVEL.has(ei.inventory_type.type)) {
      count++;
      itemLevel += item.itemLevel;
    }
  });
  return count === 0 ? 0 : Math.round(itemLevel / count);
}

function getGearScore(
  equippedItems: EquippedItemResponse[],
  itemIDToItemLevel: ItemIdToInfo
): number {
  const itemsForGearscore: {
    rarity: "Uncommon" | "Rare" | "Epic" | "Legendary" | "Common";
    slot: string;
    itemLevel?: number;
  }[] = equippedItems.map((ei) => {
    return {
      rarity: ei.quality.name as "Uncommon" | "Rare" | "Epic" | "Legendary" | "Common",
      slot: ei.slot.type,
      itemLevel: itemIDToItemLevel[ei.item.id]?.itemLevel,
    };
  });

  return calculateGearScore(itemsForGearscore, false, false);
}

function cleanSet(set: any): EquippedItem["set"] {
  if (set == null) {
    return undefined;
  }
  if (set.items == null || set.items.some((item) => item == null || item.item == null)) {
    return undefined;
  }
  return {
    items: set.items.map((item: any) => ({
      item: {
        id: item.item.id,
      },
      is_equipped: item.is_equipped,
    })),
  };
}

function cleanEnchantments(enchantments: any): EquippedItem["enchantments"] {
  if (enchantments == null) {
    return undefined;
  }
  return compact(
    enchantments.map((enchantment: any) => {
      if (enchantment == null) {
        return undefined;
      }
      return {
        enchantment_id: enchantment.enchantment_id,
        enchantment_slot: {
          id: enchantment.enchantment_slot.id,
        },
        display_string: enchantment.display_string,
        source_item:
          enchantment.source_item?.id == null
            ? undefined
            : {
                id: enchantment.source_item.id,
              },
      };
    })
  );
}

function formatMopTalents(specs: any): MopSpec[] {
  const mopSpecs: MopSpec[] = [];
  if (specs == null) {
    return mopSpecs;
  }
  specs.specializations?.forEach((spec: any, idx: number) => {
    const { is_active, glyphs: rawGlyphs } = specs.specialization_groups[idx];
    const glyphs = rawGlyphs?.map((g: any) => g.name);

    const talents: MopTalent[] = [];

    spec.talents?.forEach((t: any) => {
      talents.push({
        spellId: t.spell_tooltip.spell.id,
        id: t.talent.id,
      });
    });

    mopSpecs.push({
      talents,
      isActive: is_active,
      glyphs,
      name: spec.specialization?.name,
    });
  });
  return mopSpecs;
}

/**
 * Only valid for Classic through Cataclysm
 */
function formatCharacterspecs(specs: any): Spec[] {
  if (specs == null) {
    return [];
  }
  const characterspecs: Spec[] = [];
  specs.specialization_groups?.forEach((spec: any) => {
    const glyphs = spec?.glyphs?.map((g: any) => g.name);
    if (!spec.specializations) {
      return null;
    }
    const talentTree: TalentTree[] = [];
    spec.specializations.forEach((s: any) => {
      const talents: Talent[] = [];
      if (!s.talents) {
        return;
      }
      s.talents.forEach((t: any) => {
        talents.push({
          spellId: t.spell_tooltip.spell.id,
          rank: t.talent_rank,
          id: t.talent.id,
        });
      });

      talentTree.push({
        name: s.specialization_name,
        talents,
        pointsSpent: s.spent_points,
      });
    });

    characterspecs.push({
      talentTree,
      isActive: spec.is_active,
      glyphs,
    });
  });
  return characterspecs;
}

type ItemInfo = {
  itemLevel: number;
  displayId?: number;
  icon?: string;
  slot?: string;
};

type ItemIdToInfo = Record<number, ItemInfo>;

// TODO zod to validate these responses
function isAchievement(data: any): data is Achievements {
  return typeof data === "object" && data !== null && "achievements" in data;
}
function isItems(data: any): data is EquippedItem[] {
  return Array.isArray(data);
}
function isTalents(data: any): data is Profile["talents"] {
  return Array.isArray(data);
}
function isPvp(data: any): data is Profile["pvp"] {
  return typeof data === "object";
}
function isDateLike(value: unknown): value is string | Date {
  return typeof value === "string" || value instanceof Date;
}

function isParse(data: any): data is Profile["parse"] {
  if (data == null || typeof data !== "object") {
    return false;
  }

  const maybeParse = data as Record<string, any>;

  if (maybeParse.noLogs) {
    return isDateLike(maybeParse.lastUpdated);
  }

  return (
    typeof maybeParse.specName === "string" &&
    typeof maybeParse.metric === "string" &&
    isDateLike(maybeParse.lastUpdated) &&
    Array.isArray(maybeParse.encounters) &&
    maybeParse.encounters.every((encounter: any) => {
      if (encounter == null || typeof encounter !== "object") {
        return false;
      }
      return (
        typeof encounter.encounter === "string" &&
        typeof encounter.id === "number" &&
        (encounter.percent == null || typeof encounter.percent === "number")
      );
    })
  );
}

async function maybeFetchExisitingProfile(
  character: string,
  realm: string,
  region: string,
  gameType: GameType
): Promise<Profile | undefined> {
  // Early return if database is not available
  if (!isDatabaseAvailable()) {
    return undefined;
  }

  const maybeCharacter = await prisma.character.findUnique({
    where: {
      name_realm_region_gameType: {
        name: character,
        realm: realm,
        region: region,
        gameType,
      },
    },
    include: {
      metadata: true,
    },
  });

  if (maybeCharacter?.metadata != null) {
    const { achievements, items, talents, pvp, parse } = maybeCharacter.metadata;

    // If updated more than a week ago, fetch via Blizzard API
    if (maybeCharacter.updatedAt < new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)) {
      return undefined;
    }

    if (items && talents) {
      const profile: Profile = {
        ...maybeCharacter,
        achievements: isAchievement(achievements) ? achievements : undefined,
        items: isItems(items) ? items : [],
        talents: isTalents(talents) ? talents : [],
        pvp: isPvp(pvp) ? pvp : undefined,
        parse: isParse(parse) ? parse : undefined,
      };
      return profile;
    }
  }
}

// Helper function to create mock character data when database is unavailable
function createMockCharacter(
  profileData: any,
  cleanCharacterName: string,
  realm: string,
  region: string,
  gameType: GameType,
  gearscore: number | undefined,
  itemLevel: number,
  cleanPVPData: Profile["pvp"],
  mediaData: any
) {
  return {
    id: 0,
    name: cleanCharacterName,
    realm: realm ?? "",
    race: profileData.race.id,
    createdAt: new Date(),
    updatedAt: new Date(),
    gender: profileData.gender.type === "MALE" ? 0 : 1,
    class: profileData.character_class.id,
    profileImageUrl: mediaData?.assets?.[0]?.value,
    level: profileData.level,
    guild: profileData?.guild?.name,
    gearscore: gearscore,
    itemLevel,
    achievementPoints: profileData.achievement_points,
    honorableKills: cleanPVPData?.honorable_kills,
    region,
    gameType,
  };
}

const ITEMS_IGNORE_ITEM_LEVEL = new Set(["SHIRT", "TABARD", "BODY"]);

const CATA_ID = 15096;
function cleanAchievementData(
  achievementData: AchievementResponse | undefined
): Achievements | undefined {
  if (!achievementData) return undefined;

  const achievements: Achievement[] = [];
  const deathCat = achievementData?.categories
    ?.find((a) => a.id === 122)
    ?.statistics.find((s) => s.id === 60);

  if (deathCat) {
    achievements.push({
      id: 122,
      name: deathCat.name,
      quantity: deathCat.quantity,
    });
  }

  const cataRaidAchievements = achievementData?.categories
    ?.find((a) => a.id === 14807)
    ?.sub_categories?.find((s) => s.id === CATA_ID);

  if (cataRaidAchievements && cataRaidAchievements.statistics) {
    cataRaidAchievements?.statistics?.forEach((stat) => {
      achievements.push({
        id: stat.id,
        name: stat.name,
        quantity: stat.quantity,
      });
    });
  }

  return {
    achievements,
  };
}
