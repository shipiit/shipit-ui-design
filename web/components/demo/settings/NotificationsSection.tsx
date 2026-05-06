"use client";

import * as React from "react";

interface NotificationsSectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

type Channel = "email" | "inapp" | "push";
type EventKey =
  | "comments"
  | "mentions"
  | "daily"
  | "weekly"
  | "billing"
  | "security";

interface EventRow {
  key: EventKey;
  label: string;
  description: string;
}

const ROWS: EventRow[] = [
  { key: "comments", label: "New comments", description: "Someone replies on a doc you own." },
  { key: "mentions", label: "New mentions", description: "Someone @-mentions you anywhere." },
  { key: "daily", label: "Daily digest", description: "Morning summary of activity." },
  { key: "weekly", label: "Weekly summary", description: "Friday recap of your team's week." },
  { key: "billing", label: "Plan & billing changes", description: "Renewals, upgrades, payment failures." },
  { key: "security", label: "Security alerts", description: "New sign-ins and suspicious activity." },
];

const CHANNELS: { key: Channel; label: string }[] = [
  { key: "email", label: "Email" },
  { key: "inapp", label: "In-app" },
  { key: "push", label: "Push" },
];

type Matrix = Record<EventKey, Record<Channel, boolean>>;

const INITIAL: Matrix = {
  comments: { email: true, inapp: true, push: false },
  mentions: { email: true, inapp: true, push: true },
  daily: { email: true, inapp: false, push: false },
  weekly: { email: true, inapp: false, push: false },
  billing: { email: true, inapp: true, push: false },
  security: { email: true, inapp: true, push: true },
};

const FILTERS = ["All notifications", "Mentions only", "Off"] as const;

export function NotificationsSection({ onDirtyChange, resetKey }: NotificationsSectionProps) {
  const [matrix, setMatrix] = React.useState<Matrix>(INITIAL);
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]>("All notifications");

  React.useEffect(() => {
    setMatrix(INITIAL);
    setFilter("All notifications");
    onDirtyChange(false);
  }, [resetKey, onDirtyChange]);

  const toggle = (row: EventKey, ch: Channel) => {
    setMatrix((m) => {
      const next: Matrix = { ...m, [row]: { ...m[row], [ch]: !m[row][ch] } };
      const dirty =
        JSON.stringify(next) !== JSON.stringify(INITIAL) ||
        filter !== "All notifications";
      onDirtyChange(dirty);
      return next;
    });
  };

  const onFilter = (f: (typeof FILTERS)[number]) => {
    setFilter(f);
    onDirtyChange(f !== "All notifications" || JSON.stringify(matrix) !== JSON.stringify(INITIAL));
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
        <div className="min-w-0">
          <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">Notifications</h2>
          <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            Choose what we ping you about, and where it lands.
          </p>
        </div>
        <label className="flex items-center gap-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
          <span className="sr-only sm:not-sr-only">Filter</span>
          <div className="relative">
            <select
              aria-label="Notification filter"
              value={filter}
              onChange={(e) => onFilter(e.target.value as (typeof FILTERS)[number])}
              className="appearance-none rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] py-[var(--spacing-2)] pl-[var(--spacing-3)] pr-[var(--spacing-8)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg)] hover:border-[var(--color-fg-subtle)] focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--color-brand-400)_30%,transparent)]"
            >
              {FILTERS.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
            <span aria-hidden="true" className="pointer-events-none absolute right-[var(--spacing-2)] top-1/2 -translate-y-1/2 text-[var(--color-fg-subtle)]">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
            </span>
          </div>
        </label>
      </header>

      <section className="overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
        <header className="border-b border-[var(--color-border-subtle)] px-[var(--spacing-5)] py-[var(--spacing-4)] sm:px-[var(--spacing-6)]">
          <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">Delivery preferences</h3>
          <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            Toggle channels per event. Security alerts always send to email.
          </p>
        </header>

        <div className="overflow-x-auto px-[var(--spacing-2)] sm:px-[var(--spacing-4)]">
          <table className="w-full min-w-[40rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[length:var(--text-2xs)] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                <th className="py-[var(--spacing-3)] pl-[var(--spacing-3)] pr-[var(--spacing-2)] font-semibold">Event</th>
                {CHANNELS.map((c) => (
                  <th key={c.key} scope="col" className="px-[var(--spacing-2)] py-[var(--spacing-3)] text-center font-semibold">
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.key} className="hover:bg-[var(--color-surface-elevated)]">
                  <td className="border-t border-[var(--color-border-subtle)] py-[var(--spacing-3)] pl-[var(--spacing-3)] pr-[var(--spacing-2)]">
                    <div className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">{r.label}</div>
                    <div className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{r.description}</div>
                  </td>
                  {CHANNELS.map((c) => (
                    <td key={c.key} className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-center">
                      <Toggle
                        checked={matrix[r.key][c.key]}
                        onChange={() => toggle(r.key, c.key)}
                        ariaLabel={`${r.label} via ${c.label}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  ariaLabel: string;
}

/**
 * Toggle — 36×20 hand-rolled switch. Brand-tinted "on", neutral "off".
 * Reduced-motion-safe via global token guard in globals.css (transition-duration override).
 */
function Toggle({ checked, onChange, ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={onChange}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-transparent transition-colors duration-[var(--dur-fast)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_oklch,var(--color-brand-400)_45%,transparent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50 ${
        checked
          ? "bg-[var(--color-brand)] hover:bg-[var(--color-brand-hover)]"
          : "bg-[var(--color-neutral-200)] hover:bg-[var(--color-neutral-300)] dark:bg-[var(--color-neutral-700)] dark:hover:bg-[var(--color-neutral-600)]"
      }`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-surface-overlay)] shadow-[var(--shadow-sm)] transition-transform duration-[var(--dur-fast)] ${
          checked ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

export default NotificationsSection;
