// CTA con pull magnetico (GSAP quickTo — pattern MagneticButton della
// libreria, snippets/r3f-cinematic/MagneticButton.tsx) + freccia animata
// (concetto adattato da 21st.dev @Shatlyk1011/motion-button, id 10384,
// riscritto ad auto-width perché l'originale a larghezza fissa si rompe
// con label italiane lunghe).

import { useRef } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
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
      className={cn(
        "group inline-flex w-fit items-center gap-3 whitespace-nowrap rounded-full px-6 py-3 font-mono text-[13px] font-medium uppercase tracking-wide",
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
