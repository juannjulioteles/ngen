import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { InView } from "@/components/motion/InView";

const { mission } = site;

/**
 * The diagram's geometry: three equal circles on an equilateral triangle
 * (side 96, radius 100), so the shared centre is a balanced, rounded
 * triangle. Each name sits just outside its own circle, clear of every line.
 * Order follows `mission.audiences`.
 */
const R = 100;
const CIRCLES = [
  { cx: 210, cy: 138, label: { x: 210, y: 26, anchor: "middle" } },
  { cx: 162, cy: 221, label: { x: 70, y: 336, anchor: "middle" } },
  { cx: 258, cy: 221, label: { x: 350, y: 336, anchor: "middle" } },
] as const;
/** Centroid of the three centres: the middle of the shared area. */
const CENTRE = { x: 210, y: (138 + 221 + 221) / 3 };

/**
 * The three people the conference brings together, as a diagram: student
 * founders, influential leaders and sponsors, with the room itself (face to
 * face) where all three overlap. Below it, what each of them gets.
 */
export function Mission() {
  return (
    <section aria-labelledby="mission-title" className="bg-ink text-paper">
      <InView className="wrap py-[clamp(5rem,10vw,8rem)]">
        <h2 id="mission-title" className="reveal text-center font-display text-h2 text-paper/90">
          {mission.title}
        </h2>

        <div className="mt-14 border border-paper/12 px-6 py-10 md:px-10 lg:py-14">
          <Venn />
          <ul className="mt-10 grid gap-x-10 gap-y-10 md:grid-cols-3">
            {mission.audiences.map((a, i) => (
              <li key={a.title} className="reveal flex flex-col gap-3 border-t border-paper/15 pt-5" style={{ "--d": `${0.5 + i * 0.12}s` } as CSSProperties}>
                <h3 className="font-display text-h3">{a.title}</h3>
                <p className="text-base text-paper/80">{a.who}</p>
                <ul className="mt-1 flex flex-col gap-2 text-small text-mist">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-mist/60" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

      </InView>
    </section>
  );
}

function Venn() {
  const names = mission.audiences.map((a) => a.title);
  return (
    <svg
      viewBox="0 0 420 350"
      className="venn mx-auto block w-full max-w-[30rem]"
      role="img"
      aria-label={`${names.join(", ")}: ${mission.center}, where all three meet`}
    >
      <defs>
        <pattern id="venn-lines" width="5" height="10" patternUnits="userSpaceOnUse">
          <line x1="0.5" y1="0" x2="0.5" y2="10" stroke="currentColor" strokeWidth="0.8" />
        </pattern>
        <clipPath id="venn-a">
          <circle cx={CIRCLES[0].cx} cy={CIRCLES[0].cy} r={R} />
        </clipPath>
        <clipPath id="venn-b">
          <circle cx={CIRCLES[1].cx} cy={CIRCLES[1].cy} r={R} />
        </clipPath>
      </defs>
      {/* Hatch only where all three circles overlap */}
      <g className="venn-fill" clipPath="url(#venn-a)">
        <g clipPath="url(#venn-b)">
          <circle cx={CIRCLES[2].cx} cy={CIRCLES[2].cy} r={R} fill="url(#venn-lines)" opacity="0.45" />
        </g>
      </g>
      {CIRCLES.map((c, i) => (
        <circle
          key={i}
          className="venn-ring"
          cx={c.cx}
          cy={c.cy}
          r={R}
          pathLength={1}
          style={{ transitionDelay: `${i * 0.2}s` }}
        />
      ))}
      {CIRCLES.map((c, i) => (
        <text key={names[i]} x={c.label.x} y={c.label.y} textAnchor={c.label.anchor} className="venn-label fill-mist text-[14px]">
          {names[i]}
        </text>
      ))}
      <text
        x={CENTRE.x}
        y={CENTRE.y + 6}
        textAnchor="middle"
        className="venn-label fill-paper stroke-ink font-display text-[17px] [paint-order:stroke] [stroke-width:6px]"
      >
        {mission.center}
      </text>
    </svg>
  );
}
