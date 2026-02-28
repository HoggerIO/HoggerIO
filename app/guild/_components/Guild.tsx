"use client";

import { Box, Spinner, Text } from "@chakra-ui/react";
import { GuildTable } from "./GuildTable";
import { GameType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Guild as GuildType } from "../../_types/types";

interface GuildProps {
  realm: string;
  guildName: string;
  gameType: GameType;
  region: string;
}

export const Guild = (props: GuildProps) => {
  const { realm, guildName: unCleanGuildName, gameType, region } = props;
  const guildName = decodeURIComponent(unCleanGuildName.toLowerCase().replaceAll("%20", "-"));

  const { data, error, isLoading } = useQuery({
    queryKey: ["guild", realm, guildName, region, gameType],
    queryFn: async (): Promise<GuildType> => {
      const response = await fetch(
        `/api/guild?guildName=${encodeURIComponent(guildName)}&realm=${encodeURIComponent(
          realm,
        )}&region=${encodeURIComponent(region)}&gameType=${encodeURIComponent(gameType)}`,
      );
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to load guild");
      }
      const json = (await response.json()) as { guild: GuildType };
      return json.guild;
    },
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading) {
    return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text mb={6}>Loading Guild data...</Text>
          <Spinner size="xl" />
        </Box>
      </Box>
    );
  }

  if (error != null) {
    return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text mb={6}>Error loading Guild data</Text>
          <Text mb={6}>{error.toString()}</Text>
        </Box>
      </Box>
    );
  }

  if (data == null) {
    return (
      <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text mb={6}>No guild data found</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={5} maxWidth={"1000px"} mx={"auto"}>
      <GuildTable
        region={region}
        data={data.members}
        realmName={realm}
        guildName={data.displayName}
        gameType={gameType}
      />
    </Box>
  );
};
