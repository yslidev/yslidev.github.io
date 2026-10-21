import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://yushan.li",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://yushan.li/writing",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yushan.li/writing/x-recsys/",
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://yushan.li/about",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
