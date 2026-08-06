// Quarto giro sul coverflow: il testo di ogni step viveva sotto il
// carousel (caption HTML) — spostato DENTRO ogni card, impaginato, al
// posto del numero grande in SVG. Le card sono ora piene del colore
// accento ("quel colore rosa", ember) invece che vetro trasparente su
// bianco — un'eccezione esplicita alla regola "l'accento mai come
// riempimento" del resto del sito, qui voluta apposta perché le card
// devono "risaltare dallo sfondo bianco". `CoverflowCarousel` ora
// supporta un campo `content` per slide (aggiunto rispetto all'originale
// fornito dall'utente, che prevedeva solo immagini + caption sotto).
//
// Quinto giro: il layout `justify-between` teneva titolo/testo ancorati
// in basso, col numero solo che occupava la parte alta — su richiesta
// ("impagina meglio il testo piu in alto e piu importante") il blocco
// titolo+corpo è stato spostato subito sotto il numero (niente più
// `justify-between`) e il titolo è più grande/pesante per darne più
// rilievo visivo.
//
// Sesto giro: l'ombra colorata sotto ogni card (più lo `shadow-xl` di
// base del componente) leggeva come un "riflesso" che le faceva
// sembrare sospese sopra lo sfondo bianco anche da ferme — tolta del
// tutto (`shadow-none` in `cardClassName`, vince su `shadow-xl` via
// tailwind-merge). Le card restano piatte sul bianco, la profondità la
// dà solo la prospettiva 3D del coverflow stesso.

import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { SectionTitle } from "./SectionTitle";
import { CoverflowCarousel, type CoverflowSlide } from "./CoverflowCarousel";

const steps = [
  {
    n: "01",
    title: "Prenoti la chiamata gratuita",
    body: "10 minuti per raccontare la situazione del tuo animale, senza impegno.",
  },
  {
    n: "02",
    title: "Videochiamata con Giorgia",
    body: "Un incontro live in cui osserviamo animale, ambiente e relazione con te.",
  },
  {
    n: "03",
    title: "Sessione di biorisonanza a distanza",
    body: "Il riequilibrio agisce sul sistema animale-ambiente-padrone nel suo insieme.",
  },
  {
    n: "04",
    title: "Indicazioni e follow-up",
    body: "Ricevi consigli pratici da seguire a casa e restiamo in contatto sui progressi.",
  },
];

const slides: CoverflowSlide[] = steps.map((s) => ({
  alt: `Passo ${s.n}: ${s.title}`,
  content: (
    <div className="flex h-full w-full flex-col bg-[var(--color-ember)] p-7 text-left">
      <span className="font-body text-[13px] text-[color-mix(in_srgb,var(--color-off-white)_75%,transparent)]">
        {s.n}
      </span>
      <h3 className="mt-4 text-2xl font-semibold leading-[1.1] text-[var(--color-off-white)] md:text-[26px]">
        {s.title}
      </h3>
      <p className="mt-4 text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_90%,transparent)]">
        {s.body}
      </p>
    </div>
  ),
}));

export function HowItWorks() {
  return (
    <section
      id="come-funziona"
      className="border-b border-[var(--color-hairline)] bg-[var(--color-pure-white)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionTitle
          firstHalf="Come funziona "
          secondHalf="una sessione"
          className="max-w-[22ch] text-3xl leading-tight text-[var(--color-off-black)] md:text-4xl"
        />

        <Reveal index={1} className="mt-16">
          <CoverflowCarousel
            slides={slides}
            showPagination
            cardWidth="clamp(220px, 30vw, 360px)"
            label="Come funziona una sessione"
            cardClassName="rounded-[28px] shadow-none"
          />
        </Reveal>

        <Reveal index={2} className="mt-10 flex justify-center">
          <MotionButton href="#prenota" label={ctaLabel} />
        </Reveal>
      </div>
    </section>
  );
}
