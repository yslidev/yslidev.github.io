import type { MetadataRoute } from "next";
import { isPersonal, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// Only the professional site is meant to be found. The personal build's
// sitemap is empty, and scripts/build-personal.sh removes it from the output.
export default function sitemap(): MetadataRoute.Sitemap {
  if (isPersonal) return [];
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/writing`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/writing/x-recsys/`,
      lastModified: new Date("2026-08-31"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
