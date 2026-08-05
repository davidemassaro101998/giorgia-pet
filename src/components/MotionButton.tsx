// CTA con pull magnetico (GSAP quickTo — pattern MagneticButton della
// libreria, snippets/r3f-cinematic/MagneticButton.tsx) + freccia animata
// (concetto adattato da 21st.dev @Shatlyk1011/motion-button, id 10384,
// riscritto ad auto-width perché l'originale a larghezza fissa si rompe
// con label italiane lunghe) + profondità reale al press (tecnica da
// 21st.dev @ddoemonn/press-depth, id 23547 — slab colorato sotto la
// faccia del bottone che si "preme" quando lo clicchi, invece di un
// piatto cambio colore all'hover).

import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { cn } from "../lib/utils";

const DEPTH = 4;

const faceVariants = {
  primary: "bg-[var(--color-amber)] text-[var(--color-ink-deep)]",
  "outline-dark":
    "border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] text-[var(--color-bone)]",
  "outline-light": "border border-[var(--color-border)] text-[var(--color-ink)]",
};

const slabVariants = {
  primary: "bg-[color-mix(in_srgb,var(--color-amber)_55%,var(--color-ink-deep)_45%)]",
  "outline-dark": "bg-[color-mix(in_srgb,var(--color-bone)_10%,transparent)]",
  "outline-light": "bg-[var(--color-border)]",
};

export function MotionButton({
  href,
  label,
  variant = "primary",
  className,
}: {
  href: string;
  label: string;
  variant?: keyof typeof faceVariants;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quick = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);

  const ensureQuick = () => {
    if (!quick.current && ref.current) {
      quick.current = {
        x: gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "elastic.out(1,0.4)" }),
        y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "elastic.out(1,0.4)" }),
      };
    }
    return quick.current;
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const q = ensureQuick();
        q?.x((e.clientX - r.left - r.width / 2) * 0.28);
        q?.y((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        const q = ensureQuick();
        q?.x(0);
        q?.y(0);
      }}
      style={{ paddingBottom: DEPTH }}
      className={cn("group relative inline-flex w-fit select-none rounded-full", className)}
    >
      {/* Slab: la base "solida" su cui la faccia del bottone poggia — visibile
          come bordo inferiore colorato finché non premuto. */}
      <span
        aria-hidden
        style={{ top: DEPTH }}
        className={cn("absolute inset-x-0 bottom-0 rounded-full", slabVariants[variant])}
      />
      <span
        className={cn(
          "relative inline-flex items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wide",
          "transition-transform duration-150 ease-out group-active:translate-y-[3px]",
          faceVariants[variant],
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1.5px_0_rgba(255,255,255,0.35),inset_0_-1px_0_rgba(0,0,0,0.08)]"
        />
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
      </span>
    </a>
  );
}
