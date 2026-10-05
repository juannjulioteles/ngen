"use client";

import { useEffect, useSyncExternalStore } from "react";
import { site } from "@/content/site";
import { playScore } from "./score";
import { T } from "./timeline";

/**
 * Runtime for the launch sequence. The picture is pure CSS keyed off
 * `html[data-intro="play"]` (set before first paint by the script in the
 * layout), so it starts instantly and costs nothing once it ends. This file
 * only ends it, skips it, replays it, and switches the score on and off.
 */

const SEEN_KEY = "ilec-launch-seen";
const { launch } = site.hero;

type State = { playing: boolean; sound: boolean };
let state: State = { playing: false, sound: false };
const SERVER_STATE: State = state;
const listeners = new Set<() => void>();
let stopSound: (() => void) | null = null;
let endTimer: ReturnType<typeof setTimeout> | undefined;

function set(next: Partial<State>) {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
}

function useLaunch() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
    () => SERVER_STATE,
  );
}

/** Seconds into the sequence, read from the progress line's own animation clock. */
function elapsed() {
  const t = document.querySelector("[data-intro-clock]")?.getAnimations()[0]?.currentTime;
  return typeof t === "number" ? t / 1000 : 0;
}

function finish() {
  clearTimeout(endTimer);
  stopSound?.();
  stopSound = null;
  document.documentElement.dataset.intro = "skip";
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {}
  set({ playing: false, sound: false });
}

function arm() {
  set({ playing: true });
  clearTimeout(endTimer);
  endTimer = setTimeout(finish, Math.max(0, T.end - elapsed()) * 1000);
}

function toggleSound() {
  if (stopSound) {
    stopSound();
    stopSound = null;
    set({ sound: false });
  } else {
    stopSound = playScore(elapsed(), site.strip.firms.length);
    set({ sound: true });
  }
}

function replay() {
  window.scrollTo({ top: 0, behavior: "instant" });
  stopSound?.();
  // Re-applying the attribute restarts every CSS animation from frame one.
  document.documentElement.dataset.intro = "play";
  stopSound = playScore(0, site.strip.firms.length);
  set({ sound: true });
  requestAnimationFrame(arm);
}

/** Letterbox bars with the progress line, sound switch and skip. */
export function LaunchBars() {
  const { playing, sound } = useLaunch();

  useEffect(() => {
    if (document.documentElement.dataset.intro === "play") arm();
  }, []);

  // Scrolling away is a skip.
  useEffect(() => {
    if (!playing) return;
    const onScroll = () => window.scrollY > 40 && finish();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [playing]);

  return (
    <div className="intro-bars" aria-hidden={!playing || undefined}>
      <div className="intro-bar intro-bar-top" />
      <div className="intro-bar intro-bar-bottom">
        <span data-intro-clock className="intro-clock" />
        <div className="wrap flex h-full items-center justify-between text-small text-paper/80">
          <button type="button" onClick={toggleSound} aria-pressed={sound} className="link py-2 hover:text-paper">
            {sound ? launch.soundOff : launch.soundOn}
          </button>
          <button type="button" onClick={finish} className="link py-2 hover:text-paper">
            {launch.skip}
          </button>
        </div>
      </div>
    </div>
  );
}

/** "Watch the launch", shown once the sequence is over. */
export function ReplayLaunch({ className = "" }: { className?: string }) {
  const { playing } = useLaunch();
  if (playing) return null;
  return (
    <button type="button" onClick={replay} className={`link text-small text-graphite hover:text-ink ${className}`}>
      {launch.replay}
    </button>
  );
}
