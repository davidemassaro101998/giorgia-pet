// Sezione cinematografica hero → "cos'è la biorisonanza": l'unico punto
// del sito dove ci si è presi la libertà di essere spettacolari (scelta
// esplicita dell'utente), il resto resta sobrio per coerenza con lo
// style-reference adottato nello Step 1.7. Tecnica adattata da 21st.dev
// lovesickfromthe6ix/full-screen-scroll-fx (id 5794): un binario di
// scroll lungo il doppio del viewport viene "pinnato" (GSAP ScrollTrigger,
// pin + trigger su un contenitore fantasma), e a metà corsa la hero
// dissolve nella sezione successiva invece di scorrere via — semplificato
// rispetto all'originale (pensato per uno slideshow a N slide con liste
// laterali e audio) a due sole slide, senza liste/suoni non pertinenti
// qui. I titoli usano VerticalCutReveal (id 18595) per il wipe verticale.
//
// Il cane è un ritaglio vero (PNG con alpha, fornito dall'utente) trattato
// come un elemento che GALLEGGIA sopra il canvas invece di fondersi dentro
// — capovolgimento voluto rispetto al tentativo precedente (una foto con
// sfondo scuro mascherata con un fade ampio per dissolversi nel nero):
// qui niente più grayscale/desaturazione, un'ombra morbida (`drop-shadow`,
// rispetta l'alpha del PNG — `box-shadow` non lo farebbe) dà la
// profondità, e un tilt 3D che segue il mouse (GSAP `quickTo` su
// rotationX/rotationY, dentro un contenitore con `perspective`) rinforza
// la sensazione "sopra lo sfondo in 3D" richiesta esplicitamente.
//
// GOTCHAS #1: il contenuto sopra la piega (slide 1, la hero) si rivela
// via GSAP al mount, mai via IntersectionObserver — il crossfade legato
// allo scroll parte solo DOPO che l'utente ha iniziato a scrollare, quindi
// non rientra nel vincolo (è un'interazione deliberata, non il reveal
// iniziale).

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";
import { VerticalCutReveal, type VerticalCutRevealRef } from "./VerticalCutReveal";
import heroDog from "../assets/hero-dog-cutout.png";

