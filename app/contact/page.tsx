import type { Metadata } from "next";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";
import { PageSection } from "@/components/layout/PageSection";

const { contact } = pages;

export const metadata: Metadata = { title: "Contact", description: contact.intro };

export default function ContactPage() {
  return (
    <>
      <PageHero
        id="contact-title"
        title={contact.title}
        intro={contact.intro}
        aside={
          // The address is the answer on this page, so it sits in the header.
          <div className="flex flex-col gap-3 border-t border-ink/15 pt-5">
            <p className="text-small text-graphite">{contact.emailLabel}</p>
            <a href={`mailto:${site.links.email}`} className="link font-display text-h2 [overflow-wrap:anywhere]">
              {site.links.email}
            </a>
            <p className="text-small text-graphite">{contact.emailNote}</p>
          </div>
        }
      />

      <PageSection id="topics-title" title="Topics">
        <ul className="rule border-b">
          {contact.topics.map((topic) => (
            <li key={topic.title} className="rule border-t">
              <a
                href={`mailto:${site.links.email}?subject=${encodeURIComponent(topic.subject)}`}
                className="group grid gap-x-8 gap-y-1 py-6 lg:grid-cols-[1fr_minmax(0,22rem)]"
              >
                <span className="font-display text-h3 underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-current">
                  {topic.title}
                </span>
                <span className="text-base text-graphite lg:pt-1">{topic.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageSection>
    </>
  );
}
