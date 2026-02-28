"use client";

import { RadioGroup, Radio, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

interface LeaderboardFiltersProps {
  gameType: string;
}

export const LeaderboardFilters: React.FC<LeaderboardFiltersProps> = ({ gameType }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(gameType);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setSelected(gameType);
  }, [gameType]);

  const onRadioChange = (nextValue: string) => {
    setSelected(nextValue);
    startTransition(() => {
      router.push(`/leaderboards?gameType=${nextValue}`);
    });
  };

  return (
    <RadioGroup
      display={"flex"}
      justifyContent={"center"}
      onChange={onRadioChange}
      value={selected}
    >
      <Stack direction="row">
        <Radio value="NORMAL">Mists of Pandaria</Radio>
        <Radio value="SEASONAL">Season of Discovery</Radio>
        <Radio value="ERA">Classic Era</Radio>
        <Radio value="HARDCORE">Hardcore</Radio>
        <Radio value="TBC">TBC</Radio>
      </Stack>
    </RadioGroup>
  );
};
