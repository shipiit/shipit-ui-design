import { Button } from "@/components/primitives/Button";
import { cn } from "@/lib/utils";

interface Props {
  featured?: boolean;
}

const FEATURES = [
  "Unlimited projects",
  "Up to 25 collaborators",
  "Custom domains + SSL",
  "Priority email support",
  "Daily backups",
];

export function PricingCard({ featured = false }: Props) {
  return (
    <article
      className={cn(
        "relative flex flex-col gap-[var(--spacing-4)] rounded-[var(--radius-xl)] p-[var(--spacing-6)]",
        featured
          ? "shadow-[var(--shadow-lg)]"
          : "border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]",
      )}
      style={
        featured
          ? {
              border: "1px solid transparent",
              background:
                "linear-gradient(var(--color-surface), var(--color-surface)) padding-box, linear-gradient(135deg, var(--color-brand-400), var(--color-accent-400)) border-box",
            }
          : undefined
      }
    >
      {featured && (
        <span className="absolute -top-[var(--spacing-3)] left-[var(--spacing-5)] inline-flex items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-brand-600)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-[var(--color-fg-on-brand)] shadow-[var(--shadow-sm)]">
          <span aria-hidden="true">★</span> Most popular
        </span>
      )}
      <header>
        <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-600)]">
          {featured ? "Team" : "Starter"}
        </p>
        <div className="mt-[var(--spacing-2)] flex items-baseline gap-[var(--spacing-1)]">
          <span className="text-[length:var(--text-4xl)] font-bold tabular-nums text-[var(--color-fg)]">
            ${featured ? "29" : "9"}
          </span>
          <span className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            /seat/mo
          </span>
        </div>
        <p className="mt-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {featured
            ? "For growing teams that need more room and roles."
            : "Everything to get the first project shipped."}
        </p>
      </header>
      <ul className="flex flex-col gap-[var(--spacing-2)]">
        {FEATURES.slice(0, featured ? 5 : 3).map((f) => (
          <li
            key={f}
            className="flex items-center gap-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg)]"
          >
            <Check />
            {f}
          </li>
        ))}
      </ul>
      <Button variant={featured ? "primary" : "secondary"} className="mt-auto w-full">
        {featured ? "Start free trial" : "Choose Starter"}
      </Button>
    </article>
  );
}

function Check() {
  return (
    <span
      aria-hidden="true"
      className="grid h-5 w-5 place-items-center rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
    >
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 6.5l2.5 2.5 4.5-5" />
      </svg>
    </span>
  );
}

export default PricingCard;
