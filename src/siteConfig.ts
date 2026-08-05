// Contenuto centralizzato del sito. I campi marcati TODO sono placeholder
// espliciti — vanno sostituiti con dati reali prima di pubblicare online.

export const site = {
  brand: "Armonya",
  positioning: "Biorisonanza per cani e gatti",
  tagline: "Riequilibrio a distanza — per il tuo animale, per te, per l'ambiente.",

  // TODO: sostituire con contatti reali prima del lancio pubblico.
  contact: {
    whatsapp: "https://wa.me/390000000000", // TODO numero reale
    email: "mailto:info@armonya.example",   // TODO email reale
    phone: "+39 000 000 0000",              // TODO numero reale
  },

  practitioner: {
    name: "Giorgia Bisognin",
    role: "Esperta di biorisonanza, ex infermiera, kinesiologa",
  },
} as const;

export const ctaLabel = "Prenota la chiamata gratuita";
