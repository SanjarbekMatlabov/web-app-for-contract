import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
  },
  output: "standalone",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;