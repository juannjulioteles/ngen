import Image from "next/image";
import { site } from "@/content/site";
import wordmark from "@/public/brand/ilec-wordmark.png";

/**
 * The official conference lockup: vine, "Ivy League", italic "Entrepreneurship
 * Conference". The artwork is cream; `tone="ink"` turns it near-black for
 * light backgrounds. Size it by height.
 */
export function Wordmark({
  className = "",
  priority = false,
  tone = "cream",
}: {
  className?: string;
  priority?: boolean;
  tone?: "cream" | "ink";
}) {
  return (
    <Image
      src={wordmark}
      alt={site.name}
      priority={priority}
      sizes="320px"
      className={`w-auto ${tone === "ink" ? "brightness-0 opacity-90" : ""} ${className}`}
    />
  );
}
