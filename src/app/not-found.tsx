import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto grid min-h-[80dvh] max-w-[1400px] content-center px-4 pt-32 md:px-8">
      <p className="font-mono text-[11px] tracking-[0.2em] text-signal">404 · NO MATCHING SIGNAL</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight md:text-7xl">This page isn&apos;t here.</h1>
      <p className="mt-4 max-w-[48ch] text-muted">The address may be old, or the page may still be on its way.</p>
      <Link
        href="/"
        className="mt-8 w-max rounded-xl bg-signal px-5 py-3 text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
      >
        Back to home
      </Link>
    </section>
  );
}
