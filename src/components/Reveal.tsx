import { motion } from "motion/react";
import type { ReactNode } from "react";
import { revealUpDelay, viewportOnce } from "../lib/motion";

export function Reveal({
  children,
  index = 0,
  className,
}: {
  children: ReactNode;
  index?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={viewportOnce}
      variants={revealUpDelay(index)}
    >
      {children}
    </motion.div>
  );
}
