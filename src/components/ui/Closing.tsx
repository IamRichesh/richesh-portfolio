import { ArrowLink } from "./ArrowLink";

type Props = { title: React.ReactNode; body: string; href?: string; cta?: string };

export function Closing({ title, body, href = "/contact", cta = "Start a conversation" }: Props) {
  return (
    <section className="reveal relative mt-32 overflow-hidden rounded-[2rem] border border-line px-6 py-20 md:px-16 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_22rem_at_85%_110%,rgb(114_243_223/0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <h2 className="max-w-[18ch] text-[clamp(2rem,5vw,3.75rem)] font-semibold leading-[0.98] tracking-[-0.035em]">{title}</h2>
          <p className="mt-6 max-w-[52ch] leading-relaxed text-paper/65">{body}</p>
        </div>
        <ArrowLink href={href}>{cta}</ArrowLink>
      </div>
    </section>
  );
}
