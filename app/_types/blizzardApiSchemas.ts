import { z } from "zod";

/**
 * Zod schemas for validating Blizzard API responses
 * These schemas ensure type safety and catch API response changes
 */

export const AuthTokenSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  scope: z.string().optional(),
});

export const EnchantmentSchema = z.object({
  display_string: z.string().optional(),
  source_item: z
    .object({
      id: z.number(),
    })
    .optional(),
  enchantment_id: z.number(),
  enchantment_slot: z.object({
    id: z.number(),
  }),
});

export const EquippedItemResponseSchema = z.object({
  item: z.object({
    id: z.number(),
  }),
  inventory_type: z.object({
    type: z.string(),
    name: z.string(),
  }),
  enchantments: z.array(EnchantmentSchema).optional(),
  slot: z.object({
    type: z.string(),
    name: z.string(),
  }),
  quality: z.object({
    type: z.string(),
    name: z.string(),
  }),
  name: z.string(),
  set: z
    .object({
      items: z.array(
        z.object({
          item: z.object({
            id: z.number(),
          }),
          is_equipped: z.boolean().optional(),
        })
      ),
    })
    .optional(),
});

export const EquipmentResponseSchema = z.object({
  equipped_items: z.array(EquippedItemResponseSchema),
});

export const ProfileResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  gender: z.object({
    type: z.enum(["MALE", "FEMALE"]),
    name: z.string(),
  }),
  faction: z.object({
    type: z.enum(["HORDE", "ALLIANCE"]),
    name: z.string(),
  }),
  race: z.object({
    id: z.number(),
  }),
  character_class: z.object({
    id: z.number(),
  }),
  guild: z
    .object({
      name: z.string(),
      id: z.number(),
    })
    .optional(),
  level: z.number(),
  achievement_points: z.number().optional(),
});

export const MediaResponseSchema = z.object({
  assets: z
    .array(
      z.object({
        key: z.string(),
        value: z.string().url(),
      })
    )
    .optional(),
});

export const PvpMapStatisticsSchema = z.object({
  world_map: z.object({
    name: z.string(),
  }),
  match_statistics: z.object({
    played: z.number(),
    won: z.number(),
    lost: z.number(),
  }),
});

export const PvpResponseSchema = z.object({
  pvp_rank: z.number(),
  honorable_kills: z.number(),
  pvp_map_statistics: z.array(PvpMapStatisticsSchema).optional(),
});

export const MopTalentSchema = z.object({
  spell_tooltip: z.object({
    spell: z.object({
      id: z.number(),
    }),
  }),
  talent: z.object({
    id: z.number(),
  }),
});

export const MopSpecSchema = z.object({
  specialization: z
    .object({
      name: z.string(),
    })
    .optional(),
  talents: z.array(MopTalentSchema).optional(),
});

export const MopSpecsResponseSchema = z.object({
  specializations: z.array(MopSpecSchema).optional(),
  specialization_groups: z.array(
    z.object({
      is_active: z.boolean(),
      glyphs: z
        .array(
          z.object({
            name: z.string(),
          })
        )
        .optional(),
    })
  ),
});

export const ClassicTalentSchema = z.object({
  spell_tooltip: z.object({
    spell: z.object({
      id: z.number(),
    }),
  }),
  talent_rank: z.number(),
  talent: z.object({
    id: z.number(),
  }),
});

export const ClassicSpecializationSchema = z.object({
  specialization_name: z.string(),
  spent_points: z.number(),
  talents: z.array(ClassicTalentSchema).optional(),
});

export const ClassicSpecsResponseSchema = z.object({
  specialization_groups: z.array(
    z.object({
      is_active: z.boolean(),
      glyphs: z
        .array(
          z.object({
            name: z.string(),
          })
        )
        .optional(),
      specializations: z.array(ClassicSpecializationSchema).optional(),
    })
  ),
});

export const GuildMemberResponseSchema = z.object({
  character: z.object({
    name: z.string(),
    level: z.number(),
    playable_class: z.object({
      id: z.number(),
    }),
    playable_race: z.object({
      id: z.number(),
    }),
  }),
  rank: z.number(),
});

export const GuildResponseSchema = z.object({
  members: z.array(GuildMemberResponseSchema),
  guild: z.object({
    name: z.string(),
  }),
});

// Schema for the prisma JSON value stored in the db
export const GuildMemberSchema = z.object({
  race: z.number(),
  class: z.number(),
  level: z.number(),
  name: z.string(),
  rank: z.number(),
});

export const GuildMembersArraySchema = z.array(GuildMemberSchema);

export type AuthToken = z.infer<typeof AuthTokenSchema>;
export type EquipmentResponse = z.infer<typeof EquipmentResponseSchema>;
export type ProfileResponse = z.infer<typeof ProfileResponseSchema>;
export type MediaResponse = z.infer<typeof MediaResponseSchema>;
export type PvpResponse = z.infer<typeof PvpResponseSchema>;
export type MopSpecsResponse = z.infer<typeof MopSpecsResponseSchema>;
export type ClassicSpecsResponse = z.infer<typeof ClassicSpecsResponseSchema>;
export type GuildResponse = z.infer<typeof GuildResponseSchema>;
