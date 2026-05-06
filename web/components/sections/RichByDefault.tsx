"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { useFadeUp, useStagger } from "@/components/animations/Motion";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

const surfaces = [
  { title: "Hero",        rule: "Illustrated mockup, mesh-gradient bg, orbiting chips" },
  { title: "Feature card",rule: "Icons ≥ 48×48 in a tinted internal panel, hover lift" },
  { title: "Stat row",    rule: "Counter animation, decoration shape, hairline divider" },
  { title: "Step timeline",rule: "Illustrated step circle, animated rail, preview card" },
  { title: "Skill chip",  rule: "Mini icon, radial gradient bg, hover scale" },
  { title: "Numbered rule",rule: "Decorative ringed badge, edge pattern" },
  { title: "Code block",  rule: "Syntax-highlighted with chrome — never plain <pre>" },
];

const rubric = [
  { name: "Visual hierarchy", weight: 10 },
  { name: "Spacing & rhythm", weight: 15 },
  { name: "Color & contrast", weight: 15 },
  { name: "Typography",       weight: 10 },
  { name: "Motion & polish",  weight: 10 },
  { name: "Density",          weight: 10 },
  { name: "Component quality",weight: 10 },
  { name: "Accessibility",    weight: 10 },
  { name: "Visual richness",  weight: 10, isNew: true },
];

function CountUp({ value, suffix = "", className, style }: { value: number; suffix?: string; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(reduced ? value : 0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const display = useTransform(spring, (v) => Math.round(v).toString());
  useEffect(() => { if (inView && !reduced) mv.set(value); }, [inView, value, mv, reduced]);
  return (
    <span ref={ref} className={className} style={style}>
      <motion.span>{display}</motion.span>{suffix}
    </span>
  );
}

function PlainMockup() {
  return (
    <svg viewBox="0 0 280 180" role="img" aria-label="Plain hero — what not to ship" className="w-full h-auto block">
      <rect width="280" height="180" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
      <rect x="24" y="36" width="180" height="12" rx="2" fill="var(--color-neutral-300)" />
      <rect x="24" y="58" width="120" height="10" rx="2" fill="var(--color-neutral-200)" />
      <rect x="24" y="92" width="160" height="6" rx="1.5" fill="var(--color-neutral-200)" />
      <rect x="24" y="106" width="140" height="6" rx="1.5" fill="var(--color-neutral-200)" />
      <rect x="24" y="138" width="68" height="22" rx="6" fill="var(--color-neutral-300)" />
    </svg>
  );
}

function RichMockup() {
  return (
    <svg viewBox="0 0 280 180" role="img" aria-label="Rich hero — what shipit-ui-design produces" className="w-full h-auto block">
      <defs>
        <linearGradient id="rmBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-50)" />
          <stop offset="100%" stopColor="var(--color-surface)" />
        </linearGradient>
        <radialGradient id="rmOrb" cx="0.7" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="rmOrb2" cx="0.2" cy="0.8" r="0.4">
          <stop offset="0%" stopColor="var(--color-accent-400)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="280" height="180" rx="10" fill="url(#rmBg)" stroke="var(--color-border)" />
      <rect width="280" height="180" rx="10" fill="url(#rmOrb)" />
      <rect width="280" height="180" rx="10" fill="url(#rmOrb2)" />
      <rect x="20" y="22" width="80" height="14" rx="7" fill="var(--color-brand-100)" />
      <circle cx="32" cy="29" r="3" fill="var(--color-accent-500)" />
      <rect x="20" y="48" width="160" height="14" rx="3" fill="var(--color-fg)" />
      <rect x="20" y="66" width="120" height="14" rx="3" fill="var(--color-brand-500)" />
      <rect x="20" y="92" width="170" height="6" rx="1.5" fill="var(--color-fg-muted)" />
      <rect x="20" y="104" width="140" height="6" rx="1.5" fill="var(--color-fg-muted)" />
      <rect x="20" y="138" width="76" height="24" rx="8" fill="var(--color-brand-500)" />
      <rect x="106" y="138" width="76" height="24" rx="8" fill="none" stroke="var(--color-border)" />
      <g transform="translate(196 24)">
        <rect width="64" height="50" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="6" y="6" width="20" height="3" rx="1" fill="var(--color-fg-muted)" />
        <rect x="6" y="13" width="36" height="8" rx="1.5" fill="var(--color-brand-500)" />
        <polyline points="6,42 18,32 28,38 40,24 52,30" fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" />
      </g>
      <g transform="translate(204 86)">
        <circle r="4" fill="var(--color-accent-400)" />
      </g>
      <g transform="translate(232 110)">
        <rect width="36" height="14" rx="7" fill="var(--color-brand-50)" stroke="var(--color-brand-200)" />
        <circle cx="8" cy="7" r="2.5" fill="var(--color-accent-500)" />
        <rect x="14" y="5" width="18" height="4" rx="1" fill="var(--color-brand-700)" />
      </g>
    </svg>
  );
}

function ScoreCapBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const mv = useMotionValue(reduced ? 80 : 0);
  const spring = useSpring(mv, { stiffness: 60, damping: 22 });
  const width = useTransform(spring, (v) => `${v}%`);
  useEffect(() => { if (inView && !reduced) mv.set(80); }, [inView, mv, reduced]);
  return (
    <div ref={ref} className="relative" aria-label="Score cap at 80 when Visual Richness is below 4 of 10">
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: "var(--color-neutral-200)" }}>
        <motion.div className="h-full" style={{ width, background: "linear-gradient(90deg, var(--color-brand-400), var(--color-brand-600))" }} />
        <div aria-hidden="true" className="absolute inset-y-0 pointer-events-none" style={{ left: "80%", borderLeft: "2px dashed var(--color-fg)", opacity: 0.6 }} />
      </div>
      <div className="flex justify-between mt-2 font-mono" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
        <span>0</span>
        <span style={{ color: "var(--color-brand)" }}>← reachable</span>
        <span aria-hidden="true">capped at 80</span>
        <span>100</span>
      </div>
    </div>
  );
}

