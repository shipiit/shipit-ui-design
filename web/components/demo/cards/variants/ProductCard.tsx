import { Button } from "@/components/primitives/Button";

export function ProductCard() {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)] transition-[box-shadow,transform] duration-[var(--dur-default)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]">
      {/* "Image" — tokenized SVG illustration so we never reach for raster */}
      <div
        aria-hidden="true"
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-brand-100), var(--color-accent-100))",
        }}
      >
        <svg viewBox="0 0 200 150" width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="prod-shoe" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-600)" />
              <stop offset="100%" stopColor="var(--color-brand-400)" />
            </linearGradient>
          </defs>
          <ellipse cx="100" cy="120" rx="60" ry="6" fill="var(--color-fg)" opacity="0.08" />
          <path
            d="M40 100 Q40 80 70 78 L130 70 Q160 70 162 95 L160 108 Q150 116 60 116 Q42 114 40 100 Z"
            fill="url(#prod-shoe)"
          />
          <circle cx="60" cy="100" r="8" fill="var(--color-surface)" opacity="0.9" />
          <circle cx="90" cy="92" r="6" fill="var(--color-surface)" opacity="0.8" />
          <circle cx="120" cy="86" r="5" fill="var(--color-surface)" opacity="0.8" />
        </svg>
        <span className="absolute left-[var(--spacing-3)] top-[var(--spacing-3)] inline-flex items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-accent-500)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-[var(--color-fg-on-brand)]">
          New
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-[var(--spacing-3)] p-[var(--spacing-5)]">
        <div className="flex items-start justify-between gap-[var(--spacing-3)]">
          <div>
            <p className="text-[length:var(--text-xs)] uppercase tracking-wider text-[var(--color-fg-subtle)]">
              Footwear
            </p>
            <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
              Drift Runner v2
            </h3>
          </div>
          <span className="text-[length:var(--text-lg)] font-bold tabular-nums text-[var(--color-fg)]">
            $148
          </span>
        </div>
        <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          Engineered for long miles with a foam midsole and a recycled mesh upper.
        </p>
        <div className="mt-auto flex items-center justify-between gap-[var(--spacing-2)] pt-[var(--spacing-2)]">
          <div className="flex items-center gap-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <Star /> <Star /> <Star /> <Star /> <Star half />
            <span className="ml-[var(--spacing-1)]">4.6 · 218</span>
          </div>
          <Button size="sm">Add to bag</Button>
        </div>
      </div>
    </article>
  );
}

function Star({ half = false }: { half?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2l3 7 7 .7-5.3 4.7L18 22l-6-3.5L6 22l1.3-7.6L2 9.7l7-.7z"
        fill={half ? "var(--color-border)" : "var(--color-accent-400)"}
      />
    </svg>
  );
}

export default ProductCard;
