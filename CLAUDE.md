# CLAUDE.md — Armonya (landing page biorisonanza cani/gatti)

Regole standing per questo progetto. Vedi anche
`~/claude-library-for-site` (repo separato) per la libreria di riferimento
completa — style-reference, motion patterns, GOTCHAS, componenti pronti.

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
da verde-laboratorio ad ambra (`--color-amber: #ee9c4e`). Vedi `src/index.css`
per i token completi. Immagini scientifiche → sostituite con visual
illustrato (`ResonanceRings` in `WhatIsBioresonance.tsx`) per la parte
concettuale, foto reali di animali (self-hosted in `src/assets/photos/`,
licenza Unsplash, verificate visivamente prima dell'uso) per la parte calda.

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