export function RichByDefault() {
  const fade = useFadeUp();
  const stagger = useStagger();

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-0 -z-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-[480px] h-[480px] rounded-full opacity-20 blur-3xl" style={{ background: "var(--color-brand-400)" }} />
        <div className="absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full opacity-15 blur-3xl" style={{ background: "var(--color-accent-400)" }} />
      </div>
      <Container>
        <motion.div initial="initial" whileInView="animate" viewport={{ once: true, margin: "-15% 0px" }} variants={stagger} className="relative">
          <motion.div variants={fade} className="flex items-center gap-2 mb-3">
            <SparkleIcon className="w-5 h-5" />
            <span className="font-mono uppercase tracking-wider" style={{ fontSize: "var(--text-xs)", color: "var(--color-fg-subtle)", letterSpacing: "0.08em" }}>The new default</span>
          </motion.div>
          <motion.h2 variants={fade} className="font-extrabold tracking-tight max-w-4xl text-balance" style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)", lineHeight: 1.02, marginBottom: "var(--spacing-5)" }}>
            Rich by default. <span className="text-gradient-brand">Plain is a failure.</span>
          </motion.h2>
          <motion.p variants={fade} className="max-w-2xl text-balance" style={{ fontSize: "var(--text-lg)", color: "var(--color-fg-muted)", lineHeight: 1.55, marginBottom: "var(--spacing-12)" }}>
            On marketing surfaces, Claude reaches for illustrations, layered surfaces, and animated decoration before reaching for a plain card. <code className="font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border-subtle)", fontSize: "0.9em" }}>/refine</code> hard-caps your score at <span className="font-mono font-semibold" style={{ color: "var(--color-brand)" }}>80</span> when Visual Richness drops below 4/10.
          </motion.p>

          <motion.div variants={fade} className="rounded-[var(--radius-2xl)] overflow-hidden" style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}>
            <div className="flex items-center justify-between px-[var(--spacing-6)] py-[var(--spacing-4)]" style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
              <span className="font-mono uppercase tracking-wider" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)", letterSpacing: "0.1em" }}>Same intent. Two outputs.</span>
              <span className="font-mono" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)" }}>/component "marketing hero"</span>
            </div>
            <div className="grid md:grid-cols-2 divide-x" style={{ borderColor: "var(--color-border-subtle)" }}>
              <div className="p-[var(--spacing-6)] lg:p-[var(--spacing-8)] space-y-[var(--spacing-4)]">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ background: "oklch(62% 0.2 25)" }} />
                  <span className="font-semibold" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg)" }}>Plain · what most LLMs ship</span>
                </div>
                <PlainMockup />
                <div className="flex items-baseline justify-between">
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>Rubric score</span>
                  <CountUp value={67} suffix="/100" className="font-mono font-extrabold tabular-nums" style={{ fontSize: "var(--text-3xl)", color: "var(--color-fg-muted)" }} />
                </div>
              </div>
              <div className="p-[var(--spacing-6)] lg:p-[var(--spacing-8)] space-y-[var(--spacing-4)]" style={{ borderTop: "1px solid var(--color-border-subtle)" }}>
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="w-2 h-2 rounded-full" style={{ background: "var(--color-brand)" }} />
                  <span className="font-semibold" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg)" }}>Rich · what shipit-ui-design ships</span>
                </div>
                <RichMockup />
                <div className="flex items-baseline justify-between">
                  <span style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)" }}>Rubric score</span>
                  <CountUp value={91} suffix="/100" className="font-mono font-extrabold tabular-nums text-gradient-brand" style={{ fontSize: "var(--text-3xl)" }} />
                </div>
              </div>
            </div>
            <div className="px-[var(--spacing-6)] py-[var(--spacing-5)]" style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border-subtle)" }}>
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-3">
                <span className="font-mono uppercase tracking-wider" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)", letterSpacing: "0.1em" }}>Score cap when Visual Richness &lt; 4/10</span>
                <span className="font-mono font-bold tabular-nums" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg)" }}>ceiling 80/100</span>
              </div>
              <ScoreCapBar />
            </div>
          </motion.div>

          <motion.div variants={fade} className="mt-[var(--spacing-12)] grid md:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-3)]">
            {surfaces.map((s, i) => (
              <motion.div key={s.title} variants={fade} className="rounded-[var(--radius-xl)] p-[var(--spacing-5)] transition-all hover:-translate-y-0.5" style={{ background: "var(--color-surface)", border: "1px solid var(--color-border-subtle)", transitionDuration: "var(--dur-default)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <span aria-hidden="true" className="font-mono tabular-nums" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg)" }}>{s.title}</span>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--color-fg-muted)", lineHeight: 1.5 }}>{s.rule}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fade} className="mt-[var(--spacing-10)] rounded-[var(--radius-2xl)] p-[var(--spacing-6)] lg:p-[var(--spacing-8)]" style={{ background: "var(--color-surface-elevated)", border: "1px solid var(--color-border)" }}>
            <div className="flex items-baseline justify-between flex-wrap gap-2 mb-[var(--spacing-5)]">
              <div>
                <div className="font-mono uppercase tracking-wider" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)", letterSpacing: "0.1em" }}>9 categories · totals 100</div>
                <h3 className="font-bold mt-1" style={{ fontSize: "var(--text-xl)", color: "var(--color-fg)" }}>The full rubric</h3>
              </div>
              <div className="flex items-center gap-2 font-mono" style={{ fontSize: "var(--text-2xs)", color: "var(--color-fg-subtle)" }}>
                <span aria-hidden="true" className="px-1.5 py-0.5 rounded-full font-semibold" style={{ background: "var(--color-brand)", color: "var(--color-fg-on-brand)" }}>NEW</span>
                <span>= added in the power-up</span>
              </div>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-2)]">
              {rubric.map((cat) => (
                <li key={cat.name} className="flex items-center justify-between rounded-[var(--radius-md)] px-[var(--spacing-3)] py-[var(--spacing-2)]" style={{ background: cat.isNew ? "color-mix(in oklab, var(--color-brand-50) 60%, transparent)" : "var(--color-surface)", border: cat.isNew ? "1px solid var(--color-brand-300)" : "1px solid var(--color-border-subtle)" }}>
                  <span className="flex items-center gap-2" style={{ fontSize: "var(--text-sm)", color: "var(--color-fg)" }}>
                    {cat.isNew && <span aria-hidden="true" className="font-mono uppercase px-1 py-0.5 rounded-full font-semibold" style={{ fontSize: "var(--text-2xs)", background: "var(--color-brand)", color: "var(--color-fg-on-brand)" }}>new</span>}
                    {cat.name}
                  </span>
                  <span className="font-mono tabular-nums font-semibold" style={{ fontSize: "var(--text-sm)", color: cat.isNew ? "var(--color-brand)" : "var(--color-fg-muted)" }}>{cat.weight}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
