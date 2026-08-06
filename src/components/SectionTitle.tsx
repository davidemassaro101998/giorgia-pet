// Titolo di sezione scroll-driven — adattato da
// snippets/motion-patterns/ScrollPortalTitle.tsx della libreria (prompt
// landing record-label): scala + tracking si stringono MENTRE il titolo
// attraversa la fascia centrale del viewport, mai un timer. A differenza
// dell'originale (pensato per un hero pinned a schermo intero), qui
// l'offset è tarato per un titolo di sezione normale che scorre dal basso:
// si "apre" mentre entra, poi resta fermo/leggibile una volta a centro,
// invece di continuare a distorcersi mentre lo leggi.
//
// Ogni titolo ora si rivela anche con un wipe verticale a carattere
// (VerticalCutReveal, id 18595) al primo ingresso in viewport — prima
// tutte le sezioni condividevano lo stesso semplice fade, segnalato come
// "i passaggi tra le sezioni sono tutti uguali". Sotto la piega va bene
// usare `useInView` (IntersectionObserver): il vincolo GOTCHAS #1 vale
// solo per contenuto above-the-fold.

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { VerticalCutReveal } from "./VerticalCutReveal";

export function SectionTitle({
  firstHalf,
  secondHalf,
  className = "",
  as: Tag = "h2",
}: {
  firstHalf: string;
  secondHalf: string;
  className?: string;
  as?: "h2" | "h3";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const tracking = useTransform(scrollYProgress, [0, 1], [-0.01, 0]);
  const trackingEm = useTransform(tracking, (v) => `${v}em`);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, letterSpacing: trackingEm, transformOrigin: "left center" }}>
        <Tag className="inline">
          <VerticalCutReveal
            autoStart={inView}
            splitBy="words"
            staggerDuration={0.05}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 210, damping: 24 }}
            containerClassName="inline-flex"
            wordLevelClassName="whitespace-pre"
          >
            {firstHalf}
          </VerticalCutReveal>
          <VerticalCutReveal
            autoStart={inView}
            splitBy="words"
            staggerDuration={0.05}
            staggerFrom="first"
            transition={{ type: "spring", stiffness: 210, damping: 24, delay: 0.12 }}
            containerClassName="inline-flex"
          >
            {secondHalf}
          </VerticalCutReveal>
        </Tag>
      </motion.div>
    </div>
  );
}
