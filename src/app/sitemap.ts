import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/* With output: export there is no server to build this on demand,
   so it is pinned to build time. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: { path: string; priority: number; frequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, frequency: "monthly" },
    { path: "/services", priority: 0.9, frequency: "monthly" },
    { path: "/work", priority: 0.8, frequency: "monthly" },
    { path: "/journal", priority: 0.8, frequency: "weekly" },
    { path: "/contact", priority: 0.7, frequency: "yearly" },
  ];

  /* CONFIRM: the six pieces under /journal/<slug> are held back from the
     sitemap. The journal as designed says plainly that nothing is published
     yet, and submitting six articles to search while the site says coming
     soon contradicts itself. Nothing is deleted: every piece still answers on
     its own URL, so putting them back is one loop. */

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
