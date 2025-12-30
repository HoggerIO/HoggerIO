import type { Metadata } from "next";
import { ProfilePage } from "@/app/character/_components/ProfilePage";

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
    )} - Hogger.io - Mists of Pandaria`,
    description: `World of Warcraft Mists of Pandaria armory profile for ${capitalizeFirstLetter(
      character
    )} on ${capitalizeFirstLetter(realm)}`,
  };
}

const Page = async ({ params }: PageProps) => {
  const { realm, character, region } = await params;

  return <ProfilePage realm={realm} character={character} region={region} isEra={false} />;
};
export default Page;

function capitalizeFirstLetter(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
