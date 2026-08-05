import { Reveal } from "./Reveal";

const faqs = [
  {
    q: "La biorisonanza sostituisce il veterinario?",
    a: "No. Il veterinario resta sempre il riferimento per diagnosi, prescrizioni e cure cliniche. La biorisonanza è un supporto complementare per il riequilibrio emotivo, energetico e comportamentale.",
  },
  {
    q: "È sicura per il mio animale?",
    a: "Sì: è un metodo non invasivo, che non prevede alcun contatto fisico diretto durante la sessione a distanza.",
  },
  {
    q: "Quanto dura una sessione?",
    a: "La chiamata conoscitiva gratuita dura 10 minuti. Una sessione completa di biorisonanza ha una durata diversa, che ti viene spiegata durante la chiamata in base alla situazione del tuo animale.",
  },
  {
    q: "Il mio animale deve essere presente fisicamente?",
    a: "No, la sessione si svolge a distanza. È utile che l'animale sia nel suo ambiente abituale, dato che il riequilibrio lavora anche sul contesto in cui vive.",
  },
];

export function Faq() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-6">
        <Reveal>
          <h2 className="text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl">
            Domande frequenti
          </h2>
        </Reveal>
        <div className="mt-10 divide-y divide-[var(--color-border)]">
          {faqs.map((f, i) => (
            <Reveal key={f.q} index={i}>
              <details className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[17px] text-[var(--color-ink)]">
                  {f.q}
                  <span className="ml-4 shrink-0 font-mono text-[var(--color-amber)] group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[65ch] text-[15px] leading-relaxed text-[var(--color-graphite)]">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
