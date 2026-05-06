"use client";

import * as React from "react";
import { Card, type CardData } from "./Card";

export interface ColumnData {
  id: string;
  title: string;
  cards: CardData[];
}

export function Column({ col }: { col: ColumnData }) {
  return (
    <section
      aria-label={`${col.title} column, ${col.cards.length} tasks`}
      className="flex min-w-0 flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[color-mix(in_oklch,var(--color-surface)_90%,transparent)] p-[var(--spacing-3)] backdrop-blur-sm"
    >
      <header className="flex items-center justify-between gap-[var(--spacing-2)] px-[var(--spacing-2)] pt-[var(--spacing-1)]">
        <div className="inline-flex items-center gap-[var(--spacing-2)]">
          <h3 className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">{col.title}</h3>
          <span className="inline-flex h-5 items-center justify-center rounded-full bg-[var(--color-surface-elevated)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-muted)]">
            {col.cards.length}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Add task to ${col.title}`}
          className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] active:scale-[0.95]"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </header>
      <ul className="flex flex-col gap-[var(--spacing-3)] lg:max-h-none max-h-[60vh] overflow-y-auto pr-[var(--spacing-1)]">
        {col.cards.map((c) => (
          <li key={c.id}><Card card={c} /></li>
        ))}
      </ul>
      <button
        type="button"
        aria-label={`Add another task to ${col.title}`}
        className="mt-[var(--spacing-1)] inline-flex h-9 w-full items-center justify-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-dashed border-[var(--color-border-subtle)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        Add task
      </button>
    </section>
  );
}

export default Column;
