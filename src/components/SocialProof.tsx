// La sezione era visivamente indistinguibile dalle due che la
// circondano (WhoItsFor e Pricing, entrambe chiare) — tre sezioni di
// fila con lo stesso tono quasi identico creavano una "zona morta"
// visiva nel mezzo del sito (segnalato dall'utente ripercorrendo il
// sito per intero). Fix puramente grafico, non di contenuto: un fondo
// leggermente scaldato verso l'ember (un tint minimo, non un
// riempimento — resta "off-white", solo percettibilmente diverso dai
// vicini) e un grande segno di citazione decorativo in ember, così la
// sezione si legge come un momento a sé invece che come uno spazio
// vuoto tra due blocchi di contenuto.
import { Reveal } from "./Reveal";

export function SocialProof() {
  return (
    <section
      className="relative border-b border-[var(--color-hairline)] py-20 md:py-24"
      style={{ background: "color-mix(in srgb, var(--color-ember) 5%, var(--color-off-white))" }}
    >
      <div className="mx-auto max-w-[720px] px-6 text-center">
        <Reveal>
          <span
            aria-hidden
            className="mb-2 block font-body text-[64px] leading-none text-[var(--color-ember)] md:text-[80px]"
          >
            &ldquo;
          </span>
          <p className="text-xl leading-relaxed text-[var(--color-off-black)] md:text-[28px] md:leading-[1.35]">
            Le prime famiglie sono arrivate solo tramite passaparola — nessuna
            pubblicità, solo persone che hanno raccontato ad altre persone
            cosa è cambiato per il loro animale.
          </p>
          <p className="mt-5 font-body text-[12px] text-[var(--color-ash)]">
            Testimonianze raccolte in arrivo a breve
          </p>
        </Reveal>
      </div>
    </section>
  );
}
