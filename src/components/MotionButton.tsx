// Bottoni ricostruiti sul sistema "Floating CTA Pill" / "Ghost Link" /
// "Signal Blue Text Link" del riferimento stilistico scelto dall'utente:
// niente riempimento colorato, niente chrome decorativa (via ripple,
// waveform, slab/press-depth — tutti i tentativi precedenti, bocciati uno
// per uno). Il primario è una pillola quasi trasparente ("wash" scuro al
// 5%), il secondario è testo puro con sottolineatura all'hover — "presente
// ma non urlato".

import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "../lib/utils";

const variants = {
  // Floating CTA Pill: wash quasi-trasparente, mai un blocco di colore pieno.
  primary:
    "rounded-[var(--radius-button)] bg-[color-mix(in_srgb,var(--color-off-black)_6%,transparent)] px-6 py-3 text-[var(--color-off-black)] hover:bg-[color-mix(in_srgb,var(--color-off-black)_10%,transparent)]",
  // stessa pillola, per l'uso su sfondo scuro (hero, footer).
  "primary-on-dark":
    "rounded-[var(--radius-button)] bg-[color-mix(in_srgb,var(--color-off-white)_10%,transparent)] px-6 py-3 text-[var(--color-off-white)] hover:bg-[color-mix(in_srgb,var(--color-off-white)_16%,transparent)]",
  // Ghost Link: solo testo, sottolineatura all'hover.
  ghost: "px-1 py-1 text-[var(--color-off-black)]",
  "ghost-on-dark": "px-1 py-1 text-[var(--color-off-white)]",
};

export function MotionButton({
  href,
  label,
  variant = "primary",
  fullWidth = false,
  className,
}: {
  href: string;
  label: string;
  variant?: keyof typeof variants;
  fullWidth?: boolean;
  className?: string;
}) {
  const isGhost = variant === "ghost" || variant === "ghost-on-dark";

  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex select-none items-center justify-center gap-2 text-center font-body text-[15px] font-normal transition-colors duration-200 ease-out",
        fullWidth ? "w-full" : "w-fit",
        variants[variant],
        className,
      )}
    >
      <span className={cn(isGhost && "border-b border-transparent transition-colors duration-200 group-hover:border-current")}>
        {label}
      </span>
      <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center overflow-hidden text-[var(--color-ember)]">
        <ArrowRight
          weight="regular"
          className="absolute size-3.5 transition-transform duration-200 ease-out group-hover:translate-x-4"
        />
        <ArrowRight
          weight="regular"
          className="absolute size-3.5 -translate-x-4 transition-transform duration-200 ease-out group-hover:translate-x-0"
        />
      </span>
    </a>
  );
}
