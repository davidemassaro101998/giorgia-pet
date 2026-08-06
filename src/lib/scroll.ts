// Link interni (`href="#id"`) usavano il salto nativo del browser +
// `scroll-behavior: smooth` (index.css). Con la sezione pinnata di
// `CinematicIntro.tsx` (200vh, GSAP ScrollTrigger) questo produceva un bug
// visibile: primo click → flash bianco e la pagina torna dov'era, secondo
// click → arriva alla sezione giusta. Causa: il salto nativo avviene
// *prima* che ScrollTrigger ricalcoli lo spacer del pin sull'evento
// scroll, quindi punta a una posizione basata su un layout non ancora
// aggiornato — il refresh che segue "corregge" lo scroll indietro. Fix:
// intercettare il click, forzare `ScrollTrigger.refresh()` così le
// posizioni sono aggiornate PRIMA di calcolare la destinazione, poi
// animare lo scroll con GSAP (`ScrollToPlugin`) invece che con lo scroll
// nativo del browser — nessun secondo evento di scroll che possa
// ricalcolare/interrompere il salto a metà.

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

  ScrollTrigger.refresh();

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
