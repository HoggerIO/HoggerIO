import { Metadata } from "next";
import { ProfilePage } from "@/app/character/_components/ProfilePage";
import { GameType } from "@prisma/client";

interface PageProps {
  params: Promise<{
    realm: string;
    character: string;
    region: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { character, realm } = await params;
  return {
    title: `${capitalizeFirstLetter(character)} - ${capitalizeFirstLetter(
      realm
    )} - Hogger.io - TBC`,
    description: `World of Warcraft The Burning Crusade armory profile for ${capitalizeFirstLetter(
      character
    )} on ${capitalizeFirstLetter(realm)}`,
  };
}

const Page = async ({ params }: PageProps) => {
  const { realm, character, region } = await params;

  return <ProfilePage realm={realm} character={character} region={region} gameType={GameType.TBC} />;
};
export default Page;

function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
