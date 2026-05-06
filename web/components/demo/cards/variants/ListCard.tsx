interface Item {
  rank: number;
  label: string;
  meta: string;
  delta: number;
}

const ITEMS: Item[] = [
  { rank: 1, label: "Pricing page A/B", meta: "12,488 views", delta: 18.4 },
  { rank: 2, label: "Onboarding tour", meta: "9,210 views", delta: 6.1 },
  { rank: 3, label: "Changelog v3.2", meta: "4,506 views", delta: -2.4 },
  { rank: 4, label: "API reference", meta: "3,118 views", delta: 4.0 },
  { rank: 5, label: "Status page", meta: "2,884 views", delta: 0 },
];

export function ListCard() {
  return (
    <article className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
      <header className="flex items-center justify-between gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] px-[var(--spacing-5)] py-[var(--spacing-4)]">
        <div>
          <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
            Top pages
          </h3>
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            Last 7 days · across all properties
          </p>
        </div>
        <button
          type="button"
          className="rounded-[var(--radius-md)] px-[var(--spacing-2)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
        >
          7d ▾
        </button>
      </header>
      <ol className="flex flex-col">
        {ITEMS.map((it, i) => (
          <li
            key={it.rank}
            className={`flex items-center gap-[var(--spacing-3)] px-[var(--spacing-5)] py-[var(--spacing-3)] ${i !== ITEMS.length - 1 ? "border-b border-[var(--color-border-subtle)]" : ""}`}
          >
            <span
              aria-hidden="true"
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[var(--color-brand-50)] text-[length:var(--text-xs)] font-semibold tabular-nums text-[var(--color-brand-700)]"
            >
              {it.rank}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
                {it.label}
              </p>
              <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)] tabular-nums">
                {it.meta}
              </p>
            </div>
            <Delta value={it.delta} />
          </li>
        ))}
      </ol>
    </article>
  );
}

function Delta({ value }: { value: number }) {
  if (value === 0) {
    return (
      <span className="text-[length:var(--text-xs)] tabular-nums text-[var(--color-fg-subtle)]">—</span>
    );
  }
  const positive = value > 0;
  const tone = positive
    ? "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
    : "bg-[var(--color-accent-50)] text-[var(--color-accent-700)]";
  return (
    <span className={`inline-flex items-center gap-[var(--spacing-1)] rounded-full px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)] font-semibold tabular-nums ${tone}`}>
      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        {positive ? <path d="M3 8l3-3 3 3" /> : <path d="M3 4l3 3 3-3" />}
      </svg>
      {positive ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

export default ListCard;
