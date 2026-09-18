import type { Metadata } from "next";
import { GraduationCap } from "@phosphor-icons/react/ssr";
import { experience, focus, person, socials } from "@/content/profile";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Closing } from "@/components/ui/Closing";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "About & Experience",
  description:
    "Richesh Yadav's security operations career since February 2022 — SecurityHQ, TSYS Card Tech and Atos Group (Eviden) in Pune — plus education and the move toward AI security.",
  alternates: { canonical: "/about" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatMonth = (ym: string) => {
  const [y, m] = ym.split("-");
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y;
};

const facts = [
  { k: "Role", v: `${person.jobTitle}, ${person.employer}` },
  { k: "Base", v: person.workLocation },
  { k: "In security ops", v: `${person.yearsInSecurityOps} years, since Feb 2022` },
  { k: "Heading toward", v: "AI & LLM security" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <PageIntro
        index="richesh.top/about"
        title={
          <>
            Built inside the SOC.
            <br />
            <span className="text-paper/35">Extending toward AI.</span>
          </>
        }
        lede="From SIEM administration and platform health to alert investigation, phishing response, endpoint containment and operational coordination. The next stage applies that experience to automation and AI security."
        aside={
          <dl className="divide-y divide-line border-y border-line">
            {facts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted">{f.k.toUpperCase()}</dt>
                <dd className="text-right text-sm text-paper">{f.v}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section aria-labelledby="timeline" className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 id="timeline" className="reveal text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1] tracking-[-0.035em]">
            Career trajectory
          </h2>
          <p className="reveal mt-5 leading-relaxed text-paper/60">
            Four chapters, newest first. Each one added a layer: platform health, then investigation at volume, then
            response ownership, and now building.
          </p>
          <div className="reveal mt-8 flex flex-wrap gap-3">
            <ArrowLink href={socials[0].href} external variant="ghost">
              Full profile on LinkedIn
            </ArrowLink>
            <ArrowLink href="/resume.pdf" external variant="ghost">
              Download resume
            </ArrowLink>
          </div>
        </div>

        <ol className="relative border-l border-line pl-8 md:pl-12">
          {experience.map((e) => {
            const current = e.end === null;
            return (
              <li key={`${e.org}-${e.start}`} className="reveal relative pb-14 last:pb-10">
                <span
                  className={`absolute -left-8 top-2 grid size-3 -translate-x-1/2 place-items-center rounded-full md:-left-12 ${
                    current ? "live-dot bg-signal" : "border border-line-strong bg-ink"
                  }`}
                  aria-hidden="true"
                />
                <article className="spotlight -mx-5 rounded-2xl px-5 py-4">
                  <p className="flex flex-wrap items-center gap-x-3 font-mono text-[11px] tracking-[0.14em] text-muted tabular">
                    <time dateTime={e.start}>{formatMonth(e.start).toUpperCase()}</time>
                    <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                    {e.end ? <time dateTime={e.end}>{formatMonth(e.end).toUpperCase()}</time> : <span className="text-signal">NOW</span>}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.03em]">{e.role}</h3>
                  <p className="mt-2 text-paper/55">
                    <span className="font-medium text-signal">{e.org}</span> · {e.location}
                  </p>
                  <p className="mt-5 max-w-[62ch] leading-relaxed text-paper/75">{e.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tools and practices">
                    {e.stack.map((t) => (
                      <li key={t} className="rounded-md border border-line px-2.5 py-1 text-xs text-paper/70">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
          <li className="reveal relative">
            <span className="absolute -left-8 top-1.5 grid size-7 -translate-x-1/2 place-items-center rounded-full border border-line-strong bg-ink text-signal md:-left-12" aria-hidden="true">
              <GraduationCap size={14} weight="bold" />
            </span>
            <div className="px-0 md:px-0">
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted tabular">{person.education.year} · ACADEMIC FOUNDATION</p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">{person.education.name}</h3>
              <p className="mt-1 text-paper/55">{person.education.location}</p>
            </div>
          </li>
        </ol>
      </section>

      <section aria-labelledby="focus" className="mt-32">
        <div className="reveal max-w-[40rem]">
          <h2 id="focus" className="text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1] tracking-[-0.035em]">
            Security operations today.
            <span className="text-paper/35"> AI security next.</span>
          </h2>
          <p className="mt-5 leading-relaxed text-paper/60">
            Keeping investigation fundamentals sharp while building practical AI and automation skills, without
            overstating where the transition stands.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-[1.75rem] border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {focus.map((f, i) => {
            const next = f.state === "Next";
            return (
              <li key={f.title} className="reveal spotlight flex flex-col bg-ink-soft p-7">
                <p className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em]">
                  <span className={next ? "text-paper/50" : "text-signal"}>
                    {f.state.toUpperCase()} / {f.mode.toUpperCase()}
                  </span>
                  <span className="flex gap-1" aria-hidden="true">
                    {focus.map((_, j) => (
                      <span key={j} className={`h-1 w-3 rounded-full ${j <= i ? "bg-signal/70" : "bg-paper/10"}`} />
                    ))}
                  </span>
                </p>
                <h3 className="mt-10 text-xl font-semibold leading-snug tracking-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/60">{f.line}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <Closing
        title="Let's compare notes."
        body="Whether it's SOC workflows, phishing investigations or the security of AI systems, conversations grounded in real operational work are always welcome."
      />
    </div>
  );
}
