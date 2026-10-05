import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { sponsors } = pages;

export const metadata: Metadata = { title: "Sponsors", description: sponsors.intro };

const mailto = (subject: string) => `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;

export default function SponsorsPage() {
  const logos = site.partner.logos;

  return (
    <>
      <PageHero
        id="sponsors-title"
        title={sponsors.title}
        intro={sponsors.intro}
        aside={
          // The case for partnering, at a glance: what founders raised, and who backs them.
          <div className="flex flex-col gap-8">
            <dl className="grid grid-cols-2 gap-x-8">
              {sponsors.figures.map((f) => (
                <div key={f.label} className="border-t border-ink/15 pt-4">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[clamp(2.75rem,5vw,4rem)] leading-none">{f.value}</dd>
                  <dd className="mt-2 text-small text-graphite">{f.label}</dd>
                </div>
              ))}
            </dl>
            <div className="border-t border-ink/15 pt-4">
              <p className="text-small text-graphite">{site.strip.label}</p>
              <p className="mt-2 font-display text-[1.25rem] leading-snug text-ink/70">
                {site.strip.firms.map((f) => f.name).join(", ")}
              </p>
            </div>
          </div>
        }
      />

      <PageSection id="why-title" title={sponsors.reasonsTitle}>
        <ul className="rule border-b">
          {sponsors.reasons.map((r) => (
            <li key={r.title} className="rule grid gap-x-8 gap-y-1 border-t py-6 lg:grid-cols-[1fr_minmax(0,22rem)]">
              <h3 className="font-display text-h3">{r.title}</h3>
              <p className="text-base lg:pt-1">{r.body}</p>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        id="formats-title"
        title={sponsors.formatsTitle}
        className="pt-0"
        aside={<p className="text-small text-graphite">Each one opens an email to the team.</p>}
      >
        <ul className="rule border-b">
          {sponsors.formats.map((f) => (
            <li key={f.title} className="rule border-t">
              <a
                href={mailto(`${site.name}: ${f.title}`)}
                className="group grid gap-x-8 gap-y-1 py-6 lg:grid-cols-[1fr_minmax(0,22rem)]"
              >
                <span className="font-display text-h3 underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-current">
                  {f.title}
                </span>
                <span className="text-base text-graphite lg:pt-1">{f.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageSection>

      <section aria-labelledby="sponsor-cta" className="bg-ink text-paper">
        <div className="wrap grid gap-y-8 py-[clamp(4rem,8vw,7rem)] md:grid-cols-12 md:gap-x-8">
          <div className="flex flex-col items-start gap-6 md:col-span-8">
            <h2 id="sponsor-cta" className="max-w-[16ch] font-display text-h1">
              {sponsors.ctaTitle}
            </h2>
            <a href={mailto(`${site.name}: partnership`)} className="link font-display text-h3 [overflow-wrap:anywhere]">
              {site.links.email}
            </a>
          </div>
          <div className="md:col-span-4 md:self-end">
            <h3 className="mb-4 text-small text-mist">{site.partner.logosLabel}</h3>
            {logos.length > 0 ? (
              <ul className="flex flex-wrap items-center gap-x-10 gap-y-6">
                {logos.map((p) => (
                  <li key={p.name}>
                    <Image
                      src={p.logo.src}
                      alt={p.logo.alt || p.name}
                      width={p.logo.width}
                      height={p.logo.height}
                      unoptimized={p.logo.src.endsWith(".svg")}
                      className="h-8 w-auto brightness-0 invert"
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>{sponsors.logosEmpty}</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
