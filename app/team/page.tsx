import type { Metadata } from "next";
import Image from "next/image";
import { pages, site, type TeamMember } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { team } = pages;

export const metadata: Metadata = { title: "Team", description: team.intro };

const joinHref = `mailto:${site.links.email}?subject=${encodeURIComponent(`${site.name}: joining the team`)}`;

/**
 * Portrait cards in the Speakers grid: the photo greyscale until pointed at,
 * the school as a tag on it, then name, title (or field of study), a short
 * bio and the LinkedIn link.
 */
function MemberGrid({ members }: { members: TeamMember[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
      {members.map((m) => (
        <li key={m.name} className="flex flex-col gap-4">
          <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-stone-2">
            {m.headshot && (
              <Image
                src={m.headshot.src}
                alt={m.headshot.alt}
                fill
                sizes="(min-width: 768px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.03] group-hover:grayscale-0"
              />
            )}
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-small backdrop-blur">{m.school}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-[1.5rem] leading-tight">{m.name}</h3>
            <p className="text-small text-graphite">{m.role ?? m.study}</p>
          </div>
          <p className="text-small leading-relaxed text-graphite [text-wrap:pretty]">{m.bio}</p>
          <a
            href={m.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-1.5 text-small underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink"
          >
            {team.linkedinLabel}
            <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            <span className="sr-only">: {m.name} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

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

      {team.leadership.length + team.members.length > 0 ? (
        <>
          <PageSection id="leadership-title" title={team.leadershipTitle}>
            <MemberGrid members={team.leadership} />
          </PageSection>
          {team.members.length > 0 && (
            <PageSection id="members-title" title={team.membersTitle} className="pt-0">
              <MemberGrid members={team.members} />
            </PageSection>
          )}
        </>
      ) : (
        // Until the team is announced: just the sentence, centred, no side label.
        <section aria-labelledby="members-title" className="wrap py-[clamp(5rem,10vw,8rem)]">
          <h2 id="members-title" className="sr-only">
            {team.membersTitle}
          </h2>
          <p className="mx-auto max-w-[24ch] text-center font-display text-h2">{team.membersEmpty}</p>
        </section>
      )}
    </>
  );
}
