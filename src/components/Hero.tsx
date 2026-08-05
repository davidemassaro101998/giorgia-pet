import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ctaLabel, site } from "../siteConfig";
import { QuantumNebula } from "./QuantumNebula";
import { MotionButton } from "./MotionButton";

const trustCells = [
  { id: "01", label: "METODO", value: "Non invasivo" },
  { id: "02", label: "CHIAMATA", value: "10 minuti, gratis" },
  { id: "03", label: "GUIDA", value: "Giorgia Bisognin" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(revealRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
        gsap.set(".hero-cell", { opacity: 1, x: 0 });
        return;
      }
      // Above-the-fold: reveal via GSAP al mount, mai via IntersectionObserver
      // (motion-patterns/GOTCHAS.md #1 — su viewport corti l'observer può non
      // scattare mai e il contenuto resta invisibile).
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(24px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" },
      );
      gsap.from(".hero-cell", {
        x: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        delay: 0.6,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[92vh] w-full overflow-hidden bg-[var(--color-ink-deep)] pt-16"
    >
      <QuantumNebula className="pointer-events-none absolute inset-0 opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[var(--color-ink-deep)]/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink-deep)] via-[var(--color-ink-deep)]/30 to-[var(--color-ink-deep)]/55" />

      <div
        ref={revealRef}
        className="relative z-10 mx-auto flex min-h-[calc(92vh-4rem)] w-full max-w-[1280px] flex-col justify-between gap-10 px-6 py-14 md:flex-row md:items-stretch"
      >
        <div className="flex flex-1 flex-col justify-between">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-amber)]">
            {site.positioning}
          </p>

          <div className="max-w-3xl md:-translate-y-4">
            <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter text-[var(--color-bone)]">
              Riequilibrio
              <br />
              <span className="text-gradient">a distanza.</span>
            </h1>
            <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)] md:text-lg">
              Per il tuo cane o gatto, per te, per l'ambiente che vivete
              insieme — una videochiamata con Giorgia Bisognin, senza stress
              da spostamento.
            </p>
          </div>

          <div className="md:-translate-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <MotionButton href="#prenota" label={ctaLabel} />
              <MotionButton href="#come-funziona" label="Come funziona" variant="outline-dark" />
            </div>
            <p className="mt-6 max-w-[42ch] font-mono text-[11px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
              Il veterinario resta sempre il riferimento sanitario del tuo
              animale — la biorisonanza è un supporto complementare.
            </p>
          </div>
        </div>

        <div className="flex w-full flex-shrink-0 flex-col justify-center gap-4 md:w-72">
          {trustCells.map((c) => (
            <div
              key={c.id}
              className="hero-cell rounded-2xl border border-[color-mix(in_srgb,var(--color-bone)_12%,transparent)] bg-[color-mix(in_srgb,var(--color-bone)_6%,transparent)] p-6 backdrop-blur-md"
            >
              <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-bone)_35%,transparent)]">
                {c.id} // {c.label}
              </span>
              <span className="mt-2 block text-xl font-semibold tracking-tight text-[var(--color-bone)]">
                {c.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
