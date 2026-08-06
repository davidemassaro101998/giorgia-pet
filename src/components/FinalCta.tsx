import { ctaLabel, site } from "../siteConfig";
import { Reveal } from "./Reveal";
import { MotionButton } from "./MotionButton";
import { SeamFade } from "./SeamFade";

export function FinalCta() {
  return (
    // Niente `border-b`: la sezione seguente (Faq, sfondo chiaro) porta
    // il proprio `SeamFade`. Questa riceve il SeamFade in entrata da
    // Pricing (off-white).
    <section
      id="prenota"
      className="relative overflow-hidden bg-[var(--color-off-black)] py-28"
    >
      <SeamFade fromColor="var(--color-off-white)" />
      <div className="relative mx-auto max-w-[720px] px-6 text-center">
        <Reveal>
          <h2 className="text-3xl leading-tight tracking-tight text-[var(--color-off-white)] md:text-4xl">
            Iniziamo con 10 minuti, gratis.
          </h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-base leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_70%,transparent)]">
            Racconta a Giorgia la situazione del tuo cane o gatto: capiremo
            insieme se e come Vibra può aiutarvi.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MotionButton href={site.contact.whatsapp} label={ctaLabel} variant="primary-on-dark" />
            <MotionButton href={site.contact.email} label="Scrivi un'email" variant="ghost-on-dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
