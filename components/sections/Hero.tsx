import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { eventDateLabel, eventVenueLabel } from "@/lib/event";
import { IvyVine } from "@/components/brand/IvyVine";
import { LaunchBars, ReplayLaunch } from "@/components/launch/LaunchControls";
import { T, timelineCss } from "@/components/launch/timeline";
import { PageLink } from "@/components/ui/PageLink";
import { DaysAway } from "./DaysAway";
import { Ticket } from "./Ticket";
import { Ngen, withNgen } from "@/components/brand/Ngen";

const { hero, strip } = site;
const { launch } = hero;

const vars = (v: Record<string, string | number>) => v as CSSProperties;

/**
 * Split cover that fits one screen: the name and the two actions on stone,
 * and the one green panel on the site, where the vine grows behind an
 * admission ticket. Also the stage for the launch sequence
 * (launch/timeline.ts), which ends on exactly this layout.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="hero-stage relative overflow-hidden bg-stone text-ink">
      <style>{timelineCss(strip.firms.length)}</style>

      <div className="grid min-h-[100svh] md:grid-cols-2">
        <div className="pl-wrap flex flex-col justify-center gap-8 pt-28 pr-[var(--gutter)] pb-12 md:pr-[clamp(1.5rem,4vw,5rem)] md:pb-16">
          <p className="intro-kicker flex items-center gap-2.5 text-small text-graphite">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-forest" />
            {withNgen(hero.kicker)}
          </p>

          <h1 id="hero-title" className="intro-title font-display text-[clamp(2.5rem,1.25rem+3.3vw,4.75rem)] leading-[1.02]">
            {hero.titleLines.map((line, i) => (
              <span key={line} className="block" style={vars({ "--i": i })}>
                {line}
              </span>
            ))}
          </h1>

          <div className="intro-details flex flex-col items-start gap-8">
            <p className="max-w-[34ch] text-lead text-graphite">{hero.tagline}</p>
            <div className="flex flex-wrap items-center gap-3">
              <PageLink href={hero.primaryCta.href} className="btn btn-ink">
                {hero.primaryCta.label}
              </PageLink>
              <PageLink href={hero.secondaryCta.href} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </PageLink>
            </div>
            <ReplayLaunch />
          </div>
        </div>

        <div className="grain relative min-h-[34rem] overflow-hidden bg-forest text-paper md:min-h-0">
          <div aria-hidden="true" className="intro-glow absolute inset-0" />
          <IvyVine
            animate
            delay={T.vine}
            className="absolute bottom-[-2%] left-[8%] h-[70%] max-h-[36rem]"
          />
          <Ticket>
            <article
              aria-label="Admission"
              className="relative w-full rounded-xl bg-paper text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55),0_0_0_1px_rgb(0_0_0/0.04)]"
            >
              <div className="flex items-start justify-between gap-4 p-6 pb-5">
                <div>
                  <p className="text-small text-graphite">Admit one</p>
                  <p className="mt-1 font-display text-[1.375rem] leading-[1.15]">
                    <span className="block">{hero.titleLines[0]}</span>
                    <span className="block whitespace-nowrap">{hero.titleLines.slice(1).join(" ")}</span>
                  </p>
                </div>
                <IvyVine className="mt-1 h-10 shrink-0 text-forest" />
              </div>
              <dl className="grid grid-cols-2 gap-4 border-t border-ink/10 px-6 py-5 text-small">
                <div>
                  <dt className="text-graphite">{hero.dateLabel}</dt>
                  <dd className="font-medium">
                    {eventDateLabel}
                    <DaysAway className="block font-normal text-graphite" />
                  </dd>
                </div>
                <div>
                  <dt className="text-graphite">{hero.venueLabel}</dt>
                  <dd className="font-medium">{eventVenueLabel}</dd>
                </div>
              </dl>
              <div className="relative flex items-center justify-between gap-4 border-t border-dashed border-ink/25 px-6 py-4">
                {/* Perforation notches */}
                <span aria-hidden="true" className="absolute -top-2.5 -left-2.5 size-5 rounded-full bg-forest" />
                <span aria-hidden="true" className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-forest" />
                <span className="text-small text-graphite">
                  Presented by <Ngen />
                </span>
                <span className="rounded-full bg-ink px-2.5 py-1 text-[0.75rem] font-medium text-paper">{hero.inviteOnly}</span>
              </div>
            </article>
          </Ticket>
        </div>
      </div>

      {/* The sequence itself: only visible under html[data-intro="play"]. */}
      <div aria-hidden="true" className="intro-dark" />
      <div aria-hidden="true" className="intro-preroll text-paper">
        <p className="intro-frame intro-studio font-display text-[1.5rem]" style={vars({ "--at": `${T.studio}s` })}>
          {launch.studio}
        </p>
        {launch.frames.map((f, i) => {
          // "$30M" counts up as "$", 0→30, "M"
          const [, pre = "", num = "0", post = ""] = f.figure.match(/^(\D*)(\d+)(\D*)$/) ?? [];
          return (
            <div key={f.figure} className="intro-frame" style={vars({ "--at": `${T.cuts[i]}s` })}>
              <span
                className="intro-count tabular font-display text-[clamp(7rem,26vw,19rem)] leading-[0.85]"
                style={vars({ "--to": Number(num), "--pre": JSON.stringify(pre), "--post": JSON.stringify(post) })}
              />
              <span className="intro-rule" />
              <span className="max-w-[26ch] text-lead text-balance text-paper/80">{f.caption}</span>
            </div>
          );
        })}
        <div className="intro-frame intro-montage" style={vars({ "--at": `${T.montage}s` })}>
          <span className="text-lead text-paper/70">{launch.montageLabel}</span>
          <span className="intro-rule" />
          <span className="relative block h-[2.2em] w-[min(92vw,64rem)] font-display text-[clamp(2.5rem,8vw,7rem)] leading-[1.05]">
            {strip.firms.map((firm, i) => (
              <span
                key={firm.name}
                className="intro-flash absolute inset-0 flex items-center justify-center text-center text-balance"
                style={vars({ "--at": `${T.montage + i * T.flash}s` })}
              >
                {firm.name}
              </span>
            ))}
          </span>
        </div>
        <div className="intro-frame intro-turn" style={vars({ "--at": `${T.turn}s` })}>
          <span className="max-w-[14ch] px-5 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.04]">{launch.turn}</span>
          <span className="intro-rule intro-rule-late" />
          <span className="intro-caption text-lead text-paper/80">{launch.turnCaption}</span>
        </div>
      </div>
      <LaunchBars />
    </section>
  );
}
