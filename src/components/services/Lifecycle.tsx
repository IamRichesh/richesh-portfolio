"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { capabilities, stages } from "@/content/profile";

const ease = [0.23, 1, 0.32, 1] as const;

/**
 * ARIA tabs over the four SOC stages. Every panel is server-rendered into the HTML
 * (inactive ones are `hidden`), so crawlers and agents read all of it.
 */
export function Lifecycle() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const reduce = useReducedMotion();

  const onKey = (e: React.KeyboardEvent) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    let next = delta === undefined ? null : (active + delta + stages.length) % stages.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = stages.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="bezel">
      <div className="bezel-core overflow-hidden">
        <div role="tablist" aria-label="Security operations workflow" onKeyDown={onKey} className="relative grid grid-cols-2 border-b border-line md:grid-cols-4">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-px overflow-hidden md:block" aria-hidden="true">
            <div className="pulse-run h-px w-1/4 bg-gradient-to-r from-transparent via-signal/70 to-transparent" />
          </div>
          {stages.map((s, i) => {
            const selected = i === active;
            return (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`${id}-tab-${s.id}`}
                aria-selected={selected}
                aria-controls={`${id}-panel-${s.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group relative px-5 py-6 text-left transition-colors duration-200 md:px-7 md:py-8 [&:nth-child(n+2)]:border-l [&:nth-child(n+2)]:border-line ${
                  selected ? "text-paper" : "text-paper/45 hover:text-paper/80"
                }`}
              >
                {selected && (
                  <motion.span
                    layoutId={`${id}-stage`}
                    className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(114_243_223/0.1),rgb(114_243_223/0.02))]"
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}
                  />
                )}
                <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] tabular">
                  <span className={`size-1.5 rounded-full transition-colors duration-200 ${selected ? "bg-signal" : "bg-paper/25"}`} aria-hidden="true" />
                  {`STAGE ${i + 1}`}
                </span>
                <span className="mt-3 block text-2xl font-semibold tracking-[-0.03em] md:text-3xl">{s.verb}</span>
                {selected && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-signal" aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {stages.map((s, i) => {
          const items = capabilities.filter((c) => c.stage === s.id);
          const selected = i === active;
          return (
            <div
              key={s.id}
              role="tabpanel"
              id={`${id}-panel-${s.id}`}
              aria-labelledby={`${id}-tab-${s.id}`}
              hidden={!selected}
              tabIndex={0}
              className="focus-visible:outline-offset-[-4px]"
            >
                  <motion.div
                    key={selected ? "shown" : "idle"}
                    initial={reduce || !selected ? false : { opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.4, ease }}
                    className="grid gap-10 p-7 md:p-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
                  >
                    <div>
                      <h3 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.035em]">{s.title}</h3>
                      <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-paper/65">{s.line}</p>
                    </div>
                    <ul className="grid gap-4">
                      {items.map((c) => (
                        <li key={c.id} className="spotlight rounded-2xl border border-line bg-ink-soft/60 p-6">
                          <h4 className="text-lg font-semibold tracking-tight">{c.term}</h4>
                          <p className="mt-2 leading-relaxed text-paper/65">{c.plain}</p>
                          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] tracking-[0.08em] text-signal/80">
                            {c.tools.map((t) => (
                              <span key={t}>{t}</span>
                            ))}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
