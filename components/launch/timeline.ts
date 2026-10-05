/**
 * The launch sequence, in seconds from first paint. One source of truth: the
 * CSS reads these as custom properties (see `timelineCss`) and the score
 * schedules its sounds against the same numbers.
 *
 *   0.1  dark, letterbox closed: "NGEN presents"
 *   0.75 three cuts, each figure counting up and holding long enough to read:
 *        3 / 18 / $30M
 *   3.3  montage: the firms behind past speakers and alumni, one per beat
 *   4.4  "Now, a bigger stage." and, beneath it, New York City
 *   5.3  lights up, the title rises line by line, a light sweeps the letters,
 *        the vine grows beside it
 *   6.65 letterbox opens, nav and details settle; the page is live
 *
 * Pace: each figure holds 0.85s (0.75s read as rushed, 1.2s as slow).
 */
export const T = {
  studio: 0.1,
  studioLength: 0.55,
  cuts: [0.75, 1.6, 2.45],
  cutLength: 0.85,
  countLength: 0.55,
  montage: 3.3,
  flash: 0.15,
  turn: 4.4,
  turnLength: 0.95,
  riser: 4.6,
  title: 5.3,
  lineStagger: 0.16,
  vine: 5.15,
  sheen: 5.65,
  bars: 6.65,
  details: 6.75,
  end: 7.65,
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
    .map(([k, v]) => `--t-${k}:${+Number(v).toFixed(3)}s`)
    .join(";")}}`;
