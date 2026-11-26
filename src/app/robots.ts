import type { MetadataRoute } from "next";
import { resolveQrOrigin } from "@/lib/qr";

export default function robots(): MetadataRoute.Robots {
  const base = resolveQrOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    ...(base ? { sitemap: `${base}/sitemap.xml` } : {}),
  };
}
