import type { Metadata } from "next";
import { ArrowUpRight, InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { socials } from "@/content/profile";
import { contactGraph, toJsonLd } from "@/lib/schema";
import { PageIntro } from "@/components/ui/PageIntro";
import { MessageComposer } from "@/components/contact/MessageComposer";
import { PuneClock } from "@/components/contact/PuneClock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Richesh Yadav, a security operations consultant in Pune, about security operations, incident investigation, SIEM, phishing response, endpoint security and AI security. Best reached via LinkedIn.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { ...socials[0], Icon: LinkedinLogo, note: "Best for professional conversations" },
  { ...socials[1], Icon: InstagramLogo, note: "Everything else" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 md:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: toJsonLd(contactGraph()) }} />

      <PageIntro
        index="richesh.top/contact"
        title={
          <>
            Open to real
            <br />
            <span className="text-paper/35">conversations.</span>
          </>
        }
        lede="Based in Pune. Open to conversations about security operations, incident investigation, SIEM, phishing response, endpoint security, AI-assisted workflows and the transition into AI security."
      />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
        <aside className="grid content-start gap-4">
          <div className="reveal rounded-[1.75rem] border border-line bg-ink-soft/70 p-7">
            <PuneClock />
          </div>

          <ul className="grid gap-4">
            {channels.map(({ label, handle, href, Icon, note }) => (
              <li key={href} className="reveal">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="spotlight group flex items-center gap-5 rounded-[1.75rem] border border-line bg-ink-soft/70 p-6 transition-transform duration-200 active:scale-[0.99]"
                >
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong text-signal transition-colors duration-300 group-hover:bg-signal group-hover:text-ink">
                    <Icon size={26} weight="duotone" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-2xl font-semibold tracking-[-0.03em]">{label}</span>
                    <span className="block truncate text-sm text-paper/55">
                      {handle} · {note}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="shrink-0 text-paper/40 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>

          <p className="reveal px-2 pt-2 text-sm leading-relaxed text-paper/50">
            There&apos;s no public email address. LinkedIn messages are the most reliable way to get in touch.
          </p>
        </aside>

        <section aria-labelledby="compose" className="reveal bezel">
          <div className="bezel-core p-7 md:p-10">
            <h2 id="compose" className="text-3xl font-semibold tracking-[-0.03em]">
              Draft a message
            </h2>
            <p className="mt-3 max-w-[52ch] leading-relaxed text-paper/60">
              Shape your note here. It gets copied to your clipboard and LinkedIn opens, ready to paste.
            </p>
            <div className="mt-8">
              <MessageComposer />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
