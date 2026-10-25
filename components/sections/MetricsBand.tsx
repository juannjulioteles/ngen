import type { CSSProperties } from "react";
import { IvyVine } from "@/components/brand/IvyVine";
import { InView } from "@/components/motion/InView";

type Figure = { value: string; label: string; source?: string };

/**
 * The page's one green moment: the panel the vine grows in. Headline on the
 * left, its line on the right where the third column starts, then three
 * columns of figures that count up as the band scrolls in, while the vine
 * draws itself in the corner. A `statement` takes the last column when there
 * are only two figures, so the row is never half empty.
 */
export function MetricsBand({
  id,
  title,
  lead,
  figures,
  statement,
}: {
  id: string;
  title: string;
  lead: string;
  figures: Figure[];
  statement?: string;
}) {
  return (
    <section aria-labelledby={id} className="grain relative overflow-hidden bg-forest text-paper">
      <InView className="wrap relative py-[clamp(4.5rem,9vw,7.5rem)]">
        <IvyVine
          drawOnView
          delay={0.3}
          className="pointer-events-none absolute right-[clamp(0rem,3vw,3rem)] bottom-[-8%] h-[78%] text-paper/10"
        />
        <div className="relative grid gap-x-8 gap-y-4 lg:grid-cols-12 lg:items-end">
          <h2 id={id} className="reveal font-display text-h2 lg:col-span-8">
            {title}
          </h2>
          <p className="reveal text-lead text-paper/75 lg:col-span-4" style={{ "--d": "0.1s" } as CSSProperties}>
            {lead}
          </p>
        </div>
        <div className="relative mt-12 grid gap-x-8 gap-y-10 md:grid-cols-3">
          {figures.map((f, i) => {
            // "About 50%" counts up as "About ", 0→50, "%"; "13.8%" as 0→13, ".8%" (CSS counters are whole numbers)
            const [, pre = "", num = "0", post = ""] = f.value.match(/^(\D*)(\d+)(.*)$/) ?? [];
            const d = `${0.25 + i * 0.15}s`;
            return (
              <dl key={f.value} className="reveal border-t border-paper/25 pt-5" style={{ "--d": d } as CSSProperties}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-[clamp(3rem,5vw,4rem)] leading-none">
                  <span className="sr-only">{f.value}</span>
                  <span
                    aria-hidden="true"
                    className="count-up tabular"
                    style={
                      {
                        "--to": Number(num),
                        "--pre": JSON.stringify(pre),
                        "--post": JSON.stringify(post),
                        "--d": d,
                      } as CSSProperties
                    }
                  />
                </dd>
                <dd className="mt-3 text-base text-paper/90 [text-wrap:pretty]">{f.label}</dd>
                {f.source && <dd className="mt-2 text-small text-paper/70 [text-wrap:pretty]">{f.source}</dd>}
              </dl>
            );
          })}
          {statement && (
            <div
              className="reveal border-t border-paper/25 pt-5"
              style={{ "--d": `${0.25 + figures.length * 0.15}s` } as CSSProperties}
            >
              <p className="font-display text-h3 leading-[1.2]">{statement}</p>
            </div>
          )}
        </div>
      </InView>
    </section>
  );
}
