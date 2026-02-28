import { NextRequest, NextResponse } from "next/server";
import { GameType } from "@prisma/client";
import { fetchGuild } from "@/app/_serverFunctions/fetchGuild";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const guildName = searchParams.get("guildName");
  const realm = searchParams.get("realm");
  const region = searchParams.get("region");
  const gameTypeRaw = searchParams.get("gameType");

  if (!guildName || !realm || !region || !gameTypeRaw) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  if (!(gameTypeRaw in GameType)) {
    return NextResponse.json({ error: "Invalid game type" }, { status: 400 });
  }

  try {
    const guild = await fetchGuild(
      guildName,
      realm,
      region,
      GameType[gameTypeRaw as keyof typeof GameType],
    );
    return NextResponse.json(
      { guild },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to load guild" }, { status: 500 });
  }
}
