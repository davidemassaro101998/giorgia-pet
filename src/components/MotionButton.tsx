// Adattato da 21st.dev — @Shatlyk1011/motion-button (id 10384): pulsante
// CTA con micro-interazione sulla freccia. Adattato da larghezza fissa a
// auto-width (l'originale rompe con label lunghe come le nostre in
// italiano), ricolorato sui token Armonya, icona Phosphor al posto di
// Lucide (convenzione della libreria).

import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

const variants = {
  primary:
    "bg-gradient-to-r from-[var(--color-amber)] to-[var(--color-coral)] text-[var(--color-ink-deep)] shadow-[0_0_28px_-6px_color-mix(in_srgb,var(--color-amber)_65%,transparent)]",
  "outline-dark":
    "border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] text-[var(--color-bone)]",
  "outline-light": "border border-[var(--color-border)] text-[var(--color-ink)]",
};

export function MotionButton({
  href,
  label,
  variant = "primary",
  className,
}: {
  href: string;
  label: string;
  variant?: keyof typeof variants;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wide transition-transform active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      <span>{label}</span>
      <span className="relative flex h-4 w-4 items-center justify-center overflow-hidden">
        <ArrowRight
          weight="bold"
          className="absolute size-4 transition-transform duration-300 ease-out group-hover:translate-x-5"
        />
        <ArrowRight
          weight="bold"
          className="absolute size-4 -translate-x-5 transition-transform duration-300 ease-out group-hover:translate-x-0"
        />
      </span>
    </a>
  );
}
