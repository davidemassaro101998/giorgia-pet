import { site } from "../siteConfig";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

export function About() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-[280px_1fr]">
        <Reveal>
          {/* Monogramma: nessuna foto reale della praticante disponibile
              ancora — un ritratto stock al suo posto sarebbe fuorviante.
              Sostituire con una foto vera appena disponibile. */}
          <div className="flex h-[220px] w-[220px] items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-card-alt)] font-display text-5xl text-[var(--color-ink)]">
            GB
          </div>
        </Reveal>
        <Reveal index={1}>
          <p className="font-mono text-[13px] uppercase tracking-[0.18em] text-[var(--color-amber)]">
            Chi ti segue
          </p>
          <SectionTitle
            firstHalf={site.practitioner.name.split(" ")[0] + " "}
            secondHalf={site.practitioner.name.split(" ").slice(1).join(" ")}
            className="mt-3 text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl"
          />
          <p className="mt-2 text-base text-[var(--color-graphite)]">
            {site.practitioner.role}
          </p>
          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--color-graphite)]">
            Prima infermiera, poi kinesiologa: un percorso nato dall'ascolto
            del corpo, umano e animale. Oggi applica la biorisonanza a
            distanza per aiutare cani e gatti a ritrovare equilibrio, insieme
            a chi li ama ogni giorno.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
