import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/* With output: export there is no server to build this on demand,
   so it is pinned to build time. */
export const dynamic = "force-static";

/**
 * A preview build sets NEXT_PUBLIC_NOINDEX, which shuts the whole site to
 * crawlers. Without it a temporary hostingersite.com subdomain gets indexed
 * and then competes with the real domain for the same pages.
 */
export default function robots(): MetadataRoute.Robots {
  if (process.env.NEXT_PUBLIC_NOINDEX) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
