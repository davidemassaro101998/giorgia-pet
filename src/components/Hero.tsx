import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";
import heroDog from "../assets/hero-dog.jpg";
import heroCat from "../assets/hero-cat.jpg";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set([revealRef.current, imageRef.current], { filter: "blur(0px)", opacity: 1, scale: 1 });
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
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.06 },
        { opacity: 1, scale: 1, duration: 2, ease: "expo.out", delay: 0.15 },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={containerRef}
      className="relative min-h-[85vh] w-full overflow-hidden bg-[var(--color-off-black)] pt-16"
    >
      {/* Cane e gatto che dissolvono nel nero verso i bordi — stesso
          trattamento del render 3D del riferimento (vignettatura invece di
          un bordo netto). Separati con uno scarto verticale reale invece
          che sovrapposti — la prima versione li impilava uno sopra
          l'altro, illeggibile. */}
      <div
        ref={imageRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] flex-col justify-center gap-6 md:flex"
      >
        <div
          className="aspect-square w-full"
          style={{
            backgroundImage: `url(${heroDog})`,
            backgroundSize: "cover",
            backgroundPosition: "center 28%",
            maskImage: "radial-gradient(closest-side, black 55%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent 92%)",
          }}
        />
        <div
          className="aspect-square w-full"
          style={{
            backgroundImage: `url(${heroCat})`,
            backgroundSize: "cover",
            backgroundPosition: "center 22%",
            maskImage: "radial-gradient(closest-side, black 55%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(closest-side, black 55%, transparent 92%)",
          }}
        />
      </div>

      <div
        ref={revealRef}
        className="relative z-10 mx-auto flex min-h-[calc(85vh-4rem)] w-full max-w-[1200px] flex-col justify-center px-6 py-14 md:items-start md:text-left"
      >
        <div className="mx-auto max-w-[560px] text-center md:mx-0 md:max-w-[520px] md:text-left">
          <p className="mb-5 font-body text-[12px] font-normal text-[var(--color-ember)]">
            {site.positioning}
          </p>
          <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.02] text-[var(--color-off-white)]">
            Riequilibrio
            <br />
            <span className="text-gradient">a distanza.</span>
          </h1>
          <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)] md:text-lg">
            Per il tuo cane o gatto, per te, per l'ambiente che vivete insieme
            — una videochiamata con Giorgia Bisognin, senza stress da
            spostamento.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <MotionButton href="#prenota" label={ctaLabel} variant="primary-on-dark" />
            <MotionButton href="#come-funziona" label="Come funziona" variant="ghost-on-dark" />
          </div>
          <p className="mt-6 max-w-[42ch] font-body text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_40%,transparent)]">
            Il veterinario resta sempre il riferimento sanitario del tuo
            animale — la biorisonanza è un supporto complementare.
          </p>
        </div>
      </div>
    </section>
  );
}
