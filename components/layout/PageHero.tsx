import type { ReactNode } from "react";
import { withNgen } from "@/components/brand/Ngen";

type PageHeroProps = {
  id: string;
  title: string;
  intro: string;
  /**
   * "split": headline and intro on the left, the page's own `aside` on the
   * right, both running to the margins. "wide": the headline spans the full
   * measure, with `below` (facts, links) underneath on a rule.
   */
  layout?: "split" | "wide";
  aside?: ReactNode;
  below?: ReactNode;
  /** The one thing to do next, set right under the intro so the scan lands on it. */
  action?: ReactNode;
};

/** One headline style for every inner page: same face, size, leading and measure. */
const TITLE = "max-w-[22ch] font-display text-h1";

/**
 * The shell every inner page opens with. It sets spacing and type; what fills
 * it is chosen per page (portraits for Speakers, figures for Sponsors, the
 * address for Contact), so no two headers look the same.
 *
 * Reading order, by size and grouping: the headline first, then the intro
 * with its action, then the page's proof on the right, always smaller.
 */
export function PageHero({ id, title, intro, layout = "split", aside, below, action }: PageHeroProps) {
  return (
    <header className="border-b border-ink/8 bg-stone text-ink">
      <div className="wrap pt-[clamp(8rem,13vw,10rem)] pb-[clamp(3.5rem,6vw,5rem)]">
        {layout === "wide" ? (
          <>
            <h1 id={id} className={TITLE}>
              {title}
            </h1>
            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid items-end gap-x-8 gap-y-10 border-t border-ink/12 pt-8 lg:grid-cols-12">
              <div className="flex flex-col items-start gap-6 lg:col-span-6">
                <p className="text-lead text-graphite">{withNgen(intro)}</p>
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
              <p className="text-lead text-graphite">{withNgen(intro)}</p>
              {action && <div className="mt-2">{action}</div>}
            </div>
            {aside && <div className="self-end lg:col-span-5 lg:col-start-8">{aside}</div>}
          </div>
        )}
      </div>
    </header>
  );
}
