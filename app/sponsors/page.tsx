import type { Metadata } from "next";
import Image from "next/image";
import { pages, site, type BrandMention } from "@/content/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { sponsors } = pages;

export const metadata: Metadata = { title: "Sponsors", description: sponsors.intro };

const mailto = (subject: string) => `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;

/** The three that raised the most, for the header mosaic. */
const founders = ["Series", "Freya", "Nerd Apply"]
  .map((name) => site.startups.items.find((s) => s.name === name))
  .filter((s): s is (typeof site.startups.items)[number] => Boolean(s));

/**
 * A set of logos in even cells, one rule above and below and none between
 * rows, so a short last row never leaves a broken line.
 */
function LogoGrid({ brands }: { brands: BrandMention[] }) {
  return (
    <ul className="rule grid grid-cols-2 gap-x-6 gap-y-2 border-y py-4 sm:grid-cols-3 lg:grid-cols-4">
      {brands.map((brand) => (
        <li key={brand.name} className="flex h-16 items-center">
          <BrandLogo brand={brand} />
        </li>
      ))}
    </ul>
  );
}

export default function SponsorsPage() {
  const logos = site.partner.logos;

  return (
    <>
      <PageHero
        id="sponsors-title"
        title={sponsors.title}
        intro={sponsors.intro}
        action={
          // Proof, grouped with the pitch and clearly smaller than the headline
          <dl className="grid w-full max-w-md grid-cols-2 gap-x-8">
            {sponsors.figures.map((f) => (
              <div key={f.label} className="border-t border-ink/15 pt-4">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-[2rem] leading-none">{f.value}</dd>
                <dd className="mt-2 text-small text-graphite">{f.label}</dd>
              </div>
            ))}
          </dl>
        }
        aside={
          // The headline promises the next generation of founders: show them.
          <figure className="flex flex-col gap-3">
            <div className="grid grid-cols-2 grid-rows-2 gap-3">
              {founders.map((s, i) => (
                <div
                  key={s.name}
                  className={`group relative overflow-hidden rounded-xl bg-stone-2 ${i === 0 ? "row-span-2" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 260px, 50vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-small backdrop-blur">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-graphite">, {s.badge}</span>
                  </span>
                </div>
              ))}
            </div>
            <figcaption className="text-small text-graphite">{site.startups.title}, from the NGEN network.</figcaption>
          </figure>
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

      {/* Proof right after the reasons: who has backed NGEN events, then where speakers and alumni come from */}
      <PageSection
        id="supporters-title"
        title={sponsors.supportersTitle}
        className="pt-0"
        aside={<p className="text-small text-graphite">{sponsors.supportersNote}</p>}
      >
        <LogoGrid brands={sponsors.supporters} />
        <h3 className="mt-12 mb-4 text-small text-graphite">{sponsors.firmsLabel}</h3>
        <LogoGrid brands={site.strip.firms} />
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
