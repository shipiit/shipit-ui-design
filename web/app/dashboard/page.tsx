"use client";

import * as React from "react";
import { motion } from "motion/react";
import { AppShell } from "@/components/demo/AppShell";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { KPIRow } from "@/components/demo/dashboard/KPIRow";
import { RevenueChart } from "@/components/demo/dashboard/RevenueChart";
import { RecentActivity } from "@/components/demo/dashboard/RecentActivity";
import { UsersTable } from "@/components/demo/dashboard/UsersTable";
import { useFadeUp, useStagger } from "@/components/animations/Motion";

export default function DashboardPage() {
  const fadeUp = useFadeUp();
  const stagger = useStagger(0.05);

  return (
    <AppShell title="Lume" activeKey="dashboard">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.5]" aria-hidden="true">
          <Backdrop3D variant="lattice" />
        </div>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="relative flex flex-col gap-[var(--spacing-6)]"
        >
          <motion.header variants={fadeUp} className="flex flex-wrap items-end justify-between gap-[var(--spacing-3)]">
            <div>
              <p className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-700)]">
                Overview
              </p>
              <h1 className="mt-[var(--spacing-1)] text-[length:var(--text-3xl)] font-bold tracking-tight text-[var(--color-fg)]">
                Good morning, Rahul
              </h1>
              <p className="mt-[var(--spacing-2)] max-w-[60ch] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                Here&rsquo;s what changed since yesterday across your workspace.
              </p>
            </div>
            <div className="flex items-center gap-[var(--spacing-2)]">
              <button
                type="button"
                className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] active:scale-[0.98]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add widget
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-3)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color,transform] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 3v12M5 10l7 7 7-7M4 21h16" />
                </svg>
                Export
              </button>
            </div>
          </motion.header>

          <motion.div variants={fadeUp}>
            <KPIRow />
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-[var(--spacing-4)] lg:grid-cols-3">
            <div className="lg:col-span-2"><RevenueChart /></div>
            <div className="lg:col-span-1"><RecentActivity /></div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <UsersTable />
          </motion.div>

          <p className="text-center text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
            Built end-to-end via shipit-ui-design rules &middot; sidebar, KPI tiles, sparklines, line chart, sortable table.
          </p>
        </motion.div>
      </div>
    </AppShell>
  );
}
