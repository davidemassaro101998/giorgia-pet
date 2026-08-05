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

## Direzione visiva — STEP-BY-STEP REBUILD IN CORSO
Dopo due round di feedback negativo (particelle "vetro sporco", foto del
cane inserita male, palette sbagliata) si è deciso di ripartire a step
espliciti invece di iterare su tutto insieme: colori → immagini →
animazioni → transizioni, un pezzo alla volta, con preview e conferma ad
ogni step prima di procedere al successivo. **Non saltare step né
reintrodurre pezzi di step successivi in anticipo** (es. non rimettere
foto/particelle mentre si lavora sui colori).

**Step 1 — Colori (fatto)**: palette "Forest" — verde profondo
(`--color-ink: #16211c`) + bone neutro + **un solo accento oro**
(`--color-amber: #d4a24e`, niente più coppia ambra/corallo). La palette
precedente (crema `#faf6f1` + ambra/corallo + quasi-nero caldo) era
**esattamente** la combinazione bannata dalle nostre skill di taste come
il tell più riconoscibile dell'AI per brief premium-consumer — scoperto
rileggendo `design-taste-frontend/SKILL.md` dopo il feedback "sembra
già visto ovunque". Vedi `src/index.css`.

**Step 1.5 — Profondità bottoni/contenitori (fatto)**: dopo il feedback
"analizza bottoni e contenitori, controlla su 21st.dev quale ci sta meglio
per un effetto di profondità" si sono sostituite le card piatte
(solo bordo) e i bottoni flat con versioni reali 21st.dev a profondità
tattile, applicate in modo coerente su tutte le 9 schermate — vedi
`TiltCard.tsx`, `GlassCard.tsx`, `GlowingEffect.tsx`, `MotionButton.tsx`
in "Componenti" sotto per i dettagli. `Reshaped Card` (id 17531) è stato
scartato: non è un componente standalone ma un re-export che richiede
l'intero package `reshaped` + il suo theme provider, in conflitto con i
token Tailwind del progetto — sostituito con `Tilt Card` (id 12246).

**Step 2 — Immagini**: da fare. Per lo step 1 le foto di cane/gatto e il
campo di particelle sono stati **rimossi del tutto** (non solo ritoccati)
per isolare la valutazione dei colori da altre variabili — vanno
riprogettati da zero nello step immagini, non semplicemente reintrodotti
come prima.

**Step 3 — Animazioni**: da fare.

**Step 4 — Transizioni tra sezioni**: da fare. Direzione già discussa e
approvata concettualmente (vedi commit precedenti) ma non ancora
implementata: 2 famiglie soltanto per coerenza — dissolvenza a particelle
sui 3 snodi narrativi principali, wipe editoriale sul titolo per i 6
passaggi minori. **Va rivista alla luce della nuova palette** (le
particelle vecchie erano legate all'ambra/corallo bocciato).

Font: Bricolage Grotesque (display) + Inter Tight (body) — non Inter
Tight ovunque, letto come troppo neutro/anonimo nella prima versione.
Questa parte resta valida, non toccata dal reset.

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
- `RevealImageMask.tsx` — foto mascherate da una forma che si apre a piena
  inquadratura scrollando (daiwiikharihar/reveal-image-mask, id 10905).
  **Non referenziato da nessun componente al momento** (foto rimosse nello
  step colori) — resta come infrastruttura pronta per lo step immagini,
  non è codice morto da cancellare.
- `MotionButton.tsx` — CTA con pull magnetico GSAP (pattern
  snippets/r3f-cinematic/MagneticButton.tsx della libreria) + freccia
  animata (concetto Shatlyk1011/motion-button, id 10384, riscritto da
  larghezza fissa ad auto-width perché l'originale si rompe con label
  italiane lunghe tipo "Prenota la chiamata gratuita") + profondità reale
  al press (@ddoemonn/press-depth, id 23547 — slab colorato sotto la
  faccia del bottone che si "preme" col click, `group-active:translate-y`,
  invece di un piatto cambio colore all'hover).
- `TiltCard.tsx` — tilt 3D in prospettiva + spotlight che segue il cursore
  (@tom_ui/tilt-card, id 12246), codice fedele all'originale, `tiltLimit`
  ridotto da 15-20 (demo) a 6 per restare sobrio. Usato per le card nelle
  sezioni chiare: segnali (`Problem.tsx`), percorsi (`Pricing.tsx`),
  monogramma "chi ti segue" (`About.tsx`).
- `GlassCard.tsx` — superficie vetro smerigliato con backdrop-blur
  (molecule-lab-rushil/glass-card, id 5588), semplificata al solo
  contenitore base (sotto-componenti header/footer non servono qui).
  Usato per le 4 card step-by-step in `HowItWorks.tsx` (sezione scura).
- `GlowingEffect.tsx` — bordo che si illumina seguendo il cursore
  (@manuarora700/glowing-effect, Aceternity, id 1567, "come su Cursor"),
  gradiente conico arcobaleno originale ricolorato in un'unica tinta oro
  per coerenza con la regola "un solo accento" della palette. Usato solo
  sulla card in evidenza in `Pricing.tsx` ("Chiamata conoscitiva").
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
