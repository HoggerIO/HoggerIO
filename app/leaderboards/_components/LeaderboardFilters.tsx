"use client";

import { RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface LeaderboardFiltersProps {
  gameType: string;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({ gameType }) => {
  const router = useRouter();

  const onRadioChange = (nextValue: string) => {
    router.push(`/leaderboards?gameType=${nextValue}`);
  };

  return (
    <RadioGroup
      my={3}
      display={"flex"}
      justifyContent={"center"}
      onChange={onRadioChange}
      value={gameType}
    >
      <Stack direction="row">
        <Radio value="NORMAL">Mists of Pandaria</Radio>
        <Radio value="SEASONAL">Season of Discovery</Radio>
        <Radio value="ERA">Classic Era</Radio>
        <Radio value="HARDCORE">Hardcore</Radio>
      </Stack>
    </RadioGroup>
  );
};
