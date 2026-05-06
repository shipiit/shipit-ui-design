"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Container } from "@/components/primitives/Container";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { useFadeUp, useStagger } from "@/components/animations/Motion";
import { cn } from "@/lib/utils";
import { ThumbSettings, ThumbCards, ThumbForms } from "./_thumbs";

interface Demo {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  thumb: () => React.ReactElement;
}

const DEMOS: Demo[] = [
  {
    href: "/sample",
    eyebrow: "Marketing",
    title: "Lume — landing page",
    description: "Marketing landing page · hero, features, pricing, testimonials, CTA.",
    thumb: ThumbMarketing,
  },
  {
    href: "/dashboard",
    eyebrow: "Admin",
    title: "Admin dashboard",
    description: "Admin dashboard · sidebar, KPI tiles, charts, sortable table.",
    thumb: ThumbDashboard,
  },
  {
    href: "/kanban",
    eyebrow: "Productivity",
    title: "Kanban board",
    description: "Kanban board · 4 columns, cards with priority, due dates, assignees.",
    thumb: ThumbKanban,
  },
  {
    href: "/inbox",
    eyebrow: "List · detail",
    title: "Inbox",
    description: "Inbox · message list and detail with reply thread and composer.",
    thumb: ThumbInbox,
  },
  {
    href: "/settings",
    eyebrow: "Forms",
    title: "Settings",
    description: "Multi-section settings — Profile, Security, Notifications, Billing, Team, API keys + sticky save bar.",
    thumb: ThumbSettings,
  },
  {
    href: "/cards",
    eyebrow: "Gallery",
    title: "Card variants",
    description: "Every card the plugin produces — KPI, profile, pricing, status, gradient, glass, and more.",
    thumb: ThumbCards,
  },
  {
    href: "/forms",
    eyebrow: "Inputs",
    title: "Form controls",
    description: "Every input type with all six states — text, select, combobox, date, file, slider, toggle.",
    thumb: ThumbForms,
  },
];

export default function ExamplesPage() {
  const fadeUp = useFadeUp();
  const stagger = useStagger(0.06);

  return (
    <main className="relative min-h-dvh bg-[var(--color-bg)] py-[var(--spacing-16)]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Backdrop3D variant="orbs" />
      </div>
      <Container variant="wide">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col gap-[var(--spacing-10)]">
          <motion.header variants={fadeUp} className="flex flex-col gap-[var(--spacing-3)]">
            <span className="inline-flex w-fit items-center gap-[var(--spacing-2)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--color-brand-700)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-400)]" />
              Dogfood gallery
            </span>
            <h1 className="text-balance text-[length:var(--text-4xl)] font-bold tracking-tight text-[var(--color-fg)] sm:text-[length:var(--text-5xl)]">
              What <span className="text-gradient-brand">shipit-ui-design</span> produces
            </h1>
            <p className="max-w-[64ch] text-[length:var(--text-base)] leading-relaxed text-[var(--color-fg-muted)]">
              Real working layouts — every route below was built end-to-end via the plugin&rsquo;s rules. No screenshots,
              no static images. Tokens, motion, accessibility, dark mode, and rich illustration baked in.
            </p>
          </motion.header>

          <motion.ul
            variants={fadeUp}
            className="grid grid-cols-1 gap-[var(--spacing-6)] md:grid-cols-2"
          >
            {DEMOS.map((d) => (
              <li key={d.href}>
                <DemoCard demo={d} />
              </li>
            ))}
          </motion.ul>

          <motion.footer variants={fadeUp} className="flex flex-wrap items-center justify-between gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)]">
            <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
              Want the rules these layouts were generated from?
            </p>
            <a
              href="/"
              className="inline-flex h-9 items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] bg-[var(--color-brand)] px-[var(--spacing-4)] text-[length:var(--text-sm)] font-medium text-[var(--color-fg-on-brand)] transition-[background-color,transform] duration-[var(--dur-fast)] hover:bg-[var(--color-brand-hover)] active:scale-[0.98]"
            >
              Read the docs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </motion.footer>
        </motion.div>
      </Container>
    </main>
  );
}

