import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/prisma";
import { GameType } from "@prisma/client";

export const dynamic = "force-dynamic";

const STAT_FIELDS = new Set(["itemLevel", "gearscore", "achievementPoints", "honorableKills"]);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameType = searchParams.get("gameType");
  const stat = searchParams.get("stat");
  const wowClass = searchParams.get("wowClass");

  if (!gameType || !stat) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  if (!(gameType in GameType)) {
    return NextResponse.json({ error: "Invalid game type" }, { status: 400 });
  }

  if (!STAT_FIELDS.has(stat)) {
    return NextResponse.json({ error: "Invalid stat" }, { status: 400 });
  }

  const where: Record<string, any> = {
    gameType: GameType[gameType as keyof typeof GameType],
    [stat]: { not: null },
  };

  if (wowClass && !Number.isNaN(Number(wowClass))) {
    where.class = Number(wowClass);
  }

  const characters = await prisma.character.findMany({
    where,
    orderBy: { [stat]: "desc" },
    take: 5,
    select: {
      id: true,
      name: true,
      realm: true,
      guild: true,
      profileImageUrl: true,
      class: true,
      region: true,
      gearscore: true,
      itemLevel: true,
      achievementPoints: true,
      honorableKills: true,
      level: true,
      gameType: true,
      race: true,
      gender: true,
    },
  });

  return NextResponse.json(
    { characters },
    {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    },
  );
}
