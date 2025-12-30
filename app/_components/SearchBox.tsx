"use client";

import { Box, Button, FormControl, Input, Skeleton, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { REALM_TO_METADATA } from "../_utils/realm";
import ReactSelect, { GroupBase, components } from "react-select";
import { GameType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface Props {
  linkPrefix: "character" | "guild";
}

interface RealmItem {
  type: GameType;
  id: string;
  region: string;
  displayName: string;
}

const DEFAULT_REALM = JSON.stringify({
  type: GameType.SEASONAL,
  region: "us",
  id: "crusader-strike",
  displayName: "Crusader Strike",
});

export const SearchBox: React.FC<Props> = ({ linkPrefix }) => {
  const [username, setUsername] = React.useState("");
  const [selectedRealm, setSelectedRealm] = React.useState<RealmItem | undefined>(
    JSON.parse(DEFAULT_REALM)
  );
  const router = useRouter();

  const onSubmit = () => {
    if (selectedRealm == null) {
      return;
    }
    router.push(
      `/${linkPrefix}/${selectedRealm.type !== "NORMAL" ? "era/" : ""}${selectedRealm.region}/${
        selectedRealm.id
      }/${username}`
    );
  };

  const handleMenuItemClick = (realm: RealmItem) => {
    setSelectedRealm(realm);
    if (window == null) {
      return;
    }
    // Set the recently selected realm in localStorage
    localStorage?.setItem("selectedRealmItem", JSON.stringify(realm));
  };

  const toast = useToast();

  const handleSubmit = () => {
    if (username.length === 0 || selectedRealm == null) {
      toast({
        title: "Error",
        description: `Please ${
          username.length === 0
            ? `enter a ${linkPrefix === "guild" ? "guild" : "character"} name`
            : "select a realm"
        }.`,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    onSubmit();
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      // Get the recently selected realm in localStorage if it exists
      const storedItem = localStorage?.getItem("selectedRealmItem");
      if (storedItem) {
        setSelectedRealm(JSON.parse(storedItem));
      }
    }
  }, []);

  return (
    <FormControl
      justifyContent="center"
      gap={5}
      display={"flex"}
      onSubmit={handleSubmit}
      textAlign="center"
      flexWrap={"wrap"}
      suppressHydrationWarning={true}
    >
      <Input
        backgroundColor={"gray.700"}
        color={"gray.400"}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={`Enter ${linkPrefix === "guild" ? "guild" : "character"} name`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
        sx={{
          "::placeholder": {
            color: "gray.400",
          },
        }}
        w={"300px"}
      />
      <RealmSelect onRealmChange={handleMenuItemClick} selectedValue={selectedRealm} />
      <Button colorScheme="blue" onClick={handleSubmit}>
        Search
      </Button>
    </FormControl>
  );
};

const RealmMenuItem: React.FC<{
  displayName: string;
  region: string;
}> = ({ displayName, region }) => {
  return (
    <Box w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
      <Text>{displayName}</Text>
      <Text fontWeight={"bold"} fontSize={"xl"} textTransform={"uppercase"}>
        {region}
      </Text>
    </Box>
  );
};

const CustomOption = (props: any) => (
  <components.Option {...props}>
    <RealmMenuItem region={props.data.region} displayName={props.data.displayName} />
  </components.Option>
);

const CustomSingleValue = (props: any) => (
  <components.SingleValue {...props}>
    <RealmMenuItem region={props.data.region} displayName={props.data.displayName} />
  </components.SingleValue>
);

interface RealmItem {
  type: GameType;
  id: string;
  region: string;
  displayName: string;
}

interface GroupType extends GroupBase<RealmItem> {
  label: string;
  options: RealmItem[];
}

interface RealmSelectProps {
  onRealmChange: (realm: RealmItem) => void;
  selectedValue: RealmItem;
}

const SelectComponents = { SingleValue: CustomSingleValue, Option: CustomOption };

const RealmSelect: React.FC<RealmSelectProps> = (props) => {
  const { onRealmChange, selectedValue } = props;
  const [isMounted, setIsMounted] = React.useState(false);

  const options = React.useMemo(() => {
    return Object.entries(REALM_TO_METADATA).map(([gameType, realms]) => {
      return {
        label: gameType === GameType.NORMAL ? "Mists of Pandaria" : gameType.toLowerCase(),
        options: realms
          .map((realm) => ({
            ...realm,
            type: gameType as GameType,
          }))
          .sort((a, b) => {
            // US > EU - then compare name
            if (a.region === "us" && b.region === "eu") {
              return -1;
            }
            if (a.region === "eu" && b.region === "us") {
              return 1;
            }
            return a.displayName.localeCompare(b.displayName);
          }),
      };
    });
  }, []);

  // Delete once the issue is fixed:
  // https://github.com/JedWatson/react-select/issues/5459
  React.useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return <Skeleton height="40px" width="300px" />;
  }
  return (
    <ReactSelect<RealmItem, false, GroupType>
      value={selectedValue}
      onChange={onRealmChange}
      options={options}
      getOptionLabel={(realm) => realm.displayName}
      getOptionValue={(realm) => realm.id}
      components={SelectComponents}
      styles={ReactSelectStyles}
    />
  );
};

const ReactSelectStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "rgb(64 64 64)",
    borderColor: state.isFocused ? "rgb(163 163 163)" : "rgb(64 64 64)",
    borderWidth: 2,
    boxShadow: "none",
    width: "300px",
    "&:hover": {
      borderColor: state.isFocused ? "rgb(163 163 163)" : "rgb(115 115 115)",
    },
  }),

  menu: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "rgb(64 64 64)",
    borderColor: "rgb(82 82 82)",
    borderWidth: 2,
    zIndex: 9999,
  }),

  option: (baseStyles, state) => ({
    ...baseStyles,
    color: "rgb(229 229 229)",
    backgroundColor: state.isFocused ? "rgb(38 38 38)" : "rgb(64 64 64)",

    "&:hover": {
      backgroundColor: "rgb(38 38 38)",
    },
  }),

  indicatorSeparator: (baseStyles) => ({
    ...baseStyles,
    backgroundColor: "rgb(163 163 163)",
  }),

  singleValue: (baseStyles) => ({
    ...baseStyles,
    color: "rgb(229 229 229)",
  }),

  placeholder: (baseStyles) => ({
    ...baseStyles,
    color: "rgb(229 229 229)",
  }),

  input: (baseStyles) => ({
    ...baseStyles,
    color: "rgb(229 229 229)",
  }),
};
