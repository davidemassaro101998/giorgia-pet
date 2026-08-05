import { Reveal } from "./Reveal";
import calmCat from "../assets/photos/calm-cat.jpg";
import { RevealImageMask } from "./RevealImageMask";
import { SectionTitle } from "./SectionTitle";

const cases = [
  "Cani e gatti ansiosi",
  "Paura di rumori forti",
  "Difficoltà dopo un trasloco",
  "Aggressività reattiva",
  "Recupero dopo un lutto in famiglia",
  "Squilibrio comportamentale generico",
];

export function WhoItsFor() {
  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-bone)] py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 md:grid-cols-2">
        <Reveal className="order-2 md:order-1">
          <SectionTitle
            firstHalf="Per chi è pensato "
            secondHalf="Armonya"
            className="text-3xl leading-tight tracking-tight text-[var(--color-ink)] md:text-4xl"
          />
          <div className="mt-7 flex flex-wrap gap-3">
            {cases.map((c) => (
              <span
                key={c}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-paper)] px-4 py-2 text-[14px] text-[var(--color-ink)]"
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
        <div className="order-1 md:order-2">
          <RevealImageMask
            src={calmCat}
            alt="Gatto rilassato e in equilibrio"
            shape="circle"
            className="h-[300px] md:h-[380px]"
          />
        </div>
      </div>
    </section>
  );
}
