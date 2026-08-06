import { ctaLabel, site } from "../siteConfig";
import { MotionButton } from "./MotionButton";
import { smoothScrollToHash } from "../lib/scroll";

const links = [
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#percorsi", label: "Percorsi" },
  { href: "#chi-ti-segue", label: "Chi ti segue" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-fit px-4 md:top-6">
      <div
        className="flex items-center gap-6 rounded-[var(--radius-nav)] border border-[var(--color-hairline)] bg-[color-mix(in_srgb,var(--color-pure-white)_88%,transparent)] px-5 py-3 backdrop-blur-lg"
        style={{
          // Elemento di chrome fluttuante — unica eccezione esplicita alla
          // regola "zero ombre" del riferimento (che vale per card/contenuto,
          // non per la UI fissa): due ombre morbide (lift ampio + contatto
          // stretto) per il sollevamento, più un bagliore interno in alto
          // che imita il bevel di vetro reale — dà la profondità "3D"
          // richiesta senza diventare un'ombra pesante da card.
          boxShadow:
            "0 24px 48px -12px rgba(21,19,15,0.22), 0 6px 16px -6px rgba(21,19,15,0.14), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(21,19,15,0.05)",
        }}
      >
        <a
          href="#top"
          onClick={(event) => {
            if (smoothScrollToHash("#top")) event.preventDefault();
          }}
          className="font-body text-[15px] text-[var(--color-off-black)]"
        >
          {site.brand}
        </a>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(event) => {
                if (smoothScrollToHash(l.href)) event.preventDefault();
              }}
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
