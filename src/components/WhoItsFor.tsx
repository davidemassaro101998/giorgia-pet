import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const cases = [
  "Cani e gatti ansiosi",
  "Paura di rumori forti",
  "Difficoltà dopo un trasloco",
  "Aggressività reattiva",
  "Recupero dopo un lutto in famiglia",
  "Squilibrio comportamentale generico",
];

export function WhoItsFor() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-6 text-center">
        <Reveal>
          <SectionTitle
            firstHalf="Per chi è pensato "
            secondHalf="Vibra"
            className="text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl"
          />
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {cases.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-2 text-[14px] text-[var(--color-ink)]"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
