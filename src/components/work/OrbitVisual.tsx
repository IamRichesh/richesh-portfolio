import { Barbell, BookOpenText, CheckSquareOffset, Wallet } from "@phosphor-icons/react/ssr";

const nodes = [
  { label: "Finance", Icon: Wallet, ring: 0, angle: 20 },
  { label: "Body", Icon: Barbell, ring: 1, angle: 140 },
  { label: "Journal", Icon: BookOpenText, ring: 0, angle: 210 },
  { label: "Habits", Icon: CheckSquareOffset, ring: 1, angle: 320 },
];

const rings = [
  { size: "62%", dur: "46s" },
  { size: "92%", dur: "70s" },
];

/** Orbit's product idea drawn as a system: four life spaces circling one person. */
export function OrbitVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[30rem]" role="img" aria-label="Diagram of Orbit: finance, body, journal and habits orbiting one connected person">
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgb(114_243_223/0.16),transparent_65%)] orbit-breathe" />
      <div className="absolute inset-[4%] rounded-full border border-dashed border-line" />

      {rings.map((ring, r) => (
        <div
          key={r}
          className="orbit-spin absolute left-1/2 top-1/2 rounded-full border border-line-strong/70"
          style={{ width: ring.size, height: ring.size, translate: "-50% -50%", "--dur": ring.dur } as React.CSSProperties}
        >
          {nodes
            .filter((n) => n.ring === r)
            .map(({ label, Icon, angle }) => (
              <div
                key={label}
                className="absolute size-0"
                style={{
                  left: `${50 + 50 * Math.cos((angle * Math.PI) / 180)}%`,
                  top: `${50 + 50 * Math.sin((angle * Math.PI) / 180)}%`,
                }}
              >
                <div className="orbit-counter w-max -translate-x-1/2 -translate-y-1/2" style={{ "--dur": ring.dur } as React.CSSProperties}>
                  <span className="flex items-center gap-2 rounded-full border border-line-strong bg-ink/90 py-1.5 pl-1.5 pr-3 text-xs font-medium text-paper shadow-[0_10px_30px_-10px_rgb(0_0_0/0.8)]">
                    <span className="grid size-6 place-items-center rounded-full bg-signal/15 text-signal">
                      <Icon size={13} weight="bold" aria-hidden="true" />
                    </span>
                    {label}
                  </span>
                </div>
              </div>
            ))}
        </div>
      ))}

      <div className="absolute left-1/2 top-1/2 grid size-[30%] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-signal/40 bg-ink shadow-[0_0_60px_-10px_rgb(114_243_223/0.5),inset_0_1px_0_rgb(255_255_255/0.08)]">
        <div className="text-center">
          <p className="font-mono text-[9px] tracking-[0.3em] text-muted">YOU</p>
          <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">orbit</p>
        </div>
      </div>
    </div>
  );
}
