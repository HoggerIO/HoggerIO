"use server";

import { revalidatePath } from "next/cache";
import { fetchProfile } from "./fetchProfile";
import { GameType } from "@prisma/client";
import { buildCharacterPath } from "../_utils/gameType";

export default async function refreshProfileData(
  character: string,
  realm: string,
  region: string,
  gameType: GameType
) {
  await fetchProfile(character, realm, region, true, gameType);
  revalidatePath(buildCharacterPath(gameType, region, realm, character));
}
