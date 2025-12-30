import Providers from "./providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

const isDev = process.env.NEXT_PUBLIC_VERCEL_ENV === "development";

export const metadata: Metadata = {
  title: {
    default: "Hogger.io - World of Warcraft Classic Armory",
    template: "%s | Hogger.io",
  },
  description:
    "Open-source, community-driven armory database for World of Warcraft Classic. View character profiles, guild rosters, and leaderboards for Mists of Pandaria Classic, Season of Discovery, and Classic Era.",
  keywords: [
    "World of Warcraft",
    "WoW Classic",
    "Mists of Pandaria Classic",
    "Season of Discovery",
    "Classic Era",
    "armory",
    "character profiles",
    "guild rosters",
    "leaderboards",
  ],
  openGraph: {
    type: "website",
    siteName: "Hogger.io",
    title: "Hogger.io - World of Warcraft Classic Armory",
    description:
      "Open-source, community-driven armory database for World of Warcraft Classic. View character profiles, guild rosters, and leaderboards.",
    url: "https://hogger.io",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hogger.io - World of Warcraft Classic Armory",
    description: "Open-source, community-driven armory database for World of Warcraft Classic.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const defaultTheme = "dark";
  const uiColorMode = defaultTheme;
  const src = isDev ? "https://va.vercel-scripts.com/v1/script.debug.js" : "/growth/script.js";

  return (
    <html
      // required to prevent the warning about the next-themes library.
      // https://chakra-ui.com/docs/get-started/frameworks/next-app
      suppressHydrationWarning
      lang="en"
      data-theme={uiColorMode}
      style={{ colorScheme: uiColorMode }}
    >
      <Analytics />
      <Script src={src} data-endpoint="/growth" strategy="lazyOnload" async />
      <Script async src="/growth/script.js" data-endpoint="/growth"></Script>
      <body className={`chakra-ui-${uiColorMode}`} style={{ marginTop: "68px" }}>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
