import { Metadata } from "next";
import { Guild } from "../../../../_components/Guild";
import { GameType } from "@prisma/client";

type Props = {
  params: Promise<{
    realmName: string;
    guildName: string;
    region: string;
  }>;
};

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { guildName, realmName } = await params;
  return {
    title: `Guild ${capitalizeFirstLetter(guildName)} - ${capitalizeFirstLetter(
      realmName
    )} - Hogger.io - Hardcore`,
    description: `${capitalizeFirstLetter(guildName)} on realm ${capitalizeFirstLetter(
      realmName
    )} World of Warcraft Hardcore`,
  };
}

const Page = async ({ params }: Props) => {
  const { realmName, guildName, region } = await params;
  return (
    <Guild realm={realmName} guildName={guildName} gameType={GameType.HARDCORE} region={region} />
  );
};

export default Page;
