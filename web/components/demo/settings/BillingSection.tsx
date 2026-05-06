"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/primitives/Button";

interface BillingSectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "paid" | "open" | "void";
}

const INVOICES: Invoice[] = [
  { id: "INV-1042", date: "May 1, 2026", amount: "$48.00", status: "paid" },
  { id: "INV-1029", date: "Apr 1, 2026", amount: "$48.00", status: "paid" },
  { id: "INV-1014", date: "Mar 1, 2026", amount: "$48.00", status: "paid" },
  { id: "INV-1001", date: "Feb 1, 2026", amount: "$48.00", status: "paid" },
  { id: "INV-0987", date: "Jan 1, 2026", amount: "$0.00", status: "void" },
];

export function BillingSection({ onDirtyChange, resetKey }: BillingSectionProps) {
  const reduced = useReducedMotion();

  React.useEffect(() => {
    onDirtyChange(false);
  }, [resetKey, onDirtyChange]);

  const usedPct = 10;

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
        <div className="min-w-0">
          <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">Billing</h2>
          <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
            Plan, payment method, and historical invoices.
          </p>
        </div>
      </header>

      <section className="relative overflow-hidden rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-6)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-0 opacity-50"
          style={{
            background:
              "radial-gradient(60rem 18rem at 90% -20%, color-mix(in oklch, var(--color-brand-400) 22%, transparent), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-[var(--spacing-4)]">
            <div>
              <div className="flex items-center gap-[var(--spacing-2)]">
                <span className="inline-flex h-6 items-center rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold uppercase tracking-wide text-[var(--color-brand-700)] dark:bg-[color-mix(in_oklch,var(--color-brand-500)_18%,transparent)] dark:text-[var(--color-brand-200)]">Pro</span>
                <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">Renews May 28, 2026</span>
              </div>
              <h3 className="mt-[var(--spacing-2)] text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">
                $48 <span className="text-[length:var(--text-sm)] font-normal text-[var(--color-fg-muted)]">/ month</span>
              </h3>
              <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
                100K events · 25 seats · priority support.
              </p>
            </div>
            <div className="flex flex-wrap gap-[var(--spacing-2)]">
              <Button variant="ghost" size="sm" type="button">Cancel plan</Button>
              <Button variant="secondary" size="sm" type="button">Change plan</Button>
            </div>
          </div>

          <div className="mt-[var(--spacing-6)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[var(--spacing-4)]">
            <div className="flex items-center justify-between text-[length:var(--text-xs)]">
              <span className="font-medium text-[var(--color-fg)]">Events used this period</span>
              <span className="tabular-nums text-[var(--color-fg-muted)]">
                10,247 / 100,000
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={usedPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Events usage"
              className="mt-[var(--spacing-2)] h-2 w-full overflow-hidden rounded-full bg-[var(--color-border-subtle)]"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${usedPct}%` }}
                transition={{ duration: reduced ? 0.01 : 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full bg-gradient-to-r from-[var(--color-brand-400)] to-[var(--color-accent-400)]"
              />
            </div>
            <p className="mt-[var(--spacing-2)] text-[length:var(--text-2xs)] text-[var(--color-fg-muted)]">
              Resets on May 28. Upgrade for unlimited events.
            </p>
          </div>
        </div>
      </section>

      <Card title="Payment method" description="Used for monthly invoices and add-ons.">
        <div className="flex flex-wrap items-center justify-between gap-[var(--spacing-4)]">
          <div
            role="img"
            aria-label="Visa card ending in 4242"
            className="relative h-[10.5rem] w-[17rem] shrink-0 overflow-hidden rounded-[var(--radius-xl)] p-[var(--spacing-5)] text-[var(--color-fg-on-brand)] shadow-[var(--shadow-md)]"
            style={{
              background:
                "linear-gradient(135deg, var(--color-brand-700), var(--color-brand-500) 60%, var(--color-accent-500))",
            }}
          >
            <span aria-hidden="true" className="absolute inset-0 opacity-30" style={{
              backgroundImage:
                "radial-gradient(closest-side, color-mix(in oklch, white 35%, transparent), transparent), radial-gradient(closest-side, color-mix(in oklch, white 25%, transparent), transparent)",
              backgroundSize: "60% 60%, 50% 50%",
              backgroundPosition: "120% -20%, -10% 130%",
              backgroundRepeat: "no-repeat",
            }} />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between">
                <span aria-hidden="true" className="block h-7 w-9 rounded-[var(--radius-sm)] bg-gradient-to-br from-[var(--color-accent-200)] to-[var(--color-accent-500)] shadow-[inset_0_0_0_1px_color-mix(in_oklch,white_25%,transparent)]" />
                <span className="text-[length:var(--text-xs)] font-semibold uppercase tracking-wider opacity-90">Visa</span>
              </div>
              <div>
                <p className="font-mono text-[length:var(--text-base)] tracking-[0.2em] tabular-nums">•••• •••• •••• 4242</p>
                <div className="mt-[var(--spacing-2)] flex items-end justify-between text-[length:var(--text-xs)] opacity-90">
                  <div>
                    <div className="opacity-70">Cardholder</div>
                    <div className="font-medium">Rahul Raj</div>
                  </div>
                  <div className="text-right">
                    <div className="opacity-70">Expires</div>
                    <div className="font-medium tabular-nums">09 / 28</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-[var(--spacing-2)]">
            <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
              Charges go to <span className="font-medium text-[var(--color-fg)]">rahul@iamrraj.com</span>.
            </p>
            <Button variant="secondary" size="sm" type="button">Update card</Button>
          </div>
        </div>
      </Card>

      <Card title="Invoices" description="Receipts for the last 5 billing periods.">
        <div className="-mx-[var(--spacing-2)] overflow-x-auto">
          <table className="w-full min-w-[36rem] border-separate border-spacing-0 text-left">
            <thead>
              <tr className="text-[length:var(--text-2xs)] uppercase tracking-wide text-[var(--color-fg-subtle)]">
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Invoice</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Date</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] text-right font-semibold">Amount</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] font-semibold">Status</th>
                <th className="px-[var(--spacing-2)] py-[var(--spacing-2)] sr-only">Download</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="text-[length:var(--text-sm)] hover:bg-[var(--color-surface-elevated)]">
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] font-mono text-[length:var(--text-xs)] text-[var(--color-fg)]">
                    {inv.id}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-[var(--color-fg-muted)]">
                    {inv.date}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-right font-medium tabular-nums text-[var(--color-fg)]">
                    {inv.amount}
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)]">
                    <StatusPill status={inv.status} />
                  </td>
                  <td className="border-t border-[var(--color-border-subtle)] px-[var(--spacing-2)] py-[var(--spacing-3)] text-right">
                    <a
                      href={`#${inv.id}`}
                      className="text-[length:var(--text-xs)] font-medium text-[var(--color-brand-700)] underline-offset-2 hover:underline dark:text-[var(--color-brand-200)]"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function StatusPill({ status }: { status: Invoice["status"] }) {
  if (status === "paid") {
    return (
      <span className="inline-flex h-5 items-center gap-[var(--spacing-1)] rounded-full bg-[color-mix(in_oklch,oklch(70%_0.16_150)_18%,transparent)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[oklch(40%_0.12_150)] dark:text-[oklch(80%_0.16_150)]">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[oklch(70%_0.16_150)]" />
        Paid
      </span>
    );
  }
  if (status === "open") {
    return (
      <span className="inline-flex h-5 items-center gap-[var(--spacing-1)] rounded-full bg-[color-mix(in_oklch,var(--color-accent-500)_18%,transparent)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-accent-700)] dark:text-[var(--color-accent-300)]">
        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-500)]" />
        Open
      </span>
    );
  }
  return (
    <span className="inline-flex h-5 items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-surface-elevated)] px-[var(--spacing-2)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-muted)]">
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-fg-subtle)]" />
      Void
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

export default BillingSection;
