// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify is not a valid property and has been removed
  experimental: {
    // App Router учун муҳим: remove invalid property
  },
  // Vercel учун энг муҳим қатор:
  output: "standalone",

  // Агар Tailwind ишлатаяпсиз бўлса — қўшиб қўйинг
  images: {
    unoptimized: true,
  },
};

export default nextConfig;