import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ctaLabel, site } from "../siteConfig";
import { QuantumNebula } from "./QuantumNebula";
import { MotionButton } from "./MotionButton";
import heroDog from "../assets/photos/hero-dog.jpg";

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
      className="relative min-h-[92vh] w-full overflow-hidden bg-[var(--color-ink-deep)] pt-16"
    >
      <div
        ref={revealRef}
        className="relative z-10 mx-auto grid min-h-[calc(92vh-4rem)] w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-14 md:grid-cols-[1.05fr_0.95fr]"
      >
        <div>
          <p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-[var(--color-amber)]">
            {site.positioning}
          </p>
          <h1 className="max-w-xl text-[clamp(2.5rem,6vw,4.75rem)] font-black leading-[0.98] tracking-tighter text-[var(--color-bone)]">
            Riequilibrio
            <br />
            <span className="text-gradient">a distanza.</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)] md:text-lg">
            Per il tuo cane o gatto, per te, per l'ambiente che vivete
            insieme — una videochiamata con Giorgia Bisognin, senza stress da
            spostamento.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MotionButton href="#prenota" label={ctaLabel} />
            <MotionButton href="#come-funziona" label="Come funziona" variant="outline-dark" />
          </div>
          <p className="mt-6 max-w-[42ch] font-mono text-[11px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
            Il veterinario resta sempre il riferimento sanitario del tuo
            animale — la biorisonanza è un supporto complementare.
          </p>
        </div>

        {/* Il cane è l'ancora visiva — il campo di particelle è un alone
            concentrato dietro/intorno a lui (canvas più grande della foto,
            coperto al centro, visibile solo al bordo), non più foschia che
            riempie tutto lo schermo. Illustra il concetto ("un campo che
            agisce intorno all'animale") invece di essere decorazione slegata. */}
        <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
          <QuantumNebula className="pointer-events-none absolute -inset-10 opacity-90" />
          {/* Above-the-fold: niente reveal legato allo scroll (GOTCHAS.md #1
              — RevealImageMask usa useScroll/clip-path, pensato per foto che
              entrano dal basso; qui sopra la piega resta bloccato a metà
              apertura perché non c'è scroll da misurare al mount). L'entrata
              la fa già il blur+scale GSAP di tutto il blocco hero. */}
          <img
            src={heroDog}
            alt="Cane attento e presente, avvolto da un campo di energia luminoso"
            className="absolute inset-0 h-full w-full rounded-[2rem] object-cover ring-1 ring-[color-mix(in_srgb,var(--color-amber)_20%,transparent)]"
          />
        </div>
      </div>
    </section>
  );
}
