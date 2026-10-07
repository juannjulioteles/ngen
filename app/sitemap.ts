import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

const routes = ["", "/about", "/speakers", "/team", "/sponsors", "/contact", "/press"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
