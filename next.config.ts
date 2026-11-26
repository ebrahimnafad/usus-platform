import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The floating dev badge overlaps the studio's mobile lesson bar and
  // intercepts its pointer events during browser tests.
  devIndicators: false,
  // Ensure runtime curriculum markdown files are bundled into Vercel serverless functions.
  outputFileTracingIncludes: {
    "/*": [
      "./Grade K/**",
      "./Grade 1/**",
      "./Grade 2/**",
      "./Grade 3/**",
      "./Grade 4/**",
      "./Grade 5/**",
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // SAMEORIGIN allows same-origin print/preview iframes while blocking third-party framing.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
