import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Event photos and headshots (TBD) will be served as AVIF/WebP.
    formats: ["image/avif", "image/webp"],
    // Speaker headshots and startup photos come from NGEN's own site.
    remotePatterns: [new URL("https://www.ngennetwork.org/**")],
  },
  // The invite page was retired; invitations are requested through Contact.
  async redirects() {
    return [
      { source: "/invite", destination: "/contact", permanent: true },
      // Send the old Vercel address to the real domain, keeping the path.
      {
        source: "/:path*",
        has: [{ type: "host", value: "ngen-five.vercel.app" }],
        destination: "https://ivyleagueconference.org/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
