import type { MetadataRoute } from "next";
import { isPersonal, SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

// The personal site still allows crawling: a crawler that can't fetch the page
// never sees its noindex tag, and may index the bare URL anyway. It simply
// advertises no sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(isPersonal ? {} : { sitemap: `${SITE_URL}/sitemap.xml` }),
  };
}
