"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Message {
  id: string;
  initials: string;
  sender: string;
  preview: string;
  date: string;
  unread: boolean;
  starred?: boolean;
}

interface Props {
  messages: Message[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function MessageList({ messages, selectedId, onSelect }: Props) {
  return (
    <aside
      aria-label="Messages"
      className="flex w-full flex-none flex-col border-r border-[var(--color-border-subtle)] bg-[var(--color-surface)] md:w-[320px] lg:w-[400px] xl:w-[480px]"
    >
      <header className="flex items-center justify-between gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] px-[var(--spacing-4)] py-[var(--spacing-4)]">
        <div>
          <h2 className="text-[length:var(--text-lg)] font-semibold text-[var(--color-fg)]">
            Inbox
          </h2>
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            {messages.filter((m) => m.unread).length} unread &middot; {messages.length} total
          </p>
        </div>
        <button
          type="button"
          aria-label="Compose new message"
          className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-3)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color,transform] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 17l4-1 12-12 1 1-12 12-1 4z" />
          </svg>
          Compose
        </button>
      </header>

      <ul role="listbox" aria-label="Messages" aria-activedescendant={`msg-${selectedId}`} className="min-h-0 flex-1 overflow-y-auto">
        {messages.map((m) => {
          const selected = m.id === selectedId;
          return (
            <li key={m.id}>
              <button
                id={`msg-${m.id}`}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => onSelect(m.id)}
                className={cn(
                  "relative flex w-full items-start gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] px-[var(--spacing-4)] py-[var(--spacing-4)] text-left transition-colors duration-[var(--dur-fast)]",
                  "hover:bg-[var(--color-surface-elevated)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[var(--color-ring)]",
                  selected && "bg-[var(--color-brand-50)] before:absolute before:left-0 before:top-0 before:h-full before:w-[3px] before:bg-[var(--color-brand-600)]",
                  !m.unread && !selected && "text-[var(--color-fg-muted)]",
                )}
              >
                <span aria-hidden="true" className={cn("mt-[2px] inline-flex h-9 w-9 flex-none items-center justify-center rounded-full text-[length:var(--text-xs)] font-semibold", selected ? "bg-[var(--color-brand-200)] text-[var(--color-brand-800)]" : "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]")}>
                  {m.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-[var(--spacing-2)]">
                    <span className={cn("truncate text-[length:var(--text-sm)]", m.unread ? "font-semibold text-[var(--color-fg)]" : "font-medium")}>
                      {m.sender}
                    </span>
                    <span className="flex flex-none items-center gap-[var(--spacing-2)]">
                      {m.unread && <span aria-label="Unread" className="h-2 w-2 rounded-full bg-[var(--color-brand-500)]" />}
                      <span className="text-[length:var(--text-2xs)] text-[var(--color-fg-subtle)]">{m.date}</span>
                    </span>
                  </span>
                  <span className={cn("mt-[var(--spacing-1)] block truncate text-[length:var(--text-xs)] leading-snug", m.unread ? "text-[var(--color-fg-muted)]" : "text-[var(--color-fg-subtle)]")}>
                    {m.preview}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default MessageList;
