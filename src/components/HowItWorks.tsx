// Ricostruita una terza volta su feedback diretto: sfondo passato a
// chiaro (le card "glass" — vetro smerigliato vero, non un colore pieno —
// hanno bisogno di uno sfondo su cui l'effetto sia leggibile, e il nero
// pieno del giro precedente lo appiattiva), i numeri nell'SVG erano
// "orrendi" (numero bianco/ember su un quadrato nero pieno, nessuna
// finezza), le frecce di navigazione rimosse — resta solo il drag, più
// pulito. Vedi CoverflowCarousel.tsx per il componente base (fornito
// dall'utente, adattato solo nell'icona e nell'import di cn).
//
// Le "copertine" ora sono SVG a sfondo TRASPARENTE (solo un bagliore
// ember sfocato + il numero, niente rettangolo pieno) — è quello che
// permette alla card sotto di essere davvero vetro: `cardClassName`
// sovrascrive lo sfondo/ombra di default del carousel con un pannello
// semi-trasparente + `backdrop-blur-xl` + bordo chiaro, e l'immagine
// (trasparente) lascia intravedere quel vetro invece di coprirlo con un
// quadrato opaco.

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

function stepCardImage(n: string): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640">
      <defs>
        <radialGradient id="glow" cx="50%" cy="42%" r="42%">
          <stop offset="0%" stop-color="#c9705c" stop-opacity="0.5" />
          <stop offset="100%" stop-color="#c9705c" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="numeral" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#c9705c" />
          <stop offset="100%" stop-color="#a85541" />
        </linearGradient>
      </defs>
      <circle cx="320" cy="300" r="230" fill="url(#glow)" />
      <circle cx="320" cy="320" r="176" fill="none" stroke="#c9705c" stroke-opacity="0.3" stroke-width="1" />
      <text x="320" y="358" font-family="'Inter Tight', Inter, ui-sans-serif, system-ui, sans-serif" font-size="196" font-weight="300" letter-spacing="-6" fill="url(#numeral)" text-anchor="middle">${n}</text>
    </svg>
  `.trim();
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const slides: CoverflowSlide[] = steps.map((s) => ({
  src: stepCardImage(s.n),
  alt: `Passo ${s.n}: ${s.title}`,
  title: s.title,
  subtitle: s.body,
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
            showCaption
            showPagination
            cardWidth="clamp(200px, 30vw, 340px)"
            label="Come funziona una sessione"
            cardClassName="rounded-[28px] border border-[color-mix(in_srgb,var(--color-off-black)_8%,transparent)] bg-[color-mix(in_srgb,var(--color-pure-white)_45%,transparent)] shadow-[0_30px_50px_-16px_rgba(21,19,15,0.18)] backdrop-blur-xl"
          />
        </Reveal>

        <Reveal index={2} className="mt-10 flex justify-center">
          <MotionButton href="#prenota" label={ctaLabel} />
        </Reveal>
      </div>
    </section>
  );
}
