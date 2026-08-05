import { ctaLabel, site } from "../siteConfig";
import { Reveal } from "./Reveal";

export function FinalCta() {
  return (
    <section
      id="prenota"
      className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-ink)] py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ background: "var(--color-amber)" }}
      />
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
            <a
              href={site.contact.whatsapp}
              className="rounded-lg bg-[var(--color-amber)] px-7 py-3 font-mono text-[13px] uppercase tracking-wide text-[var(--color-ink)] transition-transform active:scale-[0.98]"
            >
              {ctaLabel}
            </a>
            <a
              href={site.contact.email}
              className="rounded-lg border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] px-7 py-3 font-mono text-[13px] uppercase tracking-wide text-[var(--color-bone)]"
            >
              Scrivi un'email
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
