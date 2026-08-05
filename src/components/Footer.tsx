import { site } from "../siteConfig";

export function Footer() {
  return (
    <footer className="bg-[var(--color-void)] py-12">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-4 px-6 text-center">
        <p className="font-display text-lg text-[var(--color-bone)]">
          {site.brand}
        </p>
        <p className="max-w-[46ch] font-mono text-[12px] leading-relaxed text-[color-mix(in_srgb,var(--color-bone)_45%,transparent)]">
          La biorisonanza è un supporto complementare al benessere emotivo e
          comportamentale dell'animale. Non sostituisce diagnosi, terapie o
          prescrizioni veterinarie.
        </p>
        <div className="mt-2 flex gap-6 font-mono text-[12px] text-[color-mix(in_srgb,var(--color-bone)_65%,transparent)]">
          <a href={site.contact.email}>{site.contact.email.replace("mailto:", "")}</a>
          <a href={site.contact.whatsapp}>WhatsApp</a>
        </div>
        <p className="mt-4 font-mono text-[11px] text-[color-mix(in_srgb,var(--color-bone)_30%,transparent)]">
          © {new Date().getFullYear()} {site.brand}
        </p>
      </div>
    </footer>
  );
}
