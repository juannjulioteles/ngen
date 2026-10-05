import { site } from "@/content/site";
import { PageLink } from "@/components/ui/PageLink";
import { BrandLogo } from "@/components/brand/BrandLogo";

const { strip } = site;

/** Proof under the fold: the firms behind past speakers and alumni, and the one piece of news. */
export function Strip() {
  return (
    <section aria-label={strip.label} className="border-y border-ink/8 bg-stone-2">
      <div className="wrap flex flex-col items-center gap-10 py-14">
        <div className="grid w-full items-center gap-6 lg:grid-cols-[10rem_1fr]">
          <p className="text-small text-graphite max-lg:text-center">{strip.label}</p>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 xl:justify-between">
            {strip.firms.map((f) => (
              <li key={f.name} className="flex items-center whitespace-nowrap">
                <BrandLogo brand={f} />
              </li>
            ))}
          </ul>
        </div>
        <PageLink
          href={strip.news.href}
          className="group inline-flex max-w-full items-center gap-3 rounded-2xl bg-ink/6 sm:rounded-full py-2 pr-4 pl-3 text-small transition-colors hover:bg-ink/10"
        >
          <span aria-hidden="true" className="relative flex size-2 shrink-0">
            <span className="absolute inset-0 rounded-full bg-forest opacity-60 motion-safe:animate-ping" />
            <span className="relative size-2 rounded-full bg-forest" />
          </span>
          <span>{strip.news.label}</span>
          <svg aria-hidden="true" width="7" height="12" viewBox="0 0 7 12" fill="none" className="shrink-0 text-graphite transition-transform group-hover:translate-x-0.5">
            <path d="M1 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </PageLink>
      </div>
    </section>
  );
}
