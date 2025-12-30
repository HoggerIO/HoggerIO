"use server";

import { revalidatePath } from "next/cache";
import { fetchProfile } from "./fetchProfile";

export default async function refreshProfileData(
  character: string,
  realm: string,
  region: string,
  isEra: boolean
) {
  await fetchProfile(character, realm, region, true, isEra);
  revalidatePath(`/character/${region}/${realm}/${character}`);
}
