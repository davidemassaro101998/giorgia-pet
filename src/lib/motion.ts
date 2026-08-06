import type { Variants } from "motion/react";

// Ease coerente con la disciplina "engineered, precisa" della libreria
// (cubic-bezier 0.16,1,0.3,1 — vedi motion-patterns/GOTCHAS.md).
export const easeOut = [0.16, 1, 0.3, 1] as const;

// Reveal più cinematografica di un semplice fade+slide: scala leggera +
// blur-in oltre a opacity/y — la richiesta era "vita" tra una sezione e
// l'altra, non solo un fade piatto ripetuto identico ovunque.
export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeOut },
  },
};

export const revealUpDelay = (i: number): Variants => ({
  hidden: { opacity: 0, y: 28, scale: 0.97, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: i * 0.08, ease: easeOut },
  },
});

export const viewportOnce = { once: true, amount: 0.3 } as const;

// Reveal "atterraggio" — deliberatamente più lenta e decompressa della
// `revealUp` standard, non un default riusabile ovunque. Usata una sola
// volta: la prima sezione dopo il pin/scroll-scrub di `About.tsx`
// (Giorgia, ~220vh di scroll cinematografico) — dopo un momento così
// pesante, il reveal a scatto uguale a tutte le altre sezioni leggeva
// come un cambio di ritmo troppo brusco ("il sito si sgonfia"). Blur e
// spostamento più ampi, durata quasi doppia: l'utente "atterra" invece
// di ripartire di scatto.
export const landReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, filter: "blur(14px)" },
  shown: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: easeOut },
  },
};
