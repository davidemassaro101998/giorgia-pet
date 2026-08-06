// Adattato da 21st.dev — @jatin-yadav05/interactive-accordion (id 9602):
// accordion numerato con spring animation, indicatore +/x rotante,
// underline hover progressiva. Import spostato da "framer-motion" a
// "motion/react" (pacchetto installato in questo progetto, stesso runtime,
// convenzione della libreria), ricolorato sui token Vibra.

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./SectionTitle";

const faqs = [
  {
    n: "01",
    q: "La biorisonanza sostituisce il veterinario?",
    a: "No. Il veterinario resta sempre il riferimento per diagnosi, prescrizioni e cure cliniche. La biorisonanza è un supporto complementare per il riequilibrio emotivo, energetico e comportamentale.",
  },
  {
    n: "02",
    q: "È sicura per il mio animale?",
    a: "Sì: è un metodo non invasivo, che non prevede alcun contatto fisico diretto durante la sessione a distanza.",
  },
  {
    n: "03",
    q: "Quanto dura una sessione?",
    a: "La chiamata conoscitiva gratuita dura 10 minuti. Una sessione completa di biorisonanza ha una durata diversa, che ti viene spiegata durante la chiamata in base alla situazione del tuo animale.",
  },
  {
    n: "04",
    q: "Il mio animale deve essere presente fisicamente?",
    a: "No, la sessione si svolge a distanza. È utile che l'animale sia nel suo ambiente abituale, dato che il riequilibrio lavora anche sul contesto in cui vive.",
  },
];

export function Faq() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="border-b border-[var(--color-hairline)] bg-[var(--color-off-white)] py-20 md:py-28">
      <div className="mx-auto max-w-[800px] px-6">
        <SectionTitle
          firstHalf="Domande "
          secondHalf="frequenti"
          className="text-3xl leading-tight text-[var(--color-off-black)] md:text-4xl"
        />

        <div className="mt-10">
          {faqs.map((item, index) => {
            const isActive = activeId === item.n;
            const isHovered = hoveredId === item.n;

            return (
              <Reveal key={item.n} index={index}>
                <button
                  onClick={() => setActiveId(isActive ? null : item.n)}
                  onMouseEnter={() => setHoveredId(item.n)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative w-full text-left"
                >
                  <div className="flex items-center gap-5 py-5">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center">
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ background: "var(--color-ember)" }}
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : isHovered ? 0.85 : 0,
                          opacity: isActive ? 1 : isHovered ? 0.25 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                      <span
                        className="relative z-10 font-body text-[13px]"
                        style={{
                          color: isActive ? "var(--color-off-black)" : "var(--color-steel)",
                        }}
                      >
                        {item.n}
                      </span>
                    </div>

                    <motion.h3
                      className="text-[17px] text-[var(--color-off-black)] md:text-lg"
                      animate={{ x: isActive || isHovered ? 4 : 0 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {item.q}
                    </motion.h3>

                    <motion.span
                      className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center font-body text-[var(--color-ember)]"
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      +
                    </motion.span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-hairline)]" />
                  <motion.div
                    className="absolute bottom-0 left-0 h-px origin-left"
                    style={{ background: "var(--color-ember)" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : isHovered ? 0.3 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.2, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { type: "spring", stiffness: 300, damping: 30 },
                          opacity: { duration: 0.1 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[65ch] py-1 pb-6 pl-14 pr-6 text-[15px] leading-relaxed text-[var(--color-steel)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
