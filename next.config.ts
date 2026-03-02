import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Use unoptimized images for Cloudflare Pages compatibility
    unoptimized: true,
  },
};

export default nextConfig;
