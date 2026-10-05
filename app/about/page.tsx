import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { NgenMark, withNgen } from "@/components/brand/Ngen";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { about } = pages;

export const metadata: Metadata = { title: "About", description: about.intro };

export default function AboutPage() {
  const photos = about.photos.filter((p) => p.image);

  return (
    <>
      <PageHero
        id="about-title"
        title={about.title}
        intro={about.intro}
        action={
          // The facts, grouped with the intro and clearly smaller than the headline
          <dl className="grid w-full max-w-sm grid-cols-2 gap-x-8">
            {about.facts.map((f) => (
              <div key={f.label} className="border-t border-ink/15 pt-4">
                <dt className="text-small text-graphite">{f.label}</dt>
                <dd className="mt-1 text-base font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        }
        aside={
          // Where it began: the real Trailblazers room, greyscale until pointed at.
          <figure className="group flex flex-col gap-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-2">
              <Image
                src={site.photos.trailblazers.src}
                alt={site.photos.trailblazers.alt}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[50%_60%] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
              />
            </div>
            <figcaption className="text-small text-graphite">{site.photos.trailblazers.caption}</figcaption>
          </figure>
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
        <div className="wrap py-[clamp(4rem,8vw,7rem)]">
          <NgenMark className="mb-6 h-12" />
          {/*
            One grid for both sides, so each figure lines up with a row of text:
            the first with the title, the second with the mission line.
          */}
          <div className="grid gap-x-8 gap-y-6 lg:grid-cols-12">
            <h2 id="ngen-title" className="font-display text-h1 lg:col-span-7 lg:row-start-1">
              {about.ngenTitle}
            </h2>
            <p className="max-w-[46ch] text-lead text-paper/80 lg:col-span-7 lg:row-start-2">{withNgen(about.ngenBody)}</p>
            <p className="max-w-[46ch] font-display text-h3 lg:col-span-7 lg:row-start-3">{about.ngenMission}</p>
            <a href={site.org.url} className="btn btn-paper mt-2 justify-self-start lg:col-span-7 lg:row-start-4">
              Visit {site.org.urlLabel}
            </a>
            {about.ngenStats.map((stat, i) => (
              <dl
                key={stat.label}
                className={`border-t border-paper/15 pt-5 lg:col-span-4 lg:col-start-9 ${
                  i === 0 ? "mt-10 lg:row-span-2 lg:row-start-1 lg:mt-0" : "lg:row-span-2 lg:row-start-3"
                }`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none">{stat.value}</dd>
                <dd className="mt-2 text-small text-mist">{stat.label}</dd>
              </dl>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
