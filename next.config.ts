import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The floating dev badge overlaps the studio's mobile lesson bar and
  // intercepts its pointer events during browser tests.
  devIndicators: false,
};

export default nextConfig;
