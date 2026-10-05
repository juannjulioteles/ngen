"use client";

import { site } from "@/content/site";
import { getCountdown, getEventTime } from "@/lib/event";
import { useNow } from "@/lib/use-now";

const target = getEventTime();

/** "In 182 days" under the date, once a date is set. Renders nothing until then. */
export function DaysAway({ className }: { className?: string }) {
  const now = useNow();
  if (target === null || now === null || now > target) return null;
  return <span className={className}>{site.labels.daysAway(getCountdown(target, now).days)}</span>;
}
