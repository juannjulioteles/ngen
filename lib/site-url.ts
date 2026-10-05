import { site } from "@/content/site";

/** Absolute site origin for metadata: config first, then Vercel, then local. */
export const siteUrl =
  site.url ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : `http://localhost:${process.env.PORT ?? 3000}`);
