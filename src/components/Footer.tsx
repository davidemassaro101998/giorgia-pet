import { site } from "../siteConfig";
import { SeamFade } from "./SeamFade";

export function Footer() {
  return (
    // Ultima giunzione della catena: riceve il SeamFade in entrata da
    // Faq (off-white) — `relative` per ancorare l'overlay assoluto.
    <footer className="relative bg-[var(--color-pure-black)] py-12">
      <SeamFade fromColor="var(--color-off-white)" />
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 text-center">
        <p className="font-body text-lg text-[var(--color-off-white)]">
          {site.brand}
        </p>
        <p className="max-w-[46ch] font-body text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-off-white)_45%,transparent)]">
          La biorisonanza è un supporto complementare al benessere emotivo e
          comportamentale dell'animale. Non sostituisce diagnosi, terapie o
          prescrizioni veterinarie.
        </p>
        <div className="mt-2 flex gap-6 font-body text-[12px] text-[color-mix(in_srgb,var(--color-off-white)_65%,transparent)]">
          <a href={site.contact.email}>{site.contact.email.replace("mailto:", "")}</a>
          <a href={site.contact.whatsapp}>WhatsApp</a>
        </div>
        <p className="mt-4 font-body text-[11px] text-[color-mix(in_srgb,var(--color-off-white)_30%,transparent)]">
          © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  );
}
