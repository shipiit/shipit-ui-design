"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Plan = "Free" | "Pro" | "Team";
type Status = "Active" | "Trial" | "Past due";

interface Row {
  id: string;
  name: string;
  email: string;
  initials: string;
  plan: Plan;
  status: Status;
  mrrCents: number;
  lastSeen: string;
}

const ROWS: Row[] = [
  { id: "u1", name: "Priya Nadella",   email: "priya@acme.co",     initials: "PN", plan: "Team", status: "Active",  mrrCents: 24900, lastSeen: "2m ago" },
  { id: "u2", name: "Marco Diaz",      email: "marco@bytecase.io", initials: "MD", plan: "Pro",  status: "Active",  mrrCents:  4900, lastSeen: "12m ago" },
  { id: "u3", name: "Sarah Kim",       email: "sk@northrun.app",   initials: "SK", plan: "Team", status: "Trial",   mrrCents:     0, lastSeen: "1h ago" },
  { id: "u4", name: "Ari Tanaka",      email: "ari@vellum.studio", initials: "AT", plan: "Pro",  status: "Active",  mrrCents:  4900, lastSeen: "3h ago" },
  { id: "u5", name: "Jane Hollis",     email: "jane@hollis.cc",    initials: "JH", plan: "Free", status: "Active",  mrrCents:     0, lastSeen: "8h ago" },
  { id: "u6", name: "Liu Wei",         email: "liu@flexlinear.com",initials: "LW", plan: "Pro",  status: "Past due",mrrCents:  4900, lastSeen: "1d ago" },
  { id: "u7", name: "Diego Salas",     email: "diego@orbitstudio.com",initials:"DS",plan:"Team", status: "Active",  mrrCents: 24900, lastSeen: "1d ago" },
  { id: "u8", name: "Hana Yamamoto",   email: "hana@nori.studio",  initials: "HY", plan: "Free", status: "Active",  mrrCents:     0, lastSeen: "2d ago" },
  { id: "u9", name: "Owen Brooks",     email: "owen@parsec.dev",   initials: "OB", plan: "Pro",  status: "Trial",   mrrCents:     0, lastSeen: "3d ago" },
  { id: "u10",name: "Mia Sørensen",    email: "mia@cobblerlabs.com",initials:"MS",plan: "Team", status: "Active",  mrrCents: 24900, lastSeen: "4d ago" },
];

type SortKey = "name" | "plan" | "status" | "mrr" | "last";
type SortDir = "asc" | "desc";

const PLAN_TONE: Record<Plan, string> = {
  Free: "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]",
  Pro:  "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
  Team: "bg-[var(--color-accent-50)] text-[var(--color-accent-700)]",
};
const STATUS_TONE: Record<Status, string> = {
  Active:    "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
  Trial:     "bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]",
  "Past due":"bg-[var(--color-accent-100)] text-[var(--color-accent-700)]",
};

