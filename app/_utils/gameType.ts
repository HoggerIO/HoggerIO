import { GameType } from "@prisma/client";

export const GAME_TYPE_ROUTE_PREFIX: Record<GameType, string> = {
  [GameType.NORMAL]: "",
  [GameType.ERA]: "era",
  [GameType.SEASONAL]: "sod",
  [GameType.HARDCORE]: "hardcore",
  [GameType.TBC]: "tbc",
};

export const GAME_TYPE_LABEL: Record<GameType, string> = {
  [GameType.NORMAL]: "Mists of Pandaria",
  [GameType.ERA]: "Classic Era",
  [GameType.SEASONAL]: "Season of Discovery",
  [GameType.HARDCORE]: "Hardcore",
  [GameType.TBC]: "The Burning Crusade",
};

export function getGameTypePathPrefix(gameType: GameType): string {
  const prefix = GAME_TYPE_ROUTE_PREFIX[gameType] ?? "";
  return prefix.length > 0 ? `${prefix}/` : "";
}

export function buildCharacterPath(
  gameType: GameType,
  region: string,
  realm: string,
  name: string
): string {
  return `/character/${getGameTypePathPrefix(gameType)}${region}/${realm}/${name}`;
}

export function buildGuildPath(
  gameType: GameType,
  region: string,
  realm: string,
  name: string
): string {
  return `/guild/${getGameTypePathPrefix(gameType)}${region}/${realm}/${name}`;
}

export function getProfileNamespace(gameType: GameType, region: string): string {
  switch (gameType) {
    case GameType.ERA:
    case GameType.SEASONAL:
    case GameType.HARDCORE:
      return `profile-classic1x-${region}`;
    case GameType.TBC:
      return `profile-classicann-${region}`;
    case GameType.NORMAL:
    default:
      return `profile-classic-${region}`;
  }
}

export function getWowheadDomain(gameType: GameType): string {
  switch (gameType) {
    case GameType.NORMAL:
      return "mists";
    case GameType.TBC:
      return "tbc";
    case GameType.ERA:
    case GameType.SEASONAL:
    case GameType.HARDCORE:
    default:
      return "classic";
  }
}

export function getModelType(gameType: GameType): "classic" | "mists" {
  return gameType === GameType.NORMAL ? "mists" : "classic";
}

export function supportsRunes(gameType: GameType): boolean {
  return gameType === GameType.SEASONAL;
}

export function supportsAchievements(gameType: GameType): boolean {
  return gameType === GameType.NORMAL;
}

export function useClassicSpecs(gameType: GameType): boolean {
  return gameType !== GameType.NORMAL;
}

export function useClassicItems(gameType: GameType): boolean {
  return gameType !== GameType.NORMAL;
}

export function getMaxLevel(gameType: GameType): number {
  switch (gameType) {
    case GameType.NORMAL:
      return 90;
    case GameType.TBC:
      return 70;
    case GameType.ERA:
    case GameType.SEASONAL:
    case GameType.HARDCORE:
    default:
      return 60;
  }
}

export function getWarcraftLogsSubdomain(gameType: GameType): string {
  switch (gameType) {
    case GameType.SEASONAL:
      return "sod";
    case GameType.NORMAL:
      return "classic";
    case GameType.TBC:
      return "tbc";
    case GameType.ERA:
    case GameType.HARDCORE:
    default:
      return "vanilla";
  }
}
