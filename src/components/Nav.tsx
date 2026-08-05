import { ctaLabel, site } from "../siteConfig";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[var(--color-bone)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="font-display text-lg tracking-tight text-[var(--color-ink)]">
          {site.brand}
        </a>
        <a
          href="#prenota"
          className="rounded-lg bg-[var(--color-ink)] px-4 py-2 font-mono text-[13px] uppercase tracking-wide text-[var(--color-bone)] transition-transform active:scale-[0.98]"
        >
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}
