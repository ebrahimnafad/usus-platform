import type { MetadataRoute } from "next";
import { resolveQrOrigin } from "@/lib/qr";

const GRADE_IDS = ["K", "1", "2", "3", "4", "5"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = resolveQrOrigin() || "https://usus.edu";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/math`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/reading`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/reading/diagnostic`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const gradeRoutes: MetadataRoute.Sitemap = GRADE_IDS.map((gradeId) => ({
    url: `${base}/math/${gradeId}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const readingLevelRoutes: MetadataRoute.Sitemap = [
    "level-1",
    "level-2",
    "level-3",
  ].map((levelId) => ({
    url: `${base}/reading/level/${levelId}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...gradeRoutes, ...readingLevelRoutes];
}
