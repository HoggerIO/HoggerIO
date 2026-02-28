import { Box } from "@chakra-ui/react";
import Script from "next/script";
import { SearchBox } from "../../_components/SearchBox";
import { Profile } from "./Profile";
import { GameType } from "@prisma/client";

interface Props {
  realm: string;
  character: string;
  region: string;
  gameType: GameType;
}

/**
 * Shared page between the era and non-era profiles.
 */
export const ProfilePage = (props: Props) => {
  const { realm, character, region, gameType } = props;

  return (
    <>
      <Box py={5} maxWidth={"2000px"} mx={"auto"}>
        <Script src="https://wow.zamimg.com/js/tooltips.js"></Script>
        <SearchBox linkPrefix={"character"} />
        <Profile realm={realm} character={character} region={region} gameType={gameType} />
      </Box>
    </>
  );
};
