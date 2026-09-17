import type { Metadata } from "next";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { projects } from "@/content/profile";
import { projectsGraph, toJsonLd } from "@/lib/schema";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Closing } from "@/components/ui/Closing";
import { PageIntro } from "@/components/ui/PageIntro";
import { OrbitVisual } from "@/components/work/OrbitVisual";

export const metadata: Metadata = {
  title: "Work & Projects",
  description:
    "Projects by Richesh Yadav: Orbit, a live AI-assisted life-dashboard prototype at orbit.richesh.top, a Finance Intelligence Workspace in progress, and a confidential SOC workflow automation built at TSYS.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const [orbit, ...rest] = projects;

  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(projectsGraph()) }} />

      <PageIntro
        index="richesh.top/work"
        title={
          <>
            Operational thinking,
            <br />
            <span className="text-paper/35">made tangible.</span>
          </>
        }
        lede="Three pieces of work: a live product prototype, a finance tool still taking shape, and an automation that quietly saved analysts time inside a payments SOC."
      />

      {/* Featured: Orbit */}
      <article id={orbit.id} aria-labelledby="orbit-title" className="reveal bezel scroll-mt-28">
        <div className="bezel-core spotlight grid overflow-hidden lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          <div className="flex flex-col p-7 md:p-12">
            <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.16em] text-muted">
              <span className="inline-flex items-center gap-2 text-signal">
                <span className="live-dot size-1.5 rounded-full bg-signal" aria-hidden="true" />
                {orbit.status.toUpperCase()}
              </span>
              <span>{orbit.kind.toUpperCase()}</span>
              <span className="tabular">{orbit.period}</span>
            </p>

            <h2 id="orbit-title" className="mt-8 text-[clamp(3.5rem,9vw,7rem)] font-semibold leading-[0.85] tracking-[-0.05em]">
              {orbit.title}
              <span className="text-signal">.</span>
            </h2>
            <p className="mt-4 text-xl text-paper/55">{orbit.tagline}</p>
            <p className="mt-8 max-w-[52ch] leading-relaxed text-paper/75">{orbit.summary}</p>

            <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {orbit.facts.map((f) => (
                <div key={f.k} className="bg-ink-soft p-4">
                  <dt className="font-mono text-[10px] tracking-[0.18em] text-muted">{f.k.toUpperCase()}</dt>
                  <dd className="mt-1.5 text-sm leading-snug text-paper">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4 lg:mt-auto lg:pt-10">
              <ArrowLink href={orbit.href} external>
                Visit the live prototype
              </ArrowLink>
              <span className="font-mono text-[11px] tracking-[0.12em] text-muted">Demo data · changes are temporary</span>
            </div>
          </div>

          <a
            href={orbit.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Orbit at orbit.richesh.top"
            className="group relative flex flex-col border-t border-line bg-[radial-gradient(60%_60%_at_50%_45%,rgb(114_243_223/0.07),transparent)] lg:border-l lg:border-t-0"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-paper/15" />
                <span className="size-2.5 rounded-full bg-paper/15" />
                <span className="size-2.5 rounded-full bg-paper/15" />
              </span>
              <span className="flex flex-1 items-center justify-between rounded-full border border-line bg-ink/60 px-3 py-1 font-mono text-[11px] text-paper/70 transition-colors duration-200 group-hover:border-signal/40 group-hover:text-paper">
                orbit.richesh.top
                <ArrowUpRight size={12} weight="bold" className="text-signal transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
            <div className="grid flex-1 place-items-center overflow-hidden px-8 py-14 md:px-14">
              <OrbitVisual />
            </div>
          </a>
        </div>
      </article>

      {/* Index of the remaining work */}
      <section aria-labelledby="more-work" className="mt-28">
        <h2 id="more-work" className="reveal text-sm font-medium text-muted">
          Also in the log
        </h2>
        <ol className="mt-6 border-t border-line">
          {rest.map((p, i) => (
            <li key={p.id} id={p.id} className="reveal scroll-mt-28 border-b border-line">
              <article className="spotlight group -mx-4 grid gap-6 rounded-2xl px-4 py-10 md:-mx-6 md:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1fr)] md:px-6 md:py-12">
                <span className="font-mono text-sm text-muted tabular" aria-hidden="true">
                  {String(i + 2).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
                    <span className={p.status === "Completed" ? "text-paper/80" : "text-signal"}>{p.status.toUpperCase()}</span>
                    <span className="mx-2 text-line-strong">/</span>
                    {p.kind.toUpperCase()}
                    <span className="mx-2 text-line-strong">/</span>
                    <span className="tabular">{p.period}</span>
                  </p>
                  <h3 className="mt-4 text-[clamp(1.75rem,3.6vw,2.75rem)] font-semibold leading-[1] tracking-[-0.035em] transition-colors duration-300 group-hover:text-signal">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-paper/50">{p.tagline}</p>
                </div>
                <div className="md:pt-8">
                  <p className="leading-relaxed text-paper/70">{p.summary}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Focus areas">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded-md border border-line px-2.5 py-1 text-xs text-paper/70">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <Closing
        title="Have a workflow that needs untangling?"
        body="Open to conversations about security operations, analyst workflows, and AI-assisted prototypes, grounded in real operational work."
      />
    </div>
  );
}
