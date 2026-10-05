"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { site, type Speaker } from "@/content/site";
import { PageLink } from "@/components/ui/PageLink";

const { speakers } = site;

/** Home: the past lineup as portraits, each opening a short bio. */
export function SpeakersPreview() {
  return (
    <section id="speakers" aria-labelledby="speakers-title" className="border-t border-ink/8">
      <div className="wrap py-[clamp(5rem,10vw,8rem)]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-3">
            <h2 id="speakers-title" className="font-display text-h2">
              {speakers.title}
            </h2>
            <p className="text-lead text-graphite">{speakers.subtitle}</p>
          </div>
          <PageLink href={speakers.more.href} className="link text-small text-graphite hover:text-ink">
            {speakers.more.label}
          </PageLink>
        </div>
        {/* One clean row on the home page: the speakers with photos; everyone is on /speakers */}
        <SpeakerGrid items={speakers.items.filter((s) => s.headshot).slice(0, 4)} />
      </div>
    </section>
  );
}

/**
 * Portrait cards: photo in greyscale until you point at it, the school tag on
 * the photo, name and role below. The whole card opens a dialog with the bio.
 */
export function SpeakerGrid({
  items,
  columns = "grid-cols-2 lg:grid-cols-4",
}: {
  items: Speaker[];
  /** Grid columns; pick a count that leaves no card alone on the last row. */
  columns?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<Speaker | null>(null);

  function open(speaker: Speaker) {
    setCurrent(speaker);
    dialog.current?.showModal();
  }

  return (
    <>
      <ul className={`grid gap-x-5 gap-y-10 ${columns}`}>
        {items.map((speaker) => (
          <li key={speaker.name}>
            <button
              type="button"
              onClick={() => open(speaker)}
              aria-haspopup="dialog"
              className="group flex w-full flex-col gap-4 text-left"
            >
              <Portrait speaker={speaker} sizes="(min-width: 1024px) 300px, 45vw" />
              <span className="flex flex-col gap-1">
                <span className="font-display text-[1.5rem] leading-tight">{speaker.name}</span>
                <span className="text-small text-graphite">{speaker.roles[0]}</span>
                <span className="mt-1 text-small underline decoration-ink/30 underline-offset-4 transition-colors group-hover:decoration-ink">
                  {speakers.bioLabel}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-labelledby="speaker-dialog-name"
        onClick={(e) => e.target === e.currentTarget && dialog.current?.close()}
        className="speaker-dialog m-auto w-[min(56rem,calc(100vw-2rem))] max-w-none overflow-hidden rounded-2xl bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/55 backdrop:backdrop-blur-sm"
      >
        {current && (
          <div className="grid md:grid-cols-[0.9fr_1.1fr]">
            <Portrait speaker={current} sizes="(min-width: 768px) 420px, 100vw" still />
            <div className="flex flex-col gap-5 p-7 md:p-10">
              {current.affiliation && (
                <span className="self-start rounded-full bg-ink/6 px-3 py-1 text-small">{current.affiliation}</span>
              )}
              <div>
                <h3 id="speaker-dialog-name" className="font-display text-h2">
                  {current.name}
                </h3>
                <p className="mt-2 text-small text-graphite">
                  {current.roles.map((role) => (
                    <span key={role} className="block">
                      {role}
                    </span>
                  ))}
                </p>
              </div>
              <p className="text-base leading-relaxed text-graphite">{current.bio}</p>
              <form method="dialog" className="mt-auto pt-2">
                <button className="btn btn-ghost">{speakers.close}</button>
              </form>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function Portrait({ speaker, sizes, still = false }: { speaker: Speaker; sizes: string; still?: boolean }) {
  const initials = speaker.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <span className={`relative block aspect-[4/5] w-full overflow-hidden bg-stone-2 ${still ? "max-md:aspect-[5/4]" : "rounded-xl"}`}>
      {speaker.headshot ? (
        <Image
          src={speaker.headshot.src}
          alt={still ? speaker.headshot.alt : ""}
          fill
          sizes={sizes}
          className={`object-cover object-top transition-[filter,transform] duration-700 ease-out ${
            still ? "" : "grayscale group-hover:scale-[1.03] group-hover:grayscale-0"
          }`}
        />
      ) : (
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-[4.5rem] text-ink/25">
          {initials}
        </span>
      )}
      {!still && speaker.affiliation && (
        <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-small backdrop-blur">
          {speaker.affiliation}
        </span>
      )}
    </span>
  );
}
