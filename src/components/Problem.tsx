import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";
import { FeatureCard } from "./FeatureCard";

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
    <section className="border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        <SectionTitle
          firstHalf="Riconosci uno di questi segnali "
          secondHalf="nel tuo cane o gatto?"
          className="max-w-[30ch] text-3xl leading-tight tracking-tight text-[var(--color-off-black)] md:text-4xl"
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
          {signals.map((s, i) => (
            <Reveal key={s.title} index={i}>
              <FeatureCard title={s.title} className="bg-[var(--color-pure-white)]">
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-steel)]">
                  {s.body}
                </p>
              </FeatureCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
