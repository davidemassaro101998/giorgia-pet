import type { Variants } from "motion/react";

// Ease coerente con la disciplina "engineered, precisa" della libreria
// (cubic-bezier 0.16,1,0.3,1 — vedi motion-patterns/GOTCHAS.md).
export const easeOut = [0.16, 1, 0.3, 1] as const;

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const revealUpDelay = (i: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  shown: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: easeOut },
  },
});

export const viewportOnce = { once: true, amount: 0.3 } as const;
