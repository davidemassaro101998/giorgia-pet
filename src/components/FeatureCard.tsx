// Card con un po' di vita, adattata dal concetto di 21st.dev
// manuarora700/feature-section-with-hover-effects (Aceternity, id 1521):
// niente ombre/gradienti vistosi (il riferimento stilistico li vieta),
// ma un velo di tono che sale dal basso all'hover, una barra accento
// accanto al titolo che si allunga e diventa ember, il titolo che scivola
// leggermente — la differenza tra "piatta" e "viva" sta tutta qui, senza
// rompere la disciplina "zero chrome decorativa". Sostituisce le card
// bordo-e-basta di Problem/HowItWorks/Pricing, segnalate come "piatte e
// povere".

import type { ReactNode } from "react";
import { cn } from "../lib/utils";

export function FeatureCard({
  title,
  eyebrow,
  children,
  className,
}: {
  title: string;
  eyebrow?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group/feature relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-hairline)] p-7",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[color-mix(in_srgb,var(--color-ember)_7%,transparent)] to-transparent opacity-0 transition-opacity duration-300 group-hover/feature:opacity-100"
      />
      <div className="relative flex h-full flex-col">
        {eyebrow}
        <h3 className="relative w-fit pl-4 text-lg text-[var(--color-off-black)]">
          <span
            aria-hidden
            className="absolute left-0 top-1 h-4 w-[3px] rounded-full bg-[var(--color-hairline)] transition-all duration-200 group-hover/feature:h-5 group-hover/feature:bg-[var(--color-ember)]"
          />
          <span className="inline-block transition-transform duration-200 group-hover/feature:translate-x-1.5">
            {title}
          </span>
        </h3>
        {children}
      </div>
    </div>
  );
}
