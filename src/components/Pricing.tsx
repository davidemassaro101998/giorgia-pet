import { ctaLabel } from "../siteConfig";
import { Reveal } from "./Reveal";

const tiers = [
  {
    name: "Chiamata conoscitiva",
    price: "Gratuita",
    detail: "10 minuti, senza impegno, per capire se Armonya fa al caso vostro.",
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
            <Reveal
              key={t.name}
              index={i}
              className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-8"
            >
              <h3 className="text-lg text-[var(--color-ink)]">{t.name}</h3>
              <p className="mt-3 text-3xl tracking-tight text-[var(--color-ink)]">
                {t.price}
              </p>
              <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[var(--color-graphite)]">
                {t.detail}
              </p>
              {t.cta && (
                <a
                  href="#prenota"
                  className="mt-6 inline-block rounded-lg bg-[var(--color-ink)] px-5 py-3 text-center font-mono text-[13px] uppercase tracking-wide text-[var(--color-bone)]"
                >
                  {ctaLabel}
                </a>
              )}
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
