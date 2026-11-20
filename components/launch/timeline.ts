/**
 * The launch sequence, in seconds from first paint. One source of truth: the
 * CSS reads these as custom properties (see `timelineCss`) and the score
 * schedules its sounds against the same numbers.
 *
 *   0.1  dark, letterbox closed: "NGEN presents"
 *   0.75 three cuts. Each figure sharpens, then counts from 0 to its value:
 *        3 / 20+ / $30M
 *   7.65 montage: the firms behind past speakers and alumni, one per beat
 *   8.75 "Now, a bigger stage." and, beneath it, New York City
 *   9.65 lights up, the title rises line by line, a light sweeps the letters,
 *        the vine grows beside it
 *   11.0 letterbox opens, nav and details settle; the page is live
 *
 * The count waits until the cut is sharp (12% of the cut, 0.28s), then runs
 * for 1.5s. The frame stays up through that count so it is not still blurred,
 * or already gone, while the number is climbing.
 */
export const T = {
  studio: 0.1,
  studioLength: 0.55,
  cuts: [0.75, 3.05, 5.35],
  cutLength: 2.3,
  countDelay: 0.28,
  countLength: 1.5,
  montage: 7.65,
  flash: 0.15,
  turn: 8.75,
  turnLength: 0.95,
  riser: 8.95,
  title: 9.65,
  lineStagger: 0.16,
  vine: 9.5,
  sheen: 10,
  bars: 11,
  details: 11.1,
  end: 12,
} as const;

/** Leaf unfurl times inside <IvyVine />, relative to its delay. */
export const LEAF_TIMES = [0.6, 0.8, 1.0, 1.4];

export const timelineCss = (montageCount: number) =>
  `:root{${[
    ["studio-length", T.studioLength],
    ["cut-length", T.cutLength],
    ["count-delay", T.countDelay],
    ["count-length", T.countLength],
    ["flash", T.flash],
    ["montage-length", montageCount * T.flash],
    ["turn", T.turn],
    ["turn-length", T.turnLength],
    ["title", T.title],
    ["line-stagger", T.lineStagger],
    ["sheen", T.sheen],
    ["bars", T.bars],
    ["details", T.details],
    ["end", T.end],
  ]
    .map(([k, v]) => `--t-${k}:${+Number(v).toFixed(3)}s`)
    .join(";")}}`;
