import { Metadata } from "next";
import { Leaderboard } from "./_components/Leaderboard";

export const metadata: Metadata = {
  title: "Leaderboards - Hogger.io",
  description:
    "Classic Word of Warcraft Leaderboards, item level, gearscore, achievement points, honorable kills, and more.",
};
const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) => {
  const { gameType, wowClass } = await searchParams;

  return <Leaderboard wowClass={wowClass} gameTypeQp={gameType} />;
};

export default Page;
