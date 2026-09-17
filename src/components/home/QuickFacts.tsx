import { capabilities, person, quickFacts } from "@/content/profile";

/**
 * Plain-text profile summary placed directly after the hero.
 * Written for two readers: a skimming human, and an LLM/crawler that needs
 * unambiguous, quotable facts. Uses <dl> so every label/value pair is explicit.
 */
export function QuickFacts() {
  return (
    <section
      id="quick-facts"
      aria-labelledby="quick-facts-title"
      className="relative mx-auto max-w-[1400px] px-4 md:px-8"
    >
      <div className="glass overflow-hidden rounded-3xl">
        <div className="grid gap-8 border-b border-line p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:p-10">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-signal">SUMMARY · MACHINE-READABLE</p>
            <h2 id="quick-facts-title" className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
              Quick facts &amp; capabilities
            </h2>
          </div>
          <p className="max-w-[62ch] self-end text-base leading-relaxed text-paper/80 md:text-lg">
            {person.summary}
          </p>
        </div>

        <dl className="grid gap-px bg-line md:grid-cols-2">
          {quickFacts.map((f) => (
            <div
              key={f.label}
              className="grid content-start gap-1.5 bg-ink-soft/80 p-6 md:px-10 md:odd:last:col-span-2"
            >
              <dt className="font-mono text-[10px] tracking-[0.2em] text-muted">{f.label.toUpperCase()}</dt>
              <dd className="text-[15px] leading-relaxed text-paper">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-24 grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="font-mono text-[10px] tracking-[0.2em] text-signal">WHAT I DO</p>
          <h2 className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
            Six disciplines.
            <br />
            <span className="text-paper/35">One response workflow.</span>
          </h2>
          <p className="mt-5 max-w-[40ch] leading-relaxed text-muted">
            Each technical term comes with a plain-language explanation, so anyone — or any assistant — can tell exactly what the work involves.
          </p>
        </div>

        <ol className="grid self-start gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
          {capabilities.map((c, i) => (
            <li key={c.id} className="group relative bg-ink/85 p-6 transition-colors duration-300 hover:bg-ink-soft/90 md:p-8">
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-signal">
                {c.term}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">{c.plain}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`Tools used for ${c.term}`}>
                {c.tools.map((t) => (
                  <li key={t} className="rounded-md border border-line px-2 py-1 font-mono text-[10px] tracking-wide text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
