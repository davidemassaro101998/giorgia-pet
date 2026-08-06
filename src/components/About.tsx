// Sezione ripensata per la foto vera di Giorgia (bassa risoluzione,
// 190×245 — l'utente ha chiesto di usarla comunque "così piccola per
// ora", quindi il ritratto resta a dimensione contenuta invece di essere
// ingrandito come sfondo ambientale, per non renderlo sgranato). Lo
// sfondo della sezione diventa scuro (`--color-off-black`) apposta:
// lo sfondo della foto stessa è già un nero quasi identico, così il
// ritratto si fonde nel canvas della sezione invece di stare dentro una
// cornice — "sfondo della sezione uguale a quello della foto", come
// richiesto. Comparsa via GSAP ScrollTrigger (blur+scale, stessa
// tecnica di cane/gatto) per l'ingresso "spettacolare" richiesto.

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
      className="border-b border-[var(--color-hairline)] bg-[var(--color-off-black)] py-20 md:py-28"
    >
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[300px_1fr]">
        <div
          ref={photoRef}
          className="relative mx-auto h-[300px] w-[233px] md:mx-0"
          style={{
            backgroundImage: `url(${giorgiaPhoto})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
            maskImage: "radial-gradient(85% 85% at 50% 40%, black 55%, transparent 96%)",
            WebkitMaskImage: "radial-gradient(85% 85% at 50% 40%, black 55%, transparent 96%)",
          }}
        />
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
