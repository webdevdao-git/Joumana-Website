import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/* With output: export there is no server to build this on demand,
   so it is pinned to build time. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
