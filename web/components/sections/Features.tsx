"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import {
  motion,
  useFadeUp,
  useStagger,
} from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { PlaywrightIcon } from "@/components/illustrations/PlaywrightIcon";
import { DashboardIcon } from "@/components/illustrations/DashboardIcon";
import { PaletteIcon } from "@/components/illustrations/PaletteIcon";
import { MotionIcon } from "@/components/illustrations/MotionIcon";
import { AccessibilityIcon } from "@/components/illustrations/AccessibilityIcon";
import { StackIcon } from "@/components/illustrations/StackIcon";
import { SectionOrnament } from "@/components/illustrations/SectionOrnament";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

type IconKey =
  | "loop"
  | "dashboard"
  | "color"
  | "motion"
  | "palette-grid"
  | "rules"
  | "constitution"
  | "stack";

interface Feature {
  icon: IconKey;
  title: string;
  body: string;
}

const FEATURES: Feature[] = [
  {
    icon: "loop",
    title: "Visual feedback loop",
    body: "Playwright captures the rendered page, Claude critiques the pixels against a 100-point rubric, applies fixes, and re-captures until the bar is met.",
  },
  {
    icon: "dashboard",
    title: "Senior dashboard literacy",
    body: "App shells, KPI tiles, data tables, chart cards, filter bars, command palette, notifications — all blueprinted and ready to drop in.",
  },
  {
    icon: "color",
    title: "Color engineering",
    body: "OKLCH ramps, WCAG + APCA contrast, colorblind-safe palettes, image extraction, and perceptual mixing — handled at a senior level.",
  },
  {
    icon: "motion",
    title: "Motion that respects users",
    body: "Framer Motion for React, Motion One for vanilla, GSAP for heavy timelines. Every animation is `prefers-reduced-motion`-safe by default.",
  },
  {
    icon: "palette-grid",
    title: "6 curated palettes",
    body: "Warm-editorial, neon-brutalism, cool-corporate, soft-pastel, deep-monochrome, vibrant-tech — each WCAG-checked across light and dark.",
  },
  {
    icon: "rules",
    title: "Encoded design rules",
    body: "Tinted neutrals, the 60–30–10 distribution, mobile iOS/Android grid, and a sidebar spacing cheat sheet — Claude consults them automatically.",
  },
  {
    icon: "constitution",
    title: "The constitution",
    body: "Seven hard rules every artifact obeys: 300-line cap, no hardcoded values, full state coverage, plus motion, a11y, and dark-mode parity.",
  },
  {
    icon: "stack",
    title: "Stack-agnostic",
    body: "Adapts to React, Vue, Svelte, and Solid; works with Tailwind, CSS Modules, styled-components, or plain CSS — never forces a new framework.",
  },
];

// One-off inline 6-palette-grid SVG (≤ 30 lines).
function PaletteGridIcon({ animated }: { animated: boolean }) {
  const TILES = [
    { x: 6, y: 8, c1: "var(--color-accent-300)", c2: "var(--color-accent-500)" },
    { x: 24, y: 8, c1: "var(--color-brand-300)", c2: "var(--color-brand-600)" },
    { x: 42, y: 8, c1: "var(--color-brand-500)", c2: "var(--color-accent-400)" },
    { x: 6, y: 36, c1: "var(--color-neutral-200)", c2: "var(--color-neutral-700)" },
    { x: 24, y: 36, c1: "var(--color-brand-100)", c2: "var(--color-brand-400)" },
    { x: 42, y: 36, c1: "var(--color-accent-100)", c2: "var(--color-accent-600)" },
  ];
  return (
    <svg role="img" aria-label="Six curated palettes" viewBox="0 0 64 64" width={64} height={64}>
      {TILES.map((t, i) => (
        <g key={i} style={animated ? { animation: `pg-pop 1.2s ${i * 0.08}s ease-out both` } : undefined}>
          <rect x={t.x} y={t.y} width="16" height="20" rx="3" fill={t.c1} stroke="var(--color-border)" strokeWidth="0.5" />
          <rect x={t.x} y={t.y + 12} width="16" height="8" rx="0" fill={t.c2} />
          <rect x={t.x} y={t.y + 12} width="16" height="0.5" fill="var(--color-neutral-900)" opacity="0.18" />
        </g>
      ))}
      <style>{`@keyframes pg-pop { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { [style*="pg-pop"] { animation: none !important; } }`}</style>
    </svg>
  );
}

function FeatureIllustration({ icon, animated }: { icon: IconKey; animated: boolean }) {
  switch (icon) {
    case "loop":
      return <PlaywrightIcon size={64} animated={animated} />;
    case "dashboard":
      return <DashboardIcon size={64} animated={animated} />;
    case "color":
      return <PaletteIcon size={64} animated={animated} />;
    case "motion":
      return <MotionIcon size={64} animated={animated} />;
    case "palette-grid":
      return <PaletteGridIcon animated={animated} />;
    case "rules":
      return <AccessibilityIcon size={64} animated={animated} />;
    case "constitution":
      // Reuse PaletteIcon would mismatch; pick a fitting one — Stack feels apt for "constitution".
      return <StackIcon size={64} animated={animated} />;
    case "stack":
      return <StackIcon size={64} animated={animated} />;
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
      className="
        group h-full
        flex flex-col
        rounded-[var(--radius-xl)]
        bg-[var(--color-surface)]
        border border-[var(--color-border)]
        shadow-[var(--shadow-sm)]
        outline-none
        overflow-hidden
        transition-[transform,box-shadow,border-color]
        duration-[var(--dur-default)] ease-[var(--ease-out)]
        hover:-translate-y-0.5
        hover:shadow-[var(--shadow-md)]
        active:translate-y-0
        focus-visible:ring-2
        focus-visible:ring-[var(--color-ring)]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[var(--color-bg)]
      "
    >
      <div
        aria-hidden="true"
        className="
          flex items-center justify-center
          h-32 w-full
          border-b border-[var(--color-border-subtle)]
        "
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--color-brand-500) 8%, var(--color-surface) 92%) 0%, var(--color-surface) 100%)",
        }}
      >
        <FeatureIllustration icon={feat.icon} animated={animated} />
      </div>
      <div className="p-6 lg:p-7 flex flex-col gap-2">
        <h3
          className="
            text-[length:var(--text-lg)] font-semibold
            text-[var(--color-fg)] tracking-tight
          "
        >
          {feat.title}
        </h3>
        <p
          className="
            text-[length:var(--text-sm)] leading-relaxed
            text-[var(--color-fg-muted)]
          "
        >
          {feat.body}
        </p>
      </div>
    </article>
  );
}

export function Features() {
  const stagger = useStagger(0.04);
  const fadeUp = useFadeUp();

  return (
    <section
      aria-labelledby="features-title"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <SectionOrnament variant="left" tone="brand" />
      <SectionOrnament variant="right" tone="accent" />

      <Container>
        <div className="max-w-3xl mb-14 lg:mb-20">
          <p
            className="
              flex items-center gap-2
              uppercase tracking-[0.18em]
              text-[length:var(--text-xs)] font-medium
              text-[var(--color-fg-subtle)] mb-4
            "
          >
            <SparkleIcon size={18} />
            What ships in the box
          </p>
          <h2
            id="features-title"
            className="
              text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)]
              font-bold tracking-tight text-[var(--color-fg)]
            "
          >
            Senior UI/UX, encoded.
          </h2>
        </div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            gap-5 lg:gap-6
          "
        >
          {FEATURES.map((feat) => (
            <motion.li key={feat.title} variants={fadeUp}>
              <FeatureCard feat={feat} />
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default Features;
