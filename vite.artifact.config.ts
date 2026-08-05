import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Build separata SOLO per generare l'anteprima artifact a file singolo.
// La build reale (vite.config.ts, usata da Vercel) mantiene il
// code-splitting dinamico di QuantumNebula (three.js caricato on-demand,
// non nel bundle iniziale) — qui lo forziamo in un unico bundle perché un
// file HTML autosufficiente non può servire chunk separati via richieste
// HTTP reali.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist-artifact",
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
