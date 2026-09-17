import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  external?: boolean;
};

export function ArrowLink({ href, children, variant = "solid", external }: Props) {
  const solid = variant === "solid";
  const className = `group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-semibold transition-[transform,box-shadow,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
    solid
      ? "bg-signal text-ink hover:shadow-[0_10px_40px_-8px_rgb(114_243_223/0.55)]"
      : "border border-line-strong text-paper hover:border-signal/60 hover:bg-signal/5"
  }`;
  const inner = (
    <>
      {children}
      <span
        className={`grid size-8 place-items-center rounded-full transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105 ${
          solid ? "bg-ink/10" : "bg-paper/10"
        }`}
        aria-hidden="true"
      >
        <ArrowUpRight size={15} weight="bold" />
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={className}>
      {inner}
    </Link>
  );
}
