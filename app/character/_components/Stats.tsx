import { Box, Text } from "@chakra-ui/react";
import { Profile } from "../../_types/types";
import { RaidProgression } from "./RaidProgression";

interface StatsProps {
  profile: Profile;
}
export const Stats: React.FC<StatsProps> = ({ profile }) => {
  if (profile.achievements == null) return <></>;
  if (!profile.achievements.hasOwnProperty("achievements")) {
    return;
  }
  const achievements = profile.achievements?.achievements;
  if (achievements == null) return <></>;
  // const deathAchieve = achievements.find((a) => a.id === 122);

  return (
    <Box>
      <Text my={3} textAlign={"center"} fontWeight={700} fontSize={"large"}>
        RAID PROGRESSION
      </Text>
      <RaidProgression achievements={achievements} />
    </Box>
  );
};
