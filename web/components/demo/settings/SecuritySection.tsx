"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";

interface SecuritySectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  lastActive: string;
  current?: boolean;
}

const INITIAL_SESSIONS: Session[] = [
  { id: "s1", device: "MacBook Pro", browser: "Chrome 138 · macOS", location: "Bengaluru, IN", lastActive: "Active now", current: true },
  { id: "s2", device: "iPhone 15", browser: "Safari · iOS 18", location: "Bengaluru, IN", lastActive: "2 hours ago" },
  { id: "s3", device: "Linux desktop", browser: "Firefox 129 · Ubuntu", location: "Pune, IN", lastActive: "Yesterday" },
];

export function SecuritySection({ onDirtyChange, resetKey }: SecuritySectionProps) {
  const [twoFA, setTwoFA] = React.useState(false);
  const [sessions, setSessions] = React.useState(INITIAL_SESSIONS);

  React.useEffect(() => {
    setTwoFA(false);
    setSessions(INITIAL_SESSIONS);
  }, [resetKey]);

  React.useEffect(() => {
    const dirty =
      twoFA !== false ||
      sessions.length !== INITIAL_SESSIONS.length;
    onDirtyChange(dirty);
  }, [twoFA, sessions, onDirtyChange]);

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <SectionHeader
        title="Security"
        description="Keep your account locked down with strong auth and active session control."
        action={
          <Button variant="ghost" size="sm" type="button">
            Sign out everywhere
          </Button>
        }
      />

      <Card title="Password" description="Last changed 4 months ago.">
        <div className="flex flex-wrap items-center justify-between gap-[var(--spacing-3)]">
          <div className="flex items-center gap-[var(--spacing-3)]">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="10" width="16" height="10" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            </span>
            <div>
              <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">Strong password set</p>
              <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">Last changed Jan 14, 2026.</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" type="button">Change password</Button>
        </div>
      </Card>

      <Card title="Two-factor authentication" description="An extra step at sign-in, even if your password leaks.">
        <div className="flex flex-wrap items-center justify-between gap-[var(--spacing-3)]">
          <div className="flex items-center gap-[var(--spacing-3)]">
            <span
              aria-hidden="true"
              className={`relative inline-flex h-2.5 w-2.5 rounded-full ${twoFA ? "bg-[oklch(70%_0.16_150)]" : "bg-[var(--color-accent-500)]"}`}
            >
              {!twoFA && (
                <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent-400)] opacity-60 motion-reduce:hidden" />
              )}
            </span>
            <div>
              <p className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
                {twoFA ? "Authenticator app enrolled" : "Two-factor is off"}
              </p>
              <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                {twoFA
                  ? "Codes from your TOTP app are required at sign-in."
                  : "We strongly recommend an authenticator app like 1Password or Authy."}
              </p>
            </div>
          </div>
          <Button
            variant={twoFA ? "secondary" : "primary"}
            size="sm"
            type="button"
            onClick={() => setTwoFA((v) => !v)}
          >
            {twoFA ? "Manage 2FA" : "Set up 2FA"}
          </Button>
        </div>
      </Card>

      <Card title="Active sessions" description="Devices currently signed in to this account.">
        <div className="-mx-[var(--spacing-2)] overflow-x-auto">
          <table className="w-full min-w-[36rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[length:var(--text-2xs)] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Device</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Location</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Last active</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr
                  key={s.id}
                  className="border-t border-[var(--color-border-subtle)] text-[length:var(--text-sm)] hover:bg-[var(--color-surface-elevated)]"
                >
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                    <div className="flex items-center gap-[var(--spacing-2)]">
                      <span className="font-medium text-[var(--color-fg)]">{s.device}</span>
                      {s.current && (
                        <span className="inline-flex h-5 items-center rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-brand-700)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]">
                          This device
                        </span>
                      )}
                    </div>
                    <div className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{s.browser}</div>
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-[var(--color-fg-muted)]">
                    {s.location}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-[var(--color-fg-muted)] tabular-nums">
                    {s.lastActive}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-right">
                    {!s.current && (
                      <button
                        type="button"
                        onClick={() => setSessions((arr) => arr.filter((x) => x.id !== s.id))}
                        className="text-[length:var(--text-xs)] font-medium text-[var(--color-accent-700)] underline-offset-2 hover:underline disabled:opacity-50 dark:text-[var(--color-accent-300)]"
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-[var(--spacing-5)] flex justify-end border-t border-[var(--color-border-subtle)] pt-[var(--spacing-4)]">
          <Button
            variant="secondary"
            size="sm"
            type="button"
            onClick={() => setSessions((arr) => arr.filter((s) => s.current))}
          >
            Sign out everywhere else
          </Button>
        </div>
      </Card>
    </div>
  );
}

function SectionHeader({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
      <div className="min-w-0">
        <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">{title}</h2>
        <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">{description}</p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-6)]">
      <header className="mb-[var(--spacing-5)] border-b border-[var(--color-border-subtle)] pb-[var(--spacing-4)]">
        <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">{title}</h3>
        {description && <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{description}</p>}
      </header>
      {children}
    </section>
  );
}

export default SecuritySection;
