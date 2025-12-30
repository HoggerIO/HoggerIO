import { Metadata } from "next";
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
    title: `${capitalizeFirstLetter(character)} - ${capitalizeFirstLetter(realm)}`,
    description: `Word of Warcraft Season of Discovery Armory Profile for ${character} on ${realm}`,
  };
}

const Page = async ({ params }: PageProps) => {
  const { realm, character, region } = await params;

  return <ProfilePage realm={realm} character={character} region={region} isEra={true} />;
};

export default Page;

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
