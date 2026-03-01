import { NextRequest, NextResponse } from "next/server";
import { fetchProfile } from "@/app/_serverFunctions/fetchProfile";
import { GameType } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const character = searchParams.get("character");
  const realm = searchParams.get("realm");
  const region = searchParams.get("region");
  const gameTypeRaw = searchParams.get("gameType");
  const breakCache = searchParams.get("breakCache");

  if (!character || !realm || !region || !gameTypeRaw) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  if (!(gameTypeRaw in GameType)) {
    return NextResponse.json({ error: "Invalid game type" }, { status: 400 });
  }

  try {
    const profile = await fetchProfile(
      character,
      realm,
      region,
      breakCache === "1",
      GameType[gameTypeRaw as keyof typeof GameType],
    );
    return NextResponse.json(
      { profile },
      {
        headers: {
          "Cache-Control":
            breakCache === "1"
              ? "private, no-store, max-age=0"
              : "public, s-maxage=60, stale-while-revalidate=300",
        },
      },
    );
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Failed to load profile" }, { status: 500 });
  }
}
