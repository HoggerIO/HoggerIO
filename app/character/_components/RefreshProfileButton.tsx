"use client";
import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import refreshProfileData from "../../_serverFunctions/refreshProfileData";
import { GameType } from "@prisma/client";

interface Props {
  character: string;
  realm: string;
  region: string;
  disabled?: boolean;
  gameType: GameType;
}

export const RefreshProfileButton: React.FC<Props> = ({
  character,
  realm,
  region,
  disabled,
  gameType,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await refreshProfileData(character, realm, region, gameType);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: `Failed to refresh data for ${character}: ${e.message}`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.error(e);
    }
  };
  return (
    <Button isDisabled={disabled} isLoading={isLoading} onClick={handleSubmit}>
      Refresh data
    </Button>
  );
};
