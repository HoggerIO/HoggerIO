"use client";

import { Box, Text } from "@chakra-ui/react";

export const TbcTalents: React.FC = () => {
  return (
    <Box
      width="100%"
      display="flex"
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      py={6}
    >
      <Text fontSize="xl" fontWeight="bold">
        Talents
      </Text>
      <Text color="gray.400">TBC talents coming soon.</Text>
    </Box>
  );
};
