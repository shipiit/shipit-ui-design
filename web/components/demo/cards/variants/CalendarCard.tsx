const ATTENDEES = [
  { initials: "AR", from: "var(--color-brand-500)", to: "var(--color-brand-700)" },
  { initials: "JL", from: "var(--color-accent-500)", to: "var(--color-accent-700)" },
  { initials: "TM", from: "var(--color-brand-400)", to: "var(--color-accent-500)" },
];

export function CalendarCard() {
  return (
    <article className="flex flex-col gap-[var(--spacing-4)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)]">
      <div className="flex items-start gap-[var(--spacing-4)]">
        <div
          aria-hidden="true"
          className="grid w-16 shrink-0 place-items-center overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-center shadow-[var(--shadow-sm)]"
        >
          <span className="block w-full bg-[var(--color-brand-600)] py-[2px] text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-[var(--color-fg-on-brand)]">
            May
          </span>
          <span className="block py-[var(--spacing-2)] text-[length:var(--text-2xl)] font-bold tabular-nums text-[var(--color-fg)]">
            12
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-600)]">
            Tuesday · 10:30 – 11:00 AM
          </p>
          <h3 className="mt-[var(--spacing-1)] text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
            Design review — pricing redesign
          </h3>
          <p className="mt-[var(--spacing-1)] inline-flex items-center gap-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <Pin />
            Zoom · meet.shipit/pricing-q3
          </p>
        </div>
      </div>

      <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed">
        Walkthrough of the gradient-border featured tier, then async Q&amp;A in #design.
      </p>

      <footer className="flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-[var(--spacing-3)]">
        <ul className="flex -space-x-2" aria-label="Attendees">
          {ATTENDEES.map((a, i) => (
            <li key={i}>
              <span
                aria-label={a.initials}
                className="grid h-7 w-7 place-items-center rounded-full text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-on-brand)] ring-2 ring-[var(--color-surface)]"
                style={{ background: `linear-gradient(135deg, ${a.from}, ${a.to})` }}
              >
                {a.initials}
              </span>
            </li>
          ))}
          <li>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-surface-elevated)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-muted)] ring-2 ring-[var(--color-surface)]">
              +5
            </span>
          </li>
        </ul>
        <div className="flex items-center gap-[var(--spacing-2)]">
          <button
            type="button"
            className="rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            Decline
          </button>
          <button
            type="button"
            className="rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold text-[var(--color-fg-on-brand)] shadow-[var(--shadow-sm)] hover:bg-[var(--color-brand-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
          >
            Join
          </button>
        </div>
      </footer>
    </article>
  );
}

function Pin() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default CalendarCard;
