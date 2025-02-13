import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.startupschool.org",
      },
      {
        protocol: "https",
        hostname: "bookface-images.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
