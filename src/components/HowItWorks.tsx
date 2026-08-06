// Ricostruita da zero: la versione a 4 card in griglia (FeatureCard)
// leggeva come un elenco puntato vestito bene, "non ha un peso
// importante" (feedback diretto). Sostituita con una lista editoriale
// verticale — righe a tutta larghezza in 3 colonne (numero grande |
// titolo | testo), separate da hairline, senza contenitori/bordi attorno
// a ogni riga: è il pattern "Breakthrough" a griglia asimmetrica descritto
// nello style-reference scelto dall'utente (Augen Pro — "narrow label |
// wide heading | side paragraph"), mai usato altrove sul sito finora. Il
// numero enorme dà peso senza bisogno di un box; la vita all'hover (numero
// che diventa ember, titolo che scivola) resta coerente con FeatureCard.

import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { SectionTitle } from "./SectionTitle";

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

        <div className="mt-16 border-t border-[var(--color-hairline)]">
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i}>
              <div className="group/step grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-[var(--color-hairline)] py-10 transition-colors duration-300 md:grid-cols-[0.9fr_1.6fr_2fr] md:gap-y-0 md:py-12">
                <span className="font-body text-[clamp(2.75rem,5vw,4rem)] leading-none text-[var(--color-ash)] transition-colors duration-300 group-hover/step:text-[var(--color-ember)]">
                  {s.n}
                </span>
                <h3 className="text-xl text-[var(--color-off-black)] transition-transform duration-300 group-hover/step:translate-x-1.5 md:text-2xl">
                  {s.title}
                </h3>
                <p className="max-w-[46ch] text-[15px] leading-relaxed text-[var(--color-steel)] md:text-base">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal index={4} className="mt-14">
          <MotionButton href="#prenota" label={ctaLabel} />
        </Reveal>
      </div>
    </section>
  );
}
