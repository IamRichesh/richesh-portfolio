import type { Metadata } from "next";
import { SealCheck } from "@phosphor-icons/react/ssr";
import { capabilities, certifications, person, stages } from "@/content/profile";
import { Closing } from "@/components/ui/Closing";
import { PageIntro } from "@/components/ui/PageIntro";
import { Lifecycle } from "@/components/services/Lifecycle";

export const metadata: Metadata = {
  title: "Core Skills & Services",
  description:
    "Security operations skills from Richesh Yadav across a four-stage SOC workflow: SIEM monitoring, incident investigation, phishing response, EDR endpoint containment, DLP request handling and security reporting.",
  alternates: { canonical: "/services" },
};

const platformNames = [
  "IBM QRadar",
  "Microsoft Sentinel",
  "Microsoft Defender",
  "Recorded Future",
  "CrowdStrike Falcon",
  "Carbon Black",
  "Trellix",
];

const platforms = platformNames.map(
  (name) =>
    [name, [...new Set(capabilities.filter((c) => (c.tools as readonly string[]).includes(name)).map((c) => c.stage))]] as const,
);

const verbOf = (id: string) => stages.find((s) => s.id === id)?.verb ?? id;

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <PageIntro
        index="richesh.top/services"
        title={
          <>
            Four disciplines.
            <br />
            <span className="text-paper/35">One workflow.</span>
          </>
        }
        lede="Practical skills developed through day-to-day SOC work: platform support, investigation, containment and reporting. Pick a stage to see what happens there."
        aside={
          <p className="border-l border-line-strong pl-5 text-sm leading-relaxed text-paper/60">
            Currently applied as a {person.jobTitle.toLowerCase()} at {person.employer}, supporting a client security environment from Pune.
          </p>
        }
      />

      <section aria-label="Security operations workflow" className="reveal">
        <Lifecycle />
      </section>

      <div className="mt-28 grid gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <section aria-labelledby="platforms" className="reveal">
          <h2 id="platforms" className="text-3xl font-semibold tracking-[-0.03em]">
            Platforms in daily use
          </h2>
          <table className="mt-8 w-full text-left text-sm">
            <caption className="sr-only">Security platforms and the workflow stages they support</caption>
            <thead>
              <tr className="border-b border-line-strong font-mono text-[10px] tracking-[0.18em] text-muted">
                <th scope="col" className="pb-3 font-normal">PLATFORM</th>
                <th scope="col" className="pb-3 text-right font-normal">STAGE</th>
              </tr>
            </thead>
            <tbody>
              {platforms.map(([name, st]) => (
                <tr key={name} className="group border-b border-line transition-colors duration-200 hover:bg-signal/[0.04]">
                  <th scope="row" className="py-4 text-base font-medium transition-colors duration-200 group-hover:text-signal">
                    {name}
                  </th>
                  <td className="py-4 text-right font-mono text-[11px] tracking-[0.12em] text-paper/60">
                    {st.map(verbOf).join(" · ").toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section aria-labelledby="certs" className="reveal">
          <h2 id="certs" className="text-3xl font-semibold tracking-[-0.03em]">
            Certifications
          </h2>
          <ul className="mt-8 grid gap-4">
            {certifications.map((c) => (
              <li key={c.name} className="spotlight flex items-start gap-4 rounded-2xl border border-line bg-ink-soft/60 p-6">
                <SealCheck size={26} weight="duotone" className="mt-0.5 shrink-0 text-signal" aria-hidden="true" />
                <div>
                  <p className="text-lg font-semibold leading-snug tracking-tight">{c.name}</p>
                  <p className="mt-1 text-sm text-paper/55">
                    {c.issuer} · Issued <span className="tabular">{c.year}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Closing
        title="Need a steady hand in the SOC?"
        body="Open to conversations about security operations, incident investigation, SIEM, phishing response, endpoint security and the move into AI security."
      />
    </div>
  );
}
