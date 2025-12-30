import Link from "next/link";
import {
  Flex,
  Box,
  Heading,
  Text,
  useDisclosure,
  Stack,
  Popover,
  PopoverContent,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HiMiniUserGroup } from "react-icons/hi2";
import { usePathname } from "next/navigation";
import Image from "next/image";
import hoggerImage from "../../images/hoggerIO.png";
import discordImage from "../../images/discord-mark-blue.svg";
import { IoPerson } from "react-icons/io5";
import { HamburgerIcon } from "@chakra-ui/icons";
import { GiTrophy } from "react-icons/gi";

const GuildRoute = "/guild";
const LeaderboardRoute = "/leaderboards";
const HomeRoute = "/";

export default function Navbar() {
  const router = usePathname();

  const isGuildPage = router === GuildRoute;
  const isLeaderboardPage = router === LeaderboardRoute;
  const isHomePage = router === HomeRoute;
  const { onClose, isOpen } = useDisclosure();

  return (
    <Box padding="9px" bg="rgb(46, 52, 64)" top="0" zIndex="5" width={"100%"} position="fixed">
      <Flex
        marginLeft={"auto"}
        marginRight={"auto"}
        maxWidth={"1300px"}
        color="white"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        gap={5}
      >
        <Link prefetch={false} href={HomeRoute}>
          <Box gap={5} display={"flex"} alignItems={"center"}>
            <Image src={hoggerImage} alt="Hogger.io" width={50} height={50} />
            <Heading as="h1" size="lg" cursor="pointer">
              Hogger.io
            </Heading>
          </Box>
        </Link>

        <Box display={["none", "none", "flex"]} justifyContent={"end"} alignItems="center" flex={1}>
          <LinkButton href={HomeRoute} isSelected={isHomePage} text={"Characters"} />
          <LinkButton href={GuildRoute} isSelected={isGuildPage} text={"Guilds"} />
          <LinkButton
            href={LeaderboardRoute}
            isSelected={isLeaderboardPage}
            text={"Leaderboards"}
          />
          <Link href={"https://discord.gg/8tZ4gENExS"} target="_blank">
            <Box _hover={{ opacity: "80%" }} cursor={"pointer"}>
              <Image src={discordImage} alt="discord" width={20} height={20} />
            </Box>
          </Link>
        </Box>
        <Box display={["flex", "flex", "none"]}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              <Link href="/" passHref>
                <MenuItem icon={<IoPerson />}>Character</MenuItem>
              </Link>
              <Link href="/guild" passHref>
                <MenuItem icon={<HiMiniUserGroup />}>Guild</MenuItem>
              </Link>
              <Link href="/leaderboards" passHref>
                <MenuItem icon={<GiTrophy />}>Leaderboard</MenuItem>
              </Link>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverContent pos={"absolute"} top={"72px"}>
          <MobileNav />
        </PopoverContent>
      </Popover>
    </Box>
  );
}

const LinkButton = ({ href, text, isSelected }) => {
  return (
    <Link href={href} prefetch={false}>
      <Box
        cursor="pointer"
        textDecoration={isSelected ? "underline" : "none"}
        mr={4}
        _hover={{ color: "white" }}
        appearance={"none"}
        padding={0}
        fontWeight={"500"}
        color={"gray.200"}
        background={"transparent"}
      >
        {text}
      </Box>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Box bg={"gray.800"} p={4}>
      <MobileNavItem href={HomeRoute} label="Characters" />
      <MobileNavItem href={GuildRoute} label="Guilds" />
      <MobileNavItem href={LeaderboardRoute} label="Leaderboards" />
    </Box>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text _hover={{ color: "white" }} fontWeight={500} color={"gray.200"}>
          {label}
        </Text>
      </Box>
    </Stack>
  );
};
