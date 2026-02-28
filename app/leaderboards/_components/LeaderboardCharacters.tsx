"use client";

import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Character } from "@prisma/client";
import { classToColor } from "@/app/_utils/colors";
import { GiAlliedStar } from "react-icons/gi";
import Image from "next/image";
import { getCssGearScoreColor } from "@/app/_utils/gearscore";
import Link from "next/link";
import { isEmpty } from "lodash";
import { buildCharacterPath } from "@/app/_utils/gameType";

export type LeaderboardCharacter = Pick<
  Character,
  | "id"
  | "name"
  | "realm"
  | "guild"
  | "profileImageUrl"
  | "class"
  | "region"
  | "gearscore"
  | "itemLevel"
  | "achievementPoints"
  | "honorableKills"
  | "level"
  | "gameType"
  | "race"
  | "gender"
>;

interface Props {
  characters: LeaderboardCharacter[];
  statToShow?: "itemLevel" | "gearscore" | "achievementPoints" | "honorableKills";
}

export const LeaderboardCharacters: React.FC<Props> = ({ characters, statToShow }) => {
  if (characters.length === 0) {
    return <Text textAlign={"center"}>No characters found</Text>;
  }

  return (
    <Box display={"flex"} flexDir={"column"} gap={5}>
      {characters.map((character) => (
        <CharacterInfo statToShow={statToShow} key={character.id} character={character} />
      ))}
    </Box>
  );
};

interface CharacterInfoProps {
  character: LeaderboardCharacter;
  statToShow?: "itemLevel" | "gearscore" | "achievementPoints" | "honorableKills";
}

const CharacterInfo = React.memo(function CharacterInfo({
  character,
  statToShow,
}: CharacterInfoProps) {
  const { name, realm, guild, profileImageUrl, class: classId, region } = character;

  return (
    <Link href={buildCharacterPath(character.gameType, region, realm, name.toLowerCase())}>
      <Box
        display={"flex"}
        _hover={{
          cursor: "pointer",
          backgroundColor: "rgb(33, 41, 57)",
        }}
        gap={2}
      >
        <Box flexShrink={0}>
          <Image
            alt="character"
            width={45}
            height={45}
            src={
              isEmpty(profileImageUrl)
                ? `https://render.worldofwarcraft.com/shadow/avatar/${character.race}-${character.gender}.jpg`
                : profileImageUrl
            }
            unoptimized={true}
          />
        </Box>
        <Box
          justifyContent={"space-between"}
          display={"flex"}
          gap={2}
          alignContent={"space-between"}
          flex={1}
        >
          <Box overflow={"hidden"}>
            <Text
              maxW={"155px"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              color={classToColor(classId)}
            >
              {name}
            </Text>
            {statToShow === "gearscore" && character.gearscore && (
              <Text color={getCssGearScoreColor(character.gearscore)} fontSize={"small"}>
                {character.gearscore}
              </Text>
            )}
            {statToShow === "itemLevel" && (
              <Text fontSize={"small"}>{character.itemLevel}</Text>
            )}
            {statToShow === "honorableKills" && (
              <Text fontSize={"small"}>{character.honorableKills}</Text>
            )}
            {statToShow === "achievementPoints" && (
              <Box display={"flex"} gap={1}>
                <GiAlliedStar style={{ alignSelf: "center" }} color="yellow.400" />
                <Text fontSize={"small"}>{character.achievementPoints}</Text>{" "}
              </Box>
            )}
            {statToShow == null && (
              <Box display={"flex"} gap={1}>
                <Text color={"lightgray"} fontSize={"small"}>
                  lvl {character.level}
                </Text>
              </Box>
            )}
          </Box>
          <Box textAlign={"end"} whiteSpace="nowrap">
            <Text color="#fff9" fontSize={"small"}>
              {realm}
            </Text>
            {guild && <Text color="#fff9" fontSize={"small"}>{`<${guild}>`}</Text>}
          </Box>
        </Box>
      </Box>
    </Link>
  );
});
