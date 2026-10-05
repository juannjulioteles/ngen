/**
 * The launch sequence, in seconds from first paint. One source of truth: the
 * CSS reads these as custom properties (see `timelineCss`) and the score
 * schedules its sounds against the same numbers.
 *
 *   0.1  dark, letterbox closed: "NGEN presents"
 *   1.0  three cuts, each figure counting up and holding long enough to read:
 *        3 / 18 / $30M
 *   4.75 montage: the firms behind past speakers and alumni, one per beat
 *   6.25 "Now, a bigger stage." and, beneath it, New York City
 *   7.55 lights up, the title rises line by line, a light sweeps the letters,
 *        the vine grows beside it
 *   9.25 letterbox opens, nav and details settle; the page is live
 */
export const T = {
  studio: 0.1,
  studioLength: 0.75,
  cuts: [1.0, 2.25, 3.5],
  cutLength: 1.2,
  countLength: 0.8,
  montage: 4.75,
  flash: 0.2,
  turn: 6.25,
  turnLength: 1.25,
  riser: 6.55,
  title: 7.55,
  lineStagger: 0.16,
  vine: 7.4,
  sheen: 7.9,
  bars: 9.25,
  details: 9.35,
  end: 10.45,
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
