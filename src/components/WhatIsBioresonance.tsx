import { SectionTitle } from "./SectionTitle";
import { QuantumNebula } from "./QuantumNebula";

export function WhatIsBioresonance() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-ink-deep)]">
      <QuantumNebula className="pointer-events-none absolute inset-0 opacity-90" />
      <div className="pointer-events-none absolute inset-0 bg-[var(--color-ink-deep)]/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-ink-deep)]/70 via-[var(--color-ink-deep)]/25 to-[var(--color-ink-deep)]/80" />

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-[900px] flex-col items-center justify-center px-6 py-24 text-center">
        <SectionTitle
          firstHalf="Cos'è "
          secondHalf="la biorisonanza"
          className="text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.02] tracking-tighter text-[var(--color-bone)]"
        />
        <p className="mt-8 max-w-[56ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_78%,transparent)] md:text-lg">
          Un metodo di riequilibrio energetico che lavora non solo sul
          singolo animale, ma sul sistema che lo circonda: il suo stato
          emotivo, l'ambiente in cui vive e la relazione con te. L'obiettivo è
          riportare armonia dove qualcosa si è disallineato — nel
          comportamento, nelle emozioni, nell'energia complessiva.
        </p>
        <p className="mt-8 max-w-[46ch] font-mono text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_50%,transparent)]">
          La biorisonanza è un supporto complementare, non un atto
          medico-veterinario. Il veterinario resta sempre il riferimento per
          diagnosi e cure cliniche del tuo animale.
        </p>
      </div>
    </section>
  );
}