// `url(#pet-cutout-feather)` (definito in CutoutFilterDefs.tsx, montato
// una volta in App.tsx) erode e sfuma il bordo alpha del ritaglio prima
// di applicare l'ombra — senza, la frangia dura del cutout PNG proietta
// la sua stessa ombra e legge come un "alone incollato" invece che una
// vera profondità. Ombra singola e più contenuta rispetto al primo
// tentativo (due drop-shadow sommate, troppo larghe): quella aggravava
// l'alone invece di dare profondità pulita.
const DOG_SHADOW = "url(#pet-cutout-feather) drop-shadow(0 22px 26px rgba(0,0,0,0.4))";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function CinematicIntro() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroLayerRef = useRef<HTMLDivElement>(null);
  const whatIsLayerRef = useRef<HTMLDivElement>(null);
  const heroImgWrapRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRevealRef = useRef<HTMLDivElement>(null);
  const heroTitleRef = useRef<VerticalCutRevealRef>(null);
  const whatIsTitleRef = useRef<VerticalCutRevealRef>(null);
  const lastSlide = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(heroRevealRef.current, { filter: "blur(0px)", opacity: 1, scale: 1 });
        gsap.set(heroImgWrapRef.current, { filter: `blur(0px) ${DOG_SHADOW}`, opacity: 1, scale: 1 });
        heroTitleRef.current?.startAnimation();
        return;
      }

      gsap.fromTo(
        heroRevealRef.current,
        { filter: "blur(24px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 1.6, ease: "expo.out" },
      );
      gsap.fromTo(
        heroImgWrapRef.current,
        { opacity: 0, scale: 1.08, filter: `blur(18px) ${DOG_SHADOW}` },
        { opacity: 1, scale: 1, filter: `blur(0px) ${DOG_SHADOW}`, duration: 2.2, ease: "expo.out", delay: 0.15 },
      );
      heroTitleRef.current?.startAnimation();

      // Tilt 3D che segue il mouse — sottile (±5deg), niente sulla verticale
      // per non far "annuire" il cane in modo strano.
      if (heroImgRef.current) {
        const quickX = gsap.quickTo(heroImgRef.current, "rotationY", { duration: 0.7, ease: "power3.out" });
        const quickY = gsap.quickTo(heroImgRef.current, "rotationX", { duration: 0.7, ease: "power3.out" });
        const onMove = (e: MouseEvent) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          quickX((e.clientX / w - 0.5) * 10);
          quickY(-(e.clientY / h - 0.5) * 6);
        };
        stageRef.current?.addEventListener("mousemove", onMove);
      }

      gsap.set(whatIsLayerRef.current, { opacity: 0, pointerEvents: "none" });

      const goToSlide = (index: 0 | 1) => {
        if (index === lastSlide.current) return;
        lastSlide.current = index;
        const showHero = index === 0;

        gsap.to(heroRevealRef.current, { opacity: showHero ? 1 : 0, duration: 0.8, ease: "power3.out" });
        gsap.to(heroImgWrapRef.current, {
          opacity: showHero ? 1 : 0,
          scale: showHero ? 1 : 1.15,
          filter: showHero ? `blur(0px) ${DOG_SHADOW}` : `blur(20px) ${DOG_SHADOW}`,
          duration: 1.2,
          ease: "power2.inOut",
        });
        gsap.to(whatIsLayerRef.current, { opacity: showHero ? 0 : 1, duration: 0.9, ease: "power3.out" });
        gsap.set(heroLayerRef.current, { pointerEvents: showHero ? "auto" : "none" });
        gsap.set(whatIsLayerRef.current, { pointerEvents: showHero ? "none" : "auto" });

        if (showHero) heroTitleRef.current?.startAnimation();
        else whatIsTitleRef.current?.startAnimation();
      };

      const st = ScrollTrigger.create({
        trigger: wrapRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: true,
        onUpdate: (self) => goToSlide(self.progress < 0.5 ? 0 : 1),
      });

      return () => st.kill();
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} id="top" className="relative" style={{ height: "200vh" }}>
      <div ref={stageRef} className="relative h-screen w-full overflow-hidden bg-[var(--color-off-black)]">
        {/* Slide 1 — Hero */}
        <div ref={heroLayerRef} className="absolute inset-0 pt-16">
          {/* Ancorato in basso a destra e ingrandito apposta: il lato
              inferiore tocca il fondo del blocco nero, il lato destro può
              uscire dalla cornice (`overflow-hidden` sullo stage) — il
              taglio dell'immagine si legge come inquadratura voluta invece
              che come un bordo che fluttua nel vuoto. */}
          <div
            ref={heroImgWrapRef}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-end justify-end md:flex"
            style={{ perspective: "1400px" }}
          >
            <img
              ref={heroImgRef}
              src={heroDog}
              alt=""
              className="h-[104%] w-auto max-w-none translate-x-[6%] object-contain object-bottom"
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>

          <div
            ref={heroRevealRef}
            className="relative z-10 mx-auto flex h-[calc(100vh-4rem)] w-full max-w-[1200px] flex-col justify-center px-6 py-14 md:items-start md:text-left"
          >
            <div className="mx-auto max-w-[560px] text-center md:mx-0 md:max-w-[520px] md:text-left">
              <p className="mb-5 font-body text-[12px] font-normal text-[var(--color-ember)]">{site.positioning}</p>
              <h1 className="text-[clamp(2.5rem,6vw,4.75rem)] font-normal leading-[1.02] text-[var(--color-off-white)]">
                <VerticalCutReveal
                  ref={heroTitleRef}
                  splitBy="characters"
                  staggerDuration={0.01}
                  staggerFrom="first"
                  transition={{ type: "spring", stiffness: 220, damping: 24 }}
                >
                  Riequilibrio
                </VerticalCutReveal>
                <br />
                <span className="text-gradient">
                  <VerticalCutReveal
                    splitBy="characters"
                    staggerDuration={0.01}
                    staggerFrom="first"
                    transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.25 }}
                  >
                    a distanza.
                  </VerticalCutReveal>
                </span>
              </h1>
              <p className="mt-7 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)] md:text-lg">
                Per il tuo cane o gatto, per te, per l'ambiente che vivete insieme
                — una videochiamata con Giorgia Bisognin, senza stress da
                spostamento.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <MotionButton href="#prenota" label={ctaLabel} variant="primary-on-dark" />
                <MotionButton href="#come-funziona" label="Come funziona" variant="ghost-on-dark" />
              </div>
              <p className="mt-6 max-w-[42ch] font-body text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_40%,transparent)]">
                Il veterinario resta sempre il riferimento sanitario del tuo
                animale — la biorisonanza è un supporto complementare.
              </p>
            </div>
          </div>
        </div>

        {/* Slide 2 — Cos'è la biorisonanza */}
        <div
          ref={whatIsLayerRef}
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <h2 className="max-w-[900px] text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] text-[var(--color-off-white)]">
            <VerticalCutReveal
              ref={whatIsTitleRef}
              splitBy="words"
              staggerDuration={0.06}
              staggerFrom="first"
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              Cos'è la biorisonanza
            </VerticalCutReveal>
          </h2>
          <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_70%,transparent)] md:text-lg">
            Un metodo di riequilibrio energetico che lavora non solo sul
            singolo animale, ma sul sistema che lo circonda: il suo stato
            emotivo, l'ambiente in cui vive e la relazione con te. L'obiettivo è
            riportare armonia dove qualcosa si è disallineato — nel
            comportamento, nelle emozioni, nell'energia complessiva.
          </p>
          <p className="mt-8 max-w-[46ch] font-body text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_45%,transparent)]">
            La biorisonanza è un supporto complementare, non un atto
            medico-veterinario. Il veterinario resta sempre il riferimento per
            diagnosi e cure cliniche del tuo animale.
          </p>
        </div>
      </div>
    </div>
  );
}
