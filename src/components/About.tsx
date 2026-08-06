// Sesto giro su questa sezione: non più solo la foto animata, ma **tutta
// la sezione risponde allo scroll** — richiesta esplicita dell'utente,
// Giorgia è la fondatrice e "deve essere un pilastro del sito", stesso
// peso della cinematic intro (`CinematicIntro.tsx`).
//
// Tecnica sourced da 21st.dev (regola obbligatoria del progetto — vedi
// CLAUDE.md): "Cinematic Product Scroll Section" di a.karamooz3232
// (id 17441, https://21st.dev/@a.karamooz3232/components/cinematic-
// product-scroll-section), sotto-componente `ProductHero` — una sezione
// alta 250vh con uno stage `sticky` che resta fermo mentre un
// `clip-path` rivela l'immagine a colori sopra una base desaturata, e
// blocchi di testo che si sbloccano a soglie di progresso scroll
// diverse. Adattato, non copiato 1:1:
// - Al posto dello scroll-listener manuale + calcolo `getBoundingClientRect`
//   dell'originale, uso `ScrollTrigger` con `scrub: true` (già nello
//   stack del progetto) — stessa idea (`onUpdate` legge `self.progress`),
//   niente reinvenzione del calcolo di progresso.
// - **Niente `pin` GSAP**: lo stage resta fermo via `position: sticky`
//   nativa CSS, non un pin gestito da GSAP — evita la stessa classe di
//   bug appena risolta sui link della nav (spacer di pin che si
//   ricalcola in conflitto con lo scroll). `sticky` non ha uno spacer da
//   ricalcolare, è il browser a gestirlo.
// - Il "colore" non è letteralmente saturazione fotografica: è lei che
//   **si materializza** da un doppio scarico (grayscale + attenuata) a
//   nitida. Il filtro anti-alone di cane/gatto (`url(#pet-cutout-feather)`)
//   è applicato **una sola volta sul contenitore** dei due livelli
//   (non su ciascun `<img>` separatamente, versione precedente) —
//   stesso risultato visivo, meno filtri CSS ricalcolati a ogni frame
//   dello scrub, più fluido. Zero `drop-shadow` su entrambi (stessa
//   lezione del cane — su questo fondo un'ombra legge come alone).
// - Il wipe è verticale dal basso (coerente con l'ancoraggio "appoggiata
//   al pavimento" della sezione), non una maschera circolare come
//   nell'originale (pensata per un hover su una card prodotto, non per
//   uno scroll).
// - Sotto `md` l'intero meccanismo sticky/scrub è disattivato via CSS
//   (niente `md:` sulle classi di altezza/sticky) — sulla stessa
//   filosofia già in uso per cane/gatto/lei: foto nascosta sotto la
//   piega, testo statico con reveal semplice.

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";
import { SeamFade } from "./SeamFade";
import { SectionTitle } from "./SectionTitle";
import giorgiaPhoto from "../assets/giorgia-cutout.png";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const GIORGIA_FILTER = "url(#pet-cutout-feather)";

