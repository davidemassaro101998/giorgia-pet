import { Reveal } from "./Reveal";

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

        <Reveal index={1} className="relative flex h-[320px] items-center justify-center md:h-[400px]">
          <ResonanceRings />
        </Reveal>
      </div>
    </section>
  );
}

function ResonanceRings() {
  const rings = [1, 2, 3, 4];
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-[var(--color-ink)]">
      {rings.map((r) => (
        <span
          key={r}
          aria-hidden
          className="absolute rounded-full border motion-safe:animate-[resonance-pulse_3.2s_ease-out_infinite]"
          style={{
            width: `${r * 70}px`,
            height: `${r * 70}px`,
            borderColor: "var(--color-amber)",
            opacity: 0.55 - r * 0.1,
            animationDelay: `${r * 0.5}s`,
          }}
        />
      ))}
      <span
        aria-hidden
        className="relative h-4 w-4 rounded-full"
        style={{ background: "var(--color-amber)" }}
      />
      <style>{`
        @keyframes resonance-pulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          70% { opacity: 0.15; }
          100% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
