// Reveal dorata al passaggio del mouse — combina il pattern
// useSpotlightReveal della libreria (canvas mask cursor-follow) con
// l'idea del componente 21st.dev "Cursor Spotlight" (pulkitxm/
// cursor-spotlight, id 18361): fuori dall'hover la base è l'orb ambra
// smorzato, dentro il raggio del cursore emerge un secondo strato più
// acceso/dorato, con una texture di particelle che simula la "risonanza".

import { useRef, useState } from "react";
import { ShaderOrb } from "./ShaderOrb";

export function GoldenReveal({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [hovering, setHovering] = useState(false);

  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
        setHovering(true);
      }}
      onPointerLeave={() => setHovering(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "var(--color-ink-deep)",
      }}
    >
      {/* Base: shader ambra smorzato su fondo scuro pieno — senza questo
          il canvas a opacità ridotta lascia intravedere lo sfondo pagina
          e legge come un grigio lavato invece che un pannello caldo. */}
      <ShaderOrb className="h-full w-full opacity-70" />

      {/* Strato dorato acceso, visibile solo dentro il cerchio del cursore */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: hovering ? 1 : 0,
          background: `radial-gradient(circle 220px at ${pos.x}% ${pos.y}%, var(--color-amber-soft) 0%, var(--color-amber) 35%, transparent 72%)`,
          mixBlendMode: "screen",
        }}
      />

      {/* Micro-texture "particellare" dentro la spotlight, per non farla leggere come un cerchio piatto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-200"
        style={{
          opacity: hovering ? 0.5 : 0,
          maskImage: `radial-gradient(circle 220px at ${pos.x}% ${pos.y}%, black 0%, transparent 72%)`,
          WebkitMaskImage: `radial-gradient(circle 220px at ${pos.x}% ${pos.y}%, black 0%, transparent 72%)`,
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-bone) 90%, transparent) 1px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      />
    </div>
  );
}
