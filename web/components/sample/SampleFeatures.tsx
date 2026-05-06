"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { MotionIcon } from "@/components/illustrations/MotionIcon";
import { DashboardIcon } from "@/components/illustrations/DashboardIcon";
import { AccessibilityIcon } from "@/components/illustrations/AccessibilityIcon";
import { StackIcon } from "@/components/illustrations/StackIcon";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { OrbitingDots } from "@/components/illustrations/OrbitingDots";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { cn } from "@/lib/utils";

type IconKey = "funnels" | "alerts" | "stack" | "charts" | "replay" | "export";

interface Feature {
  icon: IconKey;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: "funnels",
    title: "Funnels in one click",
    body: "Upload events from a CSV, a webhook, or our SDK. Drop-offs render in seconds — no SQL, no chart-builder rabbit holes.",
  },
  {
    icon: "alerts",
    title: "Alerts on what matters",
    body: "Set thresholds in plain English: \"MRR drops more than 5%\". Push, email, or Slack — wherever you already pay attention.",
  },
  {
    icon: "stack",
    title: "Plays well with your stack",
    body: "First-class connectors for Stripe, Postgres, Mixpanel, Segment, and webhooks. Wire in once; data flows on its own.",
  },
  {
    icon: "charts",
    title: "Charts you'd actually screenshot",
    body: "Clean dashboards with tabular numerals, WCAG-grade contrast, and a dark mode that doesn't look like an afterthought.",
  },
  {
    icon: "replay",
    title: "Replay any session",
    body: "Heatmaps, scroll depth, and a scrubbable timeline. Skip the part where you ask the user \"what did you click?\".",
  },
  {
    icon: "export",
    title: "Yours, forever",
    body: "Export to JSON or CSV any time you like. No lock-in, no \"contact sales\" before you can leave with your own data.",
  },
];

/* ---- inline mini-SVGs for the features without a stock illustration ---- */

function FunnelIcon({ animated, size = 112 }: { animated: boolean; size?: number }) {
  return (
    <svg role="img" aria-label="Funnel with three stages" viewBox="0 0 112 112" width={size} height={size}>
      <defs>
        <linearGradient id="fn-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-700)" />
        </linearGradient>
      </defs>
      <rect x="20" y="22" width="72" height="14" rx="4" fill="var(--color-brand-50)" stroke="var(--color-brand-300)" />
      <rect x="32" y="46" width="48" height="14" rx="4" fill="var(--color-brand-100)" stroke="var(--color-brand-400)" />
      <rect x="44" y="70" width="24" height="14" rx="4" fill="url(#fn-grad)" />
      <text x="56" y="80" fontSize="8" fill="var(--color-fg-on-brand)" textAnchor="middle" fontFamily="var(--font-mono)" fontWeight="700">26%</text>
      <circle cx="92" cy="29" r="3" fill="var(--color-accent-400)"
        style={animated ? { animation: "fn-pulse 1.4s ease-in-out infinite" } : undefined} />
      <style>{`@keyframes fn-pulse{0%,100%{opacity:1}50%{opacity:.4}} @media (prefers-reduced-motion:reduce){[style*="fn-pulse"]{animation:none!important}}`}</style>
    </svg>
  );
}

function ReplayIcon({ animated, size = 112 }: { animated: boolean; size?: number }) {
  return (
    <svg role="img" aria-label="Session replay with waveform" viewBox="0 0 112 112" width={size} height={size}>
      <circle cx="36" cy="56" r="20" fill="var(--color-brand-50)" stroke="var(--color-brand-300)" />
      <path d="M30 46 L48 56 L30 66 Z" fill="var(--color-brand-600)" />
      {[64, 70, 76, 82, 88, 94, 100].map((x, i) => {
        const heights = [10, 18, 6, 22, 14, 24, 8];
        const h = heights[i];
        return (
          <rect
            key={x}
            x={x}
            y={56 - h / 2}
            width="3"
            height={h}
            rx="1.5"
            fill={i % 2 === 0 ? "var(--color-brand-500)" : "var(--color-brand-300)"}
            style={animated ? { animation: `rp-bar 1.2s ${i * 0.1}s ease-in-out infinite alternate` } : undefined}
          />
        );
      })}
      <style>{`@keyframes rp-bar{from{transform:scaleY(.6)}to{transform:scaleY(1.1)}} rect{transform-origin:center} @media (prefers-reduced-motion:reduce){[style*="rp-bar"]{animation:none!important}}`}</style>
    </svg>
  );
}

