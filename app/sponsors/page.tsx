import type { Metadata } from "next";
import Image from "next/image";
import { pages, site, type BrandMention } from "@/content/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { MetricsBand } from "@/components/sections/MetricsBand";

const { sponsors } = pages;

export const metadata: Metadata = { title: "Sponsors", description: sponsors.intro };

/** The three that raised the most, for the header mosaic. */
const founders = ["Series", "Zorbe", "Freya"]
  .map((name) => site.startups.items.find((s) => s.name === name))
  .filter((s): s is (typeof site.startups.items)[number] => Boolean(s));

/**
 * A set of logos in even cells, one rule above and below and none between
 * rows, so a short last row never leaves a broken line. On wide screens a set
 * that fills rows of three but not of four (nine supporters) runs in threes.
 */
function LogoGrid({ brands }: { brands: BrandMention[] }) {
  const lgCols = brands.length % 3 === 0 && brands.length % 4 !== 0 ? "lg:grid-cols-3" : "lg:grid-cols-4";
  return (
    <ul className={`rule grid grid-cols-2 gap-x-6 gap-y-2 border-y py-4 sm:grid-cols-3 ${lgCols}`}>
      {brands.map((brand) => (
        <li key={brand.name} className="flex h-16 items-center">
          <BrandLogo brand={brand} />
        </li>
      ))}
    </ul>
  );
}

export default function SponsorsPage() {
  return (
    <>
      <PageHero
        id="sponsors-title"
        title={sponsors.title}
        intro={sponsors.intro}
        action={
          // Proof, grouped with the pitch and clearly smaller than the headline
          <dl className="grid w-full max-w-xl grid-cols-2 gap-x-8">
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

      {/* Proof first: who has backed NGEN events, then where speakers and alumni come from */}
      <PageSection
        id="supporters-title"
        title={sponsors.supportersTitle}
        aside={<p className="text-small text-graphite">{sponsors.supportersNote}</p>}
      >
        <LogoGrid brands={sponsors.supporters} />
        <h3 className="mt-12 mb-4 text-small text-graphite">{sponsors.firmsLabel}</h3>
        <LogoGrid brands={site.strip.firms} />
      </PageSection>

      {/* Then the case for meeting founders early, in a dark band like About's "Presented by NGEN" */}
      <MetricsBand
        id="metrics-title"
        title={sponsors.evidenceTitle}
        lead={sponsors.evidenceLead}
        figures={sponsors.evidence}
      />
    </>
  );
}
