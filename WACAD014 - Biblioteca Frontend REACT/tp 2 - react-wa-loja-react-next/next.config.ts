import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "192.168.1.74",
    "localhost",
    "127.0.0.1",
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ranekapi.origamid.dev',
      },
    ],
  },
};

export default nextConfig;