import { SearchBox } from "../_components/SearchBox";
import { Alert, AlertDescription, AlertIcon, Box, Spinner, Text } from "@chakra-ui/react";
import Link from "next/link";
import React, { Suspense } from "react";
import { fetchRecentlyUpdatedGuilds } from "../_serverFunctions/fetchRecentGuilds";
import { Guild } from "../_types/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guilds - Hogger.io",
  description: "Search for World of Warcraft classic guilds by name, realm, or region",
};

export default function Home() {
  return (
    <>
      <Box p={4}>
        <Box mb={4}>
          <SearchBox linkPrefix={"guild"} />
        </Box>
        <Suspense
          fallback={
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
              <Spinner size={"xl"} />
            </Box>
          }
        >
          <RecentlyUpdatedGuilds />
        </Suspense>
      </Box>
    </>
  );
}

const RecentlyUpdatedGuilds: React.FC = async () => {
  const guilds = await fetchRecentlyUpdatedGuilds();

  const renderGuilds = (guilds: Guild[]) => {
    return (
      <Box display={"flex"} flexDirection={"column"}>
        {guilds.map((g) => {
          return (
            <Box alignSelf={"center"} justifySelf={"center"} key={g.name + g.realm}>
              <Link
                prefetch={false}
                href={`/guild/${g.gameType !== "NORMAL" ? "era/" : ""}${g.region}/${g.realm}/${
                  g.name
                }`}
              >
                <Box
                  p={2}
                  m={2}
                  textAlign={"center"}
                  alignSelf={"center"}
                  borderWidth={"1px"}
                  borderRadius={"lg"}
                  overflow={"hidden"}
                  _hover={{ cursor: "pointer", backgroundColor: "rgb(33, 41, 57)" }}
                  width={"200px"}
                >
                  <Text fontSize={"large"}>{g.displayName}</Text>
                  <Text fontSize={"small"}>{g.realm}</Text>
                  <Text fontSize={"small"}>{g.members.length} members</Text>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
    );
  };
  return (
    <Box display={"flex"} gap={4} flexDirection={"column"}>
      <Text fontSize={"xx-large"} alignSelf={"center"}>
        Recently updated guilds
      </Text>
      <Box
        display={"flex"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={10}
        justifyContent={"center"}
      >
        <Box>
          <Text textAlign={"center"} fontSize={"x-large"}>
            Mists of Pandaria
          </Text>
          {renderGuilds(guilds.NORMAL)}
        </Box>
        <Box>
          <Text textAlign={"center"} fontSize={"x-large"}>
            Season of Discovery
          </Text>
          {renderGuilds(guilds.SEASONAL)}
        </Box>
        <Box>
          <Text textAlign={"center"} fontSize={"x-large"}>
            Classic Era
          </Text>
          {renderGuilds(guilds.ERA)}
        </Box>
      </Box>
    </Box>
  );
};
