import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { NgenMark } from "@/components/brand/Ngen";
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
          // Joining is the one thing to do on this page, so it leads.
          <div className="grain flex flex-col items-start gap-5 rounded-xl bg-ink p-7 text-paper">
            <NgenMark className="h-8" />
            <h2 className="font-display text-h3">{team.joinTitle}</h2>
            <p className="text-base text-paper/75">{team.joinBody}</p>
            <a href={joinHref} className="btn btn-paper mt-1">
              {team.joinCta}
            </a>
          </div>
        }
      />

      <PageSection id="members-title" title="Organizers">
        {team.members.length > 0 ? (
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
                  <h3 className="font-display text-[1.5rem] leading-tight">{member.name}</h3>
                  <p className="text-small text-graphite">{[member.role, member.school].filter(Boolean).join(", ")}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="font-display text-h2 lg:[text-wrap:pretty]">{team.membersEmpty}</p>
        )}
      </PageSection>
    </>
  );
}
