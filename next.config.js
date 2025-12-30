/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "static.wikia.nocookie.net",
      },
      {
        hostname: "ironforge.pro",
      },
      {
        hostname: "wow.zamimg.com",
      },
      {
        hostname: "render.worldofwarcraft.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  // https://chakra-ui.com/docs/get-started/frameworks/next-app#optimize-bundle
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  async rewrites() {
    return [
      {
        source: "/growth/:match*",
        destination: "https://hogger.io/_vercel/insights/:match*", // this didn't work with just the relative path for some reason any not sure why
      },
    ];
  },
};

module.exports = nextConfig;
