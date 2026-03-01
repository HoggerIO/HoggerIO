"use client";

import {
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  ListItem,
  Spinner,
  Text,
  Tooltip,
  UnorderedList,
} from "@chakra-ui/react";
import { CharacterModel } from "./CharacterModel";
import { EquippedItem, MopSpec, ProfileMetadata } from "../../_types/types";
import { Item } from "./Item";
import { Stats } from "./Stats";
import { classToColor } from "../../_utils/colors";
import { getGearscoreColor } from "../../_utils/gearscore";
import Link from "next/link";
import { RACES_TO_NAME, RACE_TO_FACTION, CLASS_TO_NAME } from "../../_utils/mappings";
import { timeAgo } from "../../_utils/time";
import { Talents } from "./ClassicTalents";
import Image from "next/image";
import runes from "../[region]/[realm]/[character]/runes.json";
import { TalentsCata } from "./CataTalents";
import { TalentsMOP } from "./MopTalents";
import { Parses } from "./Parses";
import { RefreshParseButton } from "./RefreshParseButton";
import { GameType } from "@prisma/client";
import {
  buildGuildPath,
  getMaxLevel,
  getModelType,
  getWarcraftLogsSubdomain,
  supportsRunes,
} from "@/app/_utils/gameType";
import { TbcTalents } from "./TbcTalents";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaChartBar } from "react-icons/fa";
import refreshProfileData from "../../_serverFunctions/refreshProfileData";
import { useToast } from "@chakra-ui/react";

interface ProfileProps {
  realm: string;
  character: string;
  region: string;
  gameType: GameType;
}

