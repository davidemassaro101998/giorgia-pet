import { Reveal } from "./Reveal";

const signals = [
  {
    title: "Ansia da separazione",
    body: "Distrugge, abbaia o piange ogni volta che resta solo.",
  },
  {
    title: "Paura e reattività",
    body: "Si spaventa per rumori, temporali, altri animali o persone.",
  },
  {
    title: "Cambiamenti di comportamento",
    body: "Un trasloco, un lutto in famiglia, un nuovo arrivo lo hanno destabilizzato.",
  },
  {
    title: "Squilibrio energetico diffuso",
    body: "Sta bene dal punto di vista clinico, ma qualcosa non torna nel suo equilibrio generale.",
  },
];

export function Problem() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <h2 className="max-w-[26ch] text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl">
            Riconosci uno di questi segnali nel tuo cane o gatto?
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {signals.map((s, i) => (
            <Reveal
              key={s.title}
              index={i}
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-paper)] p-8"
            >
              <h3 className="text-lg text-[var(--color-ink)]">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-graphite)]">
                {s.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
