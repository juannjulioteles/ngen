import Image from "next/image";
import type { BrandMention } from "@/content/site";

/** The height a 4:1 wordmark gets; wider and taller marks are scaled to match its visual weight. */
const BASE = 24;

/**
 * Another organization's logo, set in the site's one ink so a wall of them
 * reads as a single set. Heights are optical, not equal: each logo gets the
 * same area, so a long wordmark sits lower and a compact mark stands taller.
 * Without a logo file the name stands in, in the sans.
 */
export function BrandLogo({ brand, className = "" }: { brand: BrandMention; className?: string }) {
  const { name, logo, logoText } = brand;

  if (!logo) {
    return <span className={`text-[1.125rem] leading-none font-medium tracking-[-0.01em] text-ink/80 ${className}`}>{name}</span>;
  }

  const ratio = logo.width / logo.height;
  const height = Math.round(Math.min(44, Math.max(16, BASE * Math.sqrt(4 / ratio))));
  // A mark paired with its name (Y Combinator's square) stays text-height.
  const markHeight = logoText ? 26 : height;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={logo.src}
        alt={logoText ? "" : name}
        width={logo.width}
        height={logo.height}
        unoptimized={logo.src.endsWith(".svg")}
        style={{ height: markHeight, width: "auto" }}
        className="max-w-full opacity-80 brightness-0"
      />
      {logoText && <span className="text-[1.3rem] leading-none font-semibold tracking-[-0.02em] text-ink/80">{logoText}</span>}
    </span>
  );
}
