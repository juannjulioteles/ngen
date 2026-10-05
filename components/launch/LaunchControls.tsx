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
 * Sound is on by default; where the browser holds it until the first
 * interaction, the bar says "Click for sound" and the first click starts it.
 */

const SEEN_KEY = "ilec-launch-seen";
/** Sound is on by default; a visitor who turns it off is remembered. */
const SOUND_KEY = "ilec-launch-sound";
const { launch } = site.hero;

type State = { playing: boolean; sound: boolean; pending: boolean };
let state: State = { playing: false, sound: false, pending: false };
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

function soundWanted() {
  try {
    return localStorage.getItem(SOUND_KEY) !== "off";
  } catch {
    return true;
  }
}

function rememberSound(on: boolean) {
  try {
    localStorage.setItem(SOUND_KEY, on ? "on" : "off");
  } catch {}
}

const GESTURES = ["pointerdown", "keydown", "touchstart"] as const;

/** Browsers hold sound until the first click or key press: start the score then, in sync. */
function onFirstGesture(e: Event) {
  // The sound button handles its own click.
  if (e.target instanceof Element && e.target.closest("[data-sound-toggle]")) return;
  waitForGesture(false);
  if (document.documentElement.dataset.intro === "play" && !stopSound) startSound();
}

function waitForGesture(on: boolean) {
  GESTURES.forEach((g) => (on ? window.addEventListener(g, onFirstGesture, true) : window.removeEventListener(g, onFirstGesture, true)));
  set({ pending: on });
}

function startSound(offset = elapsed()) {
  stopSound = playScore(offset, site.strip.firms.length);
  if (stopSound) {
    waitForGesture(false);
    set({ sound: true });
  } else {
    waitForGesture(true);
  }
}

function finish() {
  clearTimeout(endTimer);
  stopSound?.();
  stopSound = null;
  waitForGesture(false);
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
  if (soundWanted() && !stopSound) startSound();
}

function toggleSound() {
  if (stopSound) {
    stopSound();
    stopSound = null;
    set({ sound: false });
    rememberSound(false);
  } else {
    // A click is the gesture the browser waits for, so this always plays.
    startSound();
    rememberSound(true);
  }
}

function replay() {
  window.scrollTo({ top: 0, behavior: "instant" });
  stopSound?.();
  stopSound = null;
  // "Watch the launch, with sound": a click, so the score is allowed; arm() starts it.
  rememberSound(true);
  // Re-applying the attribute restarts every CSS animation from frame one.
  document.documentElement.dataset.intro = "play";
  // A beat for the styles to restart (a timer, so it also runs in background tabs).
  setTimeout(arm, 30);
}

/** Letterbox bars with the progress line, sound switch and skip. */
export function LaunchBars() {
  const { playing, sound, pending } = useLaunch();

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
          <button type="button" data-sound-toggle onClick={toggleSound} aria-pressed={sound} className="link py-2 hover:text-paper">
            {pending ? launch.soundPending : sound ? launch.soundOff : launch.soundOn}
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
