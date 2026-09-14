import type { MetadataRoute } from "next";
import { journal, site } from "@/lib/content";

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

  // every piece in the journal is its own indexable page
  for (const post of journal) {
    routes.push({
      path: `/journal/${post.slug}`,
      priority: 0.6,
      frequency: "yearly",
    });
  }

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
}
