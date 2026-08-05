import { SectionTitle } from "./SectionTitle";

export function WhatIsBioresonance() {
  return (
    <section className="relative w-full overflow-hidden border-b border-[var(--color-hairline)] bg-[var(--color-off-white)]">
      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-6 py-24 text-center">
        <SectionTitle
          firstHalf="Cos'è "
          secondHalf="la biorisonanza"
          className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] text-[var(--color-off-black)]"
        />
        <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-[var(--color-steel)] md:text-lg">
          Un metodo di riequilibrio energetico che lavora non solo sul
          singolo animale, ma sul sistema che lo circonda: il suo stato
          emotivo, l'ambiente in cui vive e la relazione con te. L'obiettivo è
          riportare armonia dove qualcosa si è disallineato — nel
          comportamento, nelle emozioni, nell'energia complessiva.
        </p>
        <p className="mt-8 max-w-[46ch] font-body text-[12px] leading-relaxed text-[var(--color-ash)]">
          La biorisonanza è un supporto complementare, non un atto
          medico-veterinario. Il veterinario resta sempre il riferimento per
          diagnosi e cure cliniche del tuo animale.
        </p>
      </div>
    </section>
  );
}
