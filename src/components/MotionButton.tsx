// CTA "segnale": pull magnetico (GSAP quickTo — pattern MagneticButton
// della libreria, snippets/r3f-cinematic/MagneticButton.tsx) + freccia
// animata (concetto adattato da 21st.dev @Shatlyk1011/motion-button, id
// 10384, riscritto ad auto-width per label italiane lunghe) + una
// waveform di frequenza che scorre dentro il bottone al passaggio del
// mouse (concetto adattato da 21st.dev dhileepkumargm/sonic-waveform,
// id 6019 — canvas ridotto alla dimensione del bottone invece che a
// schermo intero, ampiezza minima a riposo) + un anello di risonanza
// che si espande dal punto esatto del click invece di uno schiacciamento
// meccanico (hook `useRipple` adattato fedelmente da 21st.dev
// ddoemonn/ripple, id 23551). Niente più slab/press-depth "a caramella"
// (@ddoemonn/press-depth, id 23547) — bocciato: leggeva app da due euro.

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "../lib/utils";

const faceVariants = {
  primary: "bg-[var(--color-ember)] text-[var(--color-ink-deep)]",
  "outline-dark":
    "border border-[color-mix(in_srgb,var(--color-bone)_25%,transparent)] text-[var(--color-bone)]",
  "outline-light": "border border-[var(--color-border)] text-[var(--color-ink)]",
};

// Colore delle linee della waveform e del ripple: scuro su fondo ember
// pieno, ember su fondo trasparente/scuro — sempre a bassa opacità,
// mai un secondo colore in coppia con l'accento.
const signalVariants = {
  primary: "color-mix(in srgb, var(--color-ink-deep) 55%, transparent)",
  "outline-dark": "color-mix(in srgb, var(--color-ember) 70%, transparent)",
  "outline-light": "color-mix(in srgb, var(--color-ember) 70%, transparent)",
};

const rippleVariants = {
  primary: "color-mix(in srgb, var(--color-ink-deep) 22%, transparent)",
  "outline-dark": "color-mix(in srgb, var(--color-ember) 30%, transparent)",
  "outline-light": "color-mix(in srgb, var(--color-ember) 30%, transparent)",
};

// --- ripple: adattato da 21st.dev ddoemonn/ripple (id 23551) ---
const RIPPLE_BASE = 40;
type RippleSpec = { id: number; x: number; y: number; scale: number; released: boolean };

function useRipple({ max = 4, minVisible = 220, fade = 320 } = {}) {
  const [ripples, setRipples] = useState<RippleSpec[]>([]);
  const list = useRef<RippleSpec[]>([]);
  const seq = useRef(0);
  const born = useRef(new Map<number, number>());
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>[]>());

  const commit = useCallback((next: RippleSpec[]) => {
    list.current = next;
    setRipples(next);
  }, []);

  const forget = useCallback((id: number) => {
    timers.current.get(id)?.forEach(clearTimeout);
    timers.current.delete(id);
    born.current.delete(id);
  }, []);

  const spawn = useCallback(
    (el: HTMLElement, clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const x = Math.round(clientX - rect.left);
      const y = Math.round(clientY - rect.top);
      const reach = Math.max(
        Math.hypot(x, y),
        Math.hypot(rect.width - x, y),
        Math.hypot(x, rect.height - y),
        Math.hypot(rect.width - x, rect.height - y),
      );
      let next = list.current;
      while (next.length >= max) {
        forget(next[0].id);
        next = next.slice(1);
      }
      const id = (seq.current += 1);
      born.current.set(id, performance.now());
      commit([...next, { id, x, y, scale: Math.round((reach * 200) / RIPPLE_BASE) / 100, released: false }]);
      return id;
    },
    [commit, forget, max],
  );

  const release = useCallback(
    (id: number) => {
      if (timers.current.has(id)) return;
      if (!list.current.some((r) => r.id === id)) return;
      const wait = Math.max(0, minVisible - (performance.now() - (born.current.get(id) ?? 0)));
      const start = setTimeout(() => {
        commit(list.current.map((r) => (r.id === id ? { ...r, released: true } : r)));
      }, wait);
      const drop = setTimeout(() => {
        forget(id);
        commit(list.current.filter((r) => r.id !== id));
      }, wait + fade);
      timers.current.set(id, [start, drop]);
    },
    [commit, fade, forget, minVisible],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((set) => set.forEach(clearTimeout));
      pending.clear();
    };
  }, []);

  return { spawn, release, ripples, fadeDuration: fade / 1000 };
}

