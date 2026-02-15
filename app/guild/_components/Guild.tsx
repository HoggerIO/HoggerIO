import { fetchGuild } from "../../_serverFunctions/fetchGuild";
import { Box, Spinner, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import { GuildTable } from "./GuildTable";
import { GameType } from "@prisma/client";

interface GuildProps {
  realm: string;
  guildName: string;
  gameType: GameType;
  region: string;
}

export const Guild = (props: GuildProps) => {
  const { realm, guildName: unCleanGuildName, gameType, region } = props;
  const guildName = decodeURIComponent(unCleanGuildName.toLowerCase().replaceAll("%20", "-"));
  return (
    <Suspense
      fallback={
        <Box
          width="100vw"
          height="100vh"
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
            <Text mb={6}>Loading Guild data...</Text>
            <Spinner size={"xl"} />
          </Box>
        </Box>
      }
    >
      <AsyncGuild realm={realm} guildName={guildName} gameType={gameType} region={region} />
    </Suspense>
  );
};

const AsyncGuild = async (props: GuildProps) => {
  const { realm, guildName, gameType, region } = props;

  try {
    const guild = await fetchGuild(guildName, realm, region, gameType);

    return (
      <Box p={5} maxWidth={"1000px"} mx={"auto"}>
        <GuildTable
          region={region}
          data={guild.members}
          realmName={realm}
          guildName={guild.displayName}
          gameType={gameType}
        />
      </Box>
    );
  } catch (e: any) {
    return (
      <Box
        width="100vw"
        height="100vh"
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
          <Text mb={6}>Error loading Guild data</Text>
          <Text mb={6}>{e.toString()}</Text>
        </Box>
      </Box>
    );
  }
};