export const Profile = (props: ProfileProps) => {
  const { realm, character: unCleanCharacter, region, gameType } = props;
  const character = decodeURIComponent(unCleanCharacter);
  const [breakCacheNonce, setBreakCacheNonce] = React.useState(0);
  const toast = useToast();

  const refreshProfileMutation = useMutation({
    mutationFn: async () => refreshProfileData(character, realm, region, gameType),
    onSuccess: () => {
      setBreakCacheNonce((current) => current + 1);
    },
    onError: (e) => {
      const message = e instanceof Error ? e.message : "Unknown error";
      toast({
        title: "Error",
        description: `Failed to refresh data for ${character}: ${message}`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.error(e);
    },
  });

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile", gameType, region, realm, character, breakCacheNonce],
    queryFn: async () => {
      const params = new URLSearchParams({
        character,
        realm,
        region,
        gameType: gameType.toString(),
        breakCache: breakCacheNonce > 0 ? "1" : "0",
      });
      const res = await fetch(`/api/profile?${params.toString()}`, { cache: "no-store" });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to load profile");
      }
      const payload = (await res.json()) as { profile: ProfileMetadata };
      return payload.profile;
    },
    // 1 hour
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <Box mt={10} display={"flex"} flexDir={"column"} alignItems={"center"}>
        <Spinner size={"xl"} />
      </Box>
    );
  }

  if (error || profile == null) {
    const message = error instanceof Error ? error.message : "Failed to load profile";
    console.error("Error fetching character info", message);
    return (
      <Card p={10} gap={3} alignItems="center" my={3} mx={"auto"} width={"450px"}>
        <Text>Error loading character info</Text>
        <Text fontSize={"small"}>{message}</Text>
        <Text>Potential reasons:</Text>
        <UnorderedList fontSize={"small"}>
          <ListItem>There is a bug 🐛</ListItem>
          <ListItem>The character does not exist in the selected realm/region</ListItem>
          <ListItem>The character is lower than level 10</ListItem>
          <ListItem>The character was created less than 24 hours ago</ListItem>
          <ListItem>
            The battle.net account has <i>Share Game Data</i> turned off
          </ListItem>
        </UnorderedList>

        <Link href={"/"}>
          <Button>Go back</Button>
        </Link>
      </Card>
    );
  }
  const runes = supportsRunes(gameType) ? getRunes(profile.class, profile.items) : [];
  const items = profile.items;
  return (
    <Box width={"100%"} display={"flex"} alignContent={"center"} justifyContent={"center"} mt={3}>
      <Box flex={1} width={"100%"} display={"flex"} flexDir={"column"} gap={5}>
        <Box
          width={"100%"}
          display={"flex"}
          gap={"10px 10%"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Box display={"flex"} flexDir={"column"} gap={5}>
            <TopBar
              profile={profile}
              character={character}
              realm={realm}
              gameType={gameType}
              region={region}
              onRefresh={refreshProfileMutation.mutate}
              isRefreshing={refreshProfileMutation.isPending}
            />
            <Box
              gap={"5px"}
              display={"flex"}
              justifyContent={"space-between"}
              flexDir={{ base: "column", sm: "row" }}
              alignItems={{ base: "center", sm: "stretch" }}
            >
              <Box
                flexDir={"column"}
                display={"flex"}
                gap={3}
                alignItems={{ base: "center", sm: "flex-start" }}
              >
                {LEFT_ITEMS.map((slotType, idx) => (
                  <Item
                    isFirst={idx === 0}
                    key={slotType}
                    items={items}
                    slotType={slotType}
                    gameType={gameType}
                  />
                ))}
              </Box>
              <Box
                flexDir={"column"}
                display={"flex"}
                gap={3}
                alignItems={{ base: "center", sm: "flex-start" }}
              >
                {RIGHT_ITEMS.map((slotType, idx) => (
                  <Item
                    isFirst={idx === 0}
                    key={slotType}
                    items={items}
                    slotType={slotType}
                    textOnLeft={true}
                    gameType={gameType}
                  />
                ))}
              </Box>
            </Box>
            <Box mt={2} display={"flex"} gap={5} justifyContent={"center"} flexWrap="wrap">
              {WEAPON_ITEMS.map((slotType, idx) => (
                <Item
                  key={slotType}
                  textOnLeft={idx === 0}
                  items={items}
                  slotType={slotType}
                  gameType={gameType}
                />
              ))}
            </Box>
          </Box>
          <Box alignSelf={"center"}>
            <CharacterModel
              items={items}
              race={profile.race}
              gender={profile.gender}
              modelType={getModelType(gameType)}
            />
          </Box>
        </Box>
        {supportsRunes(gameType) && runes.length > 0 && (
          <Box display={"flex"} width={"100%"} flexDir={"column"} alignItems={"center"}>
            <Text fontSize="xl" fontWeight="bold">
              Runes
            </Text>
            <Box display={"flex"} flexWrap="wrap" justifyContent={"space-around"} gap={3} mb={4}>
              {runes.map((rune) => (
                <a
                  key={rune.spellId}
                  href={`https://classic.wowhead.com/spell=${rune.spellId}`}
                  target="_blank"
                >
                  <Box
                    width={"140px"}
                    key={rune.spellId}
                    display="flex"
                    flexDir={"column"}
                    alignItems={"center"}
                  >
                    <Box borderRadius={3}>
                      <Image
                        style={{ borderRadius: "50%" }}
                        alt={rune.name}
                        width={60}
                        height={60}
                        src={`https://wow.zamimg.com/images/wow/icons/medium/${rune.icon.toLowerCase()}.jpg`}
                        unoptimized={true}
                      />
                    </Box>
                    <Text textAlign={"center"}>{rune.name}</Text>
                    <Text fontSize={"small"}>{INVETORY_TYPE_TO_DISPLAY_NAME[rune.slot]}</Text>
                  </Box>
                </a>
              ))}
            </Box>
          </Box>
        )}
        {gameType === GameType.TBC ? (
          <TbcTalents talents={profile?.talents ?? []} class={profile.class} />
        ) : profile?.talents.length > 0 &&
          profile.talents.findIndex != null &&
          (gameType === GameType.ERA ||
            gameType === GameType.SEASONAL ||
            gameType === GameType.HARDCORE) ? (
          <Talents talents={profile?.talents ?? []} class={profile.class} />
        ) : MopSpec.is(profile?.talents) ? (
          <TalentsMOP talents={profile?.talents ?? []} class={profile.class} />
        ) : (
          <TalentsCata talents={profile?.talents ?? []} class={profile.class} />
        )}
        <Divider mt={3} />
        <Stats profile={profile} />
      </Box>
    </Box>
  );
};

