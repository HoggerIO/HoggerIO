// TODO this outdated and meant for WOTLK

type Item = {
  rarity: "Uncommon" | "Rare" | "Epic" | "Legendary" | "Common" | "Heirloom";
  slot: string;
  itemLevel?: number;
};

const DEFAULT_ITEM_LEVEL = 1;

const QUALITY_MOD = {
  Uncommon: 1,
  Rare: 1,
  Epic: 1,
  Legendary: 1.3,
  Heirloom: 1,
};

const RARITY_MOD_A = {
  Uncommon: 73,
  Rare: 81.375,
  Epic: 91.45,
  Legendary: 91.45,
  Heirloom: 1,
};

const RARITY_MOD_B = {
  Uncommon: 1,
  Heirloom: 1,
  Rare: 0.8125,
  Epic: 0.65,
  Legendary: 0.65,
};

const SLOT_TO_MOD: { [key: string]: number } = {
  HEAD: 1,
  NECK: 0.5625,
  SHOULDER: 0.75,
  BACK: 0.5625,
  CHEST: 1,
  WRIST: 0.5625,
  HANDS: 0.75,
  WAIST: 0.75,
  LEGS: 1,
  FEET: 0.75,
  FINGER_1: 0.5625,
  FINGER_2: 0.5625,
  TRINKET_1: 0.5625,
  TRINKET_2: 0.5625,
  MAIN_HAND: 1,
  OFF_HAND: 1,
  RANGED: 0.3164,
  IDOL: 0.5625,
};

export function calculateGearScore(is: Item[], isHunter: boolean, titansGrip: boolean): number {
  const items = is.length > 0 ? is : [];
  let totalScore = 0;
  for (const item of items) {
    if (item.rarity === "Common") {
      continue;
    }
    if (item.rarity === "Heirloom") {
      totalScore += 1;
      continue;
    }
    if (SLOT_TO_MOD[item.slot.toUpperCase()] === undefined) {
      continue;
    }

    // two handed should be doubled if it is a 2h weapon (just check if no offhand this isn;t technically
    // correct since a user can just unequip their offhand but it is good enough for now)
    let doubleModifer = false;
    if (item.slot === "MAIN_HAND" && items.find((i) => i.slot === "OFF_HAND") == null) {
      doubleModifer = true;
    }

    let gearScore = Math.floor(
      (((item.itemLevel ?? DEFAULT_ITEM_LEVEL) - RARITY_MOD_A[item.rarity]) /
        RARITY_MOD_B[item.rarity]) *
        ((SLOT_TO_MOD[item.slot.toUpperCase()] ?? 1) * (doubleModifer ? 2 : 1)) *
        1.8618 *
        QUALITY_MOD[item.rarity]
    );

    totalScore += gearScore;
  }
  if (totalScore < 0) {
    return 0;
  }
  return totalScore;
}

const TEST_ITEMS: Item[] = [
  { slot: "Head", rarity: "Uncommon", itemLevel: 251 },
  { slot: "Neck", rarity: "Epic", itemLevel: 252 },
  { slot: "Shoulder", rarity: "Rare", itemLevel: 251 },
  { slot: "Back", rarity: "Rare", itemLevel: 264 },
  { slot: "Chest", rarity: "Epic", itemLevel: 264 },
  { slot: "Wrist", rarity: "Uncommon", itemLevel: 245 },
  { slot: "Hands", rarity: "Epic", itemLevel: 251 },
  { slot: "Waist", rarity: "Epic", itemLevel: 264 },
  { slot: "Legs", rarity: "Epic", itemLevel: 251 },
  { slot: "Feet", rarity: "Epic", itemLevel: 245 },
  { slot: "FINGER", rarity: "Epic", itemLevel: 259 },
  { slot: "FINGER", rarity: "Epic", itemLevel: 252 },
  { slot: "Trinket", rarity: "Epic", itemLevel: 239 },
  { slot: "Trinket", rarity: "Epic", itemLevel: 245 },
  { slot: "MAIN_HAND", rarity: "Legendary", itemLevel: 245 },
  { slot: "OFF_HAND", rarity: "Epic", itemLevel: 245 },
  { slot: "Ranged", rarity: "Epic", itemLevel: 264 },
];

// https://github.com/Barsoomx/GearScoreLite/blob/master/GearScoreLite/GearScoreLite.lua
// gearscore color

const GS_Quality: Record<number, QualityColor> = {
  6000: {
    Red: { A: 0.94, B: 5000, C: 0.00006, D: 1 },
    Green: { A: 0.47, B: 5000, C: 0.00047, D: -1 },
    Blue: { A: 0, B: 0, C: 0, D: 0 },
    Description: "Legendary",
  },
  5000: {
    Red: { A: 0.69, B: 4000, C: 0.00025, D: 1 },
    Green: { A: 0.28, B: 4000, C: 0.00019, D: 1 },
    Blue: { A: 0.97, B: 4000, C: 0.00096, D: -1 },
    Description: "Epic",
  },
  4000: {
    Red: { A: 0.0, B: 3000, C: 0.00069, D: 1 },
    Green: { A: 0.5, B: 3000, C: 0.00022, D: -1 },
    Blue: { A: 1, B: 3000, C: 0.00003, D: -1 },
    Description: "Superior",
  },
  3000: {
    Red: { A: 0.12, B: 2000, C: 0.00012, D: -1 },
    Green: { A: 1, B: 2000, C: 0.0005, D: -1 },
    Blue: { A: 0, B: 2000, C: 0.001, D: 1 },
    Description: "Uncommon",
  },
  2000: {
    Red: { A: 1, B: 1000, C: 0.00088, D: -1 },
    Green: { A: 1, B: 0, C: 0.0, D: 0 },
    Blue: { A: 1, B: 1000, C: 0.001, D: -1 },
    Description: "Common",
  },
  1000: {
    Red: { A: 0.55, B: 0, C: 0.00045, D: 1 },
    Green: { A: 0.55, B: 0, C: 0.00045, D: 1 },
    Blue: { A: 0.55, B: 0, C: 0.00045, D: 1 },
    Description: "Trash",
  },
};

type QualityColor = {
  Red: { A: number; B: number; C: number; D: number };
  Green: { A: number; B: number; C: number; D: number };
  Blue: { A: number; B: number; C: number; D: number };
  Description: string;
};

export function getGearscoreColor(itemScore: number): [number, number, number, string] {
  if (itemScore > 5999) itemScore = 5999;

  if (itemScore === undefined) return [0, 0, 0, "Trash"];

  for (let i = 0; i <= 6; i++) {
    if (itemScore > i * 1000 && itemScore <= (i + 1) * 1000) {
      const quality = GS_Quality[(i + 1) * 1000];

      const red = quality.Red.A + (itemScore - quality.Red.B) * quality.Red.C * quality.Red.D;
      const green =
        quality.Green.A + (itemScore - quality.Green.B) * quality.Green.C * quality.Green.D;
      const blue = quality.Blue.A + (itemScore - quality.Blue.B) * quality.Blue.C * quality.Blue.D;

      return [red, green, blue, quality.Description];
    }
  }

  return [1, 1, 1, "Unknown"];
}

export function getCssGearScoreColor(itemScore: number): string {
  const [r, g, b] = getGearscoreColor(itemScore);
  return `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
}
