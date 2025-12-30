import { Box, Spinner, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import AsyncCharacters from "./_components/AsyncCharacters";

export default async function RecentlyUpdated() {
  return (
    <Box display={"flex"} gap={3} justifyContent={"space-around"} flexWrap={"wrap"}>
      <Box w={350}>
        <Text mb={2} fontSize={"x-large"}>
          Mists of Pandaria
        </Text>
        <Suspense
          fallback={
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
              <Spinner size={"xl"} />
            </Box>
          }
        >
          <AsyncCharacters
            args={{
              orderBy: { updatedAt: "desc" },
              take: 5,
              where: {
                gameType: "NORMAL",
              },
            }}
          />
        </Suspense>
      </Box>

      <Box w={350}>
        <Text mb={2} fontSize={"x-large"}>
          Season of discovery
        </Text>
        <Suspense
          fallback={
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
              <Spinner size={"xl"} />
            </Box>
          }
        >
          <AsyncCharacters
            args={{
              orderBy: { updatedAt: "desc" },
              take: 5,
              where: {
                gameType: "SEASONAL",
              },
            }}
          />
        </Suspense>
      </Box>

      <Box w={350}>
        <Text mb={2} fontSize={"x-large"}>
          Classic
        </Text>
        <Suspense
          fallback={
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"100%"}>
              <Spinner size={"xl"} />
            </Box>
          }
        >
          <AsyncCharacters
            args={{
              orderBy: { updatedAt: "desc" },
              take: 5,
              where: {
                gameType: "ERA",
              },
            }}
          />
        </Suspense>
      </Box>
    </Box>
  );
}

export const dynamic = "force-dynamic";
