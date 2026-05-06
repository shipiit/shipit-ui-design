"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import {
  motion,
  useFadeUp,
  useStagger,
} from "@/components/animations/Motion";
import { BadgeNumberRing } from "@/components/illustrations/BadgeNumberRing";
import { SectionOrnament } from "@/components/illustrations/SectionOrnament";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

interface Rule {
  title: string;
  body: string;
}

const RULES: Rule[] = [
  {
    title: "Max 300 lines per file.",
    body: "If a component would exceed, it splits.",
  },
  {
    title: "No hardcoded design values.",
    body: "Colors, spacing, radii, shadows, durations — all from tokens.",
  },
  {
    title: "Every interactive element has hover, active, focus-visible, disabled.",
    body: "State coverage is non-optional. Affordance must be obvious without a tooltip.",
  },
  {
    title: "All motion respects prefers-reduced-motion.",
    body: "Every transition and animation provides a calm fallback for users who request one.",
  },
  {
    title: "Every image / illustration has alt text or aria-hidden if decorative.",
    body: "No mystery images. Decorative SVGs are explicitly marked as such.",
  },
  {
    title: "Dark mode is never an afterthought.",
    body: "Emitted alongside light from the start. Same hue, only L and C change.",
  },
  {
    title: "Stack-respect: never introduce a new framework or styling system.",
    body: "Adapt to whatever the project already uses. Tailwind, CSS Modules, styled-components, vanilla CSS.",
  },
];

// Three decorative edge patterns to cycle through. Each ≤ 10 lines.
function EdgePattern({ idx }: { idx: number }) {
  const variant = idx % 3;
  if (variant === 0) {
    // Dotted grid
    return (
      <svg aria-hidden="true" viewBox="0 0 40 80" className="absolute right-0 top-0 h-full w-10 opacity-40 pointer-events-none">
        {[...Array(8)].map((_, r) =>
          [...Array(4)].map((_, c) => (
            <circle key={`${r}-${c}`} cx={6 + c * 8} cy={6 + r * 10} r="1" fill="var(--color-brand-400)" />
          ))
        )}
      </svg>
    );
  }
  if (variant === 1) {
    // Wave
    return (
      <svg aria-hidden="true" viewBox="0 0 40 80" className="absolute right-0 top-0 h-full w-10 opacity-50 pointer-events-none">
        <path d="M4 8 Q 12 16, 20 8 T 36 8 M4 28 Q 12 36, 20 28 T 36 28 M4 48 Q 12 56, 20 48 T 36 48 M4 68 Q 12 76, 20 68 T 36 68" stroke="var(--color-accent-400)" strokeWidth="1.25" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  // Diagonal hatch
  return (
    <svg aria-hidden="true" viewBox="0 0 40 80" className="absolute right-0 top-0 h-full w-10 opacity-40 pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <line key={i} x1={-10 + i * 8} y1={-10} x2={10 + i * 8} y2={90} stroke="var(--color-brand-300)" strokeWidth="1" />
      ))}
    </svg>
  );
}

export function Constitution() {
  const stagger = useStagger(0.06);
  const fadeUp = useFadeUp();

  return (
    <section
      id="constitution"
      aria-labelledby="constitution-title"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <SectionOrnament variant="top" tone="brand" />

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="
              inline-flex items-center gap-2
              uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)]
            "
          >
            <SparkleIcon size={18} />
            The constitution
          </motion.p>
          <motion.h2
            id="constitution-title"
            variants={fadeUp}
            className="mt-4 text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)] font-semibold tracking-tight text-[var(--color-fg)] text-balance leading-[1.1]"
          >
            Seven rules every artifact obeys.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-[length:var(--text-lg)] text-[var(--color-fg-muted)] leading-relaxed"
          >
            These are non-negotiable. Every component, every palette, every
            illustration the plugin generates follows them.
          </motion.p>
        </motion.div>

        <motion.ol
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="
            mt-16 lg:mt-20
            grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
            gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)]
          "
        >
          {RULES.map((rule, i) => (
            <RuleCard
              key={rule.title}
              rule={rule}
              index={i}
              isLast={i === RULES.length - 1}
            />
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}

function RuleCard({
  rule,
  index,
  isLast,
}: {
  rule: Rule;
  index: number;
  isLast: boolean;
}) {
  const fadeUp = useFadeUp();
  return (
    <motion.li
      variants={fadeUp}
      className={`
        group relative flex flex-col overflow-hidden
        rounded-[var(--radius-xl)]
        bg-[var(--color-surface-elevated)]
        border border-[var(--color-border-subtle)]
        p-[var(--spacing-6)] lg:p-[var(--spacing-8)]
        shadow-[var(--shadow-sm)]
        transition-[transform,box-shadow,border-color]
        duration-[var(--dur-default)]
        hover:-translate-y-[2px]
        hover:shadow-[var(--shadow-md)]
        hover:border-[var(--color-border)]
        focus-within:-translate-y-[2px]
        focus-within:shadow-[var(--shadow-md)]
        motion-reduce:transition-none
        motion-reduce:hover:translate-y-0
        ${isLast ? "md:col-span-2 md:max-w-[calc(50%-var(--spacing-3))] md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0 lg:col-start-2" : ""}
      `}
    >
      <EdgePattern idx={index} />

      <BadgeNumberRing size={72}>
        <span
          aria-hidden="true"
          className="
            text-gradient-brand
            text-[length:var(--text-3xl)] font-extrabold
            tabular-nums leading-none tracking-tight
          "
        >
          {index + 1}
        </span>
      </BadgeNumberRing>

      <h3
        className="
          mt-[var(--spacing-5)]
          text-[length:var(--text-lg)] font-semibold
          text-[var(--color-fg)] leading-snug
          tracking-tight
          relative
        "
      >
        <span className="sr-only">Rule {index + 1}: </span>
        {rule.title}
      </h3>
      <p
        className="
          mt-[var(--spacing-2)]
          text-[length:var(--text-sm)]
          text-[var(--color-fg-muted)] leading-relaxed
          relative
        "
      >
        {rule.body}
      </p>
    </motion.li>
  );
}

export default Constitution;
