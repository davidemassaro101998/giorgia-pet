import { ctaLabel, site } from "../siteConfig";
import { Reveal } from "./Reveal";
import { ShaderOrb } from "./ShaderOrb";
import { MotionButton } from "./MotionButton";

export function FinalCta() {
  return (
    <section
      id="prenota"
      className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-ink-deep)] py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <ShaderOrb className="h-full w-full opacity-60" />
        <div className="absolute inset-0 bg-[var(--color-ink-deep)]/55" />
      </div>
      <div className="relative mx-auto max-w-[720px] px-6 text-center">
        <Reveal>
          <h2 className="text-3xl leading-tight tracking-tight text-[var(--color-bone)] md:text-4xl">
            Iniziamo con 10 minuti, gratis.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_70%,transparent)]">
            Racconta a Giorgia la situazione del tuo cane o gatto: capiremo
            insieme se e come Armonya può aiutarvi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MotionButton href={site.contact.whatsapp} label={ctaLabel} />
            <MotionButton href={site.contact.email} label="Scrivi un'email" variant="outline-dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
