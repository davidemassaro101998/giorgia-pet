// Link interni (`href="#id"`) usavano il salto nativo del browser +
// `scroll-behavior: smooth` (index.css). Con la sezione pinnata di
// `CinematicIntro.tsx` (200vh, GSAP ScrollTrigger) questo produceva un bug
// visibile: primo click → flash bianco e la pagina torna dov'era, secondo
// click → arriva alla sezione giusta. Causa: il salto nativo avviene
// *prima* che ScrollTrigger ricalcoli lo spacer del pin sull'evento
// scroll, quindi punta a una posizione basata su un layout non ancora
// aggiornato. Fix: intercettare il click e animare lo scroll con GSAP
// (`ScrollToPlugin`) verso una posizione calcolata da
// `getBoundingClientRect()` **live** (non dalle posizioni cache di
// ScrollTrigger) — nessun salto nativo del browser che possa entrare in
// conflitto con il pin.
//
// **Non chiamare `ScrollTrigger.refresh()` qui**: un primo tentativo lo
// faceva prima di calcolare la destinazione (pensato per garantire
// posizioni fresche), ma con più pin/scrub in pagina (hero + la sezione
// "pilastro" di Giorgia, `About.tsx`) `refresh()` ricalcola l'intera
// pagina in modo sincrono — costava oltre un secondo di blocco prima
// che lo scroll partisse anche solo visivamente, un click che sembrava
// non rispondere. `getBoundingClientRect()` è già sempre aggiornato al
// layout corrente da solo, il refresh era ridondante per il nostro caso
// (serviva contro lo spacer del pin nativo, non più in gioco qui).

import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

// Altezza approssimativa della pillola di navigazione fissa + margine,
// così il target non finisce nascosto sotto di essa.
const NAV_OFFSET = 96;

export function smoothScrollToHash(hash: string) {
  if (!hash.startsWith("#") || typeof window === "undefined") return false;

  const id = hash.slice(1);
  const target = id === "top" ? 0 : document.getElementById(id);
  if (target === null) return false;

  const y =
    target === 0
      ? 0
      : Math.max(0, (target as HTMLElement).getBoundingClientRect().top + window.scrollY - NAV_OFFSET);

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  gsap.to(window, {
    duration: reduce ? 0 : 0.9,
    ease: "power2.inOut",
    scrollTo: y,
  });
  history.replaceState(null, "", hash);
  return true;
}
