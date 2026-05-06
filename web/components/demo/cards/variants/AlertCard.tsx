"use client";

import * as React from "react";

type Tone = "info" | "warn" | "danger";

interface Props {
  tone?: Tone;
}

const COPY: Record<Tone, { title: string; body: string }> = {
  info: {
    title: "New tokens available",
    body: "Your design system was updated last night — review the new accent ramp before publishing.",
  },
  warn: {
    title: "Trial ends in 3 days",
    body: "Pick a plan to keep your team's projects active. No data is deleted during the grace period.",
  },
  danger: {
    title: "Couldn't publish theme",
    body: "Two CSS variables are unresolved: --color-success-500 and --color-success-700. Fix and retry.",
  },
};

const TONE: Record<Tone, { bg: string; border: string; fg: string; iconFg: string }> = {
  info: {
    bg: "var(--color-brand-50)",
    border: "var(--color-brand-200)",
    fg: "var(--color-brand-900)",
    iconFg: "var(--color-brand-600)",
  },
  warn: {
    bg: "var(--color-accent-50)",
    border: "var(--color-accent-200)",
    fg: "var(--color-accent-900)",
    iconFg: "var(--color-accent-600)",
  },
  danger: {
    bg: "color-mix(in oklch, oklch(62% 0.2 25) 10%, transparent)",
    border: "color-mix(in oklch, oklch(62% 0.2 25) 32%, transparent)",
    fg: "oklch(40% 0.18 25)",
    iconFg: "oklch(58% 0.2 25)",
  },
};

export function AlertCard({ tone = "info" }: Props) {
  const [open, setOpen] = React.useState(true);
  const c = COPY[tone];
  const t = TONE[tone];
  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        Restore alert
      </button>
    );
  }
  return (
    <div
      role="alert"
      className="flex items-start gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border p-[var(--spacing-4)]"
      style={{ background: t.bg, borderColor: t.border, color: t.fg }}
    >
      <span
        aria-hidden="true"
        className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/60 dark:bg-[color-mix(in_oklch,white_10%,transparent)]"
        style={{ color: t.iconFg }}
      >
        <Icon tone={tone} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[length:var(--text-sm)] font-semibold">{c.title}</p>
        <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] opacity-90 leading-relaxed">
          {c.body}
        </p>
      </div>
      <button
        type="button"
        aria-label="Dismiss"
        onClick={() => setOpen(false)}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-[var(--radius-md)] text-current opacity-70 transition-[opacity,background-color] duration-[var(--dur-fast)] hover:bg-black/5 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

function Icon({ tone }: { tone: Tone }) {
  if (tone === "danger") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4M12 17h.01M10.3 3.7L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0z" />
      </svg>
    );
  }
  if (tone === "warn") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

export default AlertCard;
