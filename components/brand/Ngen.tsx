import Image from "next/image";
import { Fragment, useId, type ReactNode } from "react";
import { site } from "@/content/site";

const { org } = site;

/** NGEN's mountain mark. White artwork; `tone="ink"` for light backgrounds. */
export function NgenMark({ className = "", tone = "white" }: { className?: string; tone?: "white" | "ink" }) {
  return (
    <Image
      src={org.logo.src}
      alt=""
      width={org.logo.width}
      height={org.logo.height}
      sizes="160px"
      className={`w-auto ${tone === "ink" ? "brightness-0" : ""} ${className}`}
    />
  );
}

/**
 * "NGEN" in running text, with a small card that says who NGEN is when you
 * point at it or tab to it. Many readers will not know the name.
 */
export function Ngen() {
  const id = useId();
  return (
    <span className="group/ngen relative inline-block">
      <span
        tabIndex={0}
        aria-describedby={id}
        className="cursor-help underline decoration-current/35 decoration-dotted underline-offset-[0.2em] outline-offset-2"
      >
        {org.name}
      </span>
      <span
        role="tooltip"
        id={id}
        // display:none until shown, so a hidden card never widens the page
        className="ngen-tip pointer-events-none absolute top-full left-0 z-40 mt-2 hidden w-max max-w-[min(17rem,calc(100vw-2.5rem))] items-center gap-3 rounded-lg bg-ink px-3.5 py-2.5 text-left text-small leading-snug font-normal text-paper not-italic shadow-[0_12px_30px_-10px_rgb(0_0_0/0.45)] ring-1 ring-paper/10 group-focus-within/ngen:flex group-hover/ngen:flex"
      >
        <NgenMark className="h-4 shrink-0" />
        <span>
          {org.name}, {org.tagline}
        </span>
      </span>
    </span>
  );
}

/** Runs through a string and turns every "NGEN" into <Ngen />. */
export function withNgen(text: string): ReactNode {
  const parts = text.split(/\bNGEN\b/);
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <Ngen />}
    </Fragment>
  ));
}
