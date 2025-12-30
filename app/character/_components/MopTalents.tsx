"use client";
import { MopSpec } from "../../_types/types";
import { Box, Button, ButtonGroup, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface TalentProps {
  class: number;
  talents: MopSpec[];
}

interface MopTalentInfo {
  id: number;
  icon: string;
  name: string;
}

type LoadedTalents = {
  talents: MopTalentInfo[];
  glyphs: { [key: string]: { id: number; icon: string; type: number } };
  default: any;
};

// Get spec name based on class and spec index
const getSpecName = (classType: number, specIndex: number): string => {
  const specNames: { [key: number]: string[] } = {
    1: ["Arms", "Fury", "Protection"], // Warrior
    2: ["Holy", "Protection", "Retribution"], // Paladin
    3: ["Beast Mastery", "Marksmanship", "Survival"], // Hunter
    4: ["Assassination", "Combat", "Subtlety"], // Rogue
    5: ["Discipline", "Holy", "Shadow"], // Priest
    6: ["Blood", "Frost", "Unholy"], // Death Knight
    7: ["Elemental", "Enhancement", "Restoration"], // Shaman
    8: ["Arcane", "Fire", "Frost"], // Mage
    9: ["Affliction", "Demonology", "Destruction"], // Warlock
    10: ["Brewmaster", "Mistweaver", "Windwalker"], // Monk
    11: ["Balance", "Feral Combat", "Guardian", "Restoration"], // Druid
  };

  return specNames[classType]?.[specIndex] || `Spec ${specIndex + 1}`;
};

export const TalentsMOP: React.FC<TalentProps> = (props) => {
  const { class: classType, talents } = props;
  const [loadedTalents, setLoadedTalents] = useState<LoadedTalents | undefined>();
  const [selectedSpec, setSelectedSpec] = useState<number>(0);
  const activeIdx = React.useMemo(() => talents.findIndex((t) => t.isActive), [talents]);

  // MOP has 6 rows with 3 talent choices each
  const numRows = 6;
  const talentsPerRow = 3;

  useEffect(() => {
    const loadTalents = async () => {
      const response = await loadTalentsFromJson(classType);
      setLoadedTalents(response);
    };

    loadTalents();
  }, [classType]);

  useEffect(() => {
    setSelectedSpec(activeIdx);
  }, [activeIdx]);

  const renderTalents = (): JSX.Element => {
    if (!loadedTalents) return <></>;

    const talentList = loadedTalents.talents;
    const rows: JSX.Element[] = [];
    const levels = [15, 30, 45, 60, 75, 90];

    for (let row = 0; row < numRows; row++) {
      const rowTalents: JSX.Element[] = [];

      for (let col = 0; col < talentsPerRow; col++) {
        const talentIndex = row * talentsPerRow + col;
        const talent = talentList[talentIndex];

        if (talent) {
          // Check if this talent is selected by the player
          const isSelected = talents[selectedSpec]?.talents?.some((t) => t.spellId === talent.id);

          rowTalents.push(
            <Box key={`row-${row}-col-${col}`} display="flex" alignItems="center" gap={2} flex="1">
              <a
                href={`https://www.wowhead.com/mop-classic/spell=${talent.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  border: isSelected
                    ? "2px solid rgba(0,255,0,0.8)"
                    : "2px solid rgba(60,60,60,0.8)",
                  borderRadius: "6px",
                  width: "56px",
                  height: "56px",
                  backgroundColor: isSelected ? "rgba(0,255,0,0.15)" : "rgba(15,15,15,0.8)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Image
                  unoptimized={true}
                  style={isSelected ? {} : { filter: "grayscale(100%)", opacity: 0.4 }}
                  width={52}
                  height={52}
                  src={`https://wow.zamimg.com/images/wow/icons/medium/${talent.icon.toLowerCase()}.jpg`}
                  alt={talent.name}
                />
              </a>
              <Text
                fontSize="12px"
                maxW="150px"
                color={isSelected ? "rgba(255,255,255,1)" : "rgba(200,200,200,0.6)"}
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {talent.name}
              </Text>
            </Box>
          );
        }
      }

      rows.push(
        <Box key={`row-${row}`} display="flex" gap={4} alignItems="flex-start" mb={3}>
          {/* Level indicator */}
          <Box display="flex" alignItems="center" justifyContent="center" minW="50px" minH="56px">
            <Text fontSize="24px" fontWeight="bold" color="rgba(150,150,150,0.7)">
              {levels[row]}
            </Text>
          </Box>

          {/* Talents */}
          <Box display="flex" gap={3} flex="1">
            {rowTalents}
          </Box>
        </Box>
      );
    }

    return (
      <Box display="flex" flexDir="column" alignItems="center" justifyContent="center">
        {talents.length > 1 && (
          <ButtonGroup mb={4}>
            {talents.map((spec, idx) => (
              <Button
                key={idx}
                onClick={() => setSelectedSpec(idx)}
                isActive={selectedSpec === idx}
              >
                {spec.name ?? `Spec ${idx + 1}`}
                {spec.isActive ? " (active)" : ""}
              </Button>
            ))}
          </ButtonGroup>
        )}

        <Box padding={6} backgroundColor="rgba(20,20,20,0.95)" borderRadius="md" minW="300px">
          {rows}
          {renderGlyphs()}
        </Box>
      </Box>
    );
  };

  const renderGlyphs = () => {
    const glyphs = talents[selectedSpec]?.glyphs;
    if (!glyphs || glyphs.length === 0) {
      return <></>;
    }

    if (!loadedTalents) return <></>;

    const resolvedGlyphs = glyphs.map((glyphName) => {
      const glyphData = loadedTalents.glyphs[glyphName];
      if (!glyphData) {
        return { name: glyphName, icon: "inv_misc_questionmark", id: null, type: 1 };
      }
      return {
        name: glyphName,
        icon: glyphData.icon,
        id: glyphData.id,
        type: glyphData.type,
      };
    });

    const majorGlyphs = resolvedGlyphs.filter((g) => g.type === 1);
    const minorGlyphs = resolvedGlyphs.filter((g) => g.type === 2);

    // Create 3 slots for major and minor glyphs
    const renderGlyphSlots = (glyphList: any[], type: "major" | "minor") => {
      const slots = [];
      for (let i = 0; i < 3; i++) {
        const glyph = glyphList[i];
        slots.push(
          <Box key={`${type}-${i}`} display="flex" alignItems="center" gap={2} flex="1">
            {glyph ? (
              <a
                href={`https://www.wowhead.com/mop-classic/item=${glyph.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid rgba(60,60,60,0.8)",
                  borderRadius: "6px",
                  width: "56px",
                  height: "56px",
                  backgroundColor: "rgba(15,15,15,0.8)",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
              >
                <Image
                  unoptimized={true}
                  width={52}
                  height={52}
                  src={`https://wow.zamimg.com/images/wow/icons/medium/${glyph.icon}.jpg`}
                  alt={glyph.name}
                />
              </a>
            ) : (
              <Box
                border="2px solid rgba(60,60,60,0.5)"
                borderRadius="6px"
                width="56px"
                height="56px"
                backgroundColor="rgba(10,10,10,0.8)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{ flexShrink: 0 }}
              >
                <Text color="rgba(100,100,100,0.3)" fontSize="20px">
                  +
                </Text>
              </Box>
            )}
            {glyph && (
              <Text
                fontSize="10px"
                maxW="120px"
                color="rgba(255,255,255,1)"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                }}
              >
                {glyph.name.replace("Glyph of ", "")}
              </Text>
            )}
          </Box>
        );
      }
      return slots;
    };

    return (
      <Box mt={6}>
        <Box mb={4}>
          <Text
            fontSize="sm"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            color="rgba(255,255,255,0.8)"
          >
            Major glyphs
          </Text>
          <Box display="flex" gap={4} alignItems="flex-start">
            <Box minW="50px" />
            <Box display="flex" gap={3} flex="1">
              {renderGlyphSlots(majorGlyphs, "major")}
            </Box>
          </Box>
        </Box>

        <Box>
          <Text
            fontSize="sm"
            fontWeight="bold"
            mb={2}
            textAlign="center"
            color="rgba(255,255,255,0.8)"
          >
            Minor glyphs
          </Text>
          <Box display="flex" gap={4} alignItems="flex-start">
            <Box minW="50px" />
            <Box display="flex" gap={3} flex="1">
              {renderGlyphSlots(minorGlyphs, "minor")}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  if (!loadedTalents) {
    return <Box>Loading talents...</Box>;
  }

  return <>{renderTalents()}</>;
};

async function loadTalentsFromJson(classType: number): Promise<LoadedTalents> {
  switch (classType) {
    case 1:
      return import("../../../json/mop/class_1.json");
    case 2:
      return import("../../../json/mop/class_2.json");
    case 3:
      return import("../../../json/mop/class_3.json");
    case 4:
      return import("../../../json/mop/class_4.json");
    case 5:
      return import("../../../json/mop/class_5.json");
    case 6:
      return import("../../../json/mop/class_6.json");
    case 7:
      return import("../../../json/mop/class_7.json");
    case 8:
      return import("../../../json/mop/class_8.json");
    case 9:
      return import("../../../json/mop/class_9.json");
    case 10:
      return import("../../../json/mop/class_10.json");
    case 11:
      return import("../../../json/mop/class_11.json");
    default:
      return import("../../../json/mop/class_1.json");
  }
}
