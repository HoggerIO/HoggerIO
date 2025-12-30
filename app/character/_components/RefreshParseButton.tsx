"use client";
import { Button, useBoolean, useToast } from "@chakra-ui/react";
import { Props, refreshLogs } from "../../_serverFunctions/refreshLogs";

export const RefreshParseButton: React.FC<Props> = (props: Props) => {
  const [isLoading, { on: setIsLoading, off: setIsLoadingFalse }] = useBoolean(false);
  const toast = useToast();
  const handleSubmit = async () => {
    try {
      setIsLoading();
      await refreshLogs(props);
    } catch (e) {
      toast({
        title: "Error",
        description: `Failed to refresh logs for ${props.name}: ${e.message}`,
        status: "error",
        isClosable: true,
        position: "top",
      });
      console.error(e);
    } finally {
      setIsLoadingFalse();
    }
  };
  return (
    <Button
      mt={3}
      alignSelf={"center"}
      width={"240px"}
      isLoading={isLoading}
      onClick={handleSubmit}
    >
      {props.parse == null ? "Fetch warcraftlogs parses" : "Refresh parses"}
    </Button>
  );
};
