# CLAUDE.md — Armonya (landing page biorisonanza cani/gatti)

Regole standing per questo progetto. Vedi anche
`~/claude-library-for-site` (repo separato) per la libreria di riferimento
completa — style-reference, motion patterns, GOTCHAS, componenti pronti.

## REGOLA OBBLIGATORIA — 21st.dev, codice reale, non "ispirato"
Non scrivere componenti/animazioni/effetti da zero e presentarli come
"combinati con 21st.dev" o "ispirati a X" quando in realtà è codice scritto
da zero. Cercare su 21st.dev (`mcp__21st__search`, `get_inspiration`),
recuperare il codice reale con `get_component`, e integrarlo con modifiche
minime necessarie (ricolorare sui token del brand, sistemare import per il
pacchetto installato in questo progetto, fixare bug con label italiane
lunghe). Se dopo una ricerca vera non c'è nulla di adatto, dirlo
esplicitamente prima di scrivere custom — non scrivere custom di default e
giustificarlo dopo. Violato due volte in questo progetto (cerchi CSS
spacciati per "shader", gradiente CSS spacciato per "combinazione con
cursor-spotlight") — da qui non si ripete.

## Il brand
- **Nome**: Armonya — "Biorisonanza per cani e gatti"
- **Tagline**: "Riequilibrio a distanza — per il tuo animale, per te, per l'ambiente."
- **Praticante**: Giorgia Bisognin, ex infermiera, kinesiologa, esperta biorisonanza
- **Fase**: pre-lancio, clienti finora solo via passaparola — nessuna
  testimonianza scritta ancora raccolta

## Guardrail di copy (non negoziabili)
- Il veterinario resta sempre il riferimento sanitario — mai linguaggio da
  diagnosi/cura/prescrizione per la biorisonanza
- Nessuna testimonianza finta — la sezione social proof resta onesta
  ("passaparola", non citazioni inventate) finché non arrivano vere
- Nessun numero/percentuale finto (niente "98% di proprietari soddisfatti"
  inventato)

## Direzione visiva
Adattamento caldo di `style-references/integrated-biosciences.md` (nella
libreria): stessa disciplina flat/no-shadow/single-accent, palette scaldata
da verde-laboratorio ad ambra/corallo (`--color-amber`, `--color-coral` in
`src/index.css`). Font: Bricolage Grotesque (display) + Inter Tight (body) —
non Inter Tight ovunque, letto come troppo neutro/anonimo nella prima
versione. Foto reali di animali self-hosted in `src/assets/photos/`
(licenza Unsplash, verificate visivamente prima dell'uso, MAI hotlink diretto
— vedi nota sotto).

## Componenti: 21st.dev prima, custom solo se non c'è nulla di adatto
Regola cambiata a metà progetto — la prima versione aveva troppi componenti
fatti a mano (cerchi CSS per il visual di risonanza, bottoni custom, FAQ con
`<details>`) e il risultato leggeva "cheap". Da qui in avanti, e per ogni
progetto futuro: **cercare prima su 21st.dev** (`mcp__21st__search`,
`get_inspiration`) bottoni, animazioni, transizioni, contenitori, pattern di
testo — poi adattare (ricolorare sui token del brand, sostituire librerie
icone non permesse come lucide con Phosphor, aggiustare per label italiane
più lunghe) invece di scrivere da zero. Solo se la ricerca non produce nulla
di adatto si scrive un componente custom.

Componenti attuali di questo progetto adattati da 21st.dev (codice reale
via `get_component`, non "ispirato"):
- `QuantumNebula.tsx` — 50.000 particelle Three.js con curl noise + Unreal
  Bloom (dhileepkumargm/quantum-nebula, id 9112), ricolorato ciano→ambra.
  È la firma visiva del sito: usata identica in Hero, WhatIsBioresonance
  (full-bleed, senza card) e FinalCta per legare le sezioni scure invece di
  tre tecniche diverse. Codice lasciato fedele all'originale (Three.js
  puro, non R3F) — solo hue, boxSize/bloom e pausa IntersectionObserver
  aggiunti (3 istanze sulla stessa pagina, serve per non sprecare CPU
  fuori viewport). Caricato via `import()` dinamico dentro `useEffect`,
  non nell'import statico — three.js+postprocessing pesano ~185KB gzip,
  tenerli fuori dal bundle iniziale accorcia il critical path.