function DemoCard({ demo }: { demo: Demo }) {
  const Thumb = demo.thumb;
  return (
    <a
      href={demo.href}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-xl)]",
        "border border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
        "transition-[transform,box-shadow,border-color] duration-[var(--dur-default)] ease-[var(--ease-out)] motion-reduce:transition-none",
        "hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] hover:border-[var(--color-border)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ring)]",
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--color-surface-elevated)]">
        <Thumb />
      </div>
      <div className="flex flex-1 flex-col gap-[var(--spacing-2)] border-t border-[var(--color-border-subtle)] p-[var(--spacing-5)]">
        <span className="text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.08em] text-[var(--color-fg-subtle)]">
          {demo.eyebrow}
        </span>
        <h2 className="text-[length:var(--text-xl)] font-semibold tracking-tight text-[var(--color-fg)]">
          {demo.title}
        </h2>
        <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-fg-muted)]">
          {demo.description}
        </p>
        <div className="mt-auto inline-flex items-center gap-[var(--spacing-2)] pt-[var(--spacing-3)] text-[length:var(--text-sm)] font-medium text-[var(--color-brand-700)]">
          Open demo
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" className="transition-transform duration-[var(--dur-fast)] group-hover:translate-x-1">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

/* ---- Hand-rolled illustrated thumbnails ---- */
const stroke = "fill-none stroke-current [stroke-width:1] [stroke-linecap:round] [stroke-linejoin:round]";

