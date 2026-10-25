import type { CSSProperties, ReactNode } from "react";
import { IvyVine } from "@/components/brand/IvyVine";
import { InView } from "@/components/motion/InView";

type Figure = { value: string; label: string; source?: string };

/**
 * The vine in the band's corner, drawing itself when its InView scrolls in.
 * Beside a close it stays low, next to the closing lines and clear of the figures.
 */
function Vine({ low = false }: { low?: boolean }) {
  return (
    <IvyVine
      drawOnView
      delay={0.3}
      className={`pointer-events-none absolute right-[clamp(0rem,3vw,3rem)] bottom-[-8%] text-paper/10 ${low ? "h-[58%]" : "h-[78%]"}`}
    />
  );
}

/**
 * The page's one green moment: the panel the vine grows in. It reads top to
 * bottom as a story: the claim (headline, with an optional line beside it),
 * the proof (figures that count up as the band scrolls in), and, when given,
 * the close: the turn in quieter type and the answer under it, revealed when
 * the reader reaches them, with the vine growing beside it.
 */
export function MetricsBand({
  id,
  title,
  lead,
  figures,
  close,
}: {
  id: string;
  title: string;
  lead?: string;
  figures: Figure[];
  close?: { turn: string; answer: string };
}) {
  const head: ReactNode = lead ? (
    <div className="relative grid gap-x-8 gap-y-4 lg:grid-cols-12 lg:items-end">
      <h2 id={id} className="reveal font-display text-h2 lg:col-span-8">
        {title}
      </h2>
      <p className="reveal text-lead text-paper/75 lg:col-span-4" style={{ "--d": "0.1s" } as CSSProperties}>
        {lead}
      </p>
    </div>
  ) : (
    <h2 id={id} className="reveal relative font-display text-h2">
      {title}
    </h2>
  );

  return (
    <section aria-labelledby={id} className="grain relative overflow-hidden bg-forest text-paper">
      <div className="wrap relative py-[clamp(4.5rem,9vw,7.5rem)]">
        <InView>
          {!close && <Vine />}
          {head}
          <div className={`relative mt-12 grid gap-x-8 gap-y-10 ${figures.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
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
          </div>
        </InView>

        {close && (
          // The close has its own trigger, so the turn and the answer arrive as the reader does
          <InView className="mt-14 border-t border-paper/25 pt-10 lg:mt-16">
            <Vine low />
            <div className="relative flex max-w-[44rem] flex-col gap-5">
              <p className="reveal text-lead text-paper/75">{close.turn}</p>
              <p className="reveal font-display text-h2" style={{ "--d": "0.35s" } as CSSProperties}>
                {close.answer}
              </p>
            </div>
          </InView>
        )}
      </div>
    </section>
  );
}
