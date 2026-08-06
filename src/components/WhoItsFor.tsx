// Il gatto qui usa la stessa tecnica del cane in hero
// (CinematicIntro.tsx) — invertita per un canvas chiaro — e la stessa
// animazione: si dissolve/appare con blur+scale invece di un semplice
// fade, così sembra affiorare dallo sfondo invece di comparire sopra. A
// differenza del cane (dentro un pin a schermo intero) qui non c'è pin —
// GSAP ScrollTrigger normale con `toggleActions: "play reverse play
// reverse"`: appare entrando in viewport, si dissolve uscendo, riappare
// se si torna indietro. Foto aggiornata (era stata scartata due volte:
// la prima con un ritaglio troppo stretto, la seconda con
// un'espressione troppo comica) — questa ha sfondo bianco pulito e
// sguardo laterale calmo, approvata dall'utente.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import heroCat from "../assets/hero-cat.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAT_FILTER = "grayscale(0.35) brightness(1.08) contrast(0.95)";
const CAT_MAX_OPACITY = 0.9;

const cases = [
  "Cani e gatti ansiosi",
  "Paura di rumori forti",
  "Difficoltà dopo un trasloco",
  "Aggressività reattiva",
  "Recupero dopo un lutto in famiglia",
  "Squilibrio comportamentale generico",
];

export function WhoItsFor() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(catRef.current, { opacity: CAT_MAX_OPACITY, scale: 1, filter: `blur(0px) ${CAT_FILTER}` });
        return;
      }
      gsap.fromTo(
        catRef.current,
        { opacity: 0, scale: 1.1, filter: `blur(20px) ${CAT_FILTER}` },
        {
          opacity: CAT_MAX_OPACITY,
          scale: 1,
          filter: `blur(0px) ${CAT_FILTER}`,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28"
    >
      <div
        ref={catRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] md:block"
        style={{
          backgroundImage: `url(${heroCat})`,
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          maskImage: "radial-gradient(80% 75% at 78% 48%, black 22%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(80% 75% at 78% 48%, black 22%, transparent 78%)",
        }}
      />
      <div className="relative mx-auto max-w-[800px] px-6 text-center">
        <Reveal>
          <SectionTitle
            firstHalf="Per chi è pensato "
            secondHalf="Vibra"
            className="text-3xl leading-tight tracking-tight text-[var(--color-off-black)] md:text-4xl"
          />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {cases.map((c) => (
              <span
                key={c}
                className="rounded-[var(--radius-pill)] border border-[var(--color-ember)] px-4 py-2 text-[14px] text-[var(--color-ember)]"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
