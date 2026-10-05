import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { team } = pages;

export const metadata: Metadata = { title: "Team", description: team.intro };

const joinHref = `mailto:${site.links.email}?subject=${encodeURIComponent(`${site.name}: joining the team`)}`;

export default function TeamPage() {
  return (
    <>
      <PageHero
        id="team-title"
        title={team.title}
        intro={team.intro}
        aside={
          // Built by students: the real NGEN students, with the one action (joining) laid over the corner.
          <div className="relative pb-16 lg:pb-20">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-stone-2">
              <Image
                src={site.photos.trailblazers.src}
                alt={site.photos.trailblazers.alt}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover object-[50%_65%] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            </div>
            <div className="absolute right-4 bottom-0 left-4 flex flex-col items-start gap-3 rounded-xl bg-ink p-6 text-paper shadow-[0_24px_50px_-20px_rgb(0_0_0/0.5)] sm:left-auto sm:max-w-[22rem]">
              <h2 className="font-display text-h3">{team.joinTitle}</h2>
              <p className="text-small text-paper/75">{team.joinBody}</p>
              <a href={joinHref} className="btn btn-paper mt-1 min-h-10 px-4 text-small">
                {team.joinCta}
              </a>
            </div>
          </div>
        }
      />

      {team.members.length > 0 ? (
        <PageSection id="members-title" title="Organizers">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3">
            {team.members.map((member) => (
              <li key={member.name} className="flex flex-col gap-3">
                {member.headshot && (
                  <Image
                    src={member.headshot.src}
                    alt=""
                    width={member.headshot.width}
                    height={member.headshot.height}
                    sizes="(min-width: 768px) 25vw, 45vw"
                    className="aspect-[4/5] w-full rounded-xl object-cover grayscale"
                  />
                )}
                <div>
                  <h3 className="font-display text-[1.5rem] leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-small text-graphite">
                    {[member.role, member.school].filter(Boolean).join(", ")}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </PageSection>
      ) : (
        // Until the team is announced: just the sentence, centred, no side label.
        <section
          aria-labelledby="members-title"
          className="wrap py-[clamp(5rem,10vw,8rem)]"
        >
          <h2 id="members-title" className="sr-only">
            Organizers
          </h2>
          <p className="mx-auto max-w-[24ch] text-center font-display text-h2">
            {team.membersEmpty}
          </p>
        </section>
      )}
    </>
  );
}
