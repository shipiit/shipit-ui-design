"use client";

import * as React from "react";

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

const INITIAL: Reaction[] = [
  { emoji: "👍", label: "thumbs up", count: 14 },
  { emoji: "🎉", label: "celebration", count: 6 },
  { emoji: "❤️", label: "heart", count: 3 },
];

export function CommentCard() {
  const [reactions, setReactions] = React.useState<Reaction[]>(INITIAL);
  const [reacted, setReacted] = React.useState<Record<string, boolean>>({});

  const toggle = (label: string) => {
    const wasOn = !!reacted[label];
    setReactions((rs) =>
      rs.map((r) =>
        r.label === label
          ? { ...r, count: wasOn ? r.count - 1 : r.count + 1 }
          : r,
      ),
    );
    setReacted((m) => ({ ...m, [label]: !wasOn }));
  };

  return (
    <article className="flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)]">
      <header className="flex items-center gap-[var(--spacing-3)]">
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-full text-[length:var(--text-sm)] font-semibold text-[var(--color-fg-on-brand)]"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-500), var(--color-accent-500))",
          }}
        >
          MK
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">
            Mira Kapoor
          </p>
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <span className="font-medium text-[var(--color-fg-muted)]">@mira</span>
            <span aria-hidden="true"> · </span>
            <time dateTime="2026-05-04T10:14">2 days ago</time>
          </p>
        </div>
        <button
          type="button"
          aria-label="Comment options"
          className="rounded-[var(--radius-md)] p-[var(--spacing-1)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="5" cy="12" r="1.6" />
            <circle cx="12" cy="12" r="1.6" />
            <circle cx="19" cy="12" r="1.6" />
          </svg>
        </button>
      </header>
      <p className="text-[length:var(--text-sm)] text-[var(--color-fg)] leading-relaxed">
        Love how the new tokens make the dark mode feel less &ldquo;inverted&rdquo; — the slate tint at L=20 is doing a lot of quiet work here. Shipping the audit feedback today.
      </p>
      <div className="mt-[var(--spacing-1)] flex flex-wrap items-center gap-[var(--spacing-2)]">
        {reactions.map((r) => {
          const on = !!reacted[r.label];
          return (
            <button
              key={r.label}
              type="button"
              aria-pressed={on}
              aria-label={`React with ${r.label}, ${r.count}`}
              onClick={() => toggle(r.label)}
              className={`inline-flex items-center gap-[var(--spacing-1)] rounded-full border px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)] tabular-nums transition-[background-color,border-color,transform] duration-[var(--dur-fast)] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] ${
                on
                  ? "border-[var(--color-brand-300)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)]"
                  : "border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)] hover:bg-[var(--color-surface)]"
              }`}
            >
              <span aria-hidden="true">{r.emoji}</span>
              {r.count}
            </button>
          );
        })}
        <button
          type="button"
          className="ml-auto inline-flex items-center gap-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] rounded-[var(--radius-sm)]"
        >
          Reply
        </button>
      </div>
    </article>
  );
}

export default CommentCard;
