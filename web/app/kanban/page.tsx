"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AppShell } from "@/components/demo/AppShell";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { Column, type ColumnData } from "@/components/demo/kanban/Column";
import { useFadeUp, useStagger } from "@/components/animations/Motion";

const COLS: ColumnData[] = [
  {
    id: "todo",
    title: "To do",
    cards: [
      { id: "t1", title: "Audit /pricing route", desc: "CTA copy reads as a feature, not a price. Tighten hierarchy and re-balance the table.", tags: ["Bug", "Design"], priority: "P1", due: "Mon", assignees: ["RR", "PN"], comments: 3, cover: "accent" },
      { id: "t2", title: "Add OG-image regeneration to publish flow", desc: "Cron-bake card images on publish so first visit doesn’t hit the slow path.", tags: ["Feature"], priority: "P2", due: "Wed", assignees: ["MD"], comments: 1, cover: "brand" },
      { id: "t3", title: "Replace screenshot stubs with real captures", desc: "Use Playwright to render light + dark variants of the marketing modules.", tags: ["Design"], priority: "P3", due: "Fri", assignees: ["AT", "SK"], comments: 0, cover: "neutral" },
      { id: "t4", title: "Migrate auth to short-session JWT", desc: "Reduce blast radius of token leaks. Refresh path lives behind a hardened endpoint.", tags: ["Backend"], priority: "P1", due: "Tue", assignees: ["LW", "DS"], comments: 5, cover: "brand" },
    ],
  },
  {
    id: "wip",
    title: "In progress",
    cards: [
      { id: "p1", title: "Onboarding empty state for new workspaces", desc: "Three calls-to-action above the fold; checklist persists across visits.", tags: ["Feature", "Design"], priority: "P2", due: "Thu", assignees: ["PN", "RR"], comments: 4, cover: "brand" },
      { id: "p2", title: "Indexing pipeline retry budget", desc: "Backoff caps at 4 attempts; surface partial-success in the run timeline.", tags: ["Infra"], priority: "P1", due: "Today", assignees: ["LW"], comments: 2, cover: "accent" },
      { id: "p3", title: "Skeleton loading states for /reports", desc: "Match final layout exactly so values don’t reflow on data arrival.", tags: ["Design"], priority: "P2", due: "Mon", assignees: ["SK"], comments: 0, cover: "brand" },
      { id: "p4", title: "Doc page: command palette walkthrough", desc: "Animated GIF replaced with a tokenized SVG. 60s read.", tags: ["Docs"], priority: "P3", due: "Wed", assignees: ["AT"], comments: 1, cover: "neutral" },
    ],
  },
  {
    id: "review",
    title: "Review",
    cards: [
      { id: "r1", title: "Ship Team plan toggle in /pricing", desc: "Annual / monthly switch with locked currency on first selection.", tags: ["Feature"], priority: "P1", due: "Fri", assignees: ["RR", "MD", "PN"], comments: 6, cover: "brand" },
      { id: "r2", title: "Audit-log export — CSV streaming", desc: "Stream chunks to disk to avoid memory spike on 200k+ rows.", tags: ["Backend", "Infra"], priority: "P2", due: "Mon", assignees: ["LW"], comments: 2, cover: "accent" },
      { id: "r3", title: "Refresh icon set to 1.5px stroke", desc: "Pixel rhythm in the sidebar feels heavy — match the type ramp.", tags: ["Design"], priority: "P3", due: "Wed", assignees: ["SK"], comments: 1, cover: "neutral" },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      { id: "d1", title: "Ship hero mesh-gradient backdrop", desc: "Tokenized to brand-400/accent-400; reduced-motion stops the drift loop.", tags: ["Design"], priority: "P2", due: "Fri", assignees: ["RR"], comments: 0, cover: "brand" },
      { id: "d2", title: "Fix sidebar focus-visible ring on Safari", desc: "Use offset 2px and the --color-ring token so dark-mode reads clean.", tags: ["Bug"], priority: "P3", due: "Tue", assignees: ["MD"], comments: 0, cover: "neutral" },
      { id: "d3", title: "Document the 60-30-10 rule in /audit output", desc: "Show distribution per surface, link the rule, suggest deductions.", tags: ["Docs"], priority: "P3", due: "Mon", assignees: ["AT"], comments: 0, cover: "neutral" },
    ],
  },
];

export default function KanbanPage() {
  const fadeUp = useFadeUp();
  const stagger = useStagger(0.04);

  return (
    <AppShell title="Lume" activeKey="kanban">
      <div className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.6]">
          <Backdrop3D variant="grid-tilt" />
        </div>
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-[var(--spacing-6)]">
          <motion.header variants={fadeUp} className="flex flex-wrap items-end justify-between gap-[var(--spacing-3)]">
            <div>
              <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-700)]">
                Sprint 14
              </p>
              <h1 className="mt-[var(--spacing-1)] text-[length:var(--text-3xl)] font-bold tracking-tight text-[var(--color-fg)]">
                Roadmap board
              </h1>
              <p className="mt-[var(--spacing-2)] max-w-[60ch] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                14 active tasks across 4 stages. Drag cards to move them — keyboard reorder coming next sprint.
              </p>
            </div>
            <div className="flex items-center gap-[var(--spacing-2)]">
              <button type="button" className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] active:scale-[0.98]">
                Filter
              </button>
              <button type="button" className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-3)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color,transform] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New task
              </button>
            </div>
          </motion.header>

          <motion.div
            variants={fadeUp}
            className="grid grid-cols-1 gap-[var(--spacing-4)] md:grid-cols-2 xl:grid-cols-4"
          >
            {COLS.map((c) => (
              <Column key={c.id} col={c} />
            ))}
          </motion.div>

          <p className="text-center text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
            Drag visuals only — interaction wired in a future demo.
          </p>
        </motion.div>
      </div>
    </AppShell>
  );
}