function formatMrr(cents: number) {
  if (cents === 0) return "—";
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function UsersTable() {
  const [sort, setSort] = React.useState<{ id: SortKey; dir: SortDir } | null>({ id: "mrr", dir: "desc" });

  const sorted = React.useMemo(() => {
    if (!sort) return ROWS;
    const copy = [...ROWS];
    copy.sort((a, b) => {
      const dir = sort.dir === "asc" ? 1 : -1;
      switch (sort.id) {
        case "mrr":    return (a.mrrCents - b.mrrCents) * dir;
        case "name":   return a.name.localeCompare(b.name) * dir;
        case "plan":   return a.plan.localeCompare(b.plan) * dir;
        case "status": return a.status.localeCompare(b.status) * dir;
        case "last":   return a.lastSeen.localeCompare(b.lastSeen) * dir;
      }
    });
    return copy;
  }, [sort]);

  const onSort = (id: SortKey) =>
    setSort((s) =>
      s?.id !== id ? { id, dir: "asc" } : s.dir === "asc" ? { id, dir: "desc" } : null,
    );

  return (
    <section
      aria-labelledby="users-title"
      className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
    >
      <header className="flex items-center justify-between gap-[var(--spacing-3)] border-b border-[var(--color-border-subtle)] px-[var(--spacing-5)] py-[var(--spacing-4)]">
        <h3 id="users-title" className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
          Customers
        </h3>
        <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{ROWS.length} accounts</span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse">
          <caption className="sr-only">Customers, sortable by name, plan, status, MRR, and last seen</caption>
          <thead>
            <tr className="bg-[var(--color-surface-elevated)] text-left">
              <Th id="name" sort={sort} onSort={onSort} sticky>Customer</Th>
              <Th id="plan" sort={sort} onSort={onSort}>Plan</Th>
              <Th id="status" sort={sort} onSort={onSort}>Status</Th>
              <Th id="mrr" sort={sort} onSort={onSort} align="right">MRR</Th>
              <Th id="last" sort={sort} onSort={onSort}>Last seen</Th>
              <th scope="col" className="sticky top-0 px-[var(--spacing-4)] py-[var(--spacing-3)]"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="group border-t border-[var(--color-border-subtle)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)]">
                <td className="sticky left-0 bg-[var(--color-surface)] px-[var(--spacing-4)] py-[var(--spacing-3)] group-hover:bg-[var(--color-surface-elevated)]">
                  <div className="flex items-center gap-[var(--spacing-3)]">
                    <span aria-hidden="true" className="inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-[var(--color-brand-100)] text-[length:var(--text-xs)] font-semibold text-[var(--color-brand-700)]">
                      {r.initials}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">{r.name}</div>
                      <div className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">{r.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-[var(--spacing-4)] py-[var(--spacing-3)]">
                  <span className={cn("inline-flex h-6 items-center rounded-full px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold", PLAN_TONE[r.plan])}>{r.plan}</span>
                </td>
                <td className="px-[var(--spacing-4)] py-[var(--spacing-3)]">
                  <span className={cn("inline-flex h-6 items-center gap-[var(--spacing-1)] rounded-full px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold", STATUS_TONE[r.status])}>
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                    {r.status}
                  </span>
                </td>
                <td className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-right tabular-nums text-[length:var(--text-sm)] text-[var(--color-fg)]">
                  {formatMrr(r.mrrCents)}
                </td>
                <td className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                  {r.lastSeen}
                </td>
                <td className="px-[var(--spacing-4)] py-[var(--spacing-3)] text-right">
                  <button
                    type="button"
                    aria-label={`Open menu for ${r.name}`}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface)] hover:text-[var(--color-fg)]"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Th({
  id, sort, onSort, children, align, sticky,
}: {
  id: SortKey;
  sort: { id: SortKey; dir: SortDir } | null;
  onSort: (id: SortKey) => void;
  children: React.ReactNode;
  align?: "right";
  sticky?: boolean;
}) {
  const ariaSort = sort?.id === id ? (sort.dir === "asc" ? "ascending" : "descending") : "none";
  return (
    <th
      scope="col"
      aria-sort={ariaSort}
      className={cn(
        "px-[var(--spacing-4)] py-[var(--spacing-3)] text-[length:var(--text-2xs)] font-semibold uppercase tracking-wider text-[var(--color-fg-muted)]",
        sticky && "sticky left-0 bg-[var(--color-surface-elevated)]",
        align === "right" && "text-right",
      )}
    >
      <button
        type="button"
        onClick={() => onSort(id)}
        className={cn(
          "inline-flex items-center gap-[var(--spacing-1)] transition-colors duration-[var(--dur-fast)] hover:text-[var(--color-fg)]",
          align === "right" && "ml-auto",
        )}
      >
        {children}
        <SortGlyph dir={sort?.id === id ? sort.dir : null} />
      </button>
    </th>
  );
}

function SortGlyph({ dir }: { dir: SortDir | null }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M3 4l2-2 2 2" opacity={dir === "asc" ? 1 : 0.35} />
      <path d="M3 6l2 2 2-2" opacity={dir === "desc" ? 1 : 0.35} />
    </svg>
  );
}

export default UsersTable;
