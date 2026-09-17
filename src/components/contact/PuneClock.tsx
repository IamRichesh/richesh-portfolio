"use client";

import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(cb: () => void) {
  const t = setInterval(cb, 15_000);
  return () => clearInterval(t);
}

const snapshot = () => fmt.format(Date.now());

/** Local time in Pune, so visitors know whether a reply is likely today. */
export function PuneClock() {
  const time = useSyncExternalStore(subscribe, snapshot, () => null);
  const hour = time ? Number(time.slice(0, 2)) : null;
  const period = hour === null ? null : hour >= 6 && hour < 18 ? "Daytime" : hour >= 18 && hour < 22 ? "Evening" : "Night";

  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted">LOCAL TIME · PUNE, IST</p>
        <p className="mt-2 text-5xl font-semibold tracking-[-0.04em] tabular" suppressHydrationWarning>
          {time ?? "--:--"}
        </p>
      </div>
      <p className="flex items-center gap-2 pb-1.5 text-sm text-paper/65">
        <span className={`size-1.5 rounded-full ${period === "Daytime" ? "live-dot bg-signal" : "bg-paper/30"}`} aria-hidden="true" />
        {period ? `${period} in Pune` : "Checking…"}
      </p>
    </div>
  );
}
