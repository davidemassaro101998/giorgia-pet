// Il gatto è un ritaglio vero (PNG con alpha) come il cane in hero, ma
// con un'animazione volutamente diversa (richiesta esplicita: "l'animazione
// del gatto falla particolare e diversa"): entra scivolando in diagonale da
// destra con una leggera rotazione che si raddrizza (ease "back", un
// piccolo rimbalzo finale). Il galleggiamento continuo dopo l'entrata e il
// `drop-shadow` sono stati rimossi su feedback diretto ("non devono
// fluttuare... sfondo completamente uniforme") — resta solo il filtro che
// erode e sfuma il bordo del cutout.
//
// Padding verticale della sezione cresciuto a `xl`/`2xl` (oltre a
// `md:py-28`): la sezione è alta quanto il suo contenuto (titolo + tag),
// mentre il gatto è ancorato in basso e vincolato solo da `max-h-[70vh]` —
// su schermi molto larghi il contenuto testuale è corto ma il gatto resta
// alto, quindi la sua testa superava il bordo alto della sezione e veniva
// tagliata dall'`overflow-hidden`. Più padding verticale = sezione più
// alta = spazio sufficiente sopra il gatto perché non venga tagliato.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import heroCat from "../assets/hero-cat-cutout.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// `url(#pet-cutout-feather)` (CutoutFilterDefs.tsx, montato in App.tsx)
// erode e sfuma il bordo alpha del ritaglio — senza, la frangia dura del
// cutout PNG resta visibile ("si vedono i bordi", segnalato dall'utente),
// soprattutto qui su un fondo chiaro dove il minimo contrasto di bordo
// salta all'occhio. Nessun drop-shadow: niente alone, sfondo uniforme.
const CAT_FILTER = "url(#pet-cutout-feather)";

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

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(catRef.current, { opacity: 1, x: 0, rotate: 0, filter: CAT_FILTER });
        return;
      }
      gsap.set(catRef.current, { filter: CAT_FILTER });

      const enter = () => {
        gsap.fromTo(
          catRef.current,
          { opacity: 0, x: 90, rotate: -9, scale: 0.94 },
          { opacity: 1, x: 0, rotate: 0, scale: 1, duration: 1.1, ease: "back.out(1.4)" },
        );
      };
      const leave = () => {
        gsap.to(catRef.current, { opacity: 0, x: 90, rotate: -9, duration: 0.6, ease: "power2.in" });
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: enter,
        onLeave: leave,
        onEnterBack: enter,
        onLeaveBack: leave,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28 xl:py-36 2xl:py-44"
    >
      {/* Ancorato nell'angolo in basso a destra: il lato inferiore e quello
          destro escono dalla cornice (`overflow-hidden` sulla sezione)
          invece di fermarsi a mezz'aria — il taglio si legge come parte
          dell'angolo della sezione, non come un bordo che fluttua. */}
      <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[min(34%,420px)] items-end justify-end md:flex">
        <img
          ref={catRef}
          src={heroCat}
          alt=""
          aria-hidden
          className="w-full max-h-[70vh] translate-x-[10%] translate-y-[8%] object-contain opacity-0"
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
