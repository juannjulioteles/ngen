import { site } from "@/content/site";

const { event, labels } = site;

/** Event start as epoch ms, or null while the date is TBD or malformed. */
export function getEventTime(): number | null {
  if (!event.startsAt) return null;
  const time = Date.parse(event.startsAt);
  return Number.isNaN(time) ? null : time;
}

/** "April 16, 2027", formatted in the event's own time zone. */
export function formatEventDate(): string | null {
  const time = getEventTime();
  if (time === null) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: event.timeZone,
  }).format(time);
}

export function formatVenue(): string | null {
  const parts = [event.venue, event.city].filter(Boolean);
  return parts.length ? parts.join(", ") : null;
}

export const eventDateLabel = formatEventDate() ?? labels.dateTbd;
export const eventVenueLabel = formatVenue() ?? labels.venueTbd;

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdown(target: number, now: number): CountdownParts {
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
