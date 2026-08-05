import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { TiltCard } from "./TiltCard";
import { GlowingEffect } from "./GlowingEffect";

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
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="max-w-[20ch] text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl">
            Percorsi disponibili
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} index={i}>
              <TiltCard
                className={`flex flex-col rounded-2xl border p-8 ${
                  t.cta
                    ? "border-[color-mix(in_srgb,var(--color-ember)_45%,transparent)] bg-[var(--color-paper)] ring-1 ring-[color-mix(in_srgb,var(--color-ember)_20%,transparent)]"
                    : "border-[var(--color-border)] bg-[var(--color-paper)]"
                }`}
              >
                {t.cta && <GlowingEffect />}
                <h3 className="text-lg text-[var(--color-ink)]">{t.name}</h3>
                <p className="mt-3 font-display text-3xl tracking-tight text-[var(--color-ink)]">
                  {t.price}
                </p>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--color-graphite)]">
                  {t.detail}
                </p>
                {t.cta && (
                  <MotionButton href="#prenota" label={ctaLabel} fullWidth className="mt-6" />
                )}
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 font-mono text-[12px] text-[var(--color-graphite)]">
          Prezzi da confermare — segnaposto in attesa del listino definitivo.
        </p>
      </div>
    </section>
  );
}
