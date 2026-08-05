import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";

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
      className="border-b border-[var(--color-border)] bg-[var(--color-ink)] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="max-w-[22ch] text-3xl leading-tight tracking-tight text-[var(--color-bone)] md:text-4xl">
            Come funziona una sessione
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} index={i}>
              <span className="inline-flex items-center rounded-full border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] px-3 py-1 font-mono text-[13px] text-[var(--color-amber)]">
                {s.n}
              </span>
              <h3 className="mt-4 text-lg text-[var(--color-bone)]">
                {s.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_65%,transparent)]">
                {s.body}
              </p>
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
