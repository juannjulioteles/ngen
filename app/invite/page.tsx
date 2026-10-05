import type { Metadata } from "next";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";
import { InviteForm } from "@/components/sections/InviteForm";
import { PageLink } from "@/components/ui/PageLink";

const { invite } = pages;

export const metadata: Metadata = { title: "Request an invite", description: invite.intro };

export default function InvitePage() {
  return (
    <>
      <PageHero
        id="invite-title"
        title={invite.title}
        intro={invite.intro}
        aside={
          // The process is a real sequence, so it is numbered.
          <div className="flex flex-col">
            <p className="mb-3 text-small text-graphite">{invite.stepsTitle}</p>
            <ol className="border-b border-ink/15">
              {invite.steps.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-2 border-t border-ink/15 py-4">
                  <span className="font-display text-[1.375rem] leading-tight text-graphite tabular">{i + 1}</span>
                  <div>
                    <p className="font-display text-[1.375rem] leading-tight">{step.title}</p>
                    <p className="mt-1 text-small text-graphite">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        }
      />

      <PageSection
        id="form-title"
        title={invite.formTitle}
        aside={
          <a href={`mailto:${site.links.email}?subject=${encodeURIComponent(invite.subject)}`} className="link mt-2 self-start text-small text-graphite hover:text-ink">
            {site.links.email}
          </a>
        }
      >
        <InviteForm />
      </PageSection>

      <PageSection id="others-title" title="Not a student founder?" className="pt-0">
        <ul className="grid border-t border-ink/12 sm:grid-cols-2">
          {invite.others.map((o) => (
            <li key={o.title} className="border-b border-ink/12 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8">
              <PageLink href={o.href} className="group flex flex-col gap-1 py-6">
                <span className="font-display text-h3 underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-current">
                  {o.title}
                </span>
                <span className="text-base text-graphite">{o.body}</span>
              </PageLink>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
