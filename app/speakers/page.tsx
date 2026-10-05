import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { SpeakerGrid } from "@/components/sections/Speakers";
import { PageLink } from "@/components/ui/PageLink";

const { speakers } = pages;

export const metadata: Metadata = { title: "Speakers", description: speakers.intro };

/** Where each portrait sits in the fanned stack, back to front. Names live in the grid below. */
const FAN = [
  "left-0 top-10 -rotate-[6deg]",
  "left-[23%] top-2 -rotate-2 z-10",
  "right-[20%] top-5 rotate-2 z-20",
  "right-0 top-12 rotate-[4deg] z-30",
];

export default function SpeakersPage() {
  const withPhotos = site.speakers.items.filter((s) => s.headshot).slice(0, 4);

  return (
    <>
      <PageHero
        id="speakers-title"
        title={speakers.title}
        intro={speakers.intro}
        aside={
          <div aria-hidden="true" className="group relative mx-auto h-[17rem] w-full max-w-[34rem] sm:h-[20rem]">
            {withPhotos.map((s, i) =>
              s.headshot ? (
                <div
                  key={s.name}
                  className={`absolute w-[30%] overflow-hidden rounded-xl bg-stone-2 shadow-[0_24px_50px_-24px_rgb(21_24_21/0.45)] ring-4 ring-paper transition-transform duration-700 ease-out group-hover:rotate-0 ${FAN[i]}`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image src={s.headshot.src} alt="" fill sizes="220px" className="object-cover object-top grayscale" />
                  </div>
                </div>
              ) : null,
            )}
          </div>
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
        <SpeakerGrid items={site.speakers.items} />
      </PageSection>
    </>
  );
}
