import { IvyVine } from "@/components/brand/IvyVine";
import { InView } from "@/components/motion/InView";

/**
 * The faint vine in a dark section's lower right corner, drawing itself the
 * first time the section scrolls into view (the same vine on Sponsors, About
 * and home). Put it inside a positioned box with `overflow-hidden`, and give
 * the content `relative` so it paints above the vine.
 */
export function VineCorner() {
  return (
    <InView className="pointer-events-none absolute inset-0">
      <IvyVine
        drawOnView
        delay={0.3}
        className="absolute right-[clamp(0rem,3vw,3rem)] bottom-[-8%] h-[78%] text-paper/10"
      />
    </InView>
  );
}
