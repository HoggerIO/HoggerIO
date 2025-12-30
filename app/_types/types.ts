import { Character, GameType } from "@prisma/client";
import { Achievements } from "./achievements";

export interface EquippedItem {
  id: number;
  inventory_type: string;
  enchantments?: Enchantment[];
  slot: { type: string; name: string };
  quality: { type: string; name: string };
  name: string;
  set?: {
    items: {
      item: {
        id: number;
      };
      is_equipped: boolean;
    }[];
  };
  // fake properties from prisma
  icon?: string;
  itemLevel?: number;
  displayId?: number;
  // added to make prisma json happy
  [key: string]: any;
}

export interface EquippedItemResponse
  extends Pick<EquippedItem, "enchantments" | "slot" | "quality" | "name" | "set"> {
  item: {
    id: number;
  };
  inventory_type: {
    type: string;
    name: string;
  };
}
interface Enchantment {
  display_string: string;
  source_item?: {
    id: number;
  };
  enchantment_id: number;
  enchantment_slot: { id: number };
  // Others not included here
}

export type ProfileParse =
  | {
      noLogs: true;
      lastUpdated: Date;
    }
  | {
      noLogs?: false;
      specName: string;
      metric: string;
      lastUpdated: Date;
      encounters: {
        encounter: string;
        id: number;
        percent?: number;
      }[];
    };

export interface Profile extends Character {
  achievements?: Achievements;
  pvp?: {
    rank: number;
    honorable_kills: number;
    mapStats: {
      map: string;
      wins: number;
      losses: number;
      played: number;
    }[];
  };
  items: EquippedItem[];
  talents: Spec[] | MopSpec[];
  parse?: ProfileParse;
}

export interface ProfileEra extends Omit<Profile, "achievementPoints" | "achievements"> {}

export interface ProfileInfoReponse {
  gender: { type: "MALE" | "FEMALE"; name: string };
  faction: { type: "HORDE" | "ALLIANCE"; name: string };
  race: {
    id: number;
  };
  character_class: {
    id: number;
  };
  guild?: {
    name: string;
    id: number;
  };
  level: number;
  achievement_points: number;
}

export const RACE_TO_ID = {
  Human: 1,
  Orc: 2,
  Dwarf: 3,
  NightElf: 4,
  Undead: 5,
  Tauren: 6,
  Gnome: 7,
  Troll: 8,
  BloodElf: 10,
  Draenei: 11,
};

export interface Guild {
  name: string;
  realm: string;
  members: GuildMember[];
  region: string;
  gameType: GameType;
  displayName: string;
}

export interface GuildMember {
  [key: string]: any;
  race: number;
  class: number;
  level: number;
  name: string;
  rank: number;
}

export interface PrismaCharacter {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  realm: string;
  guild: string | null;
  gender: number;
  class: number;
  race: number;
  gearscore: number;
  achievementPoints: number;
  level: number;
  profileImageUrl: string;
}
export type ApiResponse<T> = { data: T; type: "ok" } | { error: any; type: "error" };

export interface Talent {
  spellId: number;
  rank: number;
  id: number;
}

export interface MopTalent {
  spellId: number;
  id: number;
}

export interface MopSpec {
  isActive: boolean;
  talents: MopTalent[];
  glyphs?: string[];
  name?: string;
  // added to make prisma json happy
  [key: string]: any;
}

export const MopSpec = {
  // TODO use zod to validate the data
  is: (specs: Spec[]): specs is MopSpec[] =>
    specs != null && specs.every((spec) => spec?.talentTree == null),
};

export interface TalentTree {
  name: string;
  pointsSpent: number;
  talents: Talent[];
}
export interface ClassicSpec {
  isActive: boolean;
  talentTree: TalentTree[];
  glyphs?: string[];
  // added to make prisma json happy
  [key: string]: any;
}

export type Spec = ClassicSpec | MopSpec;
