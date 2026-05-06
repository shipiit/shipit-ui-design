"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type SectionKey =
  | "profile"
  | "security"
  | "notifications"
  | "billing"
  | "team"
  | "api-keys"
  | "danger";

export interface SectionMeta {
  key: SectionKey;
  label: string;
  description: string;
  badge?: { tone: "warn" | "neutral"; text: string };
}

interface SettingsSideNavProps {
  active: SectionKey;
  onChange: (key: SectionKey) => void;
  sections: SectionMeta[];
}

const stroke =
  "fill-none stroke-current [stroke-width:1.6] [stroke-linecap:round] [stroke-linejoin:round]";

function Icon({ k }: { k: SectionKey }) {
  switch (k) {
    case "profile":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <circle cx="12" cy="9" r="3.4" />
          <path d="M5 20c1.2-3.2 4-4.6 7-4.6s5.8 1.4 7 4.6" />
        </svg>
      );
    case "security":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z" />
          <path d="M9.4 12.2l1.9 1.9 3.4-3.6" />
        </svg>
      );
    case "notifications":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <path d="M6 9a6 6 0 0 1 12 0c0 6 2.5 6 2.5 8H3.5C3.5 15 6 15 6 9z" />
          <path d="M10 20a2 2 0 0 0 4 0" />
        </svg>
      );
    case "billing":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <rect x="2.6" y="5.4" width="18.8" height="13.2" rx="2" />
          <path d="M2.6 10h18.8M6 15h3M12 15h2" />
        </svg>
      );
    case "team":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <circle cx="9" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.2" />
          <path d="M3 19c.8-3 3.2-4.4 6-4.4s5.2 1.4 6 4.4" />
          <path d="M15 18.4c.5-2 1.8-2.8 3-2.8s2.2.8 3 2.8" />
        </svg>
      );
    case "api-keys":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <circle cx="8" cy="14" r="3.4" />
          <path d="M11 12l8-8M16 7l3 3M14 9l3 3" />
        </svg>
      );
    case "danger":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" className={stroke} aria-hidden="true">
          <path d="M12 3l10 18H2z" />
          <path d="M12 10v5M12 18v.4" />
        </svg>
      );
  }
}

/**
 * SettingsSideNav — vertical rail on lg+, horizontal scroll-strip below.
 * Arrow keys cycle items. Active item gets brand-tinted pill + leading rail.
 */
export function SettingsSideNav({ active, onChange, sections }: SettingsSideNavProps) {
  const listRef = React.useRef<HTMLUListElement | null>(null);

  const onKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, idx: number) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = (idx + dir + sections.length) % sections.length;
    onChange(sections[next].key);
    const el = listRef.current?.querySelectorAll<HTMLAnchorElement>("[data-side-item]")[next];
    el?.focus();
  };

  return (
    <nav
      aria-label="Settings sections"
      className="lg:sticky lg:top-[calc(56px+var(--spacing-4))]"
    >
      <ul
        ref={listRef}
        className="flex gap-[var(--spacing-1)] overflow-x-auto pb-[var(--spacing-2)] lg:flex-col lg:overflow-visible lg:pb-0"
      >
        {sections.map((s, i) => {
          const isActive = s.key === active;
          const isDanger = s.key === "danger";
          return (
            <li key={s.key} className="shrink-0 lg:shrink">
              <a
                data-side-item
                role="button"
                href={`#${s.key}`}
                tabIndex={0}
                aria-current={isActive ? "true" : undefined}
                onKeyDown={(e) => onKeyDown(e, i)}
                onClick={(e) => {
                  e.preventDefault();
                  onChange(s.key);
                }}
                className={cn(
                  "relative flex h-10 items-center gap-[var(--spacing-3)] rounded-[var(--radius-md)] px-[var(--spacing-3)] text-[length:var(--text-sm)] transition-colors duration-[var(--dur-fast)]",
                  isActive
                    ? isDanger
                      ? "bg-[color-mix(in_oklch,var(--color-accent-500)_12%,transparent)] text-[var(--color-accent-700)] before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-[2px] before:rounded-full before:bg-[var(--color-accent-500)] dark:text-[var(--color-accent-300)]"
                      : "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] before:absolute before:left-0 before:top-2 before:h-[calc(100%-1rem)] before:w-[2px] before:rounded-full before:bg-[var(--color-brand-600)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]"
                    : isDanger
                      ? "text-[var(--color-fg-muted)] hover:bg-[color-mix(in_oklch,var(--color-accent-500)_8%,transparent)] hover:text-[var(--color-accent-700)] dark:hover:text-[var(--color-accent-300)]"
                      : "text-[var(--color-fg-muted)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]",
                )}
              >
                <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center">
                  <Icon k={s.key} />
                </span>
                <span className="flex-1 truncate">{s.label}</span>
                {s.badge && (
                  <span
                    aria-label={s.badge.text}
                    className={cn(
                      "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold",
                      s.badge.tone === "warn"
                        ? "bg-[color-mix(in_oklch,var(--color-accent-500)_18%,transparent)] text-[var(--color-accent-700)] dark:text-[var(--color-accent-300)]"
                        : "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]",
                    )}
                  >
                    {s.badge.text}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="mt-[var(--spacing-6)] hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[var(--spacing-4)] lg:block">
        <div className="flex items-center justify-between text-[length:var(--text-xs)] font-medium text-[var(--color-fg)]">
          <span>Setup progress</span>
          <span className="tabular-nums text-[var(--color-fg-muted)]">5 / 7</span>
        </div>
        <div
          className="mt-[var(--spacing-2)] h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
          role="progressbar"
          aria-valuenow={71}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Setup progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-400)] to-[var(--color-accent-400)]"
            style={{ width: "71%" }}
          />
        </div>
        <p className="mt-[var(--spacing-2)] text-[length:var(--text-2xs)] leading-snug text-[var(--color-fg-muted)]">
          Finish 2FA and add a payment method to fully secure your workspace.
        </p>
      </div>
    </nav>
  );
}

export default SettingsSideNav;
