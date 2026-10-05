import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Event photos and headshots (TBD) will be served as AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    // Speaker headshots and startup photos come from NGEN's own site.
    remotePatterns: [new URL("https://www.ngennetwork.org/**")],
  },
};

export default nextConfig;
