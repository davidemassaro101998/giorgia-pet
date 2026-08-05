import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)]/60 bg-[var(--color-bone)]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6">
        <a href="#top" className="font-display text-lg tracking-tight text-[var(--color-ink)]">
          {site.brand}
        </a>
        <MotionButton
          href="#prenota"
          label={ctaLabel}
          className="whitespace-nowrap px-3 py-2 text-[11px] sm:px-4 sm:text-[13px]"
        />
      </div>
    </header>
  );
}
