import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, DownloadSimple } from "@phosphor-icons/react/ssr";
import { person, targetRoles } from "@/content/profile";

const signals = [
  { k: "ROLE", v: "Consultant · Eviden" },
  { k: "SINCE", v: "Feb 2022" },
  { k: "BASE", v: "Pune, India" },
  { k: "NEXT", v: "AI security" },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-rows-[1fr_auto] px-4 pb-10 pt-32 md:px-8 md:pt-40"
    >
      <div className="grid content-center gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
        <div>
          <p className="rise flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-signal" style={{ "--i": 0 } as React.CSSProperties}>
            <span className="h-px w-8 bg-signal" aria-hidden="true" />
            SECURITY OPERATIONS CONSULTANT
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(3.4rem,11vw,10.5rem)] font-semibold leading-[0.86] tracking-[-0.055em]"
          >
            <span className="rise block" style={{ "--i": 1 } as React.CSSProperties}>Richesh</span>
            <span className="rise block text-paper/40" style={{ "--i": 2 } as React.CSSProperties}>
              Yadav<span className="text-signal">.</span>
            </span>
          </h1>

          <p
            className="rise mt-8 max-w-[46ch] text-lg leading-relaxed text-paper/80 md:text-xl"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            {person.statement}
          </p>

          <div className="rise mt-10 flex flex-wrap gap-3" style={{ "--i": 4 } as React.CSSProperties}>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-ink transition-[transform,box-shadow] duration-200 ease-out hover:shadow-[0_0_40px_rgb(114_243_223/0.35)] active:scale-[0.97]"
            >
              See the work
              <ArrowRight size={16} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-paper transition-[transform,border-color,background-color] duration-200 hover:border-signal/60 hover:bg-signal/5 active:scale-[0.97]"
            >
              Start a conversation
            </Link>
            <a
              href="/resume.pdf"
              download="Richesh_Yadav_Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl border border-line-strong px-5 py-3 text-sm font-medium text-paper transition-[transform,border-color,background-color] duration-200 hover:border-signal/60 hover:bg-signal/5 active:scale-[0.97]"
            >
              Download resume
              <DownloadSimple size={16} weight="bold" aria-hidden="true" />
            </a>
          </div>

          <div className="rise mt-8 flex flex-wrap items-center gap-2" style={{ "--i": 5 } as React.CSSProperties}>
            <span className="font-mono text-[10px] tracking-[0.18em] text-muted">OPEN TO</span>
            {targetRoles.map((role) => (
              <span key={role} className="rounded-full border border-line-strong px-3 py-1 text-xs text-paper/70">
                {role}
              </span>
            ))}
          </div>
        </div>

        <aside
          aria-label="Status"
          className="rise glass hidden rounded-2xl p-5 lg:block"
          style={{ "--i": 6 } as React.CSSProperties}
        >
          <p className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted">
            <span>OPERATOR STATUS</span>
            <span className="text-signal">● ACTIVE</span>
          </p>
          <dl className="mt-5 divide-y divide-line">
            {signals.map((s) => (
              <div key={s.k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted">{s.k}</dt>
                <dd className="text-sm text-paper">{s.v}</dd>
              </div>
            ))}
          </dl>
          <a
            href="https://orbit.richesh.top"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center justify-between gap-3 rounded-xl border border-line bg-ink/50 px-4 py-3 transition-colors duration-200 hover:border-signal/50"
          >
            <span>
              <span className="block font-mono text-[10px] tracking-[0.18em] text-signal">NOW LIVE</span>
              <span className="mt-0.5 block text-sm text-paper">Orbit — orbit.richesh.top</span>
            </span>
            <ArrowUpRight size={16} className="text-paper/50 transition-[transform,color] duration-300 group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:text-signal" aria-hidden="true" />
          </a>
        </aside>
      </div>

      <div className="flex items-end justify-between gap-6 pt-12 font-mono text-[10px] tracking-[0.2em] text-muted">
        <a href="#quick-facts" className="group inline-flex items-center gap-2 transition-colors hover:text-signal">
          <ArrowDownRight size={14} className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
          SCROLL TO WARP THE FIELD
        </a>
        <span className="hidden sm:block">{person.yearsInSecurityOps} YEARS IN SECURITY OPERATIONS</span>
        <span className="hidden md:block">18.5204° N / 73.8567° E · PUNE</span>
      </div>
    </section>
  );
}
