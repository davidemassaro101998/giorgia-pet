// Da 21st.dev — daiwiikharihar/reveal-image-mask (id 10905): la foto non
// sta in una card con bordo, è mascherata da una forma stretta che si
// apre a piena inquadratura mentre scorri. Adattato: import da
// "framer-motion" a "motion/react" (pacchetto installato in questo
// progetto), rimosso il blocco titolo/caption integrato (i testi di
// sezione vivono già altrove nel layout), props semplificate.

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function RevealImageMask({
  src,
  alt,
  shape = "circle",
  className,
}: {
  src: string;
  alt: string;
  shape?: "circle" | "rounded";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 24, mass: 0.95 });

  const radius = useTransform(progress, [0, 1], shape === "circle" ? ["16%", "75%"] : ["10%", "0%"]);
  const inset = useTransform(progress, [0, 1], ["30%", "0%"]);
  const circleClip = useTransform(radius, (latest) => `circle(${latest} at 50% 50%)`);
  const roundedClip = useTransform([radius, inset], ([r, i]) => `inset(${i} round ${r})`);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={
        shouldReduceMotion
          ? undefined
          : { clipPath: shape === "circle" ? circleClip : roundedClip }
      }
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}
