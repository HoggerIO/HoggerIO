import { Guild, GuildMember } from "../_types/types";
import { prisma } from "@/app/prisma";
import { getGameType } from "@/app/_utils/realm";
import { isDatabaseAvailable } from "@/app/_utils/isDatabaseAvailable";
import {
  GuildResponseSchema,
  AuthTokenSchema,
  GuildMembersArraySchema,
} from "../_types/blizzardApiSchemas";
import { Prisma } from "@prisma/client";

const CLIENT_ID = process.env.BLIZZARD_CLIENT_ID;
const CLIENT_SECRET = process.env.BLIZZARD_CLIENT_SECRET;

export async function fetchGuild(
  guildName: string,
  realm: string,
  region: string,
  isEra = false
): Promise<Guild> {
  const cleanGuildName = guildName;
  const gameType = getGameType(realm, isEra);

  // Check database cache if available
  if (isDatabaseAvailable()) {
    const maybeGuild = await prisma.guild.findUnique({
      where: {
        name_realm_region_gameType: {
          name: cleanGuildName,
          realm: realm,
          region: region,
          gameType,
        },
      },
    });
    // If the guild is updated less than 24 hours ago, return the cached guild
    if (maybeGuild != null && maybeGuild.updatedAt > new Date(Date.now() - 1000 * 60 * 60 * 24)) {
      return {
        ...maybeGuild,
        members: parseGuildMembers(maybeGuild.members),
      };
    }
  }

  const AUTH_URL = "https://oauth.battle.net/token";

  const authResponse = await fetch(AUTH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    next: { revalidate: 72000 },
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

  const guildActivityApi = `https://${region}.api.blizzard.com/data/wow/guild/${realm}/${cleanGuildName}/roster?namespace=profile-classic${
    isEra ? "1x" : ""
  }-${region}&locale=en_US`;
  const guildResponse = await fetch(guildActivityApi, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!guildResponse.ok) {
    throw new Error("Failed to fetch guild from Blizzard API");
  }

  const guildData = await guildResponse.json();
  const guildResult = GuildResponseSchema.safeParse(guildData);

  if (!guildResult.success) {
    console.warn("Guild roster validation failed:", guildResult.error.errors);
    throw new Error("Invalid guild roster data received from Blizzard API");
  }

  const validatedGuild = guildResult.data;

  const persistedGuild: Guild = {
    name: cleanGuildName,
    displayName: validatedGuild.guild.name,
    realm,
    members: validatedGuild.members.map((m) => ({
      race: m.character.playable_race.id,
      class: m.character.playable_class.id,
      level: m.character.level,
      name: m.character.name,
      rank: m.rank,
    })),
    region,
    gameType,
  };

  // Save to database if available
  if (isDatabaseAvailable()) {
    await prisma.guild.upsert({
      create: persistedGuild,
      update: persistedGuild,
      where: {
        name_realm_region_gameType: {
          name: cleanGuildName,
          realm: realm,
          region,
          gameType,
        },
      },
    });
  }
  return persistedGuild;
}

export function parseGuildMembers(members: Prisma.JsonValue): GuildMember[] {
  const result = GuildMembersArraySchema.safeParse(members);
  if (!result.success) {
    console.warn("Invalid members data in database:", {
      errors: result.error.errors,
    });
    return [];
  }

  // Type assertion is safe here because Zod validated the structure
  return result.data as GuildMember[];
}
