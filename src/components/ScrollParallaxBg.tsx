// Sfondo con drift verticale legato allo scroll — quello che rende "vive"
// le transizioni tra sezioni invece di un cambio statico. Reversibile per
// costruzione (guida direttamente da scrollYProgress, non da un timer): si
// muove in avanti scendendo, torna indietro risalendo. Vedi Motion Model
// in motion-patterns/README.md.

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function ScrollParallaxBg({
  children,
  range = ["-8%", "8%"],
  className,
}: {
  children: ReactNode;
  range?: [string, string];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 1 });
  const y = useTransform(smooth, [0, 1], range);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
