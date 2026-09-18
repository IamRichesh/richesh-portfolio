"use client";

import { useEffect, useRef } from "react";
import { attachScrollSignal, scrollSignal } from "./scroll-signal";

/** Live scroll readout. Writes straight to the DOM each frame — no React re-renders. */
export function ScrollTelemetry() {
  const root = useRef<HTMLDivElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const vel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const detach = attachScrollSignal();
    let id = 0;
    const tick = () => {
      const p = scrollSignal.progress;
      if (pct.current) pct.current.textContent = String(Math.round(p * 100)).padStart(3, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (vel.current) {
        const v = scrollSignal.velocity;
        vel.current.textContent = `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(2)}`;
      }
      // Fade out over the last 3% of scroll so the HUD clears the footer instead of sitting on top of it.
      if (root.current) root.current.style.opacity = String(1 - Math.min(1, Math.max(0, (p - 0.97) / 0.03)));
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(id);
      detach();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="pointer-events-none fixed bottom-5 right-5 z-30 hidden items-center gap-4 rounded-full border border-line bg-ink/70 px-4 py-2 font-mono text-[10px] tracking-[0.18em] text-muted backdrop-blur-md transition-opacity duration-150 md:flex"
    >
      <span>
        SCROLL <span ref={pct} className="tabular-nums text-paper">000</span>%
      </span>
      <span className="relative h-px w-16 overflow-hidden bg-line">
        <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-signal" />
      </span>
      <span>
        VEL <span ref={vel} className="tabular-nums text-signal">+0.00</span>
      </span>
    </div>
  );
}
