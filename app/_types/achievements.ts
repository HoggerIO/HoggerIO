export interface AchievementResponse {
  categories: {
    id: number;
    name: string; // "Character", "Deaths", "Dungeons & Raids"
    statistics?: {
      id: number;
      name: string;
      quantity: number;
    }[];
    sub_categories?: UnresolvedAchievement[];
  }[];
}

// Blizzard API achievement response
interface UnresolvedAchievement {
  id: number;
  name: string; // "Character", "Deaths", "Dungeons & Raids"
  statistics?: {
    id: number;
    name: string;
    quantity: number;
  }[];
  sub_categories?: UnresolvedAchievement[];
}

export interface Achievements {
  achievements: Achievement[];
  // added to make prisma json happy
  [key: string]: any;
}

export interface Achievement {
  id: number;
  name: string;
  quantity: number;
}
