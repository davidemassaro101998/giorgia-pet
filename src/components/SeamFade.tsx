// Le giunzioni tra sezioni a forte contrasto (bianco↔nero) erano un
// taglio secco su un hairline da 1px, indipendentemente da quanto fosse
// forte il salto di colore — segnalato dall'utente dopo aver ripercorso
// tutte le giunzioni del sito ("ogni cambio è un muro invece di una
// porta"). Fix: un velo del colore della sezione che sta per finire
// copre l'inizio di quella che segue e si dirada mentre scrolli — non
// un pin, non uno scroll-listener manuale, solo un `ScrollTrigger`
// scrub (stesso pattern già in uso in `About.tsx`) su un overlay
// assoluto, primo figlio della sezione in arrivo. Il gradiente sfuma
// verso trasparente scendendo, quindi anche nel punto di massima
// opacità non è un blocco di colore piatto ma una dissolvenza reale.
//
// Va reso il PRIMO figlio della sezione target, che deve essere
// `position: relative` (già vero per tutte le sezioni del sito).

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SeamFade({ fromColor }: { fromColor: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            // Ancorato alla SEZIONE che contiene questo overlay (il suo
            // `parentElement` diretto — va reso il PRIMO figlio della
            // sezione), non all'overlay stesso: un overlay alto solo
            // 22-32vh avrebbe un range di scrub troppo corto e la
            // dissolvenza si esaurirebbe quasi subito.
            trigger: ref.current!.parentElement,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[26vh] md:h-[32vh]"
      style={{ background: `linear-gradient(to bottom, ${fromColor}, transparent)` }}
    />
  );
}
