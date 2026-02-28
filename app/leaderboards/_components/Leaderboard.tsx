"use client";

import { Box, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import { isNumber } from "lodash";
import { GameType } from "@prisma/client";
import { LeaderboardFilters } from "./LeaderboardFilters";
import { LeaderboardCharacters, LeaderboardCharacter } from "./LeaderboardCharacters";
import { useQuery } from "@tanstack/react-query";

interface LeaderboardProps {
  wowClass?: string;
  gameTypeQp?: string;
}
const gameTypes: string[] = [
  GameType.NORMAL,
  GameType.SEASONAL,
  GameType.ERA,
  GameType.HARDCORE,
  GameType.TBC,
];

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameTypeQp, wowClass }) => {
  const gameType: GameType =
    gameTypeQp != null && gameTypes.includes(gameTypeQp)
      ? (gameTypeQp as GameType)
      : GameType.NORMAL;

  const queries: {
    title: string;
    statToShow: "itemLevel" | "gearscore" | "achievementPoints" | "honorableKills";
  }[] =
    gameType === GameType.NORMAL
      ? [
          {
            title: "Gearscore",
            statToShow: "gearscore",
          },
          {
            title: "Achievement points",
            statToShow: "achievementPoints",
          },
          {
            title: "Honorable kills",
            statToShow: "honorableKills",
          },
        ]
      : [
          {
            title: "Item level",
            statToShow: "itemLevel",
          },
          {
            title: "Honorable kills",
            statToShow: "honorableKills",
          },
        ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={4}
      p={4}
      marginRight={"auto"}
      marginLeft="auto"
      maxW={"1300px"}
    >
      <Text textAlign={"center"} fontSize={"xx-large"}>
        Leaderboards
      </Text>
      <LeaderboardFilters gameType={gameType} />
      <Box display={"flex"} gap={3} justifyContent={"space-around"} flexWrap={"wrap"}>
        {queries.map((query) => (
          <LeaderboardCard
            key={query.title}
            title={query.title}
            statToShow={query.statToShow}
            gameType={gameType}
            wowClass={wowClass}
          />
        ))}
      </Box>
    </Box>
  );
};

interface LeaderboardCardProps {
  title: string;
  statToShow: "itemLevel" | "gearscore" | "achievementPoints" | "honorableKills";
  gameType: GameType;
  wowClass?: string;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({
  title,
  statToShow,
  gameType,
  wowClass,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["leaderboards", gameType, wowClass, statToShow],
    queryFn: async () => {
      const params = new URLSearchParams({
        gameType,
        stat: statToShow,
      });
      if (wowClass && isNumber(Number(wowClass))) {
        params.set("wowClass", wowClass);
      }
      const res = await fetch(`/api/leaderboards?${params.toString()}`, {
        cache: "no-store",
      });
      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        throw new Error(payload?.error || "Failed to load leaderboard");
      }
      const payload = (await res.json()) as { characters: LeaderboardCharacter[] };
      return payload.characters;
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Box w={350}>
      <Text textAlign={"center"} mb={2} fontSize={"x-large"}>
        {title}
      </Text>
      {isLoading && (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
          <Spinner size={"xl"} />
        </Box>
      )}
      {!isLoading && error && (
        <Text textAlign={"center"} color="red.300">
          Failed to load characters
        </Text>
      )}
      {!isLoading && !error && data && (
        <LeaderboardCharacters characters={data} statToShow={statToShow} />
      )}
    </Box>
  );
};
