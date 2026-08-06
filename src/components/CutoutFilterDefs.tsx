// Filtro SVG condiviso per "ripulire" i ritagli PNG di cane/gatto: il
// problema segnalato ("si vedono i bordi", "un alone intorno come
// incollato") viene dal margine del cutout stesso — il bordo alpha grezzo
// lascia una sottile frangia chiara/dura visibile su qualsiasi sfondo
// diverso dal bianco originale della foto. `drop-shadow` da solo non lo
// risolve, anzi lo aggrava (l'ombra proietta anche quella frangia,
// leggendo come "alone"). Fix vero: erodere l'alpha verso l'interno di
// qualche pixel (`feMorphology operator="erode"`) per mangiare la
// frangia, poi sfumarla (`feGaussianBlur` sull'alpha eroso) invece di un
// bordo netto — solo l'alpha viene ammorbidito, l'RGB del soggetto resta
// nitido. Renderizzato una sola volta qui (in App.tsx) e referenziato via
// `filter: url(#pet-cutout-feather)` da qualsiasi componente — un filtro
// SVG con id è visibile da tutto il documento indipendentemente da dove è
// montato nel DOM.

export function CutoutFilterDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden>
      <defs>
        <filter id="pet-cutout-feather" x="-20%" y="-20%" width="140%" height="140%">
          <feMorphology in="SourceAlpha" operator="erode" radius="2" result="eroded" />
          <feGaussianBlur in="eroded" stdDeviation="1.4" result="softAlpha" />
          <feComposite in="SourceGraphic" in2="softAlpha" operator="in" />
        </filter>
      </defs>
    </svg>
  );
}
