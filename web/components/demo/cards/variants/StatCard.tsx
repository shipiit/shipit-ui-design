"use client";

import { motion, useReducedMotion } from "motion/react";

const TREND = [22, 28, 30, 26, 38, 42, 48, 52, 50, 58, 64, 70];
const W = 220;
const H = 44;

export function StatCard() {
  const reduced = useReducedMotion();
  const max = Math.max(...TREND);
  const min = Math.min(...TREND);
  const range = Math.max(1, max - min);
  const step = (W - 4) / (TREND.length - 1);
  const coords = TREND.map((v, i) => {
    const x = 2 + i * step;
    const y = 2 + (H - 4) * (1 - (v - min) / range);
    return [x, y] as const;
  });
  const d = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${coords[coords.length - 1][0].toFixed(1)},${H} L${coords[0][0].toFixed(1)},${H} Z`;

  return (
    <article
      aria-label="Active users 12,438, up 18.4 percent vs prior 7 days"
      className="flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)]"
    >
      <h3 className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
        Active users
      </h3>
      <div className="flex items-baseline gap-[var(--spacing-3)]">
        <span className="text-[length:var(--text-3xl)] font-bold tabular-nums tracking-tight text-[var(--color-fg)]">
          12,438
        </span>
        <span className="inline-flex items-center gap-[var(--spacing-1)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)] font-semibold tabular-nums text-[var(--color-brand-700)]">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M3 8l3-3 3 3M6 5v5" />
          </svg>
          +18.4%
        </span>
      </div>
      <p className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
        vs prior 7 days
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} aria-hidden="true" className="mt-auto">
        <path d={area} fill="var(--color-brand-50)" opacity="0.6" />
        <motion.path
          d={d}
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </article>
  );
}

export default StatCard;
