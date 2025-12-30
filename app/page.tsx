import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { SearchBox } from "./_components/SearchBox";
import RecentlyUpdated from "./RecentlyUpdated";
import { Metadata } from "next";

// 5 mins
export const revalidate = 300;

export const metadata: Metadata = {
  title: "Hogger.io - World of Warcraft Classic Armory",
  description:
    "Open-source, community-driven armory database for World of Warcraft Classic. Search character profiles, view guild rosters, and browse leaderboards for Mists of Pandaria Classic, Season of Discovery, and Classic Era.",
  openGraph: {
    title: "Hogger.io - World of Warcraft Classic Armory",
    description:
      "Open-source, community-driven armory database for World of Warcraft Classic. Search character profiles, view guild rosters, and browse leaderboards.",
    url: "https://hogger.io",
  },
};

export default function Home() {
  return (
    <Box p={4} marginRight={"auto"} marginLeft="auto" maxWidth={"1300px"}>
      <Box mb={5}>
        <SearchBox linkPrefix={"character"} />
      </Box>
      <Text textAlign={"center"} mb={2} fontSize={"x-large"}>
        Recently updated characters
      </Text>
      <RecentlyUpdated />
    </Box>
  );
}
