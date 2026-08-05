import { useEffect, useState } from "react";
import { ctaLabel, site } from "../siteConfig";
import heroDog from "../assets/photos/hero-dog.jpg";

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
      className="relative overflow-hidden bg-[var(--color-ink)] pt-16"
    >
      {/* Bagliore ambra unico — l'unico punto in cui l'accento riempie una
          superficie ampia, sfumato, mai come tinta piatta. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
        style={{ background: "var(--color-amber)" }}
      />

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
          <h1 className="max-w-[14ch] text-4xl leading-[1.05] tracking-tight text-[var(--color-bone)] md:text-6xl">
            {site.tagline}
          </h1>
          <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_70%,transparent)] md:text-lg">
            Una videochiamata con Giorgia Bisognin, per riportare in equilibrio
            il tuo cane o gatto — a distanza, senza stress da spostamento.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#prenota"
              className="rounded-lg bg-[var(--color-amber)] px-6 py-3 font-mono text-[13px] uppercase tracking-wide text-[var(--color-ink)] transition-transform active:scale-[0.98]"
            >
              {ctaLabel}
            </a>
            <a
              href="#come-funziona"
              className="rounded-lg border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] px-6 py-3 font-mono text-[13px] uppercase tracking-wide text-[var(--color-bone)]"
            >
              Come funziona
            </a>
          </div>
          <p className="mt-6 max-w-[40ch] font-mono text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
            Il veterinario resta sempre il riferimento sanitario del tuo
            animale — la biorisonanza è un supporto complementare.
          </p>
        </div>

        <div
          className="relative h-[320px] overflow-hidden rounded-2xl md:h-[440px] transition-all duration-700 delay-150 ease-out motion-reduce:transition-none"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? "scale(1)" : "scale(0.97)",
          }}
        >
          <img
            src={heroDog}
            alt="Cane in un momento di calma e attenzione all'aperto"
            className="h-full w-full object-cover"
            width={1200}
            height={1400}
          />
        </div>
      </div>
    </section>
  );
}
