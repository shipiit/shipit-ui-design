"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

interface Stat {
  target: number;
  suffix?: string;
  label: string;
  glyph: "users" | "uptime" | "events" | "alert";
}

const STATS: Stat[] = [
  { target: 1240, label: "Founders shipping", glyph: "users" },
  { target: 87, suffix: "%", label: "Saw alerts in week 1", glyph: "uptime" },
  { target: 42, label: "Integrations available", glyph: "events" },
  { target: 24, suffix: "h", label: "Median time to setup", glyph: "alert" },
];

function StatGlyph({ glyph }: { glyph: Stat["glyph"] }) {
  const c = { width: 28, height: 28, viewBox: "0 0 32 32", "aria-hidden": true as const };
  switch (glyph) {
    case "users":
      return (
        <svg {...c}>
          <circle cx="12" cy="12" r="4" fill="var(--color-brand-500)" />
          <circle cx="20" cy="14" r="3" fill="var(--color-brand-300)" />
          <path d="M5 24 q7 -6 14 0" stroke="var(--color-brand-600)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M16 24 q5 -4 11 0" stroke="var(--color-brand-300)" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "uptime":
      return (
        <svg {...c}>
          <circle cx="16" cy="16" r="11" fill="none" stroke="var(--color-brand-300)" strokeWidth="2" />
          <path d="M11 16 l3.5 3.5 L22 12" stroke="var(--color-brand-600)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="26" cy="6" r="2.5" fill="var(--color-accent-400)" />
        </svg>
      );
    case "events":
      return (
        <svg {...c}>
          <rect x="4" y="6" width="24" height="20" rx="3" fill="var(--color-brand-50)" stroke="var(--color-brand-300)" />
          <line x1="8" y1="22" x2="12" y2="18" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
          <line x1="12" y1="18" x2="16" y2="20" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="20" x2="20" y2="14" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="14" x2="24" y2="10" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "alert":
      return (
        <svg {...c}>
          <path d="M16 4 L26 22 H6 Z" fill="var(--color-brand-50)" stroke="var(--color-brand-500)" strokeWidth="1.5" strokeLinejoin="round" />
          <line x1="16" y1="11" x2="16" y2="17" stroke="var(--color-brand-600)" strokeWidth="2" strokeLinecap="round" />
          <circle cx="16" cy="20" r="1.4" fill="var(--color-brand-700)" />
          <circle cx="24" cy="6" r="2.5" fill="var(--color-accent-400)" />
        </svg>
      );
  }
}

function CountUp({ to, suffix }: { to: number; suffix?: string }) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(reduced ? to : 0);
  const fmt = React.useMemo(() => new Intl.NumberFormat("en-US"), []);
  const out = useTransform(mv, (v) => `${fmt.format(Math.round(v))}${suffix ?? ""}`);

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const c = animate(mv, to, { duration: 1.2, ease: [0.16, 1, 0.3, 1] });
    return () => c.stop();
  }, [inView, to, mv, reduced]);

  return <motion.span ref={ref}>{out}</motion.span>;
}

export function SampleStats() {
  const stagger = useStagger(0.08);
  const fadeUp = useFadeUp();

  return (
    <section
      aria-labelledby="sample-stats-eyebrow"
      className="relative py-[var(--spacing-24)] overflow-hidden"
    >
      <Container className="relative z-10">
        <motion.p
          id="sample-stats-eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="flex items-center justify-center gap-[var(--spacing-2)] uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)] mb-[var(--spacing-12)]"
        >
          <SparkleIcon size={16} />
          By the numbers
        </motion.p>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-[var(--spacing-10)] lg:gap-y-0 lg:divide-x lg:divide-[var(--color-border-subtle)]"
        >
          <span aria-hidden="true"
            className="hidden lg:block absolute left-8 right-8 top-[42px] border-t border-dashed border-[var(--color-border)] -z-0" />

          {STATS.map((s) => (
            <motion.li
              key={s.label}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center px-[var(--spacing-4)] lg:px-[var(--spacing-8)]"
            >
              <span aria-hidden="true"
                className="mb-[var(--spacing-4)] inline-flex items-center justify-center h-12 w-12 rounded-[var(--radius-full)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)]">
                <StatGlyph glyph={s.glyph} />
              </span>
              <span aria-hidden="true"
                className="text-gradient-brand text-[length:var(--text-5xl)] lg:text-[length:var(--text-6xl)] font-extrabold leading-none tabular-nums tracking-tight">
                <CountUp to={s.target} suffix={s.suffix} />
              </span>
              <span className="mt-[var(--spacing-3)] uppercase tracking-[0.16em] text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-muted)]">
                {s.label}
              </span>
              <span className="sr-only">{s.target}{s.suffix ?? ""} {s.label}</span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default SampleStats;
