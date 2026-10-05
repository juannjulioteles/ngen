"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Sets `data-in` on itself the first time it scrolls into view. CSS does the
 * rest (`.reveal`, the diagram lines), so nothing re-renders.
 */
export function InView({
  className,
  children,
  margin = "0px 0px -15% 0px",
}: {
  className?: string;
  children: ReactNode;
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-in", "");
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
