import { useEffect, useState } from "react";
import { ctaLabel, site } from "../siteConfig";
import heroDog from "../assets/photos/hero-dog.jpg";
import { ShaderOrb } from "./ShaderOrb";
import { MotionButton } from "./MotionButton";
import { TiltImage } from "./TiltImage";
import { ScrollParallaxBg } from "./ScrollParallaxBg";

export function Hero() {
  // Above-the-fold: reveal via requestAnimationFrame al mount, mai via
  // IntersectionObserver (vedi motion-patterns/GOTCHAS.md #1 — su viewport
  // corti l'observer può non scattare mai e il contenuto resta invisibile).
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--color-ink-deep)] pt-16"
    >
      <ScrollParallaxBg range={["-4%", "10%"]} className="pointer-events-none absolute inset-0">
        <ShaderOrb className="h-full w-full opacity-80" />
      </ScrollParallaxBg>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[var(--color-ink-deep)] via-[color-mix(in_srgb,var(--color-ink-deep)_55%,transparent)] to-transparent" />

      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 pt-16 pb-20 md:grid-cols-2 md:pt-24 md:pb-28">
        <div
          className="transition-all duration-700 ease-out motion-reduce:transition-none"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p className="mb-5 font-mono text-[13px] uppercase tracking-[0.18em] text-[var(--color-amber)]">
            {site.positioning}
          </p>
          <h1 className="max-w-[15ch] text-4xl leading-[1.05] tracking-tight text-[var(--color-bone)] md:text-6xl">
            Riequilibrio a distanza — per il tuo{" "}
            <span className="text-gradient">animale</span>, per te, per
            l'ambiente.
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_72%,transparent)] md:text-lg">
            Una videochiamata con Giorgia Bisognin, per riportare in equilibrio
            il tuo cane o gatto — a distanza, senza stress da spostamento.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MotionButton href="#prenota" label={ctaLabel} />
            <MotionButton href="#come-funziona" label="Come funziona" variant="outline-dark" />
          </div>
          <p className="mt-6 max-w-[40ch] font-mono text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
            Il veterinario resta sempre il riferimento sanitario del tuo
            animale — la biorisonanza è un supporto complementare.
          </p>
        </div>

        <div
          className="transition-all duration-700 delay-150 ease-out motion-reduce:transition-none"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "scale(1)" : "scale(0.97)",
          }}
        >
          <TiltImage
            src={heroDog}
            alt="Cane in un momento di calma e attenzione all'aperto"
            className="relative h-[320px] ring-1 ring-[color-mix(in_srgb,var(--color-amber)_18%,transparent)] md:h-[440px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-ink-deep)]/30 via-transparent to-transparent" />
          </TiltImage>
        </div>
      </div>
    </section>
  );
}
