import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 640, 828, 1080, 1200, 1600, 1920],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
