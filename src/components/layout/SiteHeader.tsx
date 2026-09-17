"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, List, X } from "@phosphor-icons/react";
import { navItems, person, socials } from "@/content/profile";

const ease = [0.23, 1, 0.32, 1] as const;

export function SiteHeader() {
  const pathname = usePathname();
  // Menu state is keyed to the route, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8 md:pt-5">
      <div className="glass mx-auto grid max-w-[1400px] grid-cols-[1fr_auto] items-center gap-4 rounded-2xl px-3 py-2.5 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="group flex w-max items-center gap-3 rounded-xl pr-2" aria-label={`${person.name}, home`}>
          <span className="grid size-10 place-items-center rounded-full border border-line-strong font-mono text-[11px] font-semibold tracking-[0.12em] text-signal shadow-[inset_0_0_18px_rgb(114_243_223/0.1)] transition-colors duration-200 group-hover:border-signal/60">
            {person.initials}
          </span>
          <span className="grid leading-tight">
            <span className="text-sm font-semibold tracking-tight text-paper">{person.name}</span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted">SECURITY OPS → AI SECURITY</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1 rounded-xl border border-line bg-ink/40 p-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative block rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                      active ? "text-ink" : "text-muted hover:text-paper"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-signal"
                        transition={{ type: "spring", duration: 0.45, bounce: 0.15 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center justify-end gap-2">
          <p className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-muted xl:flex">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-signal/60 motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-signal" />
            </span>
            OPEN TO CONVERSATIONS
          </p>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-xl border border-line text-paper transition-[transform,border-color] duration-150 active:scale-[0.96] lg:hidden"
          >
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease }}
            style={{ transformOrigin: "top center" }}
            className="mx-auto mt-2 max-w-[1400px] rounded-2xl border border-line bg-ink/95 p-2 shadow-[0_24px_80px_rgb(0_0_0/0.6)] backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul>
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease, delay: 0.03 * i }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex items-baseline justify-between rounded-xl px-4 py-3.5 text-2xl font-semibold tracking-tight text-paper aria-[current=page]:text-signal"
                    >
                      {item.label}
                      <span className="font-mono text-[11px] tracking-[0.16em] text-muted">{item.index}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-2 flex flex-wrap gap-2 border-t border-line px-2 pb-1 pt-3">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="flex items-center gap-1 rounded-lg border border-line px-3 py-2 text-xs text-muted"
                >
                  {s.label} <ArrowUpRight size={12} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
