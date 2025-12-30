"use client";
import { Spec } from "../../_types/types";
import { Box, Button, ButtonGroup, Tag, Text } from "@chakra-ui/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CLASS_TO_TREE_IMAGE } from "./CataTalents";

interface TalentProps {
  class: number;
  talents: Spec[];
}

type LoadedTalents = { n: string; t: TalentInfo[] }[];

interface TalentInfo {
  y: number;
  x: number;
  i: number; // id
  iconname: string;
  s: number[]; // spellId
  m: number; // max rank
}

export const Talents: React.FC<TalentProps> = (props) => {
  const { class: classType, talents } = props;

  const [loadedTalents, setLoadedTalents] = useState<LoadedTalents>([]);

  const activeIdx = talents.findIndex((t) => t.isActive);
  const [selectedSpec, setSelectedSpec] = useState<number>(0);

  const numRows = 7;
  const maxTalents = 51;
  useEffect(() => {
    const loadTalents = async () => {
      const response = await loadTalentsFromJson(classType);

      setLoadedTalents(response.talents);
    };

    loadTalents();
  }, []);

  const talentNames = loadedTalents.map((t) => t.n);
  useEffect(() => {
    const newActiveIdx = talents.findIndex((t) => t.isActive);
    setSelectedSpec(newActiveIdx);
  }, [talents]);

  const renderTalents = (): JSX.Element => {
    const specSection: JSX.Element[][][] = [];
    loadedTalents.forEach(({ t, n }) => {
      const rows: JSX.Element[][] = [];
      for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < 4; j++) {
          const talent = t.find((t) => t.y === i && t.x === j);
          if (talent) {
            const isSelected = talents[selectedSpec]?.talentTree
              ?.find((t) => t.name === n)
              ?.talents?.find((t) => t.id === talent.i);
            row.push(
              <Box
                border={
                  isSelected
                    ? isSelected.rank === talent.m
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
                  href={`https://classic.wowhead.com/spell=${
                    isSelected ? isSelected.spellId : talent.s[0]
                  }`}
                  target="_blank"
                >
                  <Image
                    unoptimized={true}
                    style={isSelected != null ? {} : { filter: "grayscale(150%)" }}
                    width={40}
                    height={40}
                    src={`https://wow.zamimg.com/images/wow/icons/medium/${talent.iconname.toLowerCase()}.jpg`}
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
                    <Text fontSize={"small"}>{`${isSelected.rank}/${talent.m}`}</Text>
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
                    src={CLASS_TO_TREE_IMAGE[classType][loadedTalents[idx]?.n]?.icon}
                  />
                  <Text fontSize={"large"}>{loadedTalents[idx].n}</Text>
                  <Text fontSize={"large"}>
                    {talents[selectedSpec]?.talentTree?.find(
                      (f) => f.name === loadedTalents[idx]?.n
                    )?.pointsSpent ?? 0}{" "}
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

  return (
    <>
      <Box>{renderTalents()}</Box>
    </>
  );
};

async function loadTalentsFromJson(classType: number, isEra: boolean = false) {
  switch (classType) {
    case 1:
      return import("../../../json/classic/ClassicWarriorTalents.json");
    case 2:
      return import("../../../json/classic/ClassicPaladinTalents.json");
    case 3:
      return import("../../../json/classic/ClassicHunterTalents.json");
    case 4:
      return import("../../../json/classic/ClassicRogueTalents.json");
    case 5:
      return import("../../../json/classic/ClassicPreistTalents.json");
    case 7:
      return import("../../../json/classic/ClassicShamanTalents.json");
    case 8:
      return import("../../../json/classic/ClassicMageTalents.json");
    case 9:
      return import("../../../json/classic/ClassicWarlockTalents.json");
    case 11:
      return import("../../../json/classic/ClassicDruidTalents.json");
    default:
      return import("../../../json/classic/ClassicWarriorTalents.json");
  }
}
