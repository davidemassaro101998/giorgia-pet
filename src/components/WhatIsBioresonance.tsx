import { Reveal } from "./Reveal";
import { ShaderOrb } from "./ShaderOrb";

export function WhatIsBioresonance() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <Reveal>
          <h2 className="text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl">
            Cos'è la biorisonanza
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-[var(--color-graphite)] md:text-lg">
            Un metodo di riequilibrio energetico che lavora non solo sul
            singolo animale, ma sul sistema che lo circonda: il suo stato
            emotivo, l'ambiente in cui vive e la relazione con te. L'obiettivo
            è riportare armonia dove qualcosa si è disallineato — nel
            comportamento, nelle emozioni, nell'energia complessiva.
          </p>
          <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-paper)] p-5">
            <p className="font-mono text-[12px] leading-relaxed text-[var(--color-graphite)]">
              La biorisonanza è un supporto complementare, non un atto
              medico-veterinario. Il veterinario resta sempre il riferimento
              per diagnosi e cure cliniche del tuo animale.
            </p>
          </div>
        </Reveal>

        <Reveal
          index={1}
          className="relative h-[380px] overflow-hidden rounded-3xl ring-1 ring-[color-mix(in_srgb,var(--color-amber)_15%,transparent)] md:h-[460px]"
        >
          <ShaderOrb className="h-full w-full" />
        </Reveal>
      </div>
    </section>
  );
}
