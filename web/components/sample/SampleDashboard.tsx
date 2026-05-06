"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp } from "@/components/animations/Motion";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { cn } from "@/lib/utils";

export function SampleDashboard() {
  const fadeUp = useFadeUp();

  return (
    <section
      id="docs"
      aria-labelledby="sample-dashboard-title"
      className="relative py-[var(--spacing-24)] overflow-hidden"
    >
      <Backdrop3D variant="grid-tilt" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl mb-[var(--spacing-12)]"
        >
          <p className="flex items-center gap-[var(--spacing-2)] uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)] mb-[var(--spacing-4)]">
            <SparkleIcon size={16} />
            What you'll see
          </p>
          <h2
            id="sample-dashboard-title"
            className="text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-bold tracking-tight text-[var(--color-fg)] text-balance"
          >
            Your numbers, every morning.
          </h2>
          <p className="mt-[var(--spacing-4)] text-[length:var(--text-base)] text-[var(--color-fg-muted)] leading-relaxed max-w-xl">
            One screen, the five numbers that matter, and a feed of what just happened. No
            "build your own dashboard" weekend required.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className={cn(
            "relative w-full rounded-[var(--radius-2xl)] overflow-hidden",
            "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-xl)]",
            "lg:[transform:perspective(1400px)_rotateX(2deg)_rotateY(-3deg)]",
          )}
        >
          <DashboardSvg />
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------------- Inline SVG: Lume dashboard preview ---------------- */
function DashboardSvg() {
  const SIDE = [
    { y: 70, label: "Overview", active: true },
    { y: 100, label: "Funnels", active: false },
    { y: 130, label: "Cohorts", active: false },
    { y: 160, label: "Alerts", active: false },
    { y: 190, label: "Settings", active: false },
  ];

  const KPIS = [
    { x: 200, label: "Active trials", val: "284", delta: "+9% vs prior 7d", spark: "0,18 12,14 24,16 36,10 48,12 60,6 72,4" },
    { x: 380, label: "MRR", val: "$12,432", delta: "+18.2% vs prior 7d", spark: "0,16 12,12 24,14 36,8 48,10 60,4 72,2" },
    { x: 560, label: "Churn rate", val: "1.8%", delta: "−0.4% vs prior 7d", spark: "0,8 12,10 24,9 36,12 48,11 60,14 72,16" },
    { x: 740, label: "NPS", val: "62", delta: "+4 vs prior 7d", spark: "0,14 12,12 24,10 36,11 48,8 60,6 72,4" },
  ];

  const FEED = [
    { y: 250, dot: "var(--color-brand-500)", text: "New trial · acme.co", time: "4m ago" },
    { y: 282, dot: "var(--color-accent-400)", text: "Plan upgrade · Pro → Team", time: "12m ago" },
    { y: 314, dot: "var(--color-brand-500)", text: "Webhook delivered · Stripe", time: "21m ago" },
    { y: 346, dot: "var(--color-brand-500)", text: "First alert · MRR > goal", time: "38m ago" },
    { y: 378, dot: "var(--color-accent-400)", text: "Failed payment · retry queued", time: "1h ago" },
    { y: 410, dot: "var(--color-brand-500)", text: "Cohort exported · CSV", time: "2h ago" },
  ];

  return (
    <svg
      role="img"
      aria-label="Lume dashboard — sidebar with five sections, four KPI tiles, a revenue chart, and an activity feed"
      viewBox="0 0 1080 540"
      width="100%"
      height="auto"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="sd-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="sd-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
      </defs>

      {/* Top bar */}
      <rect x="0" y="0" width="1080" height="44" fill="var(--color-surface-elevated)" />
      <line x1="0" y1="44" x2="1080" y2="44" stroke="var(--color-border)" />
      <rect x="20" y="14" width="20" height="16" rx="5" fill="var(--color-brand-500)" />
      <path d="M26 18 V26 H34" stroke="var(--color-fg-on-brand)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="50" y="27" fontSize="12" fontWeight="700" fill="var(--color-fg)">Lume</text>
      <rect x="380" y="12" width="320" height="22" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
      <text x="540" y="27" fontSize="10" fill="var(--color-fg-subtle)" textAnchor="middle" fontFamily="var(--font-mono)">Search · ⌘K</text>
      <circle cx="1020" cy="22" r="11" fill="var(--color-brand-100)" />
      <text x="1020" y="26" fontSize="10" fontWeight="700" fill="var(--color-brand-700)" textAnchor="middle">RR</text>

      {/* Sidebar */}
      <rect x="0" y="44" width="170" height="496" fill="var(--color-bg)" />
      <line x1="170" y1="44" x2="170" y2="540" stroke="var(--color-border-subtle)" />
      <text x="20" y="64" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="1.5">WORKSPACE</text>
      {SIDE.map((it) => (
        <g key={it.label}>
          {it.active && <rect x="10" y={it.y - 14} width="150" height="28" rx="6" fill="var(--color-brand-50)" />}
          {it.active && <rect x="10" y={it.y - 14} width="2" height="28" fill="var(--color-brand-600)" />}
          <circle cx="26" cy={it.y} r="3" fill={it.active ? "var(--color-brand-600)" : "var(--color-fg-subtle)"} />
          <text x="40" y={it.y + 4} fontSize="11"
            fill={it.active ? "var(--color-brand-700)" : "var(--color-fg-muted)"}
            fontWeight={it.active ? 600 : 500}>{it.label}</text>
        </g>
      ))}
      <text x="20" y="256" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="1.5">PROJECTS</text>
      {["Acme", "Stripe demo", "Indie blog"].map((p, i) => (
        <g key={p}>
          <rect x="20" y={272 + i * 28} width="10" height="10" rx="2"
            fill={i === 0 ? "var(--color-brand-500)" : "var(--color-neutral-300)"} />
          <text x="38" y={281 + i * 28} fontSize="11" fill="var(--color-fg-muted)">{p}</text>
        </g>
      ))}

      {/* KPI tiles */}
      {KPIS.map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="64" width="160" height="92" rx="10" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
          <text x={k.x + 14} y="84" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="1">{k.label.toUpperCase()}</text>
          <text x={k.x + 14} y="116" fontSize="22" fontWeight="700" fill="var(--color-fg)" fontFamily="var(--font-mono)">{k.val}</text>
          <text x={k.x + 14} y="140" fontSize="10" fill="var(--color-brand-600)" fontWeight="600">{k.delta}</text>
          <g transform={`translate(${k.x + 80} 70) scale(0.95)`}>
            <polyline points={k.spark} fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" strokeLinecap="round" />
          </g>
        </g>
      ))}

      {/* Big chart */}
      <rect x="200" y="180" width="500" height="336" rx="12" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
      <text x="220" y="208" fontSize="13" fontWeight="600" fill="var(--color-fg)">Revenue, last 30 days</text>
      <text x="220" y="226" fontSize="10" fill="var(--color-fg-subtle)">$12,432 · +18.2% vs prior 30d</text>
      <g>
        <rect x="600" y="196" width="80" height="20" rx="10" fill="var(--color-brand-50)" />
        <text x="640" y="210" fontSize="10" fill="var(--color-brand-700)" textAnchor="middle" fontWeight="600">30d</text>
      </g>
      {[280, 330, 380, 430, 480].map((y) => (
        <line key={y} x1="220" y1={y} x2="680" y2={y} stroke="var(--color-border-subtle)" strokeDasharray="2 4" />
      ))}
      <path d="M220 470 L260 450 L300 460 L340 420 L380 432 L420 388 L460 396 L500 360 L540 372 L580 320 L620 308 L660 286 L680 270 L680 490 L220 490 Z"
        fill="url(#sd-area)" />
      <path d="M220 470 L260 450 L300 460 L340 420 L380 432 L420 388 L460 396 L500 360 L540 372 L580 320 L620 308 L660 286 L680 270"
        stroke="url(#sd-line)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="680" cy="270" r="5" fill="var(--color-accent-400)" stroke="var(--color-surface)" strokeWidth="2" />

      {/* Activity feed */}
      <rect x="720" y="180" width="340" height="336" rx="12" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
      <text x="740" y="208" fontSize="13" fontWeight="600" fill="var(--color-fg)">Activity</text>
      <text x="740" y="226" fontSize="10" fill="var(--color-fg-subtle)">Last 6 events</text>
      {FEED.map((f) => (
        <g key={f.text}>
          <circle cx="752" cy={f.y - 4} r="4" fill={f.dot} />
          <text x="768" y={f.y} fontSize="11" fill="var(--color-fg)">{f.text}</text>
          <text x="768" y={f.y + 14} fontSize="9" fill="var(--color-fg-subtle)" fontFamily="var(--font-mono)">{f.time}</text>
        </g>
      ))}
    </svg>
  );
}

export default SampleDashboard;
