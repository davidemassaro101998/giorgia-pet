import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";

const links = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#percorsi", label: "Percorsi" },
  { href: "#chi-ti-segue", label: "Chi ti segue" },
];

export function Nav() {
  return (
    <header className="sticky top-4 z-50 mx-auto w-fit px-4 md:top-6">
      <div className="flex items-center gap-6 rounded-[var(--radius-nav)] border border-[var(--color-hairline)] bg-[color-mix(in_srgb,var(--color-pure-white)_92%,transparent)] px-5 py-3 backdrop-blur-md">
        <a href="#top" className="font-body text-[15px] text-[var(--color-off-black)]">
          {site.brand}
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-body text-[14px] text-[var(--color-off-black)] transition-colors hover:text-[var(--color-steel)]"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <MotionButton href="#prenota" label={ctaLabel} className="text-[13px]" />
      </div>
    </header>
  );
}
