import type { NextConfig } from "next";

/**
 * The site is deployed as plain files on Hostinger shared hosting, which runs
 * no Node process, so the whole thing is exported as static HTML.
 *
 * Two consequences worth knowing:
 *
 *  - The image optimiser needs a server, so it is off. Every file in /public is
 *    served exactly as it sits on disk, which is why the artwork there is
 *    already cut to roughly twice the largest box it is drawn in.
 *  - trailingSlash writes /services/index.html rather than /services.html, so
 *    Apache and LiteSpeed serve the folder without any rewrite rules.
 *
 * Moving to a host that runs Node later: delete output, trailingSlash and
 * images.unoptimized, and the optimiser comes back on its own.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1200, 1600, 1920],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
