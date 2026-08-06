# CLAUDE.md — Vibra (landing page biorisonanza cani/gatti)

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
- **Nome**: Vibra — "Biorisonanza per cani e gatti". Prima era "Armonya",
  cambiato su feedback esplicito ("armonia è visto e rivisto, serve un
  nome unico"). "Vibra" (da "vibrazione/frequenza") nomina il meccanismo
  reale del prodotto invece di usare una parola-ombrello da wellness già
  abusata ovunque.
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

**Step 1.6 — Rebrand: nome, palette, bottone "segnale" (fatto)**: dopo
"Sintonia" (nome scartato: "non è unico") si è arrivati a **Vibra**.
Rifatta anche la palette: **niente più oro/ambra** (accento più abusato
nel "premium" AI-generico — fintech, skincare, coaching, non dice nulla
di specifico su Vibra). Scartate anche due alternative proposte e
respinte: verde (legge clinico/medico — Vibra non è un'app medica) e
viola (legge spirituale/new-age, cliché delle app di meditazione). Nuovo
accento unico: **`--color-ember` `#c9705c`**, rosa-terracotta caldo — il
calore di un essere vivo (tartufo, orecchio, battito sotto il pelo), non
uno strumento né un lusso da e-commerce. Base neutra ink/void/bone
ritinta calda per accompagnarlo (vedi `src/index.css`).

Il bottone (`MotionButton.tsx`) è stato ricostruito da zero una seconda
volta: il primo giro (profondità/slab, vedi Step 1.5) è stato bocciato
duramente ("bottoni da app da due euro, non di un brand multimilionario
che tratta pet") — lo slab colorato spesso sotto il bottone è
letteralmente il pattern dei bottoni "a caramella" di Duolingo/Candy
Crush, non un pattern premium. Sostituito con un bottone-segnale
coerente col concetto di prodotto (biorisonanza = frequenza): vedi la sua
voce in "Componenti" sotto per i dettagli tecnici.

**Step 1.7 — Rebuild completo su style-reference esterno (fatto, sostituisce
1/1.5/1.6)**: dopo il rifiuto totale ("tutto non ci siamo") l'utente ha
passato lo style-reference completo di un sito che gli piace ("Augen Pro":
void chiarissimo monocromatico, UN accento cromatico mai come riempimento,
tipografia peso 350 uniforme senza bold, raggi enormi/pillole, bordi
hairline 0.5px, **zero ombre/gradienti/chrome decorativa**) e ha chiesto di
replicarne 1:1 animazioni/impaginazione/stile con testi e immagini proprie.
Questo **sostituisce** tutto il lavoro precedente su colori (Forest verde,
poi ember su fondo scuro) e sul bottone (slab/press-depth, poi
waveform+ripple) — entrambi gli approcci precedenti erano "chrome
decorativa" nel senso esplicito vietato da questo riferimento, non solo
sbagliati nel colore. Vedi `src/index.css` per i nuovi token:
- Base monocromatica: `--color-off-black` `#15130f`, `--color-pure-black`
  `#050403`, `--color-off-white` `#f3f1ec` (canvas), `--color-pure-white`
  `#fbfaf6` (superfici elevate), `--color-steel`/`--color-ash` (testo
  secondario/terziario), `--color-hairline` (bordi 0.5-1px, mai più
  spessi).
- **Un solo accento**: `--color-ember` `#c9705c` (rosa-terracotta caldo al
  posto del blu clinico dell'originale — scelto per non leggere "app
  medica", vincolo esplicito di questo progetto). Usato **solo** come
  testo o bordo (tag, link, piccola icona freccia) — **mai** come
  riempimento di un bottone o di un blocco, esattamente come il blu nel
  riferimento.
- Tipografia: un solo font (Inter Tight Variable) a **peso 350** ovunque
  (titoli inclusi — via `h1,h2,h3 { font-weight: 350 }`), niente bold,
  niente monospace, tracking `-0.02em` uniforme. Rimossi Bricolage
  Grotesque e JetBrains Mono dalle dipendenze.
- Struttura sezioni scure ridotta a due soli bookend (Hero + Footer/
  FinalCta), come nel riferimento ("Dark Band Footer" + hero full-bleed) —
  `WhatIsBioresonance`, `HowItWorks`, `SocialProof` erano scure prima,
  ora sono su canvas chiaro.
- Nav sticky full-width sostituita da una **pillola flottante** centrata
  (wordmark + link + CTA in un unico contenitore arrotondato,
  `--radius-nav`), come "Pill Navigation Bar" del riferimento.
- Card: bordo hairline + raggio enorme (`--radius-card`, 40px) + **zero
  ombre**, mai riempimento colorato — sostituiscono `TiltCard`/
  `GlassCard`/entrambi eliminati (vedi sotto).
- Tag/badge: pillola (`--radius-pill`), bordo ember, testo ember, **niente
  sfondo** — pattern "Pill Tag Chip" del riferimento.
- Bottoni: vedi voce `MotionButton.tsx` sotto — anche questo riscritto da
  zero una terza volta, stessa filosofia "presente ma non urlato".

**Componenti eliminati in questo rebuild** (violavano "zero chrome
decorativa" del nuovo riferimento, non solo esteticamente ma per
principio esplicito): `TiltCard.tsx` (tilt 3D + spotlight-gradient),
`GlassCard.tsx` (backdrop-blur), `GlowingEffect.tsx` (bordo conic-gradient
animato). File cancellati, non lasciati come infrastruttura morta.

**Step 2 — Immagini (fatto, iterato 3 volte)**: foto vera di un cane
(Unsplash, licenza libera, self-hostata in `src/assets/hero-dog.jpg` —
**placeholder di stile**, da sostituire con una foto reale prima del
lancio, vedi TODO) al posto del render 3D umano del riferimento.
- Giro 1: cane + gatto sovrapposti (`translate`+`scale` per impilarli) —
  illeggibile, segnalato dall'utente ("leva l'immagine del cane e gatto
  che sono una sopra l'altra").
- Giro 2: sistemata la sovrapposizione (impilati verticalmente con
  `gap-6`), ma restavano due ritagli quadrati a piena luminosità con un
  vignette stretto — leggevano come sticker incollati sopra lo sfondo,
  non come parte di esso (feedback dell'utente: "il cane deve essere
  parte dello sfondo non deve essere incollato sopra").
- Giro 3 (attuale): **solo il cane** in hero (il gatto resta disponibile
  in `src/assets/hero-cat.jpg` per un uso futuro, non referenziato ora).
  Copre una fascia larga sul lato destro (non più un quadrato), con
  `filter: grayscale(0.3) brightness(0.5) contrast(1.05)` per scurirlo e
  desaturarlo — si fonde nel canvas nero invece di risaltare come una
  foto a piena luminosità — e una `radial-gradient` di maschera molto più
  ampia e spostata verso il bordo (`85% 75% at 80% 45%`) invece del
  vignette stretto centrato, per una dissolvenza larga sui bordi invece
  di un taglio a disco. Ha una sua animazione dedicata nel crossfade
  hero→"cos'è" (vedi Step 3): si allontana/sfoca (`scale` + `blur`) invece
  di limitarsi a un fade con il resto del layer, per sembrare l'ambiente
  che affonda nel buio, non un livello che sparisce. Simmetrico: ricompare
  con la stessa animazione se si torna in su. Vedi `CinematicIntro.tsx`.

**Step 3 — Transizione cinematografica hero → "cos'è la biorisonanza"
(fatto)**: unica eccezione esplicitamente richiesta alla disciplina
"sobria" del riferimento — l'utente ha chiesto animazioni "spettacolari"
tra le sezioni, prese da 21st.dev, non basiche. Vedi `CinematicIntro.tsx`:
fonde Hero e la vecchia `WhatIsBioresonance.tsx` (eliminata, il contenuto
è confluito qui) in un binario di scroll pinnato lungo `200vh` (GSAP
`ScrollTrigger`, tecnica presa da lovesickfromthe6ix/full-screen-scroll-fx
id 5794, semplificata da N slide con liste laterali+audio a 2 sole slide
testuali) — a metà corsa la hero dissolve nella sezione successiva invece
di scorrere via, con i titoli che si rivelano via `VerticalCutReveal`
(cnippet.dev id 18595, wipe verticale a clip-path, adattato in
`VerticalCutReveal.tsx`). Il pin/crossfade a schermo intero **resta
l'unico punto "spettacolare"** del sito — ma `VerticalCutReveal` è stato
poi esteso a tutti i titoli di sezione (vedi Step 5) per rompere la
sensazione di "passaggi tutti uguali" segnalata dall'utente, senza
introdurre altri pin/schermate intere altrove. **Ordine di sezione
cambiato**: "cos'è la biorisonanza" era
dopo `HowItWorks`, ora è la seconda slide della cinematic intro (subito
dopo l'hook della hero, prima di "riconosci i segnali") — narrativamente
più corretto.

**Step 4 — Altre transizioni**: superato dallo Step 5 (l'utente ha chiesto
esplicitamente di rompere la sensazione di "tutte uguali" nelle sezioni
2-9) — non reintrodurre un secondo pin/schermo-intero altrove, quello
resta riservato a hero→"cos'è" per scelta esplicita, non un'abitudine.

**Step 5 — Card più vive + varietà nei titoli + gatto sullo sfondo chiaro
(fatto)**: tre feedback distinti nello stesso giro.
- **Card "piatte e povere"** (Problem, HowItWorks, Pricing): create
  `FeatureCard.tsx`, adattata da 21st.dev manuarora700/feature-section-
  with-hover-effects (Aceternity, id 1521) — niente ombre/gradienti
  vistosi (vietati dal riferimento), ma una barra accento accanto al
  titolo che si allunga e diventa ember all'hover, il titolo che scivola
  leggermente, un velo di tono (wash, non colore pieno) che sale dal
  basso. La differenza "piatta vs viva" senza rompere la disciplina.
- **"I passaggi tra le sezioni sono tutti uguali"**: `VerticalCutReveal`
  (già usato solo nella cinematic intro) esteso a **tutti** i titoli di
  sezione via `SectionTitle.tsx` (Pricing e Faq usavano un `<h2>` semplice
  — passati a `SectionTitle` per coerenza). Sotto la piega va bene
  `useInView`/IntersectionObserver per triggerare il wipe (il vincolo
  GOTCHAS #1 riguarda solo l'above-the-fold). **Bug di integrazione
  trovato**: `VerticalCutReveal` applicava `containerClassName` PRIMA
  della classe `flex` hardcoded nel suo `cn()` interno — passare
  `"inline-flex"` per tenere firstHalf/secondHalf sulla stessa riga non
  aveva effetto perché tailwind-merge risolveva il conflitto a favore del
  `flex` scritto dopo. Fix: riordinato il `cn()` in `VerticalCutReveal.tsx`
  così `containerClassName` vince sempre.
- **Gatto sullo sfondo — 3 tentativi, alla fine rimosso**: giro 1, in
  `Faq.tsx` con un ritaglio stretto — "fatto malissimo". Giro 2, spostato
  in `WhoItsFor.tsx` con bleed ampio dal bordo sinistro + la stessa
  animazione GSAP scroll-triggered (non pinnata, `toggleActions: "play
  reverse play reverse"`) del cane in hero — tecnicamente meglio ma
  l'utente ha comunque detto "non ci siamo", rimosso del tutto (giro 3).
  `src/assets/hero-cat.jpg` resta inutilizzato sul disco, non referenziato
  da nessun componente — non cancellato, potrebbe servire con una foto
  diversa (vedi sotto, i tentativi con foto vere fornite dall'utente sono
  stati scartati per il tono "da foto stock" delle espressioni).

Nello stesso giro, corretti anche due bug di layout non richiesti
esplicitamente ma visti in review: `Nav.tsx` era `sticky` (occupava
spazio nel flusso, lasciando una fascia bianca vuota sopra l'hero scura)
— ora `fixed`, si sovrappone come previsto. Scrollbar nativa nascosta via
CSS in `index.css` (`scrollbar-width: none` + `::-webkit-scrollbar`).

**Step 6 — "Come funziona" ricostruita, foto vera di Giorgia (fatto)**:
due feedback distinti.
- **"Come funziona una sessione" senza peso**: le `FeatureCard` in
  griglia 4 colonne leggevano come "un elenco puntato vestito bene".
  Buttato via il concetto di card — ora è una **lista editoriale
  verticale**, righe a tutta larghezza (numero enorme `clamp(2.75rem,
  5vw,4rem)` | titolo | testo, 3 colonne asimmetriche `0.9fr_1.6fr_2fr`),
  separate da hairline, senza bordi/contenitori attorno a ogni riga. È il
  pattern "Breakthrough" a griglia asimmetrica descritto nello style-
  reference dell'utente stesso (narrow label | wide heading | side
  paragraph), non ancora usato altrove sul sito. Il numero è
  `--color-ash` a riposo, diventa `--color-ember` all'hover (**non**
  `--color-hairline` — un tentativo iniziale usava quel token per il
  numero ed era praticamente invisibile, essendo pensato per bordi a
  bassissima opacità, non per testo).
- **Foto vera di Giorgia Bisognin** (`src/assets/giorgia.jpg`): l'utente
  ha incollato l'immagine in chat ma non era recuperabile da filesystem
  (il meccanismo di incolla-immagine di questo ambiente non la scrive su
  disco) — serviva un URL diretto scaricabile con `curl`. Un link
  Google Drive `/uc?export=download&id=...` funziona SOLO se il file è
  condiviso "Chiunque abbia il link" — altrimenti restituisce una pagina
  HTML di login, non l'immagine (va controllato `file` sull'output, non
  solo che curl non dia errore). Foto **bassa risoluzione** (190×245px,
  accettata così dall'utente "per ora") — per questo NON trattata come
  sfondo ambientale grande (si vedrebbe sgranata), ma tenuta a dimensione
  contenuta (~233×300px) in `About.tsx`. Lo sfondo della sezione è stato
  cambiato da chiaro a `--color-off-black` **apposta**: lo sfondo della
  foto stessa è già un nero molto simile, quindi il ritratto si fonde nel
  canvas della sezione invece di stare dentro una cornice — "sfondo della
  sezione uguale a quello della foto", richiesta letterale dell'utente.
  Comparsa via GSAP ScrollTrigger (blur+scale, stessa tecnica di
  cane/gatto). **Foto sostitutive proposte dall'utente e scartate**: un
  golden retriever con la zampa alzata su sfondo azzurro acceso (sfondo
  colorato non si fonde nel nero della hero, posa da foto stock) e un
  gatto a bocca aperta mentre si lecca il naso su sfondo bianco (sfondo
  ok, ma espressione troppo comica/da stock per il tono del sito) — se
  arrivano foto sostitutive in futuro, verificare che abbiano uno sfondo
  scuro/neutro coerente con la sezione di destinazione e un'espressione
  composta, non in movimento.

**Step 7 — Foto definitive di cane/gatto, fix del "pasted look" su
Giorgia (fatto)**: l'utente ha trovato due foto giuste al secondo giro
— un labrador nero con sfondo studio quasi identico al nero della hero
(`src/assets/hero-dog.jpg`, sostituisce il cane precedente) e un gatto
rosso/bianco con sguardo laterale calmo su sfondo bianco pulito
(`src/assets/hero-cat.jpg`, sostituisce il file scartato — il gatto
torna in `WhoItsFor.tsx`, questa volta sul lato **destro** invece che
sinistro, stessa tecnica GSAP ScrollTrigger non pinnata di prima).

Corretto anche il "si vede che hai incollato l'immagine" su Giorgia
(`About.tsx`): la versione precedente la trattava come una **card** —
un riquadro rigido 233×300px con un fade interno troppo stretto per
nascondere il proprio bordo, quindi il rettangolo restava visibile come
sagoma sopra il canvas nero. Ristrutturata sullo stesso pattern di
cane/gatto: non più un box a dimensione fissa dentro la grid, ma un
**livello di sfondo assoluto** che sanguina dal bordo sinistro dietro al
testo (`w-[50%]`, maschera radiale `75% 70% at 28% 45%` con fade che
comincia already al 20% — molto più ampio del tentativo precedente).
Nessun bordo percepibile ora: la bassa risoluzione (190×245) aiuta,
paradossalmente, perché la sfumatura ampia la nasconde meglio di quanto
farebbe in un riquadro nitido e piccolo.

**Step 8 — Ritagli veri (PNG con alpha) per cane e gatto, coverflow per
"Come funziona" (fatto)**: capovolgimento voluto della tecnica
precedente. L'utente ha fornito due nuove foto **già ritagliate** (PNG
con canale alpha, sfondo trasparente verificato via Pillow — angolo
alpha=0, soggetto alpha=255) chiedendo che cane e gatto sembrino
"sopra lo sfondo in 3D" invece che fusi dentro, ribaltando la direzione
di `WhoItsFor`/`CinematicIntro` degli step precedenti (mask-image
radiale per dissolversi nel canvas). Ora sono `<img>` con canale alpha
vero:
- **Cane** (`hero-dog-cutout.png`, `CinematicIntro.tsx`): niente più
  `grayscale`/`brightness` ridotta — colori naturali, profondità data da
  `filter: drop-shadow(...)` (rispetta l'alpha del PNG, `box-shadow` non
  lo farebbe) invece che da un blend nel nero. Aggiunto un tilt 3D che
  segue il mouse (`gsap.quickTo` su `rotationY`/`rotationX`, ±5-6°,
  dentro un contenitore con `perspective: 1400px`) per rinforzare la
  sensazione di profondità reale. Le due animazioni già esistenti
  (mount reveal blur+scale, dissolve nel crossfade hero→"cos'è") restano,
  semplicemente ora animano un `<img>` invece di un `background-image`.
- **Gatto** (`hero-cat-cutout.png`, `WhoItsFor.tsx`): animazione
  **volutamente diversa** dal cane (richiesta esplicita: "l'animazione
  del gatto falla particolare e diversa") — entra scivolando in
  diagonale da destra con una rotazione che si raddrizza
  (`ease: "back.out(1.4)"`, un piccolo rimbalzo finale, non il
  blur+scale del cane), poi un galleggiamento continuo una volta fermo
  (`y` sine yoyo infinito, `repeat: -1`) — più giocoso, coerente con un
  gatto invece che con la gravità di un labrador.
- File raster precedenti (`hero-dog.jpg`, `hero-cat.jpg`, foto intere
  con sfondo) **cancellati**, non più referenziati da nessun componente
  dopo il passaggio ai ritagli.

**"Come funziona una sessione" ricostruita una terza volta** (la lista
editoriale a 3 colonne dello Step 6 non piaceva "per niente" — restava
comunque statica, tutti e 4 gli step leggibili insieme senza gerarchia).
L'utente ha fornito per intero il codice di un **coverflow 3D**
(`CoverflowCarousel.tsx` — drag/tocco, prospettiva reale via CSS
`perspective`/`rotateY` calcolati a mano, loop, throw-on-release): il
pattern iconico "Apple Music/iTunes", esattamente "in stile app" come
richiesto. Codice lasciato fedele all'originale — solo `lucide-react`
(non nel progetto) sostituita con `@phosphor-icons/react` per
convenzione, l'import di `cn` reso relativo (niente alias `"@/"` in
questo progetto), e le classi `animate-in fade-in` rimosse (richiedono
il plugin `tailwindcss-animate`, non installato — erano inerti senza).
Aggiunta una prop `dark` (assente nell'originale) per i colori di
caption/paginazione, dato che la sezione è passata a sfondo scuro
apposta — il coverflow "brilla" su nero come l'App Store, uniche card
chiare della sezione. **Seconda eccezione esplicita alla regola "sfondi
scuri solo hero+footer"** dello Step 1.7 (la prima era la cinematic
intro) — qui per lo stesso motivo: scelta esplicita dell'utente, non
un'abitudine.

Le "copertine" del coverflow sono SVG generati inline (data URI in
`stepCardImage()`, non un asset esterno) — non ci sono foto per singolo
step, un numero enorme in ember su nero fa da visual riconoscibile.
Titolo/corpo veri di ogni step restano testo HTML reale sotto il
coverflow (via `showCaption`+`meta` del componente), non dentro l'SVG —
leggibile e accessibile, non testo rasterizzato.

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
- `MotionButton.tsx` — **riscritto una terza volta** nello Step 1.7 per
  aderire al nuovo riferimento stilistico. Le due versioni precedenti
  (slab/press-depth "a caramella", poi waveform+ripple "strumento di
  segnale") sono state entrambe scartate: non per il colore, ma perché
  *qualsiasi* effetto vistoso viola "zero chrome decorativa". Versione
  attuale: due varianti sole, "Floating CTA Pill" (wash quasi-trasparente
  sul colore di sfondo, `color-mix(...6%,transparent)`, mai un blocco di
  colore pieno) per il primario, "Ghost Link" (solo testo, sottolineatura
  all'hover) per il secondario — pattern presi 1:1 dal riferimento
  fornito dall'utente. Resta solo la freccia animata (concetto
  Shatlyk1011/motion-button, id 10384) in colore ember, mai il bottone
  intero. **Pull magnetico GSAP rimosso**: il riferimento non ha micro-
  interazioni vistose, "presente ma non urlato" — se richiesto in futuro
  reintrodurlo solo su richiesta esplicita.
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
tagliati o si rompano nei contenitori più stretti prima di considerare
l'integrazione finita.

**Bug reale trovato e risolto**: `MotionButton` con `whitespace-nowrap` +
`rounded-full` in una card di pricing stretta produceva testo più largo
della card, tagliato a filo dall'`overflow-hidden` di `TiltCard` (bordo
destro netto, non arrotondato — sintomo riconoscibile). Fix: rimosso
`whitespace-nowrap` (il testo ora può andare a capo su due righe),
`rounded-full` sostituito con `rounded-xl` (un pillola a due righe legge
male, un rettangolo arrotondato no), aggiunta una prop `fullWidth` che fa
riempire al bottone la larghezza del contenitore invece di restare a
larghezza-contenuto (`w-fit`) — usata in `Pricing.tsx` sulla card CTA.

**Tipografia bottoni cambiata dopo feedback ("non sembrano di
un'azienda pet da milioni di dollari")**: la faccia del bottone era
`font-mono uppercase tracking-wide` — una scelta stilistica mia, non
sourced da 21st.dev, aggiunta sopra il pattern magnetic-pull/press-depth
che invece è reale. Il mono-maiuscolo legge "tool per sviluppatori", non
brand di benessere animale premium. Cambiato a `font-body` (Inter Tight,
lo stesso font del body text) in sentence case, peso medium, senza
tracking artificiale — coerente con il resto del copy del sito invece di
sembrare un'etichetta di debug.

**Immagini in artifact/preview self-contained**: se il progetto viene
pubblicato come artifact HTML a file singolo (per anteprima rapida), Vite
importa le immagini come stringa `/assets/nome-hash.jpg` dentro il bundle
JS, non solo nel CSS — un inliner che processa solo il CSS lascia le
immagini rotte nel file singolo. Vedi `inline-artifact.mjs`: deve riscrivere
sia `url()` nel CSS sia i riferimenti stringa nel JS.

## TODO prima del lancio pubblico (vedi `src/siteConfig.ts`)
- [ ] Contatti reali: WhatsApp, email, telefono (attualmente placeholder)
- [ ] Prezzi reali per sessione singola e percorso 3 sessioni (attualmente `€ —`)
- [ ] Logo vero (attualmente solo wordmark testuale "Vibra")
- [ ] Foto di Giorgia Bisognin a risoluzione più alta — quella attuale
      (`src/assets/giorgia.jpg`) è vera ma bassa risoluzione (190×245px),
      accettata "per ora" dall'utente; sostituire appena disponibile una
      versione più grande, senza cambiare il trattamento (sfondo scuro
      della sezione già intonato al suo)
- [ ] Le foto di cane/gatto nella hero (`src/assets/hero-dog.jpg`,
      `hero-cat.jpg`) sono stock Unsplash usate come placeholder per lo
      stile — sostituire con foto reali (dei clienti, con consenso, o
      commissionate) prima del lancio pubblico
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