// Soglie di progresso scroll (0-1) a cui ogni blocco di testo si sblocca.
const STEP_THRESHOLDS = [0.12, 0.34, 0.56, 0.78];

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const colorPhotoRef = useRef<HTMLImageElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      gsap.set(colorPhotoRef.current, { clipPath: "inset(0% 0 0 0)" });
      stepRefs.current.forEach((el) => gsap.set(el, { opacity: 1, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (colorPhotoRef.current) {
            colorPhotoRef.current.style.clipPath = `inset(${(1 - progress) * 100}% 0 0 0)`;
          }
          stepRefs.current.forEach((el, i) => {
            if (!el) return;
            const active = progress > STEP_THRESHOLDS[i];
            el.style.opacity = active ? "1" : "0";
            el.style.transform = active ? "translateY(0px)" : "translateY(28px)";
          });
        },
      });
      return () => st.kill();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // NIENTE `overflow-hidden` qui: un ancestor con `overflow:hidden` rompe
    // `position:sticky` sui discendenti (gotcha CSS reale, non ovvio — lo
    // stage sticky sotto smetteva di "restare fermo" ed emergeva questo
    // bug solo a metà scroll). Il clipping del bleed della foto
    // (`-translate-x-[6%]`) resta sullo stage sticky stesso
    // (`md:overflow-hidden`), che può clippare i propri figli senza
    // rompere la propria sticky-ness.
    // Niente `border-b`: la sezione seguente (WhoItsFor, sfondo chiaro)
    // porta il proprio `SeamFade`. Questa sezione riceve il SeamFade in
    // entrata da HowItWorks (bianco) — vedi subito sotto l'apertura del tag.
    <section
      ref={sectionRef}
      id="chi-ti-segue"
      className="relative bg-[var(--color-off-black)]"
    >
      <SeamFade fromColor="var(--color-pure-white)" />
      <div ref={wrapRef} className="relative md:h-[220vh]">
        <div className="relative w-full md:sticky md:top-0 md:h-screen md:overflow-hidden">
          <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-24 md:h-full md:grid-cols-[1fr_1fr] md:gap-0 md:py-0 md:pt-16">
            {/* Ancorata in basso a sinistra come cane/gatto: il lato
                inferiore tocca il fondo dello stage, il lato sinistro
                esce dalla cornice. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0 left-0 hidden w-[min(48%,560px)] items-end justify-start md:flex">
              <div
                className="relative h-full w-full max-w-[520px] -translate-x-[6%]"
                style={{ filter: GIORGIA_FILTER }}
              >
                <img
                  src={giorgiaPhoto}
                  alt=""
                  aria-hidden
                  className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom"
                  style={{ filter: "grayscale(1) brightness(0.55) contrast(1.05)" }}
                />
                <img
                  ref={colorPhotoRef}
                  src={giorgiaPhoto}
                  alt=""
                  aria-hidden
                  className="absolute bottom-0 left-0 h-full w-full object-contain object-bottom"
                  style={{ clipPath: "inset(100% 0 0 0)" }}
                />
              </div>
            </div>

            <div className="hidden md:block" aria-hidden />

            <div className="relative z-10 flex flex-col gap-7">
              <div
                ref={(el) => {
                  stepRefs.current[0] = el;
                }}
                className="opacity-0 transition-[opacity,transform] duration-700 ease-out"
                style={{ transform: "translateY(28px)" }}
              >
                <p className="font-body text-[13px] text-[var(--color-ash)]">Chi ti segue</p>
                <SectionTitle
                  firstHalf={site.practitioner.name.split(" ")[0] + " "}
                  secondHalf={site.practitioner.name.split(" ").slice(1).join(" ")}
                  className="mt-3 text-3xl leading-tight text-[var(--color-off-white)] md:text-4xl"
                />
              </div>

              <div
                ref={(el) => {
                  stepRefs.current[1] = el;
                }}
                className="opacity-0 transition-[opacity,transform] duration-700 ease-out"
                style={{ transform: "translateY(28px)" }}
              >
                <p className="text-base text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)]">
                  {site.practitioner.role}
                </p>
              </div>

              <div
                ref={(el) => {
                  stepRefs.current[2] = el;
                }}
                className="opacity-0 transition-[opacity,transform] duration-700 ease-out"
                style={{ transform: "translateY(28px)" }}
              >
                <p className="max-w-[52ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)]">
                  Prima infermiera, poi kinesiologa: un percorso nato
                  dall'ascolto del corpo, umano e animale. Oggi applica la
                  biorisonanza a distanza per aiutare cani e gatti a
                  ritrovare equilibrio, insieme a chi li ama ogni giorno.
                </p>
              </div>

              <div
                ref={(el) => {
                  stepRefs.current[3] = el;
                }}
                className="opacity-0 transition-[opacity,transform] duration-700 ease-out"
                style={{ transform: "translateY(28px)" }}
              >
                <MotionButton href="#prenota" label={ctaLabel} variant="primary-on-dark" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
