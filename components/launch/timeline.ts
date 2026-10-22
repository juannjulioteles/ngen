/**
 * The launch sequence, in seconds from first paint. One source of truth: the
 * CSS reads these as custom properties (see `timelineCss`) and the score
 * schedules its sounds against the same numbers.
 *
 *   0.1  dark, letterbox closed: "NGEN presents"
 *   0.75 three cuts, each figure counting up and holding long enough to read:
 *        3 / 20+ / $30M
 *   3.8  "Now, a bigger stage." and, beneath it, New York City
 *   4.7  lights up, the title rises line by line, a light sweeps the letters,
 *        the vine grows beside it
 *   6.05 letterbox opens, nav and details settle; the page is live
 *
 * Pace: each figure holds 1s (0.75s read as rushed, 1.2s as slow). The firm
 * montage that followed them (seven names in a second) went: too much to read
 * at once, and the logo strip below the hero names the same firms.
 */
export const T = {
  studio: 0.1,
  studioLength: 0.55,
  cuts: [0.75, 1.75, 2.75],
  cutLength: 1,
  countLength: 0.55,
  turn: 3.8,
  turnLength: 0.95,
  riser: 4,
  title: 4.7,
  lineStagger: 0.16,
  vine: 4.55,
  sheen: 5.05,
  bars: 6.05,
  details: 6.15,
  end: 7.05,
} as const;

/** Leaf unfurl times inside <IvyVine />, relative to its delay. */
export const LEAF_TIMES = [0.6, 0.8, 1.0, 1.4];

export const timelineCss = () =>
  `:root{${[
    ["studio-length", T.studioLength],
    ["cut-length", T.cutLength],
    ["count-length", T.countLength],
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
