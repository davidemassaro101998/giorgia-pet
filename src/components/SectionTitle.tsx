// Titolo di sezione scroll-driven — adattato da
// snippets/motion-patterns/ScrollPortalTitle.tsx della libreria (prompt
// landing record-label): scala + tracking si stringono MENTRE il titolo
// attraversa la fascia centrale del viewport, mai un timer. A differenza
// dell'originale (pensato per un hero pinned a schermo intero), qui
// l'offset è tarato per un titolo di sezione normale che scorre dal basso:
// si "apre" mentre entra, poi resta fermo/leggibile una volta a centro,
// invece di continuare a distorcersi mentre lo leggi.

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });

  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const tracking = useTransform(scrollYProgress, [0, 1], [-0.01, 0]);
  const trackingEm = useTransform(tracking, (v) => `${v}em`);
  const split = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const firstX = useTransform(split, (v) => `${-(1 - v) * 3}%`);
  const secondX = useTransform(split, (v) => `${(1 - v) * 3}%`);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scale, letterSpacing: trackingEm, opacity, transformOrigin: "left center" }}>
        <Tag className="inline">
          <motion.span style={{ display: "inline-block", whiteSpace: "pre", x: firstX }}>
            {firstHalf}
          </motion.span>
          <motion.span style={{ display: "inline-block", x: secondX }}>{secondHalf}</motion.span>
        </Tag>
      </motion.div>
    </div>
  );
}
