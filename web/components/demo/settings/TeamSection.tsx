"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";

interface TeamSectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

type Role = "Admin" | "Editor" | "Viewer";

interface Member {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: Role;
  lastActive: string;
}

interface Invite {
  id: string;
  email: string;
  sent: string;
  role: Role;
}

const MEMBERS: Member[] = [
  { id: "u1", name: "Rahul Raj", email: "rahul@iamrraj.com", initials: "RR", role: "Admin", lastActive: "Active now" },
  { id: "u2", name: "Marco Diaz", email: "marco@bytecase.io", initials: "MD", role: "Editor", lastActive: "8 min ago" },
  { id: "u3", name: "Priya Nadella", email: "priya@acme.co", initials: "PN", role: "Editor", lastActive: "2 hours ago" },
  { id: "u4", name: "Ari Tanaka", email: "ari@flexlinear.com", initials: "AT", role: "Viewer", lastActive: "Yesterday" },
  { id: "u5", name: "Sarah Kim", email: "sarah.kim@northbay.io", initials: "SK", role: "Viewer", lastActive: "3 days ago" },
];

const INVITES: Invite[] = [
  { id: "i1", email: "owen@brooks.dev", sent: "Sent 2 days ago", role: "Editor" },
  { id: "i2", email: "liu.wei@flexlinear.com", sent: "Sent 5 days ago", role: "Viewer" },
];

export function TeamSection({ onDirtyChange, resetKey }: TeamSectionProps) {
  React.useEffect(() => {
    onDirtyChange(false);
  }, [resetKey, onDirtyChange]);

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
        <div className="min-w-0">
          <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">Team</h2>
          <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            Members of your workspace and people you have invited.
          </p>
        </div>
        <Button variant="primary" size="sm" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Invite teammates
        </Button>
      </header>

      <Card title={`Members · ${MEMBERS.length}`} description="People with access to this workspace.">
        <div className="-mx-[var(--spacing-2)] overflow-x-auto">
          <table className="w-full min-w-[44rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[length:var(--text-2xs)] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Member</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Role</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Last active</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] sr-only">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => (
                <tr key={m.id} className="text-[length:var(--text-sm)] hover:bg-[var(--color-surface-elevated)]">
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                    <div className="flex items-center gap-[var(--spacing-3)]">
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-brand-50)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]"
                      >
                        {m.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-[var(--color-fg)]">{m.name}</div>
                        <div className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                    <RolePill role={m.role} />
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-[var(--color-fg-muted)] tabular-nums">
                    {m.lastActive}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-right">
                    <button
                      type="button"
                      aria-label={`Open actions for ${m.name}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <circle cx="5" cy="12" r="1.6" />
                        <circle cx="12" cy="12" r="1.6" />
                        <circle cx="19" cy="12" r="1.6" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Pending invites" description="People invited but not yet signed up.">
        {INVITES.length === 0 ? (
          <div className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-[var(--spacing-6)] text-center text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            No pending invites.
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border-subtle)]">
            {INVITES.map((inv) => (
              <li key={inv.id} className="flex flex-wrap items-center justify-between gap-[var(--spacing-3)] py-[var(--spacing-3)]">
                <div className="flex items-center gap-[var(--spacing-3)]">
                  <span aria-hidden="true" className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)] ring-1 ring-[var(--color-border-subtle)]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">{inv.email}</div>
                    <div className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                      {inv.sent} · invited as {inv.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[var(--spacing-2)]">
                  <button
                    type="button"
                    className="text-[length:var(--text-xs)] font-medium text-[var(--color-brand-700)] underline-offset-2 hover:underline dark:text-[var(--color-brand-200)]"
                  >
                    Resend
                  </button>
                  <span aria-hidden="true" className="text-[var(--color-fg-subtle)]">·</span>
                  <button
                    type="button"
                    className="text-[length:var(--text-xs)] font-medium text-[var(--color-accent-700)] underline-offset-2 hover:underline dark:text-[var(--color-accent-300)]"
                  >
                    Revoke
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}

function RolePill({ role }: { role: Role }) {
  const styles: Record<Role, string> = {
    Admin:
      "bg-[var(--color-brand-50)] text-[var(--color-brand-700)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]",
    Editor:
      "bg-[color-mix(in_oklch,var(--color-accent-500)_14%,transparent)] text-[var(--color-accent-700)] dark:text-[var(--color-accent-300)]",
    Viewer:
      "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)] ring-1 ring-[var(--color-border-subtle)]",
  };
  return (
    <span className={`inline-flex h-6 items-center rounded-full px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold ${styles[role]}`}>
      {role}
    </span>
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

export default TeamSection;
