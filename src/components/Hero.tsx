import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(revealRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[85vh] w-full overflow-hidden bg-[var(--color-ink-deep)] pt-16"
    >
      <div
        ref={revealRef}
        className="relative z-10 mx-auto flex min-h-[calc(85vh-4rem)] w-full max-w-[900px] flex-col items-center justify-center px-6 py-14 text-center"
      >
        <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-ember)]">
          {site.positioning}
        </p>
        <h1 className="max-w-2xl text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[0.98] tracking-tighter text-[var(--color-bone)]">
          Riequilibrio
          <br />
          <span className="text-gradient">a distanza.</span>
        </h1>
        <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)] md:text-lg">
          Per il tuo cane o gatto, per te, per l'ambiente che vivete insieme —
          una videochiamata con Giorgia Bisognin, senza stress da
          spostamento.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MotionButton href="#prenota" label={ctaLabel} />
          <MotionButton href="#come-funziona" label="Come funziona" variant="outline-dark" />
        </div>
        <p className="mt-6 max-w-[42ch] font-mono text-[11px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
          Il veterinario resta sempre il riferimento sanitario del tuo
          animale — la biorisonanza è un supporto complementare.
        </p>
      </div>
    </section>
  );
}
