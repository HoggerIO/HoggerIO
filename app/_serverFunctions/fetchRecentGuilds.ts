import { GameType } from "@prisma/client";
import { prisma } from "@/app/prisma";
import { Guild } from "../_types/types";
import { isDatabaseAvailable } from "@/app/_utils/isDatabaseAvailable";
import { parseGuildMembers } from "./fetchGuild";

function normalizeGuilds(guilds: Awaited<ReturnType<typeof prisma.guild.findMany>>): Guild[] {
  return guilds.map((guild) => ({
    ...guild,
    members: parseGuildMembers(guild.members),
  }));
}

export async function fetchRecentlyUpdatedGuilds(): Promise<Record<GameType, Guild[]>> {
  // If database is not available, return empty arrays
  if (!isDatabaseAvailable()) {
    return {
      NORMAL: [],
      SEASONAL: [],
      ERA: [],
      HARDCORE: [],
    };
  }

  const MopQuery = prisma.guild.findMany({
    where: {
      gameType: "NORMAL",
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  const SodQuery = prisma.guild.findMany({
    where: {
      gameType: "SEASONAL",
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  const EraQuery = prisma.guild.findMany({
    where: {
      gameType: "ERA",
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 5,
  });

  const [mop, sod, era] = await Promise.all([MopQuery, SodQuery, EraQuery]);

  return {
    NORMAL: normalizeGuilds(mop),
    SEASONAL: normalizeGuilds(sod),
    ERA: normalizeGuilds(era),
    HARDCORE: [],
  };
}