const TopBar = ({ profile, character, realm, gameType, region, onRefresh, isRefreshing }) => {
  const [red, green, blue] =
    profile.gearscore != null ? getGearscoreColor(profile.gearscore) : [0, 0, 0];

  // disable the refresh button for 5 minutes to prevent spamming the API
  const disableRefreshProfileButton =
    Date.now() - new Date(profile.updatedAt).getTime() < 1000 * 60 * 5;
  return (
    <Box
      alignSelf={"center"}
      display={"flex"}
      alignItems={"center"}
      textAlign={"center"}
      gap={{ base: 3, md: 5 }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Image
        alt={"character"}
        width={84}
        height={84}
        src={
          profile.profileImageUrl === "" || profile.profileImageUrl == null
            ? `https://render.worldofwarcraft.com/shadow/avatar/${profile.race}-${profile.gender}.jpg`
            : profile.profileImageUrl
        }
        unoptimized={true}
      />
      <Box>
        <Text fontSize="2xl" textColor={classToColor(profile.class ?? -1)}>
          {character.charAt(0).toUpperCase() + character.slice(1)}
        </Text>
        <Text fontSize="m">{realm}</Text>
        {profile.guild && (
          <Link
            href={buildGuildPath(gameType, profile.region, realm, profile.guild)}
            target="_blank"
          >
            <Text
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >{`<${profile.guild}>`}</Text>
          </Link>
        )}
      </Box>
      <Box maxWidth={"200px"}>
        <Text mt={2}>
          Level {profile.level} {RACES_TO_NAME[profile.race]} {CLASS_TO_NAME[profile.class]}
        </Text>
        {profile.gearscore != null && (
          <Text
            fontWeight={"bold"}
            color={`rgb(${Math.round(red * 255)}, ${Math.round(green * 255)}, ${Math.round(
              blue * 255,
            )})`}
          >
            gearscore: {profile.gearscore}
          </Text>
        )}
        {profile.itemLevel != null && <Text>item level: {profile.itemLevel}</Text>}
        {profile.pvp?.rank != null && profile.pvp?.rank > 0 && (
          <Box display={"flex"} alignItems={"center"} gap={2} justifyContent={"center"}>
            <Text>{`Rank ${profile.pvp.rank}`}</Text>
            <Image
              src={`https://wow.zamimg.com/images/wow/icons/large/achievement_pvp_${
                RACE_TO_FACTION[profile.race] === "HORDE" ? "h" : "a"
              }_${profile.pvp.rank < 10 ? `0${profile.pvp.rank}` : profile.pvp.rank}.jpg`}
              alt={`Rank ${profile.pvp.rank}`}
              width={40}
              height={40}
              unoptimized={true}
            />
          </Box>
        )}
      </Box>
      <Box>
        <Button
          isDisabled={disableRefreshProfileButton}
          isLoading={isRefreshing}
          onClick={onRefresh}
        >
          Refresh data
        </Button>
        <Text fontSize="sm" mt={2}>{`Last updated: ${timeAgo(new Date(profile.updatedAt))}`}</Text>
      </Box>
      <Box
        mt={2}
        display="flex"
        gap={2}
        justifyContent={{ base: "center", sm: "flex-end" }}
        alignItems="center"
      >
        {profile.level >= getMaxLevel(gameType) && (
          <Tooltip label="Warcraft Logs" placement="bottom">
            <IconButton
              as="a"
              aria-label="Open Warcraft Logs"
              target="_blank"
              rel="noopener noreferrer"
              href={`https://${getWarcraftLogsSubdomain(
                gameType,
              )}.warcraftlogs.com/character/${region}/${realm}/${character}`}
              icon={<FaChartBar />}
              width="34px"
              height="34px"
              minW="34px"
              variant="outline"
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

function getRunes(
  classId: number,
  items: EquippedItem[],
): {
  icon: string;
  name: string;
  spellId: number;
  slot: string;
}[] {
  const runes: {
    icon: string;
    name: string;
    spellId: number;
    slot: string;
  }[] = [];

  items.forEach((item) => {
    item.enchantments?.forEach((enchant) => {
      if (
        enchant.enchantment_slot.id === 1 &&
        (item.inventory_type === "HAND" ||
          item.inventory_type === "LEGS" ||
          item.inventory_type === "ROBE" ||
          item.inventory_type === "CHEST" ||
          item.inventory_type === "FEET" ||
          item.inventory_type === "WAIST" ||
          item.inventory_type === "WRIST" ||
          item.inventory_type === "HEAD")
      ) {
        const rune = RUNES[classId][enchant.display_string.toLowerCase()];
        if (rune == null) {
          console.error(`Rune not found for ${enchant.display_string.toLowerCase()}`);
          return;
        }
        runes.push({
          name: enchant.display_string,
          slot: item.inventory_type,
          ...rune,
        });
      }
    });
  });
  return runes;
}

const INVETORY_TYPE_TO_DISPLAY_NAME: Record<string, string> = {
  HEAD: "Head",
  NECK: "Neck",
  SHOULDER: "Shoulder",
  BACK: "Back",
  CHEST: "Chest",
  TABARD: "Tabard",
  WRIST: "Wrist",
  RANGED: "Ranged",
  HAND: "Hands",
  WAIST: "Waist",
  LEGS: "Legs",
  FEET: "Feet",
  FINGER_1: "Finger 1",
  FINGER_2: "Finger 2",
  TRINKET_1: "Trinket 1",
  TRINKET_2: "Trinket 2",
  MAIN_HAND: "Main Hand",
  OFF_HAND: "Off Hand",
  ROBE: "Chest",
};

// Note: this is missing a lot of newer runes
const RUNES = runes as Record<string, Record<string, { icon: string; spellId: number }>>;

const LEFT_ITEMS = ["HEAD", "NECK", "SHOULDER", "BACK", "CHEST", "TABARD", "WRIST", "RANGED"];
const RIGHT_ITEMS = [
  "HANDS",
  "WAIST",
  "LEGS",
  "FEET",
  "FINGER_1",
  "FINGER_2",
  "TRINKET_1",
  "TRINKET_2",
];
const WEAPON_ITEMS = ["MAIN_HAND", "OFF_HAND"];
