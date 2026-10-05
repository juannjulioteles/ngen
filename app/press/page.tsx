import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { withNgen } from "@/components/brand/Ngen";
import { PageLink } from "@/components/ui/PageLink";

const { press } = pages;

export const metadata: Metadata = { title: "Press release", description: press.title };

/** The Trailblazers room, from NGEN's own site. */
const photo = {
  src: "https://www.ngennetwork.org/home/hero-ngen-new-group-3200.webp",
  alt: "NGEN student founders at the Trailblazers Conference in New York",
  width: 1679,
  height: 1119,
};

const domain = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/**
 * The launch announcement, set as a letter: one readable column, short
 * paragraphs, signed by the team, then the press NGEN founders have earned.
 */
export default function PressPage() {
  return (
    <article className="bg-stone text-ink">
      <div className="wrap pt-[clamp(8rem,13vw,10rem)] pb-[clamp(5rem,10vw,8rem)]">
        <div className="mx-auto max-w-[42rem]">
          <header className="flex flex-col gap-8">
            <p className="flex items-center justify-between border-b border-ink/12 pb-4 text-small text-graphite">
              <span>{press.kicker}</span>
              <time>{press.date}</time>
            </p>
            <h1 className="font-display text-h1">{press.title}</h1>
          </header>

          <figure className="mt-12 flex flex-col gap-3">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 672px, 100vw"
              className="w-full rounded-xl"
              priority
            />
            <figcaption className="text-small text-graphite">{photo.alt}.</figcaption>
          </figure>

          <div className="mt-12 flex flex-col gap-6 text-lead text-ink/85">
            {press.body.map((p) => (
              <p key={p}>{withNgen(p)}</p>
            ))}
          </div>

          <footer className="mt-12 flex flex-col gap-1 border-t border-ink/12 pt-6">
            <p className="font-display text-h3">{withNgen(press.signature)}</p>
            <p className="text-small text-graphite">{press.date}</p>
          </footer>

          <section aria-labelledby="coverage-title" className="mt-[clamp(4rem,8vw,6rem)]">
            <h2 id="coverage-title" className="mb-4 text-small text-graphite">
              {withNgen(press.coverageTitle)}
            </h2>
            <ul className="border-b border-ink/12">
              {site.startups.items.map((s) => (
                <li key={s.press.href} className="border-t border-ink/12">
                  <a
                    href={s.press.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="font-display text-[1.25rem] leading-snug underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors group-hover:decoration-current">
                      {s.press.title}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-small text-graphite">
                      {domain(s.press.href)}
                      <svg aria-hidden="true" width="9" height="9" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <p className="text-small text-graphite">
              {press.contact}:{" "}
              <a href={`mailto:${site.links.email}?subject=${encodeURIComponent(`${site.name}: press`)}`} className="link text-ink">
                {site.links.email}
              </a>
            </p>
            <PageLink href="/" className="link text-small">
              {press.back}
            </PageLink>
          </div>
        </div>
      </div>
    </article>
  );
}
