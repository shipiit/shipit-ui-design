"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface KPI {
  label: string;
  value: string;
  deltaPct: number; // negative = down
  comparison: string;
  direction: "higher-is-better" | "lower-is-better";
  trend: number[]; // sparkline points (0..100ish), >= 7 values
}

const KPIS: KPI[] = [
  { label: "Active users", value: "12,438", deltaPct: 18.4, comparison: "vs prior 7 days",
    direction: "higher-is-better",
    trend: [22, 28, 30, 26, 38, 42, 48, 52, 50, 58, 64, 70] },
  { label: "MRR", value: "$48,920", deltaPct: 6.2, comparison: "vs prior 30 days",
    direction: "higher-is-better",
    trend: [40, 42, 44, 46, 45, 48, 50, 52, 54, 56, 58, 60] },
  { label: "Conversion rate", value: "4.1%", deltaPct: -0.3, comparison: "vs prior 30 days",
    direction: "higher-is-better",
    trend: [50, 48, 52, 50, 47, 45, 46, 44, 43, 45, 44, 42] },
  { label: "Avg session", value: "4m 32s", deltaPct: 4.6, comparison: "+12s vs last week",
    direction: "higher-is-better",
    trend: [30, 34, 32, 38, 36, 42, 44, 46, 48, 52, 50, 56] },
];

export function KPIRow() {
  return (
    <ul className="grid grid-cols-1 gap-[var(--spacing-4)] sm:grid-cols-2 xl:grid-cols-4">
      {KPIS.map((k) => (
        <li key={k.label}><Tile k={k} /></li>
      ))}
    </ul>
  );
}

function Tile({ k }: { k: KPI }) {
  const reduced = useReducedMotion();
  const positive =
    (k.direction === "higher-is-better" && k.deltaPct >= 0) ||
    (k.direction === "lower-is-better" && k.deltaPct <= 0);
  const neutral = k.deltaPct === 0;
  const tone =
    neutral
      ? "text-[var(--color-fg-muted)] bg-[var(--color-surface-elevated)]"
      : positive
      ? "text-[var(--color-brand-700)] bg-[var(--color-brand-50)]"
      : "text-[var(--color-accent-700)] bg-[var(--color-accent-50)]";
  const toneBg = "";

  return (
    <section
      className="relative flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)]"
      aria-label={`${k.label} ${k.value}, ${k.deltaPct >= 0 ? "up" : "down"} ${Math.abs(k.deltaPct).toFixed(1)} percent ${k.comparison}`}
    >
      <h3 className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">{k.label}</h3>
      <div className="flex items-baseline gap-[var(--spacing-3)]">
        <span className="text-[length:var(--text-3xl)] font-bold tabular-nums tracking-tight text-[var(--color-fg)]">{k.value}</span>
        <span className={cn("inline-flex items-center gap-[var(--spacing-1)] rounded-full px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)] font-semibold tabular-nums", tone, toneBg)}>
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {k.deltaPct >= 0 ? <path d="M3 8l3-3 3 3M6 5v5" /> : <path d="M3 4l3 3 3-3M6 7V2" />}
          </svg>
          {k.deltaPct >= 0 ? "+" : ""}{k.deltaPct.toFixed(1)}%
        </span>
      </div>
      <p className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">{k.comparison}</p>
      <Sparkline points={k.trend} positive={positive || neutral} reduced={!!reduced} />
    </section>
  );
}

function Sparkline({ points, positive, reduced }: { points: number[]; positive: boolean; reduced: boolean }) {
  const w = 240, h = 36, pad = 2;
  const max = Math.max(...points), min = Math.min(...points);
  const range = Math.max(1, max - min);
  const step = (w - pad * 2) / (points.length - 1);
  const coords = points.map((v, i) => {
    const x = pad + i * step;
    const y = pad + (h - pad * 2) * (1 - (v - min) / range);
    return [x, y] as const;
  });
  const d = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${coords[coords.length - 1][0].toFixed(1)},${h} L${coords[0][0].toFixed(1)},${h} Z`;
  const stroke = positive ? "var(--color-brand-500)" : "var(--color-accent-500)";
  const fill = positive ? "var(--color-brand-50)" : "var(--color-accent-50)";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} aria-hidden="true" className="mt-auto">
      <path d={area} fill={fill} opacity="0.7" />
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default KPIRow;
