"use client";

import { useRef, type ReactNode } from "react";

/**
 * The admission ticket floating over the vine panel. It leans a few degrees
 * toward the pointer, like a card held up to the light. Still under reduced
 * motion and on touch.
 */
export function Ticket({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div className="absolute inset-0 flex items-center justify-end p-[clamp(1.25rem,5vw,4rem)]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="intro-ticket w-full max-w-[20rem]">
        <div ref={ref} className="transition-transform duration-500 ease-out will-change-transform">
          {children}
        </div>
      </div>
    </div>
  );
}
