"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * LazyMotion + `m` components keep Framer Motion's bundle to the DOM animation
 * features this site uses, fetched after hydration rather than up front.
 * `reducedMotion="user"` turns transforms off for visitors who ask for less
 * motion (CSS covers the rest).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
