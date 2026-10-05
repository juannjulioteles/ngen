import type { CSSProperties } from "react";
import styles from "./IvyVine.module.css";
import { LEAVES, STEM_PATH, VINE_VIEWBOX } from "./vine-geometry";

/**
 * Per-leaf motion, base to tip. `delay` is when the drawing stem reaches the
 * leaf: the attachment points sit at 18%, 48%, 75% and 100% of the stem's
 * length, mapped through the stem's easing curve.
 */
const LEAF_MOTION = [
  { delay: 0.6, from: -26, swayDuration: 6, swayAngle: 3.5 },
  { delay: 0.8, from: 24, swayDuration: 5.4, swayAngle: -3 },
  { delay: 1.0, from: -26, swayDuration: 7.2, swayAngle: 4 },
  { delay: 1.4, from: 20, swayDuration: 4.8, swayAngle: -5 },
] as const;

const UNFURL_DURATION = 0.9;

/** Seconds until the whole vine (stem and every leaf) has finished drawing. */
export const VINE_DRAW_DURATION = 0.2 + 1.5 + 0.6;

type IvyVineProps = {
  /** Draw the stem, unfurl the leaves, then sway. */
  animate?: boolean;
  /** Continuous sway. Defaults to `animate`. */
  sway?: boolean;
  /** Seconds to wait before the sequence starts. */
  delay?: number;
  /** Accessible name. Omit for a decorative mark. */
  label?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * The conference's ivy vine as inline SVG. Colour follows `currentColor`, size follows
 * the element's height. Requires <IvySprite /> once on the page.
 *
 * All motion is CSS, so it starts at first paint (before hydration) and stops
 * under `prefers-reduced-motion`.
 */
export function IvyVine({
  animate = false,
  sway = animate,
  delay = 0,
  label,
  className,
  style,
}: IvyVineProps) {
  const classes = [
    styles.root,
    animate && styles.drawing,
    sway && styles.swaying,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${VINE_VIEWBOX.width} ${VINE_VIEWBOX.height}`}
      className={classes}
      style={{ ...style, "--vine-delay": `${delay}s` } as CSSProperties}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path className={styles.stem} d={STEM_PATH} pathLength={1} />
      {LEAVES.map((leaf, i) => {
        const m = LEAF_MOTION[i];
        const [x, y] = leaf.origin;
        const swayDelay = animate ? delay + m.delay + UNFURL_DURATION + 0.2 : i * 0.4;
        return (
          <g key={leaf.id} transform={`translate(${x} ${y})`}>
            <g
              className={styles.swayer}
              style={
                {
                  "--sway-duration": `${m.swayDuration}s`,
                  "--sway-angle": `${m.swayAngle}deg`,
                  "--sway-delay": `${swayDelay}s`,
                } as CSSProperties
              }
            >
              <g
                className={styles.unfurl}
                style={
                  {
                    "--leaf-delay": `${m.delay}s`,
                    "--leaf-from": `${m.from}deg`,
                  } as CSSProperties
                }
              >
                <use
                  href={`#${leaf.id}`}
                  className={styles.leaf}
                  transform={`translate(${-x} ${-y})`}
                />
              </g>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
