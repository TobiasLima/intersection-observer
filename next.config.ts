import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["dog.ceo"],
    unoptimized: true,
  },
};

export default nextConfig;
