// Foto di Giorgia sostituita con un ritaglio vero (PNG alpha, verificato
// via Pillow — angoli alpha=0, soggetto alpha=255) fornito dall'utente,
// più grande e nitido del placeholder precedente (390×644 contro
// 190×245). Trattata come cane/gatto — `<img>` reale con
// `url(#pet-cutout-feather)` per pulire il bordo del ritaglio, zero
// `drop-shadow` (stessa lezione del cane: su un fondo quasi nero
// l'ombra legge come un alone) — non più il vecchio livello di sfondo
// con `mask-image` radiale, quello serviva a nascondere il bordo di una
// foto intera con sfondo, qui il canale alpha lo risolve alla radice.
//
// Animazione volutamente diversa da cane (blur+scale) e gatto (slide
// diagonale + rimbalzo): è la fondatrice, ha "un peso grosso nel sito"
// (richiesta esplicita) — un **wipe verticale** (clip-path che si apre
// dal basso, come un sipario) invece di un semplice fade, con la sua
// uscita di scena distinta dall'ingresso (dissolve verso l'alto/il
// basso a seconda della direzione di scroll) invece di essere solo
// l'ingresso invertito.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../siteConfig";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import giorgiaPhoto from "../assets/giorgia-cutout.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GIORGIA_FILTER = "url(#pet-cutout-feather)";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(photoRef.current, { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0 0 0)", filter: `blur(0px) ${GIORGIA_FILTER}` });
        return;
      }

      gsap.set(photoRef.current, { clipPath: "inset(0% 0 0 0)" });

      const enter = () => {
        gsap.fromTo(
          photoRef.current,
          { opacity: 1, scale: 1.06, clipPath: "inset(100% 0 0 0)", filter: `blur(14px) ${GIORGIA_FILTER}` },
          {
            scale: 1,
            clipPath: "inset(0% 0 0 0)",
            filter: `blur(0px) ${GIORGIA_FILTER}`,
            duration: 1.4,
            ease: "power3.out",
          },
        );
      };
      const leave = () => {
        gsap.to(photoRef.current, {
          opacity: 0,
          y: -36,
          filter: `blur(16px) ${GIORGIA_FILTER}`,
          duration: 0.7,
          ease: "power2.in",
        });
      };
      const leaveBack = () => {
        gsap.to(photoRef.current, {
          opacity: 0,
          y: 36,
          filter: `blur(16px) ${GIORGIA_FILTER}`,
          duration: 0.7,
          ease: "power2.in",
        });
      };
      const enterBack = () => {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, y: 0, scale: 1.06, clipPath: "inset(0% 0 0 0)", filter: `blur(14px) ${GIORGIA_FILTER}` },
          {
            opacity: 1,
            scale: 1,
            filter: `blur(0px) ${GIORGIA_FILTER}`,
            duration: 1.1,
            ease: "power3.out",
          },
        );
      };

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        onEnter: enter,
        onLeave: leave,
        onEnterBack: enterBack,
        onLeaveBack: leaveBack,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chi-ti-segue"
      className="relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-black)] py-24 md:py-32 xl:py-40"
    >
      {/* Ancorata in basso a sinistra come cane/gatto: il lato inferiore
          tocca il fondo della sezione, il lato sinistro esce dalla
          cornice — coerente con la regola "ancorata a un bordo reale,
          mai centrata nel vuoto" (Step 10). */}
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[min(46%,520px)] items-end justify-start md:flex">
        <img
          ref={photoRef}
          src={giorgiaPhoto}
          alt=""
          aria-hidden
          className="h-full max-h-full w-full max-w-[480px] -translate-x-[6%] object-contain object-bottom opacity-0"
        />
      </div>
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 px-6 md:grid-cols-[1fr_1fr]">
        <div className="hidden md:block" aria-hidden />
        <Reveal index={1}>
          <p className="font-body text-[13px] text-[var(--color-ash)]">Chi ti segue</p>
          <SectionTitle
            firstHalf={site.practitioner.name.split(" ")[0] + " "}
            secondHalf={site.practitioner.name.split(" ").slice(1).join(" ")}
            className="mt-3 text-3xl leading-tight text-[var(--color-off-white)] md:text-4xl"
          />
          <p className="mt-2 text-base text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)]">
            {site.practitioner.role}
          </p>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)]">
            Prima infermiera, poi kinesiologa: un percorso nato dall'ascolto
            del corpo, umano e animale. Oggi applica la biorisonanza a
            distanza per aiutare cani e gatti a ritrovare equilibrio, insieme
            a chi li ama ogni giorno.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
