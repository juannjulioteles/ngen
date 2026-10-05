import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { SpeakerGrid } from "@/components/sections/Speakers";
import { PageLink } from "@/components/ui/PageLink";

const { speakers } = pages;

export const metadata: Metadata = { title: "Speakers", description: speakers.intro };

/**
 * Where each portrait sits, in a 4:3 frame the size of the Sponsors mosaic.
 * The set alternates high and low; the low ones sit in front, so they only
 * ever cover the bodies of the high ones and every face stays clear. The
 * outer two are inset by their tilt so the corners stay inside the margins.
 * Names live in the grid below.
 */
const FAN = [
  "left-[3%] top-[3%] -rotate-[5deg]",
  "left-[21%] top-[33%] rotate-[3deg] z-20",
  "left-[41%] top-[1%] -rotate-2 z-10",
  "right-[2.5%] top-[35%] rotate-[4deg] z-30",
];

export default function SpeakersPage() {
  const withPhotos = site.speakers.items.filter((s) => s.headshot).slice(0, 4);
  // "Past speakers at the Trailblazers Conference, New York."
  const { title, subtitle } = site.speakers;
  const caption = `${title} ${subtitle.charAt(0).toLowerCase()}${subtitle.slice(1)}.`;

  return (
    <>
      <PageHero
        id="speakers-title"
        title={speakers.title}
        intro={speakers.intro}
        action={
          <PageLink href={site.nav.cta.href} className="btn btn-ink">
            {site.nav.cta.label}
          </PageLink>
        }
        aside={
          <figure className="flex flex-col gap-3">
            <div aria-hidden="true" className="group relative aspect-[4/3] w-full">
              {withPhotos.map((s, i) =>
                s.headshot ? (
                  <div
                    key={s.name}
                    className={`absolute w-[37%] overflow-hidden rounded-xl bg-stone-2 shadow-[0_24px_50px_-24px_rgb(21_24_21/0.45)] ring-4 ring-paper transition-transform duration-700 ease-out group-hover:rotate-0 ${FAN[i]}`}
                  >
                    <div className="relative aspect-[4/5]">
                      <Image src={s.headshot.src} alt="" fill sizes="(min-width: 1024px) 220px, 40vw" className="object-cover object-top grayscale" />
                    </div>
                  </div>
                ) : null,
              )}
            </div>
            <figcaption className="text-small text-graphite">{caption}</figcaption>
          </figure>
        }
      />

      <PageSection id="lineup-title" title={speakers.upcomingTitle}>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="font-display text-h2 lg:max-w-[75%]">{speakers.upcomingBody}</p>
          <PageLink href="/contact" className="btn btn-ink shrink-0">
            {speakers.upcomingCta}
          </PageLink>
        </div>
      </PageSection>

      <PageSection
        id="past-title"
        title={site.speakers.title}
        className="pt-0"
        aside={<p className="text-small text-graphite">{site.speakers.subtitle}</p>}
      >
        {/* Nine speakers: three columns, so no card sits alone on the last row */}
        <SpeakerGrid items={site.speakers.items} columns="grid-cols-2 sm:grid-cols-3" />
      </PageSection>
    </>
  );
}
