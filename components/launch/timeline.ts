/**
 * The launch sequence, in seconds from first paint. One source of truth: the
 * CSS reads these as custom properties (see `timelineCss`) and the score
 * schedules its sounds against the same numbers.
 *
 *   0.1  dark, letterbox closed: "NGEN presents"
 *   0.9  three hard cuts, each figure counting up: 3 / 18 / $30M
 *   3.2  montage: the firms behind past speakers and alumni, one per beat
 *   4.7  "Now, a bigger stage." and, beneath it, New York City
 *   6.0  lights up, the title rises line by line, a light sweeps the letters,
 *        the vine grows beside it
 *   7.7  letterbox opens, nav and details settle; the page is live
 */
export const T = {
  studio: 0.1,
  studioLength: 0.75,
  cuts: [0.9, 1.65, 2.4],
  cutLength: 0.75,
  countLength: 0.5,
  montage: 3.2,
  flash: 0.2,
  turn: 4.7,
  turnLength: 1.25,
  riser: 5.0,
  title: 6.0,
  lineStagger: 0.16,
  vine: 5.85,
  sheen: 6.35,
  bars: 7.7,
  details: 7.8,
  end: 8.9,
} as const;

/** Leaf unfurl times inside <IvyVine />, relative to its delay. */
export const LEAF_TIMES = [0.6, 0.8, 1.0, 1.4];

export const timelineCss = (montageCount: number) =>
  `:root{${[
    ["studio-length", T.studioLength],
    ["cut-length", T.cutLength],
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
    .map(([k, v]) => `--t-${k}:${v}s`)
    .join(";")}}`;
