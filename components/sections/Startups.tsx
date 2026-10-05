import Image from "next/image";
import { site } from "@/content/site";
import { withNgen } from "@/components/brand/Ngen";

const { startups } = site;

/**
 * NGEN's featured startups: team photo, what they raised (or who backed
 * them), one line on what they do, and the press that covered it.
 */
export function Startups() {
  return (
    <section aria-labelledby="startups-title" className="border-t border-ink/8 bg-stone-2">
      <div className="wrap py-[clamp(5rem,10vw,8rem)]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[34rem] flex-col gap-3">
            <h2 id="startups-title" className="font-display text-h2">
              {startups.title}
            </h2>
            <p className="text-lead text-graphite">{withNgen(startups.intro)}</p>
          </div>
          <a href={startups.more.href} className="link text-small text-graphite hover:text-ink">
            {startups.more.label}
          </a>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {startups.items.map((s) => (
            <li key={s.name}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-paper ring-1 ring-ink/6 transition-shadow duration-500 hover:shadow-[0_24px_50px_-28px_rgb(21_24_21/0.35)]">
                <div className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-small font-medium backdrop-blur">
                    {s.badge}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white ring-1 ring-ink/8">
                      <Image
                        src={s.logo.src}
                        alt=""
                        width={s.logo.width}
                        height={s.logo.height}
                        unoptimized={s.logo.src.endsWith(".svg")}
                        className="max-h-7 w-auto max-w-8 object-contain"
                      />
                    </span>
                    <h3 className="font-display text-h3">{s.name}</h3>
                  </div>
                  <p className="text-base text-graphite">{s.description}</p>
                  <a
                    href={s.press.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto flex items-start gap-2 border-t border-ink/8 pt-4 text-small text-graphite transition-colors hover:text-ink"
                  >
                    <span className="line-clamp-2">{s.press.title}</span>
                    <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none" className="mt-1.5 shrink-0">
                      <path d="M2 8L8 2M3.5 2H8v4.5" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
