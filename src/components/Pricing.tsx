import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { FeatureCard } from "./FeatureCard";
import { SectionTitle } from "./SectionTitle";

const tiers = [
  {
    name: "Chiamata conoscitiva",
    price: "Gratuita",
    detail: "10 minuti, senza impegno, per capire se Vibra fa al caso vostro.",
    cta: true,
  },
  {
    name: "Sessione singola",
    price: "€ —",
    detail: "Una sessione completa di biorisonanza a distanza per il tuo animale.",
    cta: false,
  },
  {
    name: "Percorso 3 sessioni",
    price: "€ —",
    detail: "Per un riequilibrio che richiede continuità nel tempo.",
    cta: false,
  },
];

export function Pricing() {
  return (
    <section id="percorsi" className="border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionTitle
          firstHalf="Percorsi "
          secondHalf="disponibili"
          className="max-w-[20ch] text-3xl leading-tight text-[var(--color-off-black)] md:text-4xl"
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} index={i}>
              <FeatureCard
                title={t.name}
                className="bg-[var(--color-pure-white)] p-8"
                eyebrow={
                  t.cta ? (
                    <span className="mb-4 w-fit rounded-[var(--radius-pill)] border border-[var(--color-ember)] px-3 py-1 text-[12px] text-[var(--color-ember)]">
                      Si parte da qui
                    </span>
                  ) : undefined
                }
              >
                <p className="mt-3 font-body text-3xl text-[var(--color-off-black)]">
                  {t.price}
                </p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--color-steel)]">
                  {t.detail}
                </p>
                {t.cta && (
                  <MotionButton href="#prenota" label={ctaLabel} fullWidth className="mt-6" />
                )}
              </FeatureCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-body text-[12px] text-[var(--color-ash)]">
          Prezzi da confermare — segnaposto in attesa del listino definitivo.
        </p>
      </div>
    </section>
  );
}
