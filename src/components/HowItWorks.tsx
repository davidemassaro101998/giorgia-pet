import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { SectionTitle } from "./SectionTitle";
import { FeatureCard } from "./FeatureCard";

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

        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i}>
              <FeatureCard
                title={s.title}
                className="bg-[var(--color-off-white)]"
                eyebrow={
                  <span className="mb-4 inline-flex w-fit items-center rounded-[var(--radius-pill)] border border-[var(--color-ember)] px-3 py-1 font-body text-[12px] text-[var(--color-ember)]">
                    {s.n}
                  </span>
                }
              >
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-steel)]">
                  {s.body}
                </p>
              </FeatureCard>
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
