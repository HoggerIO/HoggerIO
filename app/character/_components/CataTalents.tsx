"use client";
import { Spec } from "../../_types/types";
import { Box, Button, ButtonGroup, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import glyphLookup from "../../../json/cata/glyphs.json";

const GLYPHS = glyphLookup as Record<string, { icon: string; id: string; glyphType: number }>;

interface TalentProps {
  class: number;
  talents: Spec[];
}

type talentMap = { [key: string]: TalentInfo };
type LoadedTalents = { [key: string]: talentMap };

interface TalentInfo {
  id: number;
  row: number;
  col: number;
  icon: string;
  ranks: number[];
  requires: {
    id: number;
    qty: number;
  }[];
}

// TODO update to MOP talents
export const TalentsCata: React.FC<TalentProps> = (props) => {
  const { class: classType, talents } = props;
  const [loadedTalents, setLoadedTalents] = useState<LoadedTalents>({});

  const activeIdx = talents.findIndex((t) => t.isActive);
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const numRows = 7;
  const maxTalents = 41;
  useEffect(() => {
    const loadTalents = async () => {
      const response = await loadTalentsFromJson(classType);
      setLoadedTalents(response.talents);
    };

    loadTalents();
  }, []);

  useEffect(() => {
    const newActiveIdx = talents.findIndex((t) => t.isActive);
    setSelectedSpec(newActiveIdx);
  }, [talents]);

  const talentNames = Object.keys(loadedTalents);
  const renderTalents = (): JSX.Element => {
    const specSection: JSX.Element[][][] = [];
    Object.keys(loadedTalents).forEach((key) => {
      const rows: JSX.Element[][] = [];
      for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
          const talent = Object.values(loadedTalents[key]).find((t) => t.row === i && t.col === j);
          if (talent) {
            const isSelected = talents[selectedSpec]?.talentTree
              ?.find((t) => t.name === key)
              ?.talents?.find((t) => t.id === talent.id);
            row.push(
              <Box
                border={
                  isSelected
                    ? isSelected.rank === talent.ranks.length
                      ? "1px solid rgba(255,209,0,0.8)"
                      : "1px solid rgba(64,191,64,0.8)"
                    : undefined
                }
                borderRadius={"5px"}
                w={"45px"}
                h={"45px"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"relative"}
              >
                <a
                  href={`https://cata.wowhead.com/spell=${
                    isSelected ? isSelected.spellId : talent.ranks[0]
                  }`}
                  target="_blank"
                >
                  <Image
                    unoptimized={true}
                    style={isSelected != null ? {} : { filter: "grayscale(150%)" }}
                    width={40}
                    height={40}
                    src={`https://wow.zamimg.com/images/wow/icons/medium/${talent?.icon?.toLowerCase()}.jpg`}
                    alt=""
                  />
                </a>
                {isSelected && (
                  <Tag
                    pos={"absolute"}
                    top={"25px"}
                    left={"20px"}
                    size="sm"
                    variant="solid"
                    backgroundColor={"green"}
                    width={"23px"}
                    height={"10px"}
                    padding={"2px"}
                  >
                    <Text fontSize={"small"}>{`${isSelected.rank}/${talent.ranks.length}`}</Text>
                  </Tag>
                )}
              </Box>
            );
          } else {
            row.push(<Box w={"40px"} h={"40px"}></Box>);
          }
        }
        rows.push(row);
      }
      specSection.push(rows);
    });
    return (
      <Box display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"}>
        {talents.length > 1 && (
          <ButtonGroup>
            <Button
              onClick={() => {
                setSelectedSpec(activeIdx);
              }}
              isActive={selectedSpec === activeIdx}
            >
              Active
            </Button>
            <Button
              onClick={() => {
                setSelectedSpec((selectedSpec + 1) % 2);
              }}
              isActive={selectedSpec !== activeIdx}
            >
              Secondary
            </Button>
          </ButtonGroup>
        )}

        <Box display={"flex"} flexWrap={"wrap"} justifyContent={"space-around"} gap={5}>
          {specSection.map((s, idx) => {
            return (
              <Box key={`${idx}`}>
                <Box display={"flex"} gap={3} alignItems={"center"}>
                  <Image
                    unoptimized={true}
                    width={40}
                    height={40}
                    alt="talentIcon"
                    style={{
                      borderRadius: "50%",
                    }}
                    src={CLASS_TO_TREE_IMAGE[classType][talentNames[idx]]?.icon}
                  />
                  <Text fontSize={"large"}>{talentNames[idx]}</Text>
                  <Text fontSize={"large"}>
                    {talents[selectedSpec]?.talentTree?.find((f) => f.name === talentNames[idx])
                      ?.pointsSpent ?? 0}{" "}
                    / {maxTalents}
                  </Text>
                </Box>
                <Box
                  padding={3}
                  backgroundImage={
                    CLASS_TO_TREE_IMAGE[classType][talentNames[idx]]?.bg
                      ? `url(${CLASS_TO_TREE_IMAGE[classType][talentNames[idx]]?.bg})`
                      : undefined
                  }
                  backgroundSize={"cover"}
                  backgroundColor="black"
                >
                  {s.map((r, idx) => {
                    return (
                      <Box key={idx} mb={5} display={"flex"} gap={5}>
                        {r.map((c, idx) => (
                          <React.Fragment key={`${idx}`}>{c}</React.Fragment>
                        ))}
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  const renderGlyphs = () => {
    const glyphs = talents[selectedSpec]?.glyphs;
    if (glyphs == null) {
      return <></>;
    }
    const resolvedGlyphs = glyphs.map((g) => {
      const resolvedGlyph = GLYPHS[g];
      if (resolvedGlyph == null) {
        return { name: g, icon: "inv_misc_questionmark", id: null, glyphType: 0 };
      } else {
        return {
          name: g,
          icon: resolvedGlyph.icon,
          id: resolvedGlyph.id,
          glyphType: resolvedGlyph.glyphType,
        };
      }
    });
    const majorGlyphs = resolvedGlyphs.filter((g) => g.glyphType === 1);
    const primeGlyphs = resolvedGlyphs.filter((g) => g.glyphType === 3);
    const minorGlyphs = resolvedGlyphs.filter((g) => g.glyphType === 2);
    return (
      <Box>
        {resolvedGlyphs.length > 0 && (
          <Text fontSize={"large"} textAlign={"center"}>
            Prime
          </Text>
        )}
        {renderGlyphItems(primeGlyphs)}
        {majorGlyphs.length > 0 && (
          <Text fontSize={"large"} textAlign={"center"}>
            Major
          </Text>
        )}
        {renderGlyphItems(majorGlyphs)}
        {minorGlyphs.length > 0 && (
          <Text fontSize={"large"} textAlign={"center"}>
            Minor
          </Text>
        )}
        {renderGlyphItems(minorGlyphs)}
      </Box>
    );
  };

  return (
    <>
      <Box>{renderTalents()}</Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {renderGlyphs()}
      </Box>
    </>
  );
};

function renderGlyphItems(
  glyphs: {
    name: string;
    icon: string;
    id: string;
  }[]
) {
  return (
    <Box my={2} display={"flex"} justifyContent={"space-between"} gap={3}>
      {glyphs.map((g) => {
        return (
          <a key={g.id} href={`https://cata.wowhead.com/item=${g.id}`} target="_blank">
            <Box width={[100, 100, 165]} display={"flex"} key={g.id}>
              <Box
                flexShrink={0}
                flexGrow={0}
                flexBasis={"auto"}
                width={"40px"}
                height={"40px"}
                mr={1}
              >
                <Image
                  unoptimized={true}
                  width={40}
                  height={40}
                  alt={g.name}
                  src={`https://wow.zamimg.com/images/wow/icons/medium/${g.icon}.jpg`}
                />
              </Box>
              <Text fontSize={"small"}>{g.name}</Text>
            </Box>
          </a>
        );
      })}
    </Box>
  );
}

export const CLASS_TO_TREE_IMAGE: Record<number, Record<string, { icon: string; bg: string }>> = {
  6: {
    Blood: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_bloodpresence.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/398.jpg",
    },
    Frost: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_frostpresence.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/399.jpg",
    },
    Unholy: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_deathknight_unholypresence.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/400.jpg",
    },
  },
  11: {
    Balance: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_starfall.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/752.jpg",
    },
    "Feral Combat": {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_druid_catform.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/750.jpg",
    },
    Restoration: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_healingtouch.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/748.jpg",
    },
  },

  3: {
    "Beast Mastery": {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_bestialdiscipline.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/811.jpg",
    },
    Marksmanship: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_focusedaim.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/807.jpg",
    },
    Survival: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_hunter_camouflage.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/809.jpg",
    },
  },
  8: {
    Arcane: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_magicalsentry.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/799.jpg",
    },
    Fire: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_fire_firebolt02.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/851.jpg",
    },
    Frost: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_frost_frostbolt02.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/823.jpg",
    },
  },

  2: {
    Holy: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_holybolt.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/831.jpg",
    },
    Protection: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_paladin_shieldofthetemplar.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/839.jpg",
    },
    Retribution: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_auraoflight.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/855.jpg",
    },
  },

  5: {
    Discipline: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_powerwordshield.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/760.jpg",
    },
    Holy: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_holy_guardianspirit.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/813.jpg",
    },
    Shadow: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_shadowwordpain.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/795.jpg",
    },
  },

  4: {
    Assassination: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_rogue_eviscerate.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/182.jpg",
    },
    Combat: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_backstab.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/181.jpg",
    },
    Subtlety: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_stealth.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/183.jpg",
    },
  },

  7: {
    Elemental: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_lightning.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/261.jpg",
    },
    Enhancement: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_shaman_improvedstormstrike.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/263.jpg",
    },
    Restoration: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_nature_magicimmunity.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/262.jpg",
    },
  },

  9: {
    Affliction: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_deathcoil.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/871.jpg",
    },
    Demonology: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_metamorphosis.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/867.jpg",
    },
    Destruction: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/spell_shadow_rainoffire.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/865.jpg",
    },
  },

  1: {
    Arms: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_savageblow.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/746.jpg",
    },
    Fury: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_innerrage.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/815.jpg",
    },
    Protection: {
      icon: "https://wow.zamimg.com/images/wow/icons/medium/ability_warrior_defensivestance.jpg",
      bg: "https://wow.zamimg.com/images/wow/talents/backgrounds/cata/845.jpg",
    },
  },
};

interface LoadedTalentsJson {
  talents: LoadedTalents;
  default: any;
}

async function loadTalentsFromJson(classType: number): Promise<LoadedTalentsJson> {
  switch (classType) {
    case 1:
      return import("../../../json/cata/warriorTalents.json");
    case 2:
      return import("../../../json/cata/paladinTalents.json");
    case 3:
      return import("../../../json/cata/hunterTalents.json");
    case 4:
      return import("../../../json/cata/rogueTalents.json");
    case 5:
      return import("../../../json/cata/preistTalents.json");
    case 6:
      return import("../../../json/cata/dkTalents.json");
    case 7:
      return import("../../../json/cata/shamanTalents.json");
    case 8:
      return import("../../../json/cata/mageTalents.json");
    case 9:
      return import("../../../json/cata/warlockTalents.json");
    case 11:
      return import("../../../json/cata/druidTalents.json");
    default:
      return import("../../../json/cata/warriorTalents.json");
  }
}
