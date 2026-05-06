"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";

interface ApiKeysSectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

interface ApiKey {
  id: string;
  name: string;
  created: string;
  lastUsed: string;
  scopes: string[];
  suffix: string;
}

const KEYS: ApiKey[] = [
  {
    id: "k_prod",
    name: "production",
    created: "Mar 12, 2026",
    lastUsed: "2 minutes ago",
    scopes: ["read:events", "write:events", "admin:webhooks"],
    suffix: "g7Tq",
  },
  {
    id: "k_stage",
    name: "staging",
    created: "Mar 12, 2026",
    lastUsed: "1 hour ago",
    scopes: ["read:events", "write:events"],
    suffix: "Pm3s",
  },
  {
    id: "k_local",
    name: "local-dev",
    created: "Apr 30, 2026",
    lastUsed: "Never used",
    scopes: ["read:events"],
    suffix: "X9aB",
  },
];

export function ApiKeysSection({ onDirtyChange, resetKey }: ApiKeysSectionProps) {
  const [revealed, setRevealed] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setRevealed({});
    onDirtyChange(false);
  }, [resetKey, onDirtyChange]);

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
        <div className="min-w-0">
          <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">
            API keys <span className="text-[length:var(--text-base)] font-normal text-[var(--color-fg-muted)]">· {KEYS.length} active</span>
          </h2>
          <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            Use these to authenticate against the Lume API. Treat them like passwords — don't commit to git.
          </p>
        </div>
        <Button variant="primary" size="sm" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Generate new key
        </Button>
      </header>

      <section className="rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-6)]">
        <header className="mb-[var(--spacing-5)] flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-[var(--spacing-4)]">
          <div>
            <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">Keys</h3>
            <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
              Secrets are shown once at creation. Rotate any key you suspect is leaked.
            </p>
          </div>
          <div className="hidden items-center gap-[var(--spacing-2)] text-[length:var(--text-2xs)] text-[var(--color-fg-muted)] sm:flex">
            <span aria-hidden="true" className="inline-flex h-2 w-2 rounded-full bg-[oklch(70%_0.16_150)]" />
            All keys verified
          </div>
        </header>

        <div className="-mx-[var(--spacing-2)] overflow-x-auto">
          <table className="w-full min-w-[48rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[length:var(--text-2xs)] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Name</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Token</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Scopes</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Last used</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {KEYS.map((k) => {
                const isRevealed = !!revealed[k.id];
                return (
                  <tr key={k.id} className="text-[length:var(--text-sm)] hover:bg-[var(--color-surface-elevated)]">
                    <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                      <div className="flex items-center gap-[var(--spacing-2)]">
                        <span aria-hidden="true" className="inline-flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <circle cx="9" cy="14" r="3.4" />
                            <path d="M11.4 12l8-8M16 7l3 3" />
                          </svg>
                        </span>
                        <span className="font-medium text-[var(--color-fg)]">{k.name}</span>
                      </div>
                      <div className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                        Created {k.created}
                      </div>
                    </td>
                    <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                      <code className="inline-flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] px-[var(--spacing-2)] py-[var(--spacing-1)] font-mono text-[length:var(--text-xs)] tabular-nums text-[var(--color-fg)]">
                        {isRevealed ? `lume_sk_8h2Fk9Lq3p7Wm${k.suffix}` : `lume_sk_••••••••${k.suffix}`}
                      </code>
                    </td>
                    <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                      <div className="flex flex-wrap gap-[var(--spacing-1)]">
                        {k.scopes.map((s) => (
                          <span
                            key={s}
                            className="inline-flex h-5 items-center rounded-full bg-[var(--color-surface-elevated)] px-[var(--spacing-2)] font-mono text-[length:var(--text-2xs)] text-[var(--color-fg-muted)] ring-1 ring-[var(--color-border-subtle)]"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-[var(--color-fg-muted)] tabular-nums">
                      {k.lastUsed}
                    </td>
                    <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-right">
                      <div className="inline-flex items-center gap-[var(--spacing-1)]">
                        <button
                          type="button"
                          aria-label={isRevealed ? `Hide ${k.name} key` : `Reveal ${k.name} key`}
                          aria-pressed={isRevealed}
                          onClick={() => setRevealed((r) => ({ ...r, [k.id]: !r[k.id] }))}
                          className="inline-flex h-7 items-center rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
                        >
                          {isRevealed ? "Hide" : "Reveal"}
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-7 items-center rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
                        >
                          Rotate
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-7 items-center rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] font-medium text-[var(--color-accent-700)] transition-colors duration-[var(--dur-fast)] hover:bg-[color-mix(in_oklch,var(--color-accent-500)_10%,transparent)] dark:text-[var(--color-accent-300)]"
                        >
                          Revoke
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-[var(--spacing-5)] flex items-start gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[var(--spacing-4)]">
          <span aria-hidden="true" className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[color-mix(in_oklch,var(--color-accent-500)_18%,transparent)] text-[var(--color-accent-700)] dark:text-[var(--color-accent-300)]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </span>
          <div className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            <p className="font-medium text-[var(--color-fg)]">Treat keys like passwords.</p>
            <p className="mt-[var(--spacing-1)]">
              We can't recover a key after you generate it. Store it in your secret manager and rotate quarterly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ApiKeysSection;
