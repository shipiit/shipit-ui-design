"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Range = "7d" | "30d" | "90d";

const SERIES: Record<Range, number[]> = {
  "7d": [42, 48, 46, 54, 60, 58, 66],
  "30d": [22, 28, 32, 30, 36, 42, 38, 46, 50, 48, 54, 58, 56, 62, 60, 66, 70, 68, 74, 78, 80, 86, 82, 90, 94, 96, 98, 104, 108, 116],
  "90d": Array.from({ length: 30 }, (_, i) => 18 + i * 2.6 + Math.sin(i / 3) * 6),
};

const RANGE_LABEL: Record<Range, string> = {
  "7d": "Last 7 days",
  "30d": "Last 30 days",
  "90d": "Last 90 days",
};

export function RevenueChart() {
  const [range, setRange] = React.useState<Range>("30d");
  const reduced = useReducedMotion();
  const data = SERIES[range];

  const w = 720, h = 240, padL = 36, padR = 16, padT = 16, padB = 28;
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const innerW = w - padL - padR;
  const innerH = h - padT - padB;
  const step = innerW / (data.length - 1);

  const coords = data.map((v, i) => {
    const x = padL + i * step;
    const y = padT + innerH * (1 - (v - min) / Math.max(1, max - min));
    return [x, y] as const;
  });
  const linePath = coords
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const areaPath = `${linePath} L${coords[coords.length - 1][0].toFixed(1)},${padT + innerH} L${coords[0][0].toFixed(1)},${padT + innerH} Z`;

  const gridLines = [0, 1, 2, 3];
  const gridYs = gridLines.map((i) => padT + (innerH * i) / 3);
  const dotIdx = [Math.round(data.length * 0.25), Math.round(data.length * 0.55), data.length - 1];

  return (
    <section
      aria-labelledby="rev-chart-title"
      className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] sm:p-[var(--spacing-6)]"
    >
      <header className="mb-[var(--spacing-5)] flex flex-wrap items-center gap-[var(--spacing-3)]">
        <div className="flex-1 min-w-0">
          <h3 id="rev-chart-title" className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
            Revenue
            <span className="ml-[var(--spacing-2)] text-[length:var(--text-sm)] font-normal text-[var(--color-fg-muted)]">
              &middot; {RANGE_LABEL[range]}
            </span>
          </h3>
          <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
            Updated 2 minutes ago
          </p>
        </div>
        <div role="group" aria-label="Time range" className="inline-flex rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] p-[2px]">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              type="button"
              aria-pressed={range === r}
              onClick={() => setRange(r)}
              className={cn(
                "h-7 rounded-[var(--radius-sm)] px-[var(--spacing-3)] text-[length:var(--text-xs)] font-medium transition-colors duration-[var(--dur-fast)]",
                range === r
                  ? "bg-[var(--color-surface)] text-[var(--color-fg)] shadow-[var(--shadow-sm)]"
                  : "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </header>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width="100%"
          height={h}
          role="img"
          aria-label={`Revenue trend, ${RANGE_LABEL[range].toLowerCase()}`}
          className="block min-w-[480px]"
        >
          <defs>
            <linearGradient id="rev-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.32" />
              <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {gridYs.map((y, i) => (
            <g key={i}>
              <line x1={padL} x2={w - padR} y1={y} y2={y} stroke="var(--color-border-subtle)" strokeWidth="1" />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fill="var(--color-fg-subtle)">
                ${Math.round((max - (max * i) / 3) / 1000)}k
              </text>
            </g>
          ))}
          {[0, Math.floor(data.length / 3), Math.floor((data.length * 2) / 3), data.length - 1].map((i) => (
            <text key={`xl-${i}`} x={coords[i][0]} y={h - 8} textAnchor="middle" fontSize="10" fill="var(--color-fg-subtle)">
              D{i + 1}
            </text>
          ))}
          <motion.path
            d={areaPath}
            fill="url(#rev-fill)"
            initial={reduced ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.2 }}
          />
          <motion.path
            d={linePath}
            fill="none"
            stroke="var(--color-brand-500)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          {dotIdx.map((i) => coords[i] && (
            <g key={i}>
              <circle cx={coords[i][0]} cy={coords[i][1]} r="5" fill="var(--color-surface)" stroke="var(--color-brand-500)" strokeWidth="2" />
              <circle cx={coords[i][0]} cy={coords[i][1]} r="2" fill="var(--color-brand-500)" />
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}

export default RevenueChart;