function ExportIcon({ animated, size = 112 }: { animated: boolean; size?: number }) {
  return (
    <svg role="img" aria-label="Open lock with download arrow" viewBox="0 0 112 112" width={size} height={size}>
      <rect x="32" y="56" width="48" height="34" rx="6" fill="var(--color-brand-50)" stroke="var(--color-brand-300)" />
      <path d="M40 56 V42 a 16 16 0 0 1 32 0" fill="none" stroke="var(--color-brand-500)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="56" cy="73" r="3" fill="var(--color-brand-700)" />
      <path d="M56 76 V83" stroke="var(--color-brand-700)" strokeWidth="2" strokeLinecap="round" />
      <g style={animated ? { animation: "ex-bob 1.6s ease-in-out infinite" } : undefined}>
        <line x1="92" y1="22" x2="92" y2="40" stroke="var(--color-accent-400)" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M88 36 L92 40 L96 36" stroke="var(--color-accent-400)" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <style>{`@keyframes ex-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(2px)}} @media (prefers-reduced-motion:reduce){[style*="ex-bob"]{animation:none!important}}`}</style>
    </svg>
  );
}

function FeatureArt({ icon, animated }: { icon: IconKey; animated: boolean }) {
  switch (icon) {
    case "funnels": return <FunnelIcon animated={animated} />;
    case "alerts": return <AccessibilityIcon size={112} animated={animated} />;
    case "stack": return <StackIcon size={112} animated={animated} />;
    case "charts": return <DashboardIcon size={112} animated={animated} />;
    case "replay": return <ReplayIcon animated={animated} />;
    case "export": return <ExportIcon animated={animated} />;
  }
}

function FeatureCard({ feat }: { feat: Feature }) {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);
  const animated = !reduced && hovered;

  return (
    <article
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={cn(
        "group h-full flex flex-col rounded-[var(--radius-xl)]",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]",
        "outline-none overflow-hidden",
        "transition-[transform,box-shadow,border-color] duration-[var(--dur-default)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] active:translate-y-0",
        "focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]",
      )}
    >
      <div
        aria-hidden="true"
        className="relative flex items-center justify-center min-h-[180px] w-full border-b border-[var(--color-border-subtle)] overflow-hidden"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-brand-500) 14%, var(--color-surface) 86%) 0%, var(--color-surface) 70%)",
        }}
      >
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-30">
          <OrbitingDots size={220} />
        </span>
        <span className="relative z-[1] flex items-center justify-center w-28 h-28">
          <FeatureArt icon={feat.icon} animated={animated} />
        </span>
      </div>
      <div className="p-[var(--spacing-6)] lg:p-[var(--spacing-8)] flex flex-col gap-[var(--spacing-2)]">
        <h3 className="text-[length:var(--text-xl)] font-semibold text-[var(--color-fg)] tracking-tight">
          {feat.title}
        </h3>
        <p className="text-[length:var(--text-sm)] leading-relaxed text-[var(--color-fg-muted)]">
          {feat.body}
        </p>
      </div>
    </article>
  );
}

export function SampleFeatures() {
  const stagger = useStagger(0.05);
  const fadeUp = useFadeUp();

  return (
    <section id="features" aria-labelledby="sample-features-title"
      className="relative py-[var(--spacing-24)] overflow-hidden">
      <Backdrop3D variant="lattice" />

      <Container className="relative z-10">
        <div className="max-w-3xl mb-[var(--spacing-16)]">
          <p className="flex items-center gap-[var(--spacing-2)] uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)] mb-[var(--spacing-4)]">
            <SparkleIcon size={16} />
            What's in the box
          </p>
          <h2 id="sample-features-title"
            className="text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-bold tracking-tight text-[var(--color-fg)]">
            Everything you'd build yourself, ready on day one.
          </h2>
        </div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)]"
        >
          {FEATURES.map((f) => (
            <motion.li key={f.title} variants={fadeUp}>
              <FeatureCard feat={f} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default SampleFeatures;
