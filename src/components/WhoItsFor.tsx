// Il gatto è un ritaglio vero (PNG con alpha) come il cane in hero, ma
// con un'animazione volutamente diversa (richiesta esplicita: "l'animazione
// del gatto falla particolare e diversa"). Il cane si dissolve/riappare con
// blur+scale; il gatto invece entra scivolando in diagonale da destra con
// una leggera rotazione che si raddrizza (ease "back", un piccolo rimbalzo
// finale) e poi resta con un galleggiamento continuo (bob verticale lento,
// loop infinito) — più giocoso, coerente con un gatto invece che con la
// gravità di un labrador. Ombra `drop-shadow` (rispetta l'alpha) per la
// stessa sensazione "sopra lo sfondo in 3D" del cane.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import heroCat from "../assets/hero-cat-cutout.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CAT_SHADOW = "drop-shadow(0 30px 40px rgba(0,0,0,0.18)) drop-shadow(0 8px 12px rgba(0,0,0,0.12))";

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
  const catRef = useRef<HTMLImageElement>(null);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(catRef.current, { opacity: 1, x: 0, rotate: 0, filter: CAT_SHADOW });
        return;
      }
      gsap.set(catRef.current, { filter: CAT_SHADOW });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          floatTween.current?.kill();
          gsap.fromTo(
            catRef.current,
            { opacity: 0, x: 90, rotate: -9, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
              duration: 1.1,
              ease: "back.out(1.4)",
              onComplete: () => {
                floatTween.current = gsap.to(catRef.current, {
                  y: -14,
                  duration: 2.6,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              },
            },
          );
        },
        onLeave: () => {
          floatTween.current?.kill();
          gsap.to(catRef.current, { opacity: 0, x: 90, rotate: -9, duration: 0.6, ease: "power2.in" });
        },
        onEnterBack: () => {
          floatTween.current?.kill();
          gsap.fromTo(
            catRef.current,
            { opacity: 0, x: 90, rotate: -9, scale: 0.94 },
            {
              opacity: 1,
              x: 0,
              rotate: 0,
              scale: 1,
              duration: 1.1,
              ease: "back.out(1.4)",
              onComplete: () => {
                floatTween.current = gsap.to(catRef.current, {
                  y: -14,
                  duration: 2.6,
                  ease: "sine.inOut",
                  yoyo: true,
                  repeat: -1,
                });
              },
            },
          );
        },
        onLeaveBack: () => {
          floatTween.current?.kill();
          gsap.to(catRef.current, { opacity: 0, x: 90, rotate: -9, duration: 0.6, ease: "power2.in" });
        },
      });
    }, sectionRef);
    return () => {
      floatTween.current?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] items-center justify-center md:flex">
        <img
          ref={catRef}
          src={heroCat}
          alt=""
          aria-hidden
          className="max-h-[70%] w-auto max-w-[80%] object-contain opacity-0"
        />
      </div>
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 px-6 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <SectionTitle
            firstHalf="Per chi è pensato "
            secondHalf="Vibra"
            className="text-3xl leading-tight tracking-tight text-[var(--color-off-black)] md:text-4xl"
          />
          <div className="mt-7 flex flex-wrap gap-3">
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
        <div aria-hidden />
      </div>
    </section>
  );
}
