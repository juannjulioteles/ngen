import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { NgenMark, withNgen } from "@/components/brand/Ngen";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { PageLink } from "@/components/ui/PageLink";

const { about } = pages;

export const metadata: Metadata = { title: "About", description: about.intro };

export default function AboutPage() {
  const photos = about.photos.filter((p) => p.image);

  return (
    <>
      <PageHero
        id="about-title"
        layout="wide"
        title={about.title}
        intro={about.intro}
        action={
          <PageLink href={site.nav.cta.href} className="btn btn-ink">
            {site.nav.cta.label}
          </PageLink>
        }
        below={
          <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="text-small text-graphite">{f.label}</dt>
                <dd className="mt-1 text-base font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <PageSection id="conference-title" title={about.conferenceTitle}>
        {/* The lead runs the full column; the rest splits into two so lines stay readable */}
        <p className="font-display text-h2 lg:[text-wrap:pretty]">{about.conference[0]}</p>
        <div className="mt-10 grid gap-x-10 gap-y-6 border-t border-ink/10 pt-8 lg:grid-cols-2">
          {about.conference.slice(1).map((p) => (
            <p key={p} className="text-lead text-graphite">
              {p}
            </p>
          ))}
        </div>
      </PageSection>

      {photos.length > 0 && (
        <section aria-label="Photos" className="wrap py-[clamp(4rem,8vw,7rem)]">
          <ul className="grid gap-6 md:grid-cols-3">
            {photos.map(({ image, caption }) =>
              image ? (
                <li key={image.src}>
                  <figure className="flex flex-col gap-3">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="aspect-[4/5] w-full rounded-xl object-cover"
                    />
                    <figcaption className="text-small text-graphite">{caption}</figcaption>
                  </figure>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      )}

      <section aria-labelledby="ngen-title" className="grain bg-ink text-paper">
        <div className="wrap grid gap-x-8 gap-y-12 py-[clamp(4rem,8vw,7rem)] lg:grid-cols-12">
          <div className="flex flex-col items-start gap-6 lg:col-span-7">
            <NgenMark className="h-12" />
            <h2 id="ngen-title" className="font-display text-h1">
              {about.ngenTitle}
            </h2>
            <p className="max-w-[46ch] text-lead text-paper/80">{withNgen(about.ngenBody)}</p>
            <p className="max-w-[46ch] font-display text-h3">{about.ngenMission}</p>
            <a href={site.org.url} className="btn btn-paper mt-2">
              Visit {site.org.urlLabel}
            </a>
          </div>
          <dl className="grid content-end gap-8 lg:col-span-4 lg:col-start-9">
            {about.ngenStats.map((stat) => (
              <div key={stat.label} className="border-t border-paper/15 pt-5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none">{stat.value}</dd>
                <dd className="mt-2 text-small text-mist">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
