import { Metadata } from "next";
import { Guild } from "../../../_components/Guild";

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
    )} - Hogger.io - Mists of Pandaria`,
    description: `${capitalizeFirstLetter(guildName)} on realm ${capitalizeFirstLetter(
      realmName
    )} World of Warcraft Mists of Pandaria`,
  };
}

const Page = async ({ params }: Props) => {
  const { realmName, guildName, region } = await params;
  return <Guild realm={realmName} guildName={guildName} isEra={false} region={region} />;
};

export default Page;