- `RevealImageMask.tsx` — foto di cane/gatto mascherate da una forma che
  si apre a piena inquadratura scrollando (daiwiikharihar/reveal-image-
  mask, id 10905) — niente più card con bordo intorno alle foto animali,
  richiesta esplicita dopo la prima versione ("togli gli animali dai
  contenitori").
- `MotionButton.tsx` — CTA con pull magnetico GSAP (pattern
  snippets/r3f-cinematic/MagneticButton.tsx della libreria) + freccia
  animata (concetto Shatlyk1011/motion-button, id 10384, riscritto da
  larghezza fissa ad auto-width perché l'originale si rompe con label
  italiane lunghe tipo "Prenota la chiamata gratuita").
- `Faq.tsx` — accordion numerato con spring animation (jatin-yadav05/
  interactive-accordion, id 9602), import spostato da `framer-motion` a
  `motion/react` (pacchetto già installato in questo progetto).
- `SectionTitle.tsx` — titoli di sezione che si "aprono" (scala + tracking)
  mentre attraversano il centro del viewport in scroll — adattato da
  `snippets/motion-patterns/ScrollPortalTitle.tsx` della libreria (offset
  ritarato per un titolo normale invece che un hero pinned a schermo
  intero). **Bug trovato**: split di stringa in due `<span>` inline-block
  perde lo spazio finale del primo blocco (CSS collassa whitespace a fine
  riga) — serve `whiteSpace: "pre"` sul primo span o si legge
  "pensatoArmonya" invece di "pensato Armonya".

**Build separata per l'anteprima artifact**: `QuantumNebula` usa
`import()` dinamico → Vite crea chunk separati che un HTML a file singolo
non può servire (richiederebbero richieste HTTP a URL che non esistono
nel file inlineato). `vite.artifact.config.ts` forza
`rollupOptions.output.inlineDynamicImports: true` in una build a parte
(`dist-artifact/`, ignorata da git) usata solo da `inline-artifact.mjs` —
la build reale per il deploy (`npm run build` → `dist/`) mantiene il
code-splitting.

**Attenzione ai componenti a larghezza fissa**: molti componenti 21st.dev
sono dimostrati con label inglesi corte ("Get Started"). Il copy italiano
è quasi sempre più lungo — verificare SEMPRE che bottoni/badge non vadano
a capo (`whitespace-nowrap` + `w-fit`, mai `w-full` fisso su un bottone con
testo) prima di considerare l'integrazione finita. Bug reale trovato in
questo progetto: `MotionButton` in una card di pricing stretta andava a
capo su due righe finché non si è aggiunto `whitespace-nowrap`.

**Immagini in artifact/preview self-contained**: se il progetto viene
pubblicato come artifact HTML a file singolo (per anteprima rapida), Vite
importa le immagini come stringa `/assets/nome-hash.jpg` dentro il bundle
JS, non solo nel CSS — un inliner che processa solo il CSS lascia le
immagini rotte nel file singolo. Vedi `inline-artifact.mjs`: deve riscrivere
sia `url()` nel CSS sia i riferimenti stringa nel JS.

## TODO prima del lancio pubblico (vedi `src/siteConfig.ts`)
- [ ] Contatti reali: WhatsApp, email, telefono (attualmente placeholder)
- [ ] Prezzi reali per sessione singola e percorso 3 sessioni (attualmente `€ —`)
- [ ] Logo vero (attualmente solo wordmark testuale "Armonya")
- [ ] Foto vera di Giorgia Bisognin (attualmente monogramma "GB" — un ritratto
      stock al suo posto sarebbe fuorviante, va sostituito con una foto reale)
- [ ] Testimonianze reali quando disponibili (sezione `SocialProof.tsx`)
- [ ] Dominio + deploy (in pausa su richiesta esplicita)

## Gate prima di dire "fatto" (applicato alla build iniziale, riapplicare a ogni modifica)
1. Dev server avviato e guardato via screenshot reale (Playwright + Chromium
   preinstallati in questo ambiente), non dedotto dal build che passa
2. Testato su desktop, mobile, e viewport corto-e-largo
3. Console JS pulita (zero errori) su tutti e 3
4. Motion verificato nello stato **finale** (whileInView ha un `duration`+
   `delay` — uno screenshot troppo presto cattura l'animazione a metà e
   sembra un bug di opacità che non è)
