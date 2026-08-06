// Ricostruita una seconda volta su richiesta esplicita ("non mi piace per
// niente... rifalla più premium in stile dell'app, ha un peso molto
// importante, deve avere un'animazione di transizione solo sua"). La
// versione precedente (lista editoriale a 3 colonne, vedi git log) restava
// comunque statica — si leggono tutti e 4 gli step insieme, nessuna
// sensazione di sequenza. Sostituita con un coverflow 3D (drag/tocco,
// prospettiva, il pattern iconico "Apple Music/iTunes" — esattamente "in
// stile app"): un solo step alla volta è a fuoco e a centro, gli altri
// si allontanano in prospettiva ai lati. Componente fornito per intero
// dall'utente (CoverflowCarousel.tsx) — vedi lì per i dettagli di
// adattamento. Sezione passata a sfondo scuro apposta: il coverflow
// "brilla" su nero (com'è per l'App Store/Apple Music), le card chiare
// fanno da unico contrasto — coerente col resto del sito (bookend scuri)
// ma con un peso visivo che le altre sezioni chiare non hanno.
//
// Le "copertine" sono generate come SVG inline (data URI) — non abbiamo
// foto per singolo step, il numero enorme in ember su nero fa da visual
// riconoscibile invece di un'icona stock. Titolo/corpo veri restano sotto
// il coverflow come testo HTML vero (leggibile, non dentro l'immagine).

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
      <rect width="640" height="640" fill="#15130f" />
      <circle cx="320" cy="320" r="196" fill="none" stroke="#c9705c" stroke-opacity="0.35" stroke-width="1.5" />
      <text x="320" y="360" font-family="Inter, ui-sans-serif, system-ui, sans-serif" font-size="220" font-weight="400" fill="#c9705c" text-anchor="middle">${n}</text>
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
      className="border-b border-[var(--color-hairline)] bg-[var(--color-off-black)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionTitle
          firstHalf="Come funziona "
          secondHalf="una sessione"
          className="max-w-[22ch] text-3xl leading-tight text-[var(--color-off-white)] md:text-4xl"
        />

        <Reveal index={1} className="mt-16">
          <CoverflowCarousel
            slides={slides}
            showCaption
            showPagination
            showNavigation
            dark
            cardWidth="clamp(200px, 30vw, 340px)"
            label="Come funziona una sessione"
          />
        </Reveal>

        <Reveal index={2} className="mt-10 flex justify-center">
          <MotionButton href="#prenota" label={ctaLabel} variant="primary-on-dark" />
        </Reveal>
      </div>
    </section>
  );
}
