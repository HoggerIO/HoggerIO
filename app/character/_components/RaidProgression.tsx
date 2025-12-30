"use client";

import { Box, List, ListItem, Progress, Text, Tooltip } from "@chakra-ui/react";
import { Achievement } from "../../_types/achievements";
import Image from "next/image";
import React from "react";
import bwd from "../../../public/BWD.png";
import bot from "../../../public/BOT.png";
import TOF from "../../../public/TOF.png";
import { StaticImageData } from "next/image";

export const RaidProgression = ({ achievements }: { achievements: Achievement[] }) => {
  const raidInfo = getRaidInfo(achievements);

  return (
    <Box display={"flex"} justifyContent={"space-around"} flexWrap={"wrap"}>
      {raidInfo.map((raid) => (
        <Box key={raid.name} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" p={3}>
          <Text fontSize="xl" fontWeight="bold">
            {raid.name}
          </Text>
          <Image unoptimized={true} width={300} height={150} src={raid.imageUrl} alt={raid.name} />

          {["Normal", "Heroic"].map((difficulty, idx) => (
            <React.Fragment key={difficulty}>
              {raid.bossToNumberOfTimesKilled[idx] != null && (
                <Tooltip
                  key={difficulty}
                  label={
                    <Box p={3}>
                      <Text mb={1} fontSize="xl" fontWeight="semibold">
                        {raid.name}
                      </Text>
                      <Text mb={3} fontSize="md">
                        {difficulty}
                      </Text>
                      <List>
                        {Object.entries(raid.bossToNumberOfTimesKilled[idx])
                          .map(([boss, quantity]) => (
                            <ListItem key={boss} color={quantity > 0 ? "green.500" : "gray.600"}>
                              {quantity} X {boss}
                            </ListItem>
                          ))
                          .slice(
                            0,
                            difficulty === "Normal"
                              ? raid.numOfNormalBosses ?? raid.numBosses
                              : raid.numBosses
                          )}
                      </List>
                    </Box>
                  }
                  placement="top"
                  hasArrow
                >
                  <Box
                    key={difficulty}
                    display={"flex"}
                    my={2}
                    position={"relative"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Text fontSize="md" fontWeight="semibold">
                      {difficulty.toUpperCase()}
                    </Text>
                    <Progress
                      border="1px solid"
                      borderColor={"gray.300"}
                      backgroundColor="gray.800"
                      height={"31px"}
                      width={200}
                      value={
                        Object.values(raid.bossToNumberOfTimesKilled[idx]).filter((f) => f > 0)
                          .length
                      }
                      max={
                        difficulty === "Normal"
                          ? raid.numOfNormalBosses ?? raid.numBosses
                          : raid.numBosses
                      }
                      variant={"full"}
                    />
                    <Text position={"absolute"} left={"160px"} color={"white"}>{`${
                      Object.values(raid.bossToNumberOfTimesKilled[idx]).filter((f) => f > 0).length
                    }/${
                      difficulty === "Normal"
                        ? raid.numOfNormalBosses ?? raid.numBosses
                        : raid.numBosses
                    }`}</Text>
                  </Box>
                </Tooltip>
              )}
            </React.Fragment>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const BWD_BOSSES = [
  { name: "Magmaw" },
  { name: "Omnotron" },
  { name: "Maloriak" },
  { name: "Atramedes" },
  { name: "Chimaeron" },
  { name: "Nefarian" },
];

const BOT_BOSSES = [
  { name: "Halfus Wyrmbreaker" },
  { name: "Valiona and Theralion" },
  { name: "Ascendant Council" },
  { name: "Cho'gall" },
  { name: "Sinestra", heroicOnly: true },
];

const THRONE_BOSSES = [{ name: "Conclave of Wind" }, { name: "Al'Akir" }];
const HEROIC = "Heroic";
const IS_HEROIC = [false, true];
interface RaidInfo {
  name: string;
  imageUrl: StaticImageData;
  bossToNumberOfTimesKilled: Array<Record<string, number>>;
  numBosses: number;
  numOfNormalBosses?: number;
}

function getRaidInfo(achievements: Achievement[]): RaidInfo[] {
  const bwdInfo: RaidInfo = {
    name: "Blackwing Descent",
    bossToNumberOfTimesKilled: [],
    imageUrl: bwd,
    numBosses: 6,
  };

  IS_HEROIC.forEach((isHeroic) => {
    const bossKils: Record<string, number> = {};
    BWD_BOSSES.forEach((boss) => {
      const foundStatistic = achievements.find(
        (s) =>
          s.name.indexOf(boss.name) !== -1 &&
          (isHeroic ? s.name.indexOf("Heroic") !== -1 : s.name.indexOf(HEROIC) === -1)
      );
      if (foundStatistic) {
        bossKils[boss.name] = foundStatistic.quantity;
      } else {
        bossKils[boss.name] = 0;
      }
    });
    bwdInfo.bossToNumberOfTimesKilled.push(bossKils);
  });

  // BOT

  const botInfo: RaidInfo = {
    name: "Bastion of Twilight",
    bossToNumberOfTimesKilled: [],
    imageUrl: bot,
    numBosses: 5,
    numOfNormalBosses: 4,
  };

  IS_HEROIC.forEach((isHeroic) => {
    const bossKils: Record<string, number> = {};
    BOT_BOSSES.forEach((boss) => {
      const foundStatistic = achievements.find(
        (s) =>
          s.name.indexOf(boss.name) !== -1 &&
          (isHeroic ? s.name.indexOf("Heroic") !== -1 : s.name.indexOf(HEROIC) === -1)
      );
      if (foundStatistic) {
        bossKils[boss.name] = foundStatistic.quantity;
      } else {
        bossKils[boss.name] = 0;
      }
    });
    botInfo.bossToNumberOfTimesKilled.push(bossKils);
  });

  const throneInfo: RaidInfo = {
    name: "Throne of the Four Winds",
    bossToNumberOfTimesKilled: [],
    imageUrl: TOF,
    numBosses: 2,
  };

  IS_HEROIC.forEach((isHeroic) => {
    const bossKils: Record<string, number> = {};
    THRONE_BOSSES.forEach((boss) => {
      const foundStatistic = achievements.find(
        (s) =>
          s.name.indexOf(boss.name) !== -1 &&
          (isHeroic ? s.name.indexOf("Heroic") !== -1 : s.name.indexOf(HEROIC) === -1)
      );
      if (foundStatistic) {
        bossKils[boss.name] = foundStatistic.quantity;
      } else {
        bossKils[boss.name] = 0;
      }
    });
    throneInfo.bossToNumberOfTimesKilled.push(bossKils);
  });

  return [bwdInfo, botInfo, throneInfo];
}
