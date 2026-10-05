import type { Metadata } from "next";
import { pages, site } from "@/content/site";
import { PageHero } from "@/components/layout/PageHero";

const { contact } = pages;

export const metadata: Metadata = { title: "Contact", description: contact.intro };

const mailto = (subject: string) => `mailto:${site.links.email}?subject=${encodeURIComponent(subject)}`;

/** The general subject first, then one per topic; hovering a topic shows its own. */
const subjects = [site.name, ...contact.topics.map((t) => t.subject)];

/**
 * The whole page is the header, built like the NGEN section on About: the
 * headline, then the intro with one button grouped under it. On the right,
 * the email itself, as it opens; the four topics run along the bottom edge
 * as smaller choices, and hovering one rewrites the draft's subject line.
 */
export default function ContactPage() {
  return (
    <PageHero
      id="contact-title"
      tone="dark"
      title={contact.title}
      intro={contact.intro}
      action={
        <a href={mailto(site.name)} className="btn btn-paper">
          {contact.emailCta}
        </a>
      }
      aside={
        <a
          href={mailto(site.name)}
          aria-label={`${contact.emailCta}: ${site.links.email}`}
          className="block rounded-2xl bg-paper text-ink shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] transition-transform duration-500 ease-out hover:-translate-y-1"
        >
          <p className="border-b border-ink/10 px-6 py-4 text-small text-graphite">{contact.draft.label}</p>
          <dl className="px-6 text-small">
            <div className="flex gap-4 border-b border-ink/10 py-3">
              <dt className="w-16 shrink-0 text-graphite">{contact.draft.to}</dt>
              <dd className="font-medium [overflow-wrap:anywhere]">{site.links.email}</dd>
            </div>
            <div className="flex gap-4 border-b border-ink/10 py-3">
              <dt className="w-16 shrink-0 text-graphite">{contact.draft.subject}</dt>
              <dd className="grid">
                {subjects.map((subject, i) => (
                  <span key={subject} data-subject={i} className="draft-subject [grid-area:1/1]">
                    {subject}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
          <p className="min-h-[clamp(7rem,12vw,10rem)] px-6 pt-5 pb-6 font-display text-[1.5rem] leading-snug">
            {contact.draft.body}
            <span aria-hidden="true" className="draft-caret" />
          </p>
        </a>
      }
      footer={
        <nav aria-labelledby="topics-title">
          <h2 id="topics-title" className="mb-4 text-small text-mist">
            {contact.topicsTitle}
          </h2>
          <ul className="grid border-t border-paper/15 sm:grid-cols-2 lg:grid-cols-4">
            {contact.topics.map((topic, i) => (
              <li key={topic.title} className="border-b border-paper/15 lg:border-b-0">
                <a href={mailto(topic.subject)} data-topic={i + 1} className="group flex h-full flex-col gap-1 py-5 pr-6">
                  <span className="flex items-baseline justify-between gap-4 font-display text-[1.5rem] leading-tight">
                    <span className="underline decoration-transparent decoration-1 underline-offset-[0.18em] transition-colors group-hover:decoration-current">
                      {topic.title}
                    </span>
                    <svg
                      aria-hidden="true"
                      width="11"
                      height="11"
                      viewBox="0 0 10 10"
                      fill="none"
                      className="shrink-0 text-mist transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-paper"
                    >
                      <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.1" />
                    </svg>
                  </span>
                  <span className="text-small text-mist">{topic.body}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      }
    />
  );
}
