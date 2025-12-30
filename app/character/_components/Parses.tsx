import React from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { timeAgo } from "@/app/_utils/time";
import { Profile } from "../../_types/types";
import { GameType } from "@prisma/client";

interface ParseProps {
  name: string;
  realm: string;
  region: string;
  parse: Profile["parse"];
  gameType: GameType;
}

export const Parses: React.FC<ParseProps> = ({ parse, name, realm, region, gameType }) => {
  if (parse.noLogs === true) {
    return (
      <Box
        alignSelf={"center"}
        width="400px"
        overflowX="auto"
        bg="gray.800"
        color="white"
        p={4}
        borderRadius="md"
      >
        <Text textAlign="center" fontSize={"x-large"}>
          Parses
        </Text>
        <Text textAlign="center">No logs found</Text>
      </Box>
    );
  }
  return (
    <Box
      alignSelf={"center"}
      width="400px"
      overflowX="auto"
      bg="gray.800"
      color="white"
      p={4}
      borderRadius="md"
    >
      <Text textAlign="center" fontSize={"x-large"}>
        Parses
      </Text>
      <Text textAlign="center">
        {parse.specName} {parse.metric}
      </Text>
      {parse.lastUpdated != null && (
        <Text textAlign="center" fontSize={"small"}>
          Last updated: {timeAgo(new Date(parse.lastUpdated))}
        </Text>
      )}
      <Table variant="simple" size={"xsm"}>
        <Thead>
          <Tr>
            <Th color="white">Boss</Th>
            <Th isNumeric color="white">
              Best %
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {parse.encounters.map((encounter) => (
            <Tr key={encounter.id}>
              <Td>
                <Flex alignItems="center">
                  {encounter.percent == null ? (
                    <Text color="#b4bdff">{encounter.encounter}</Text>
                  ) : (
                    <Link
                      target="_blank"
                      href={`https://${
                        gameType === GameType.SEASONAL
                          ? "sod"
                          : gameType === GameType.NORMAL
                          ? "classic"
                          : "vanilla"
                      }.warcraftlogs.com/character/${region}/${realm}/${name}#boss=${encounter.id}`}
                    >
                      <Text
                        color="#b4bdff"
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        {encounter.encounter}
                      </Text>
                    </Link>
                  )}
                </Flex>
              </Td>
              {encounter.percent == null ? (
                <Td></Td>
              ) : (
                <Td color={getParseColor(Math.round(encounter.percent))} isNumeric>
                  {Math.round(encounter.percent)}
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

function getParseColor(percent: number) {
  if (percent === 100) {
    return "#e5cc80";
  } else if (percent === 99) {
    return "#f48cba";
  } else if (percent >= 95) {
    return "#ff8000";
  } else if (percent >= 75) {
    return "#a335ee";
  } else if (percent >= 50) {
    return "#0070dd";
  } else if (percent >= 25) {
    return "#1eff00";
  } else {
    return "#9d9d9d";
  }
}
