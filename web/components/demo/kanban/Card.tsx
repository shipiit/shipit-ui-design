"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type Tag = "Bug" | "Feature" | "Design" | "Backend" | "Docs" | "Infra";
export type Priority = "P1" | "P2" | "P3";

export interface CardData {
  id: string;
  title: string;
  desc: string;
  tags: Tag[];
  priority: Priority;
  due: string;
  assignees: string[]; // initials
  comments: number;
  cover: "brand" | "accent" | "neutral";
}

const TAG_TONE: Record<Tag, string> = {
  Bug:     "bg-[var(--color-accent-100)] text-[var(--color-accent-700)]",
  Feature: "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
  Design:  "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]",
  Backend: "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]",
  Docs:    "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]",
  Infra:   "bg-[var(--color-accent-50)] text-[var(--color-accent-700)]",
};

const COVER_TONE: Record<CardData["cover"], string> = {
  brand:   "bg-gradient-to-r from-[var(--color-brand-300)] to-[var(--color-brand-500)]",
  accent:  "bg-gradient-to-r from-[var(--color-accent-300)] to-[var(--color-accent-500)]",
  neutral: "bg-gradient-to-r from-[var(--color-neutral-300)] to-[var(--color-neutral-500)]",
};

const PRIO_TONE: Record<Priority, string> = {
  P1: "bg-[var(--color-accent-500)]",
  P2: "bg-[var(--color-brand-500)]",
  P3: "bg-[var(--color-neutral-400)]",
};

export function Card({ card }: { card: CardData }) {
  return (
    <article
      tabIndex={0}
      aria-label={`${card.priority} task: ${card.title}, due ${card.due}`}
      className={cn(
        "group relative cursor-grab overflow-hidden rounded-[var(--radius-lg)]",
        "border border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
        "transition-[transform,box-shadow,border-color] duration-[var(--dur-fast)]",
        "ease-[var(--ease-out)] motion-reduce:transition-none",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] hover:border-[var(--color-border)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]",
      )}
    >
      <div aria-hidden="true" className={cn("h-[6px] w-full", COVER_TONE[card.cover])} />
      <div className="flex flex-col gap-[var(--spacing-3)] p-[var(--spacing-4)]">
        <div className="flex items-start justify-between gap-[var(--spacing-2)]">
          <ul className="flex flex-wrap gap-[var(--spacing-1)]">
            {card.tags.map((t) => (
              <li key={t}>
                <span className={cn("inline-flex h-5 items-center rounded-full px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold", TAG_TONE[t])}>{t}</span>
              </li>
            ))}
          </ul>
          <button
            type="button"
            aria-label="Drag handle"
            tabIndex={-1}
            className="flex h-6 w-6 flex-none items-center justify-center rounded-[var(--radius-sm)] text-[var(--color-fg-subtle)] opacity-0 transition-opacity duration-[var(--dur-fast)] group-hover:opacity-100 hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg-muted)]"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
              <circle cx="4" cy="3" r="1" /><circle cx="8" cy="3" r="1" />
              <circle cx="4" cy="6" r="1" /><circle cx="8" cy="6" r="1" />
              <circle cx="4" cy="9" r="1" /><circle cx="8" cy="9" r="1" />
            </svg>
          </button>
        </div>

        <div>
          <h4 className="line-clamp-2 text-[length:var(--text-sm)] font-semibold leading-snug text-[var(--color-fg)]">
            {card.title}
          </h4>
          <p className="mt-[var(--spacing-1)] line-clamp-2 text-[length:var(--text-xs)] leading-relaxed text-[var(--color-fg-muted)]">
            {card.desc}
          </p>
        </div>

        <footer className="flex items-center justify-between gap-[var(--spacing-2)] pt-[var(--spacing-1)]">
          <div className="flex items-center gap-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <span aria-label={`Priority ${card.priority}`} className="inline-flex items-center gap-[var(--spacing-1)]">
              <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", PRIO_TONE[card.priority])} />
              {card.priority}
            </span>
            <span aria-hidden="true" className="text-[var(--color-border)]">&middot;</span>
            <span className="inline-flex items-center gap-[var(--spacing-1)]">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18M8 3v4M16 3v4" />
              </svg>
              {card.due}
            </span>
          </div>
          <div className="flex items-center gap-[var(--spacing-3)]">
            {card.comments > 0 && (
              <span className="inline-flex items-center gap-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]" aria-label={`${card.comments} comments`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4V5z" />
                </svg>
                {card.comments}
              </span>
            )}
            <ul aria-label="Assignees" className="flex -space-x-2">
              {card.assignees.slice(0, 3).map((a, i) => (
                <li key={i} className="inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-brand-100)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-brand-700)]">
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </article>
  );
}

export default Card;
