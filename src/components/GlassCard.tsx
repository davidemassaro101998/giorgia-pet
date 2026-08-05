// Da 21st.dev — molecule-lab-rushil/glass-card (id 5588): superficie
// vetro smerigliato con backdrop-blur. Semplificato al solo contenitore
// (non servono i sotto-componenti header/footer per come lo usiamo qui),
// ricolorato sui token Vibra.

import { cn } from "../lib/utils";

export function GlassCard({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[color-mix(in_srgb,var(--color-bone)_14%,transparent)] bg-[color-mix(in_srgb,var(--color-bone)_7%,transparent)] backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
