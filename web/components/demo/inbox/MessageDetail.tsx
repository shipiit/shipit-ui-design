"use client";

import * as React from "react";

export interface Reply {
  who: string;
  initials: string;
  ago: string;
  body: string;
}

export interface MessageBody {
  id: string;
  subject: string;
  sender: string;
  email: string;
  initials: string;
  ago: string;
  paragraphs: string[];
  replies: Reply[];
}

const stroke =
  "fill-none stroke-current [stroke-width:2] [stroke-linecap:round] [stroke-linejoin:round]";

export function MessageDetail({ msg }: { msg: MessageBody }) {
  return (
    <article
      aria-labelledby={`subj-${msg.id}`}
      className="flex min-w-0 flex-1 flex-col"
    >
      <header className="flex items-start justify-between gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] px-[var(--spacing-5)] py-[var(--spacing-4)] sm:px-[var(--spacing-6)]">
        <div className="min-w-0 flex-1">
          <h2 id={`subj-${msg.id}`} className="truncate text-[length:var(--text-xl)] font-semibold tracking-tight text-[var(--color-fg)]">
            {msg.subject}
          </h2>
          <div className="mt-[var(--spacing-2)] flex items-center gap-[var(--spacing-3)]">
            <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-brand-100)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)]">
              {msg.initials}
            </span>
            <div className="min-w-0">
              <div className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
                {msg.sender}{" "}
                <span className="font-normal text-[var(--color-fg-subtle)]">&lt;{msg.email}&gt;</span>
              </div>
              <div className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">to me &middot; {msg.ago}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[var(--spacing-1)]">
          <IconButton label="Reply">
            <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M9 17l-5-5 5-5" /><path d="M4 12h11a5 5 0 0 1 5 5v3" /></svg>
          </IconButton>
          <IconButton label="Forward">
            <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M15 17l5-5-5-5" /><path d="M20 12H9a5 5 0 0 0-5 5v3" /></svg>
          </IconButton>
          <IconButton label="Archive">
            <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><rect x="3" y="4" width="18" height="4" rx="1" /><path d="M5 8v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8" /><path d="M10 12h4" /></svg>
          </IconButton>
          <IconButton label="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M3 6h18" /><path d="M8 6V4h8v2" /><path d="M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14" /></svg>
          </IconButton>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-[var(--spacing-5)] overflow-y-auto px-[var(--spacing-5)] py-[var(--spacing-5)] sm:px-[var(--spacing-6)] sm:py-[var(--spacing-6)]">
        <div className="flex max-w-[68ch] flex-col gap-[var(--spacing-4)] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-fg)]">
          {msg.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <p className="text-[var(--color-fg-muted)]">
            — {msg.sender}
          </p>
        </div>

        {msg.replies.length > 0 && (
          <section aria-label="Reply thread" className="ml-[var(--spacing-8)] flex flex-col gap-[var(--spacing-4)] border-l-2 border-[var(--color-border-subtle)] pl-[var(--spacing-5)]">
            {msg.replies.map((r, i) => (
              <div key={i} className="flex items-start gap-[var(--spacing-3)]">
                <span aria-hidden="true" className="inline-flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--color-accent-100)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-accent-700)]">{r.initials}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-[var(--spacing-2)]">
                    <span className="text-[length:var(--text-xs)] font-semibold text-[var(--color-fg)]">{r.who}</span>
                    <span className="text-[length:var(--text-2xs)] text-[var(--color-fg-subtle)]">{r.ago}</span>
                  </div>
                  <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] leading-relaxed text-[var(--color-fg-muted)]">{r.body}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[var(--spacing-4)]">
          <label htmlFor={`composer-${msg.id}`} className="block text-[length:var(--text-xs)] font-semibold text-[var(--color-fg-muted)]">
            Reply
          </label>
          <div
            id={`composer-${msg.id}`}
            role="textbox"
            aria-readonly="true"
            className="mt-[var(--spacing-2)] min-h-[88px] rounded-[var(--radius-md)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-3)] py-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg-subtle)]"
          >
            Reply to this thread&hellip;
          </div>
          <div className="mt-[var(--spacing-3)] flex items-center justify-between gap-[var(--spacing-2)]">
            <div className="flex items-center gap-[var(--spacing-1)] text-[var(--color-fg-muted)]">
              <IconButton label="Attach"><svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M21 12l-9 9a5 5 0 0 1-7-7l9-9a3.5 3.5 0 0 1 5 5l-9 9a2 2 0 0 1-3-3l8-8" /></svg></IconButton>
              <IconButton label="Insert image"><svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="11" r="1.5" /><path d="M3 17l6-5 5 4 3-2 4 3" /></svg></IconButton>
              <IconButton label="Insert link"><svg width="14" height="14" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M9 13a4 4 0 0 1 0-6l2-2a4 4 0 1 1 6 6l-1 1" /><path d="M15 11a4 4 0 0 1 0 6l-2 2a4 4 0 1 1-6-6l1-1" /></svg></IconButton>
            </div>
            <button
              type="button"
              className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-4)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color,transform] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
            >
              Send
              <svg width="12" height="12" viewBox="0 0 24 24" className={stroke} aria-hidden="true"><path d="M3 12l18-9-7 18-3-7-8-2z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function IconButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)] active:scale-[0.95]"
    >
      {children}
    </button>
  );
}

export default MessageDetail;
