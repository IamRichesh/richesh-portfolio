/**
 * Mutable scroll/pointer signal shared between DOM listeners and the WebGL loop.
 * Deliberately NOT React state: continuous values would re-render the tree on every
 * frame. Listeners write raw values; the render loop reads and smooths them.
 */
export const scrollSignal = {
  /** Raw scroll offset in px. */
  y: 0,
  /** Raw page progress, 0 → 1. */
  progress: 0,
  /** Smoothed progress, written by the render loop. */
  smoothProgress: 0,
  /** Smoothed signed velocity in viewports/second, clamped to -1 → 1. */
  velocity: 0,
  /** Normalised pointer, -1 → 1. */
  pointerX: 0,
  pointerY: 0,
};

let attached = 0;
let frame = 0;

function read() {
  frame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollSignal.y = window.scrollY;
  scrollSignal.progress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
}

/** rAF-coalesced: any number of scroll events per frame cost one layout read. */
function onScroll() {
  if (!frame) frame = requestAnimationFrame(read);
}

function onPointer(e: PointerEvent) {
  scrollSignal.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
  scrollSignal.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
}

/** Ref-counted so multiple consumers share one set of passive listeners. */
export function attachScrollSignal() {
  if (attached++ === 0) {
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
  }
  return () => {
    if (--attached === 0) {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onPointer);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}
