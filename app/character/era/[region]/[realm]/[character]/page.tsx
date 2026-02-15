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
    title: `${capitalizeFirstLetter(character)} - ${capitalizeFirstLetter(realm)}`,
    description: `World of Warcraft Classic Era armory profile for ${character} on ${realm}`,
  };
}

const Page = async ({ params }: PageProps) => {
  const { realm, character, region } = await params;

  return <ProfilePage realm={realm} character={character} region={region} gameType={GameType.ERA} />;
};

export default Page;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
