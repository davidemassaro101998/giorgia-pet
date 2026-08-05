// Tilt 3D + parallax scroll, per dare vita alle foto statiche di cane/gatto.
// Tilt adattato da 21st.dev — @tom_ui/tilt-card (id 12245): perspective
// rotateX/Y sul movimento del cursore + spotlight che segue il puntatore.
// Il parallax scroll (l'immagine si muove verticalmente più lenta della
// pagina mentre la sezione attraversa il viewport) è del pattern
// scroll-choreography.tsx della libreria: useScroll+useTransform+useSpring
// per un movimento "pesante"/organico invece che 1:1 con lo scroll (vedi
// GOTCHAS.md #10 — Motion Model, scelta deliberata per un brand caldo).

import { useCallback, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

export function TiltImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children?: React.ReactNode;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(
    "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
  );
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const handleMove = useCallback((e: React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const xRot = (py - 0.5) * -14;
    const yRot = (px - 0.5) * 14;
    setTransform(`perspective(1200px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.03,1.03,1.03)`);
    setSpot({ x: px * 100, y: py * 100 });
  }, []);
  const handleLeave = useCallback(() => {
    setTransform("perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
    setHovered(false);
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 300, damping: 40, mass: 1 });
  const parallaxY = useTransform(smooth, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={wrapRef} className={className} style={{ perspective: 1200 }}>
      <div
        ref={cardRef}
        onPointerEnter={() => setHovered(true)}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="relative h-full w-full overflow-hidden rounded-2xl"
        style={{ transform, transition: "transform 0.25s ease-out", transformStyle: "preserve-3d" }}
      >
        <motion.img
          src={src}
          alt={alt}
          className="h-[112%] w-full object-cover"
          style={{ y: parallaxY, marginTop: "-6%" }}
        />
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(circle 260px at ${spot.x}% ${spot.y}%, color-mix(in srgb, var(--color-amber) 30%, transparent) 0%, transparent 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
}
