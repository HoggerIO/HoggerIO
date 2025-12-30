import { prisma } from "@/app/prisma";
import { Character } from "@prisma/client";
import { isDatabaseAvailable } from "./isDatabaseAvailable";

export const fetchCharacters = async (args: any): Promise<Character[]> => {
  if (!isDatabaseAvailable()) {
    return [];
  }
  const characters = await prisma.character.findMany(args);
  return characters;
};
