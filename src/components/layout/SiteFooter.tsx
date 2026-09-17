import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { navItems, person, socials } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line bg-ink/60 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div className="max-w-sm">
          <p className="text-lg font-semibold tracking-tight">{person.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{person.summary}</p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-mono text-[10px] tracking-[0.18em] text-muted">SITE</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/80 transition-colors hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-mono text-[10px] tracking-[0.18em] text-muted">PROFILES</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center gap-1 text-paper/80 transition-colors hover:text-signal"
                >
                  {s.label} <ArrowUpRight size={12} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-mono text-[10px] tracking-[0.18em] text-muted">FOR MACHINES</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="/llms.txt" className="text-paper/80 transition-colors hover:text-signal">llms.txt</a></li>
            <li><a href="/sitemap.xml" className="text-paper/80 transition-colors hover:text-signal">sitemap.xml</a></li>
            <li><a href="/robots.txt" className="text-paper/80 transition-colors hover:text-signal">robots.txt</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-wrap justify-between gap-3 border-t border-line px-4 py-5 font-mono text-[10px] tracking-[0.18em] text-muted md:px-8">
        <span>© {new Date().getFullYear()} {person.name.toUpperCase()}</span>
        <span>INVESTIGATE · CONTAIN · REPORT · BUILD</span>
      </div>
    </footer>
  );
}