// --- waveform: canvas confinato al bottone, adattato da 21st.dev
// dhileepkumargm/sonic-waveform (id 6019, originale a schermo intero).
// Confinata in una striscia sottile sul bordo inferiore (non attraversa
// la label — il primo tentativo disegnava linee sopra il testo, illeggibile)
// e disegna solo mentre il bottone è in hover: a riposo il bottone è muto,
// il segnale compare solo quando lo tocchi. ---
function SignalWaveform({ active, color }: { active: boolean; color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    if (!active) {
      ctx.clearRect(0, 0, rect.width, rect.height);
      return;
    }

    let frame: number;
    let time = 0;

    const draw = () => {
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const lineCount = 2;
      const segments = 28;
      const amp = 2.2;
      const band = h - 9; // striscia stretta a filo del bordo inferiore

      for (let i = 0; i < lineCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        const baseY = band + i * 4;
        for (let j = 0; j <= segments; j++) {
          const x = (j / segments) * w;
          const y = baseY + Math.sin(j * 0.6 + time + i * 1.4) * amp;
          if (j === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      time += 0.11;
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(frame);
  }, [active, color]);

  return <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full opacity-40" />;
}

export function MotionButton({
  href,
  label,
  variant = "primary",
  fullWidth = false,
  className,
}: {
  href: string;
  label: string;
  variant?: keyof typeof faceVariants;
  fullWidth?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const quick = useRef<{ x: gsap.QuickToFunc; y: gsap.QuickToFunc } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { spawn, release, ripples, fadeDuration } = useRipple();
  const reducedMotion = useReducedMotion();
  const pointerId = useRef<number | null>(null);

  const ensureQuick = () => {
    if (!quick.current && ref.current) {
      quick.current = {
        x: gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "elastic.out(1,0.4)" }),
        y: gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "elastic.out(1,0.4)" }),
      };
    }
    return quick.current;
  };

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const q = ensureQuick();
        q?.x((e.clientX - r.left - r.width / 2) * 0.28);
        q?.y((e.clientY - r.top - r.height / 2) * 0.28);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        const q = ensureQuick();
        q?.x(0);
        q?.y(0);
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        e.currentTarget.setPointerCapture?.(e.pointerId);
        pointerId.current = spawn(e.currentTarget, e.clientX, e.clientY);
      }}
      onPointerUp={() => {
        if (pointerId.current !== null) release(pointerId.current);
        pointerId.current = null;
      }}
      onPointerCancel={() => {
        if (pointerId.current !== null) release(pointerId.current);
        pointerId.current = null;
      }}
      className={cn(
        "group relative inline-flex select-none overflow-hidden rounded-xl",
        "transition-transform duration-150 ease-out active:scale-[0.97]",
        fullWidth ? "w-full" : "w-fit",
        "flex items-center justify-center gap-3 px-7 py-3.5 text-center font-body text-[15px] font-medium",
        faceVariants[variant],
        className,
      )}
    >
      <SignalWaveform active={isHovered} color={signalVariants[variant]} />

      <span aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            className="absolute block rounded-full"
            style={{
              left: r.x - RIPPLE_BASE / 2,
              top: r.y - RIPPLE_BASE / 2,
              width: RIPPLE_BASE,
              height: RIPPLE_BASE,
              background: rippleVariants[variant],
            }}
            initial={{ scale: reducedMotion ? r.scale : 0, opacity: 0 }}
            animate={{ scale: r.scale, opacity: r.released ? 0 : 1 }}
            transition={{
              scale: reducedMotion ? { duration: 0 } : { duration: 0.5, ease: "linear" },
              opacity: {
                duration: r.released ? fadeDuration : 0.07,
                ease: r.released ? [0.23, 1, 0.32, 1] : "linear",
              },
            }}
          />
        ))}
      </span>

      <span className="relative">{label}</span>
      <span className="relative flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden">
        <ArrowRight
          weight="bold"
          className="absolute size-4 transition-transform duration-300 ease-out group-hover:translate-x-5"
        />
        <ArrowRight
          weight="bold"
          className="absolute size-4 -translate-x-5 transition-transform duration-300 ease-out group-hover:translate-x-0"
        />
      </span>
    </a>
  );
}
