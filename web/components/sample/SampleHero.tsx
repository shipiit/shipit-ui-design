"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { motion, useFadeUp, useStagger, useFloatGentle } from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const FLOAT_CHIPS = [
  { label: "+18% MRR", sub: "week-over-week", pos: "left-[-3%] top-[8%]", tone: "brand" as const },
  { label: "First alert · 2m ago", sub: "Stripe webhook", pos: "right-[-4%] top-[36%]", tone: "accent" as const },
  { label: "Connected", sub: "Stripe · Postgres · Mixpanel", pos: "left-[6%] bottom-[-4%]", tone: "brand" as const },
];

export function SampleHero() {
  const fadeUp = useFadeUp();
  const stagger = useStagger(0.1);
  const floatA = useFloatGentle(7, 8);
  const floatB = useFloatGentle(5, 10);
  const floatC = useFloatGentle(6, 9);
  const reduced = useReducedMotion();
  const chipFloats = [floatA, floatB, floatC];

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden min-h-[88vh] flex items-center py-[var(--spacing-20)] lg:py-[var(--spacing-24)]"
    >
      <Backdrop3D variant="orbs" />
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30 -z-0" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid items-center gap-[var(--spacing-12)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className={cn(
                "inline-flex items-center gap-[var(--spacing-2)]",
                "py-[var(--spacing-1)] px-[var(--spacing-3)] rounded-[var(--radius-full)]",
                "bg-[var(--color-brand-50)] dark:bg-[var(--color-surface-elevated)]",
                "text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]",
                "border border-[var(--color-brand-100)] dark:border-[var(--color-border)]",
                "text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em]",
              )}
            >
              <span className="relative flex h-[var(--spacing-2)] w-[var(--spacing-2)]">
                {!reduced && (
                  <span className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "var(--color-accent-400)", opacity: 0.6 }} />
                )}
                <span className="relative inline-flex h-full w-full rounded-full"
                  style={{ background: "var(--color-accent-400)" }} />
              </span>
              New · Real-time funnels
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-[var(--spacing-6)] font-extrabold text-balance text-[var(--color-fg)] text-[length:var(--text-5xl)] lg:text-[length:var(--text-6xl)]"
              style={{ letterSpacing: "-0.025em", lineHeight: 1.05 }}
            >
              Analytics that{" "}
              <span className="text-gradient-brand">actually fits</span>
              <br />
              your indie product.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-[var(--spacing-6)] max-w-xl text-balance leading-relaxed text-[length:var(--text-lg)] text-[var(--color-fg-muted)]"
            >
              Skip the bloated dashboards. Track the 5 numbers that matter, get alerts when
              they move, ship from your phone.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-[var(--spacing-8)] flex flex-wrap items-center gap-[var(--spacing-3)]"
            >
              <Button as="a" href="#cta" size="lg" variant="primary">Start free — no card</Button>
              <Button as="a" href="#tour" size="lg" variant="ghost">
                <PlayIcon />
                <span>Watch a 90-second tour</span>
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className="mt-[var(--spacing-8)] flex flex-wrap items-center gap-x-[var(--spacing-6)] gap-y-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]"
            >
              {["1,200 founders", "4.9 rating", "$0 free tier", "MIT-friendly"].map((s, i) => (
                <li key={s} className={cn(
                  "flex items-center",
                  i > 0 && "lg:pl-[var(--spacing-6)] lg:border-l lg:border-[var(--color-border-subtle)]",
                )}>
                  {s}
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div variants={fadeUp} className="relative w-full max-w-full">
            <div aria-hidden="true" className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{ background: "radial-gradient(closest-side, var(--color-brand-400), transparent 70%)" }} />
            <motion.div
              variants={floatA}
              animate="rest"
              className="relative w-full lg:[transform:perspective(1200px)_rotateY(-6deg)_rotateX(2deg)]"
              style={{ filter: "drop-shadow(var(--shadow-xl))" }}
            >
              <BrowserFrame />
            </motion.div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              {FLOAT_CHIPS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.15, duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("absolute", c.pos)}
                >
                  <motion.div variants={chipFloats[i]} animate="rest"
                    className={cn(
                      "flex items-center gap-[var(--spacing-2)]",
                      "py-[var(--spacing-2)] px-[var(--spacing-3)] rounded-[var(--radius-lg)]",
                      "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)]",
                    )}
                  >
                    <span className={cn(
                      "h-2 w-2 rounded-full",
                      c.tone === "brand"
                        ? "bg-[var(--color-brand-500)]"
                        : "bg-[var(--color-accent-400)]",
                    )} />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">{c.label}</span>
                      <span className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">{c.sub}</span>
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

/* ---------------- Inline browser frame SVG (Lume product mock) ---------------- */
function BrowserFrame() {
  return (
    <svg
      role="img"
      aria-label="Lume dashboard preview — 4 KPI tiles and a revenue chart"
      viewBox="0 0 720 480"
      width="100%"
      height="auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="lume-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lume-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
      </defs>
      {/* Frame */}
      <rect x="2" y="2" width="716" height="476" rx="14" fill="var(--color-surface)" stroke="var(--color-border)" strokeWidth="1" />
      {/* Title bar */}
      <rect x="2" y="2" width="716" height="36" rx="14" fill="var(--color-surface-elevated)" />
      <rect x="2" y="22" width="716" height="16" fill="var(--color-surface-elevated)" />
      <circle cx="20" cy="20" r="5" fill="var(--color-accent-400)" />
      <circle cx="36" cy="20" r="5" fill="var(--color-brand-300)" />
      <circle cx="52" cy="20" r="5" fill="var(--color-brand-500)" />
      <rect x="240" y="12" width="240" height="16" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
      <text x="360" y="23" fontSize="10" fill="var(--color-fg-subtle)" textAnchor="middle" fontFamily="var(--font-mono)">app.lume.io/dashboard</text>
      <line x1="2" y1="38" x2="718" y2="38" stroke="var(--color-border)" />
      {/* Sidebar */}
      <rect x="2" y="38" width="140" height="440" fill="var(--color-bg)" />
      <line x1="142" y1="38" x2="142" y2="478" stroke="var(--color-border-subtle)" />
      {/* Sidebar mark */}
      <rect x="14" y="54" width="20" height="20" rx="6" fill="var(--color-brand-500)" />
      <path d="M20 60 V70 H30" stroke="var(--color-fg-on-brand)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <text x="42" y="69" fontSize="11" fontWeight="700" fill="var(--color-fg)">Lume</text>
      {/* Sidebar items */}
      {[
        { y: 100, label: "Overview", active: true },
        { y: 130, label: "Funnels", active: false },
        { y: 160, label: "Cohorts", active: false },
        { y: 190, label: "Alerts", active: false },
      ].map((it) => (
        <g key={it.label}>
          {it.active && <rect x="10" y={it.y - 14} width="124" height="26" rx="6" fill="var(--color-brand-50)" />}
          {it.active && <rect x="10" y={it.y - 14} width="2" height="26" fill="var(--color-brand-600)" />}
          <circle cx="24" cy={it.y - 1} r="3" fill={it.active ? "var(--color-brand-600)" : "var(--color-fg-subtle)"} />
          <text x="36" y={it.y + 3} fontSize="11" fill={it.active ? "var(--color-brand-700)" : "var(--color-fg-muted)"} fontWeight={it.active ? 600 : 500}>{it.label}</text>
        </g>
      ))}
      {/* KPI tiles */}
      {[
        { x: 160, label: "MRR", val: "$12.4k", delta: "+18%" },
        { x: 300, label: "Trials", val: "284", delta: "+9%" },
        { x: 440, label: "Churn", val: "1.8%", delta: "−0.4%" },
        { x: 580, label: "NPS", val: "62", delta: "+4" },
      ].map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="58" width="124" height="76" rx="10" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
          <text x={k.x + 12} y="76" fontSize="9" fill="var(--color-fg-subtle)" letterSpacing="1">{k.label.toUpperCase()}</text>
          <text x={k.x + 12} y="100" fontSize="18" fontWeight="700" fill="var(--color-fg)" fontFamily="var(--font-mono)">{k.val}</text>
          <text x={k.x + 12} y="120" fontSize="9" fill="var(--color-brand-600)" fontWeight="600">{k.delta} vs prior 7d</text>
          <polyline points={`${k.x + 70},122 ${k.x + 80},116 ${k.x + 90},120 ${k.x + 100},108 ${k.x + 112},112`}
            fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      {/* Big chart */}
      <rect x="160" y="148" width="544" height="316" rx="10" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
      <text x="176" y="174" fontSize="11" fontWeight="600" fill="var(--color-fg)">Revenue, last 30 days</text>
      <text x="176" y="190" fontSize="9" fill="var(--color-fg-subtle)">$12,432 · +18.2% vs prior 30d</text>
      {/* Gridlines */}
      {[230, 280, 330, 380, 430].map((y) => (
        <line key={y} x1="180" y1={y} x2="690" y2={y} stroke="var(--color-border-subtle)" strokeDasharray="2 4" />
      ))}
      {/* Area + line */}
      <path d="M180 410 L220 380 L260 392 L300 350 L340 360 L380 312 L420 320 L460 280 L500 296 L540 250 L580 240 L620 220 L660 226 L690 200 L690 430 L180 430 Z"
        fill="url(#lume-area)" />
      <path d="M180 410 L220 380 L260 392 L300 350 L340 360 L380 312 L420 320 L460 280 L500 296 L540 250 L580 240 L620 220 L660 226 L690 200"
        stroke="url(#lume-line)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Latest marker */}
      <circle cx="690" cy="200" r="4" fill="var(--color-accent-400)" stroke="var(--color-surface)" strokeWidth="2" />
      <rect x="610" y="170" width="80" height="20" rx="4" fill="var(--color-brand-700)" />
      <text x="650" y="183" fontSize="9" fill="var(--color-fg-on-brand)" textAnchor="middle" fontFamily="var(--font-mono)">$12,432</text>
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default SampleHero;
