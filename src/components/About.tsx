// Foto vera di Giorgia trattata come le altre: non una "card" con un box
// rigido (il tentativo precedente — un rettangolo 233×300 su sfondo
// nero, con un fade interno troppo stretto per nascondere il proprio
// bordo — leggeva come un'immagine incollata sopra, segnalato
// dall'utente). Ora è un livello di sfondo che sanguina da sinistra
// dietro al testo, maschera molto più ampia (il fade comincia ben prima
// del bordo del contenitore, non ha un bordo percepibile) — stessa
// tecnica di cane/gatto, non più un riquadro a sé. Bassa risoluzione
// (190×245) accettata "per ora": la sfumatura ampia aiuta a nasconderlo,
// una foto nitida e piccola in un box netto lo avrebbe reso più evidente.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../siteConfig";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import giorgiaPhoto from "../assets/giorgia.jpg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(photoRef.current, { opacity: 1, scale: 1, filter: "blur(0px)" });
        return;
      }
      gsap.fromTo(
        photoRef.current,
        { opacity: 0, scale: 1.12, filter: "blur(22px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="chi-ti-segue"
      className="relative overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-black)] py-20 md:py-28"
    >
      <div
        ref={photoRef}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-[50%] md:block"
        style={{
          backgroundImage: `url(${giorgiaPhoto})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
          maskImage: "radial-gradient(75% 70% at 28% 45%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(75% 70% at 28% 45%, black 20%, transparent 75%)",
        }}
      />
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
