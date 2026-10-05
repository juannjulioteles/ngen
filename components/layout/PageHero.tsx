import type { ReactNode } from "react";
import { withNgen } from "@/components/brand/Ngen";

type PageHeroProps = {
  id: string;
  title: string;
  intro: string;
  /**
   * "split": headline and intro on the left, the page's own `aside` on the
   * right, both running to the margins. "wide": the headline spans the full
   * measure, then `media`, then the intro with `below` (facts) beside it.
   */
  layout?: "split" | "wide";
  /** "dark" sets the header on ink, for a page whose header is the whole answer (Contact). */
  tone?: "light" | "dark";
  aside?: ReactNode;
  below?: ReactNode;
  /** Wide layout only: a full-width visual between the headline and the intro. */
  media?: ReactNode;
  /** The one thing to do next, set right under the intro so the scan lands on it. */
  action?: ReactNode;
  /**
   * Split layout only: a row pinned to the bottom of a header that fills the
   * screen (Contact's topics), so the page ends before the footer begins.
   */
  footer?: ReactNode;
};

/** One headline style for every inner page: same face, size, leading and measure. */
const TITLE = "max-w-[22ch] font-display text-h1";

/**
 * The shell every inner page opens with. It sets spacing and type; what fills
 * it is chosen per page (a photo band for About, founders for Sponsors, the
 * team photo for Team, the topics for Contact), so no two headers look the same.
 *
 * Reading order, by size and grouping: the headline first, then the page's
 * visual, then the intro with its action, then any proof, always smaller.
 */
export function PageHero({
  id,
  title,
  intro,
  layout = "split",
  tone = "light",
  aside,
  below,
  media,
  action,
  footer,
}: PageHeroProps) {
  const dark = tone === "dark";
  const introClass = `text-lead ${dark ? "text-paper/75" : "text-graphite"}`;

  return (
    <header
      className={`${dark ? "grain bg-ink text-paper" : "border-b border-ink/8 bg-stone text-ink"} ${footer ? "flex min-h-svh flex-col" : ""}`}
    >
      <div className={`wrap pt-[clamp(8rem,13vw,10rem)] pb-[clamp(3.5rem,6vw,5rem)] ${footer ? "flex w-full flex-1 flex-col" : ""}`}>
        {layout === "wide" ? (
          <>
            <h1 id={id} className={TITLE}>
              {title}
            </h1>
            {media && <div className="mt-[clamp(2rem,4vw,3rem)]">{media}</div>}
            <div className="mt-[clamp(2rem,4vw,3rem)] grid items-end gap-x-8 gap-y-10 lg:grid-cols-12">
              <div className="flex flex-col items-start gap-6 lg:col-span-6">
                <p className={introClass}>{withNgen(intro)}</p>
                {action}
              </div>
              {below && <div className="lg:col-span-5 lg:col-start-8">{below}</div>}
            </div>
          </>
        ) : (
          <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12">
            {/* Title column pinned to the top so every page's headline starts at the same height */}
            <div className="flex flex-col items-start gap-6 self-start lg:col-span-6">
              <h1 id={id} className={TITLE}>
                {title}
              </h1>
              <p className={introClass}>{withNgen(intro)}</p>
              {action && <div className="mt-2 w-full">{action}</div>}
            </div>
            {aside && <div className="self-end lg:col-span-5 lg:col-start-8">{aside}</div>}
          </div>
        )}
        {footer && <div className="mt-auto pt-[clamp(4rem,8vw,6rem)]">{footer}</div>}
      </div>
    </header>
  );
}
