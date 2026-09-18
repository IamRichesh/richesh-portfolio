import Link from "next/link";
import { InstagramLogo, LinkedinLogo } from "@phosphor-icons/react/ssr";
import { navItems, person, socials } from "@/content/profile";

const machineLinks = [
  { href: "/llms.txt", label: "llms.txt" },
  { href: "/sitemap.xml", label: "sitemap.xml" },
  { href: "/robots.txt", label: "robots.txt" },
];

const socialIcons = { LinkedIn: LinkedinLogo, Instagram: InstagramLogo };

export function SiteFooter() {
  return (
    <footer className="relative z-10 mx-auto mt-32 max-w-[1400px] px-4 pb-8 md:px-8">
      <div className="glass overflow-hidden rounded-3xl">
      <div className="px-4 py-14 md:px-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-lg font-semibold tracking-tight">{person.name}</p>
            <p className="mt-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-muted">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-signal/60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-signal" />
              </span>
              OPEN TO CONVERSATIONS
            </p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => {
              const Icon = socialIcons[s.label as keyof typeof socialIcons];
              return (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-paper/80 transition-colors duration-200 hover:border-signal/60 hover:text-signal"
                >
                  <Icon size={18} aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Footer" className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-8 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-paper/80 transition-colors hover:text-signal">
              {item.label}
            </Link>
          ))}
          <span className="hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          {machineLinks.map((m) => (
            <a key={m.href} href={m.href} className="font-mono text-xs text-muted transition-colors hover:text-signal">
              {m.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex flex-wrap justify-between gap-3 border-t border-line px-4 py-5 font-mono text-[10px] tracking-[0.18em] text-muted md:px-8">
        <span>© {new Date().getFullYear()} {person.name.toUpperCase()}</span>
        <span>INVESTIGATE · CONTAIN · REPORT · BUILD</span>
      </div>
      </div>
    </footer>
  );
}
