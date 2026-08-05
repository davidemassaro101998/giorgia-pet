import { Reveal } from "./Reveal";

export function SocialProof() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-ink)] py-16">
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <Reveal>
          <p className="text-xl leading-relaxed text-[var(--color-bone)] md:text-2xl">
            Le prime famiglie sono arrivate solo tramite passaparola — nessuna
            pubblicità, solo persone che hanno raccontato ad altre persone
            cosa è cambiato per il loro animale.
          </p>
          <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--color-graphite)]">
            Testimonianze raccolte in arrivo a breve
          </p>
        </Reveal>
      </div>
    </section>
  );
}
