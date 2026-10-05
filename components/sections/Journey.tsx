"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { IvyVine } from "@/components/brand/IvyVine";
import { PageLink } from "@/components/ui/PageLink";
import { withNgen } from "@/components/brand/Ngen";

const { journey } = site;

/**
 * The story as a pinned scroll: on wide screens a dark panel stays put while
 * the steps scroll past, its figure changing with each one, and ticks on the
 * right edge show where you are. On small screens it is a plain list.
 */
export function Journey({ showMore = true }: { showMore?: boolean }) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section aria-labelledby="journey-title" className="relative bg-stone">
      <div className="grid lg:grid-cols-2">
        {/* Pinned panel */}
        <div aria-hidden="true" className="sticky top-0 hidden h-[100svh] overflow-hidden bg-ink text-paper lg:block">
          {journey.steps.map((step, i) => (
            <div
              key={step.label}
              className="absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-700 ease-out"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "none" : `translateY(${i < active ? -24 : 24}px)`,
                filter: active === i ? "none" : "blur(6px)",
              }}
            >
              <span
                className={`px-10 text-center font-display leading-[1.02] whitespace-pre-line ${
                  step.figure.includes("\n") ? "text-[clamp(2.5rem,4.2vw,4.25rem)]" : "text-[clamp(4rem,9vw,9rem)]"
                }`}
              >
                {step.figure}
              </span>
            </div>
          ))}
          <IvyVine
            className="absolute right-[8%] bottom-[-4%] h-[38%] text-paper/15 transition-transform duration-1000 ease-out"
            style={{ transform: `rotate(${active * 6}deg)` }}
          />
          <p className="absolute bottom-8 left-8 text-small text-mist">{journey.steps[active].label}</p>
        </div>

        <div className="pl-wrap pr-[var(--gutter)] lg:pr-[clamp(2rem,6vw,6rem)] lg:pl-[clamp(2rem,6vw,6rem)]">
          <h2 id="journey-title" className="pt-[clamp(5rem,10vw,8rem)] text-small font-medium text-graphite lg:pt-[18svh]">
            {journey.title}
          </h2>
          <ol>
            {journey.steps.map((step, i) => (
              <li
                key={step.label}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-step={i}
                className="flex flex-col justify-center gap-4 py-12 lg:min-h-[78svh] lg:py-0"
              >
                <span className="text-small text-graphite tabular">
                  {String(i + 1).padStart(2, "0")}
                  <span className="mx-2 text-ink/25">/</span>
                  {step.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`font-display leading-[1.02] whitespace-pre-line text-ink/15 lg:hidden ${
                    step.figure.includes("\n") ? "text-[2rem]" : "text-[3.5rem]"
                  }`}
                >
                  {step.figure}
                </span>
                <h3 className="max-w-[18ch] font-display text-h2">{step.title}</h3>
                <p className="max-w-[44ch] text-lead text-graphite">{withNgen(step.body)}</p>
              </li>
            ))}
          </ol>
          {showMore && (
            <p className="pb-[clamp(5rem,10vw,8rem)] lg:pb-[22svh]">
              <PageLink href={journey.more.href} className="link">
                {journey.more.label}
              </PageLink>
            </p>
          )}
        </div>
      </div>

      {/* Progress ticks */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[clamp(0.75rem,2vw,1.5rem)] hidden lg:block">
        <div className="sticky top-[calc(50svh-2.5rem)] flex flex-col gap-2.5">
          {journey.steps.map((step, i) => (
            <span
              key={step.label}
              className="block w-px rounded-full bg-ink transition-all duration-500"
              style={{ height: active === i ? 24 : 10, opacity: active === i ? 0.9 : 0.25 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
