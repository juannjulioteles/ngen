import type { Metadata } from "next";
import Image from "next/image";
import { pages, site } from "@/content/site";
import { NgenMark, withNgen } from "@/components/brand/Ngen";
import { PageLink } from "@/components/ui/PageLink";

const { press } = pages;

export const metadata: Metadata = { title: "Press release", description: press.title };

const photo = site.photos.trailblazers;

const domain = (href: string) => new URL(href).hostname.replace(/^www\./, "");

/**
 * The launch announcement, set the way Decade sets its release
 * (decade.com/en/newsroom/release): the team photo across the full width
 * under the nav, then one narrow centred column with the label and date, the
 * title, short paragraphs, a centred sign-off, and the press as a list of
 * rows, each with its logo tile, headline, site and arrow.
 */
export default function PressPage() {
  return (
    <article className="bg-stone text-ink">
      {/* Greyscale at rest, colour on hover, like every people photo on the site */}
      <div className="group relative h-[clamp(18rem,41vw,37rem)] w-full overflow-hidden bg-stone-2">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[50%_55%] grayscale transition-[filter] duration-700 ease-out group-hover:grayscale-0"
        />
        {/* A soft stone fade under the nav, so the wordmark reads over the busy ceiling */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-linear-to-b from-stone/85 to-transparent" />
      </div>

      <div className="wrap pt-[clamp(3.5rem,6vw,4.5rem)] pb-[clamp(5rem,10vw,8rem)]">
        <div className="mx-auto max-w-[36rem]">
          <header className="flex flex-col gap-5">
            <p className="flex items-baseline justify-between text-small text-graphite">
              <span>{press.kicker}</span>
              <time>{press.date}</time>
            </p>
            <h1 className="font-display text-[clamp(2.25rem,1.6rem+2.4vw,3rem)] leading-[1]">{press.title}</h1>
          </header>

          <div className="mt-12 flex flex-col gap-4 text-base text-graphite [&>p]:[text-wrap:pretty]">
            {press.body.map((p) => (
              <p key={p}>{withNgen(p)}</p>
            ))}
          </div>

          {/* Signed like a letter, centred: the mark where a signature would be, then who and when */}
          <footer className="mt-16 flex flex-col items-center gap-1 text-center">
            <NgenMark tone="ink" className="mb-4 h-10" />
            <p className="text-small text-ink">{withNgen(press.signature)}</p>
            <p className="text-small text-graphite">{press.date}</p>
          </footer>

          <section aria-labelledby="coverage-title" className="mt-12 border-t border-ink/10 pt-10">
            <h2 id="coverage-title" className="mb-2 text-small text-graphite">
              {withNgen(press.coverageTitle)}
            </h2>
            <ul>
              {site.startups.items.map((s) => (
                <li key={s.press.href} className="border-b border-ink/8">
                  <a
                    href={s.press.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 py-5"
                  >
                    {/* The founders' own logo, where Decade shows the publication's */}
                    <span className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/8">
                      <Image
                        src={s.logo.src}
                        alt=""
                        width={s.logo.width}
                        height={s.logo.height}
                        unoptimized={s.logo.src.endsWith(".svg")}
                        className="max-h-7 w-auto max-w-8 object-contain"
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="font-display text-[1.125rem] leading-snug underline decoration-transparent decoration-1 underline-offset-[0.2em] transition-colors [text-wrap:pretty] group-hover:decoration-current">
                        {s.press.title}
                      </span>
                      <span className="text-small text-graphite">{domain(s.press.href)}</span>
                    </span>
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-1.5 shrink-0 text-graphite">
                      <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
            <PageLink href="/" className="link text-small">
              {press.back}
            </PageLink>
            <p className="text-small text-graphite">
              {press.contact}:{" "}
              <a href={`mailto:${site.links.email}?subject=${encodeURIComponent(`${site.name}: press`)}`} className="link text-ink">
                {site.links.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