function ThumbMarketing() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Marketing landing page silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      <rect x="20" y="16" width="280" height="6" rx="3" fill="var(--color-border)" />
      <circle cx="28" cy="19" r="2" fill="var(--color-accent-400)" />
      <rect x="40" y="48" width="160" height="14" rx="3" fill="var(--color-fg)" opacity="0.9" />
      <rect x="40" y="68" width="120" height="8" rx="3" fill="var(--color-fg-muted)" />
      <rect x="40" y="86" width="60" height="14" rx="7" fill="var(--color-brand-500)" />
      <rect x="106" y="86" width="60" height="14" rx="7" fill="none" stroke="var(--color-border)" strokeWidth="1" />
      <g transform="translate(210 50)">
        <rect width="86" height="74" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        <rect x="8" y="8" width="34" height="6" rx="2" fill="var(--color-brand-300)" />
        <rect x="8" y="22" width="70" height="4" rx="2" fill="var(--color-border)" />
        <rect x="8" y="32" width="56" height="4" rx="2" fill="var(--color-border)" />
        <path d="M8 60 L24 50 L40 56 L60 42 L78 48" stroke="var(--color-brand-500)" className={stroke} />
      </g>
      <g transform="translate(20 138)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${i * 96} 0)`}>
            <rect width="86" height="32" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
            <circle cx="14" cy="16" r="6" fill="var(--color-brand-100)" />
            <rect x="26" y="10" width="50" height="4" rx="2" fill="var(--color-fg)" opacity="0.6" />
            <rect x="26" y="18" width="36" height="4" rx="2" fill="var(--color-border)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ThumbDashboard() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Admin dashboard silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      <rect x="0" y="0" width="60" height="180" fill="var(--color-surface)" />
      <rect x="0" y="0" width="320" height="20" fill="var(--color-surface)" />
      <line x1="60" y1="20" x2="320" y2="20" stroke="var(--color-border-subtle)" />
      <line x1="60" y1="0" x2="60" y2="180" stroke="var(--color-border-subtle)" />
      <rect x="8" y="8" width="44" height="6" rx="3" fill="var(--color-brand-500)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="10" y={28 + i * 16} width="40" height="8" rx="2" fill={i === 0 ? "var(--color-brand-100)" : "var(--color-border-subtle)"} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${72 + i * 60} 32)`}>
          <rect width="52" height="36" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
          <rect x="6" y="6" width="20" height="3" rx="1" fill="var(--color-border)" />
          <rect x="6" y="13" width="30" height="8" rx="2" fill="var(--color-fg)" opacity="0.85" />
          <path d="M6 30 L14 26 L22 28 L32 22 L44 24" stroke="var(--color-brand-500)" className={stroke} />
        </g>
      ))}
      <g transform="translate(72 80)">
        <rect width="160" height="86" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        <path d="M8 70 L28 60 L48 65 L68 50 L88 55 L108 38 L128 45 L152 30" stroke="var(--color-brand-500)" className={stroke} strokeWidth="1.5" />
        <path d="M8 70 L28 60 L48 65 L68 50 L88 55 L108 38 L128 45 L152 30 L152 80 L8 80 Z" fill="var(--color-brand-100)" opacity="0.5" />
      </g>
      <g transform="translate(240 80)">
        <rect width="72" height="86" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(8 ${10 + i * 18})`}>
            <circle cx="6" cy="6" r="5" fill="var(--color-brand-100)" />
            <rect x="16" y="3" width="36" height="3" rx="1" fill="var(--color-fg)" opacity="0.6" />
            <rect x="16" y="9" width="24" height="3" rx="1" fill="var(--color-border)" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function ThumbKanban() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Kanban board silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      {[0, 1, 2, 3].map((i) => {
        const tone = ["var(--color-accent-400)", "var(--color-brand-400)", "var(--color-brand-300)", "var(--color-neutral-300)"][i];
        return (
          <g key={i} transform={`translate(${10 + i * 78} 14)`}>
            <rect width="68" height="156" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
            <rect x="6" y="8" width="32" height="4" rx="2" fill="var(--color-fg)" opacity="0.7" />
            <rect x="42" y="6" width="14" height="8" rx="4" fill="var(--color-surface-elevated)" />
            {[0, 1, 2, 3].map((j) => (
              <g key={j} transform={`translate(6 ${22 + j * 32})`}>
                <rect width="56" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
                <rect width="56" height="3" rx="1.5" fill={tone} />
                <rect x="6" y="9" width="44" height="3" rx="1" fill="var(--color-fg)" opacity="0.7" />
                <rect x="6" y="16" width="30" height="3" rx="1" fill="var(--color-border)" />
                <circle cx="50" cy="22" r="3" fill={tone} opacity="0.7" />
              </g>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function ThumbInbox() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Inbox split-pane silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      <rect x="0" y="0" width="120" height="180" fill="var(--color-surface)" />
      <line x1="120" y1="0" x2="120" y2="180" stroke="var(--color-border-subtle)" />
      <rect x="10" y="14" width="60" height="8" rx="3" fill="var(--color-fg)" opacity="0.75" />
      <rect x="10" y="26" width="40" height="4" rx="2" fill="var(--color-fg-muted)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(8 ${44 + i * 26})`}>
          <rect width="104" height="22" rx="4" fill={i === 1 ? "var(--color-brand-50)" : "transparent"} />
          {i === 1 && <rect width="3" height="22" rx="1.5" fill="var(--color-brand-500)" />}
          <circle cx="14" cy="11" r="6" fill="var(--color-brand-100)" />
          <rect x="24" y="5" width="50" height="3" rx="1" fill="var(--color-fg)" opacity={i === 0 ? 1 : 0.7} />
          <rect x="24" y="11" width="74" height="3" rx="1" fill="var(--color-border)" />
          {i === 0 && <circle cx="98" cy="6" r="2" fill="var(--color-brand-500)" />}
        </g>
      ))}
      <g transform="translate(132 14)">
        <rect width="178" height="20" rx="3" fill="none" stroke="var(--color-border-subtle)" />
        <rect x="6" y="6" width="80" height="8" rx="3" fill="var(--color-fg)" opacity="0.85" />
        <circle cx="148" cy="10" r="5" fill="var(--color-surface-elevated)" />
        <circle cx="160" cy="10" r="5" fill="var(--color-surface-elevated)" />
        <circle cx="172" cy="10" r="5" fill="var(--color-surface-elevated)" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="142" y={48 + i * 12} width={[160, 150, 158, 110][i]} height="4" rx="2" fill="var(--color-border)" />
      ))}
      <g transform="translate(150 110)">
        <circle cx="6" cy="6" r="6" fill="var(--color-accent-100)" />
        <rect x="18" y="3" width="50" height="3" rx="1" fill="var(--color-fg)" opacity="0.7" />
        <rect x="18" y="9" width="120" height="3" rx="1" fill="var(--color-border)" />
      </g>
      <rect x="142" y="138" width="170" height="28" rx="4" fill="var(--color-surface)" stroke="var(--color-border-subtle)" strokeDasharray="3 3" />
      <rect x="150" y="148" width="80" height="4" rx="2" fill="var(--color-border)" />
    </svg>
  );
}
