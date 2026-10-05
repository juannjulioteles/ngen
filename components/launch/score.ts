import { LEAF_TIMES, T } from "./timeline";

/**
 * The launch score, synthesised live with Web Audio so there are no files to
 * ship and every hit lands on its cut:
 *
 *   drone    a low, slightly detuned A that sits under the whole sequence
 *   boom     a sub drop on each hard cut, a little higher each time
 *   ticks    a rising run while each figure counts up, a click per montage cut
 *   riser    filtered noise climbing into the title, cut dead before it lands
 *   bloom    the title: a deep boom and an A major chord whose filter opens
 *   leaves   one soft chime per leaf as the vine unfurls, panned across
 *
 * Everything runs through one room reverb and a compressor.
 * `offset` starts the score part-way through (sound switched on mid-sequence).
 *
 * Returns a stop function, or null when the browser won't play sound yet
 * (no click or key press on the page so far): the caller tries again on the
 * first interaction, from that moment, so the score stays in sync.
 */
export function playScore(offset = 0, montageCount = 7): (() => void) | null {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  if (ctx.state === "suspended") {
    ctx.close();
    return null;
  }
  const now = ctx.currentTime + 0.05;
  const at = (t: number) => now + Math.max(0, t - offset);
  const future = (t: number) => t >= offset - 0.05;

  // Master: compressor, then a gentle overall level.
  const master = ctx.createGain();
  master.gain.value = 0.85;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 4;
  master.connect(comp).connect(ctx.destination);

  // Room: a generated impulse, decaying noise over 2.8s.
  const reverb = ctx.createConvolver();
  reverb.buffer = impulse(ctx, 2.8);
  const wet = ctx.createGain();
  wet.gain.value = 0.32;
  reverb.connect(wet).connect(master);

  const send = (node: AudioNode, dry = 1) => {
    const d = ctx.createGain();
    d.gain.value = dry;
    node.connect(d).connect(master);
    node.connect(reverb);
  };

  const noise = noiseBuffer(ctx);

  // Drone, from the start until the title has bloomed.
  {
    const g = ctx.createGain();
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.value = 320;
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.16, at(1.4));
    g.gain.setValueAtTime(0.16, at(T.title));
    g.gain.exponentialRampToValueAtTime(0.0001, at(T.title + 3.5));
    for (const [f, type] of [
      [55, "sine"],
      [55.35, "sine"],
      [110, "triangle"],
    ] as const) {
      const o = ctx.createOscillator();
      o.type = type;
      o.frequency.value = f;
      o.connect(lp);
      o.start(ctx.currentTime);
      o.stop(at(T.title + 3.6));
    }
    lp.connect(g);
    send(g, 1);
  }

  // Hard cuts, each with a run of rising ticks while its figure counts up.
  T.cuts.forEach((t, i) => {
    if (!future(t)) return;
    boom(at(t), 88 + i * 12, 0.75);
    const steps = 9;
    for (let k = 0; k < steps; k++) {
      // Ease-out spacing, like the count: quick at first, settling at the end.
      const u = 1 - (1 - k / (steps - 1)) ** 2;
      tick(at(t + 0.04 + u * (T.countLength - 0.06)), 1400 + k * 90, 0.05);
    }
  });

  // Montage: one click per name, a low pulse on the downbeat.
  for (let k = 0; k < montageCount; k++) {
    const t = T.montage + k * T.flash;
    if (!future(t)) continue;
    tick(at(t), 2400, 0.09);
    if (k % 2 === 0) boom(at(t), 70, 0.35);
  }

  if (future(T.turn)) swell(at(T.turn - 0.35), 0.5, 0.12);

  // Riser into the title, cut 60ms short for the breath before the drop.
  if (future(T.title)) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.6;
    const g = ctx.createGain();
    const start = at(T.riser);
    const end = at(T.title - 0.06);
    bp.frequency.setValueAtTime(180, start);
    bp.frequency.exponentialRampToValueAtTime(5200, end);
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.42, end - 0.02);
    g.gain.linearRampToValueAtTime(0, end);
    src.connect(bp).connect(g);
    send(g, 0.8);
    src.start(start);
    src.stop(end + 0.05);
  }

  // The title lands: boom and a blooming A major chord.
  if (future(T.title)) {
    boom(at(T.title), 140, 1);
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.Q.value = 0.7;
    lp.frequency.setValueAtTime(260, at(T.title));
    lp.frequency.exponentialRampToValueAtTime(2600, at(T.title + 1.8));
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at(T.title));
    g.gain.exponentialRampToValueAtTime(0.22, at(T.title + 0.5));
    g.gain.exponentialRampToValueAtTime(0.0001, at(T.title + 5.5));
    lp.connect(g);
    send(g, 0.9);
    for (const f of [55, 82.41, 110, 138.59, 164.81, 220]) {
      for (const detune of [-6, 6]) {
        const o = ctx.createOscillator();
        o.type = f < 100 ? "sine" : "triangle";
        o.frequency.value = f;
        o.detune.value = detune;
        o.connect(lp);
        o.start(at(T.title));
        o.stop(at(T.title + 5.6));
      }
    }
  }

  // One chime per leaf, A major up high, panned left to right.
  const chimes = [880, 1318.5, 1760, 2217.5];
  LEAF_TIMES.forEach((lt, i) => {
    const t = T.vine + lt + 0.1;
    if (!future(t)) return;
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = chimes[i];
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, at(t));
    g.gain.exponentialRampToValueAtTime(0.07, at(t) + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, at(t) + 2.2);
    const pan = ctx.createStereoPanner();
    pan.pan.value = -0.6 + i * 0.4;
    o.connect(g).connect(pan);
    send(pan, 0.6);
    o.start(at(t));
    o.stop(at(t) + 2.3);
  });

  function boom(t: number, f0: number, level: number) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(34, t + 0.3);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.3);
    o.connect(g);
    send(g, 1);
    o.start(t);
    o.stop(t + 1.4);

    // The transient on top: a short bright tick.
    const n = ctx.createBufferSource();
    n.buffer = noise;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2400;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(level * 0.35, t);
    ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    n.connect(hp).connect(ng);
    send(ng, 1);
    n.start(t);
    n.stop(t + 0.06);
  }

  function tick(t: number, freq: number, level: number) {
    const o = ctx.createOscillator();
    o.type = "sine";
    o.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + 0.002);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    o.connect(g);
    send(g, 1);
    o.start(t);
    o.stop(t + 0.08);
  }

  function swell(t: number, length: number, level: number) {
    const n = ctx.createBufferSource();
    n.buffer = noise;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(400, t);
    lp.frequency.exponentialRampToValueAtTime(3000, t + length);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(level, t + length);
    g.gain.exponentialRampToValueAtTime(0.0001, t + length + 0.4);
    n.connect(lp).connect(g);
    send(g, 0.6);
    n.start(t);
    n.stop(t + length + 0.5);
  }

  return () => {
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    setTimeout(() => ctx.close(), 400);
  };
}

function noiseBuffer(ctx: AudioContext) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  return buf;
}

function impulse(ctx: AudioContext, seconds: number) {
  const length = ctx.sampleRate * seconds;
  const buf = ctx.createBuffer(2, length, ctx.sampleRate);
  for (let c = 0; c < 2; c++) {
    const data = buf.getChannelData(c);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 3;
  }
  return buf;
}
