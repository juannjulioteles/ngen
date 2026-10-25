import type { Metadata } from "next";
import Image from "next/image";
import { Fragment } from "react";
import { pages, site } from "@/content/site";
import { IvyVine } from "@/components/brand/IvyVine";
import { NgenMark, withNgen } from "@/components/brand/Ngen";
import { VineCorner } from "@/components/brand/VineCorner";
import { PageHero } from "@/components/layout/PageHero";

const { about } = pages;

export const metadata: Metadata = { title: "About", description: about.intro };

/** "**phrase**" marks what a scanning reader should catch: set a weight up, in ink. */
function Marked({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/).map((part, i) =>
        i % 2 ? (
          <strong key={i} className="font-medium text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>{withNgen(part)}</Fragment>
        ),
      )}
    </>
  );
}

export default function AboutPage() {
  const photos = about.photos.filter((p) => p.image);
  const [leadStat, ...moreStats] = about.ngenStats;

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

      {/*
        Set to scan: the mission as the lead, then the story as short lines. Each line's label sits
        in the left column under the section's own, so the page keeps one rail.
      */}
      <section aria-labelledby="conference-title" className="wrap py-[clamp(4rem,8vw,7rem)]">
        <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-8">
          <h2 id="conference-title" className="text-small font-medium text-graphite lg:col-span-3 lg:pt-2">
            {about.conferenceTitle}
          </h2>
          <p className="font-display text-h2 lg:col-span-9 lg:[text-wrap:pretty]">{about.conference.mission}</p>
        </div>
        <dl className="mt-10 grid gap-y-2 border-t border-ink/10 pt-8 lg:grid-cols-12 lg:items-baseline lg:gap-x-8 lg:gap-y-6">
          {about.conference.lines.map((line) => (
            <Fragment key={line.label}>
              <dt className="mt-4 text-small font-medium text-graphite first:mt-0 lg:col-span-3 lg:mt-0">{line.label}</dt>
              <dd className="text-lead text-graphite [text-wrap:pretty] lg:col-span-9">
                <Marked text={line.text} />
                {/*
                  The line's highlight: unlike the mission's display serif, the sans at medium weight in
                  forest, after the ivy mark the hero ticket uses (the page's one touch of green)
                */}
                {line.highlight && (
                  <span className="mt-5 flex items-start gap-3 text-forest">
                    <IvyVine className="mt-0.5 h-8 shrink-0" />
                    <span className="text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug font-medium [text-wrap:pretty]">
                      {line.highlight}
                    </span>
                  </span>
                )}
              </dd>
            </Fragment>
          ))}
        </dl>
      </section>

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

      <section aria-labelledby="ngen-title" className="grain relative overflow-hidden bg-ink text-paper">
        <div className="wrap relative py-[clamp(4rem,8vw,7rem)]">
          <VineCorner />
          <NgenMark className="relative mb-6 h-12" />
          {/*
            One grid for both sides, so each figure lines up with a row of text:
            the lead figure with the title and the body, the smaller pair with the button.
          */}
          <div className="relative grid gap-x-8 gap-y-6 lg:grid-cols-12">
            <h2 id="ngen-title" className="font-display text-h1 lg:col-span-7 lg:row-start-1">
              {about.ngenTitle}
            </h2>
            <p className="max-w-[46ch] text-lead text-paper/80 lg:col-span-7 lg:row-start-2">{withNgen(about.ngenBody)}</p>
            <a href={site.org.url} className="btn btn-paper mt-2 self-start justify-self-start lg:col-span-7 lg:row-start-3 lg:mt-0">
              Visit {site.org.urlLabel}
            </a>
            <dl className="mt-10 border-t border-paper/15 pt-5 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:mt-0">
              <dt className="sr-only">{leadStat.label}</dt>
              <dd className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-none">{leadStat.value}</dd>
              <dd className="mt-2 text-small text-mist">{leadStat.label}</dd>
            </dl>
            <div className="grid grid-cols-2 gap-x-8 lg:col-span-5 lg:col-start-8 lg:row-start-3">
              {moreStats.map((stat) => (
                <dl key={stat.label} className="border-t border-paper/15 pt-5">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-display text-[clamp(2.25rem,4vw,3rem)] leading-none">{stat.value}</dd>
                  <dd className="mt-2 text-small text-mist [text-wrap:pretty]">{stat.label}</dd>
                </dl>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
