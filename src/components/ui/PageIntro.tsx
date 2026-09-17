type Props = {
  index: string;
  title: React.ReactNode;
  lede: string;
  aside?: React.ReactNode;
};

/** Shared page opening: oversized headline, measured lede, optional right-hand readout. */
export function PageIntro({ index, title, lede, aside }: Props) {
  return (
    <header className="grid gap-10 pb-20 pt-36 md:pt-44 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-end lg:pb-28">
      <div>
        <p className="rise flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted tabular" style={{ "--i": 0 } as React.CSSProperties}>
          <span className="text-signal">{index}</span>
          <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
        </p>
        <h1
          className="rise mt-6 text-[clamp(2.8rem,8vw,6rem)] font-semibold leading-[0.92] tracking-[-0.04em]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {title}
        </h1>
        <p className="rise mt-8 max-w-[58ch] text-lg leading-relaxed text-paper/70" style={{ "--i": 2 } as React.CSSProperties}>
          {lede}
        </p>
      </div>
      {aside && (
        <div className="rise" style={{ "--i": 3 } as React.CSSProperties}>
          {aside}
        </div>
      )}
    </header>
  );
}
