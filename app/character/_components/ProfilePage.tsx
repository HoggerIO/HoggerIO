import { Box, Text, Spinner } from "@chakra-ui/react";
import { Suspense } from "react";
import Script from "next/script";
import { SearchBox } from "../../_components/SearchBox";
import { AsyncProfile } from "./AsyncProfile";

interface Props {
  realm: string;
  character: string;
  region: string;
  isEra: boolean;
}

/**
 * Shared page between the era and non-era profiles.
 */
export const ProfilePage = (props: Props) => {
  const { realm, character, region, isEra } = props;

  return (
    <>
      <Box py={5} maxWidth={"2000px"} mx={"auto"}>
        <Script src="https://wow.zamimg.com/js/tooltips.js"></Script>
        <Suspense
          fallback={
            <Box display={"flex"} flexDir={"column"} alignItems={"center"}>
              <Text mb={6}>Loading Profile data...</Text>
              <Spinner size={"xl"} />
            </Box>
          }
        >
          <SearchBox linkPrefix={"character"} />
          <AsyncProfile realm={realm} character={character} region={region} isEra={isEra} />
        </Suspense>
      </Box>
    </>
  );
};
