"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { RefinePipeline } from "@/components/illustrations/RefinePipeline";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";

interface Score {
  label: string;
  value: number;
}

const SCORES: Score[] = [
  { label: "Visual hierarchy", value: 92 },
  { label: "Spacing & rhythm", value: 88 },
  { label: "Color & contrast", value: 95 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Refine() {
  const stagger = useStagger(0.05);
  const fadeUp = useFadeUp();
  const reduced = !!useReducedMotion();

  return (
    <section
      id="refine"
      aria-labelledby="refine-title"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <Backdrop3D variant="soft-mesh" />

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.p
            variants={fadeUp}
            className="uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)]"
          >
            How /refine works
          </motion.p>
          <motion.h2
            id="refine-title"
            variants={fadeUp}
            className="mt-4 text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)] font-semibold tracking-tight text-[var(--color-fg)] text-balance leading-[1.1]"
          >
            Claude looks at the pixels, not just the source.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-2xl mx-auto text-[length:var(--text-lg)] text-[var(--color-fg-muted)] leading-relaxed"
          >
            The visual loop screenshots your rendered page across viewports and
            themes, scores it against a 100-point rubric, applies fixes,
            re-screenshots, and iterates until the bar is met.
          </motion.p>
        </motion.div>

        <RefinePipeline />
        <ScoreCard reduced={reduced} />
      </Container>
    </section>
  );
}

function ScoreCard({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mt-16 lg:mt-20 max-w-4xl mx-auto"
      style={{ perspective: "1200px" }}
    >
      {/* Soft brand under-glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-[var(--radius-2xl)]"
        style={{
          filter: "blur(40px)",
          opacity: 0.4,
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--color-brand-400) 35%, transparent), transparent 70%)",
          transform: "translateY(8%) scale(0.96)",
        }}
      />

      <motion.div
        data-refine-tilt-frame
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0.01 : 0.5, ease: EASE }}
        viewport={{ once: true, amount: 0.3 }}
        className="
          refine-tilt-frame
          rounded-[var(--radius-xl)]
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border-subtle)]
          shadow-[var(--shadow-lg)]
          p-[var(--spacing-6)] lg:p-[var(--spacing-8)]
          grid grid-cols-1 lg:grid-cols-[1fr_auto]
          gap-[var(--spacing-8)] items-center
        "
      >
        <div className="flex flex-col gap-[var(--spacing-5)]">
          <p className="text-[length:var(--text-xs)] uppercase tracking-[0.16em] text-[var(--color-fg-subtle)] font-medium">
            Rubric breakdown
          </p>
          {SCORES.map((s, i) => (
            <ScoreBar key={s.label} score={s} reduced={reduced} delay={i * 0.1} />
          ))}
        </div>
        <ScoreDelta reduced={reduced} />
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          .refine-tilt-frame {
            transform: perspective(1200px) rotateY(-3deg) rotateX(1deg);
            transform-style: preserve-3d;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .refine-tilt-frame { transform: none !important; }
        }
      `}</style>
    </div>
  );
}

function ScoreBar({
  score,
  reduced,
  delay,
}: {
  score: Score;
  reduced: boolean;
  delay: number;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-2)]">
      <div className="flex items-baseline justify-between gap-[var(--spacing-3)]">
        <span className="text-[length:var(--text-sm)] text-[var(--color-fg)] font-medium">
          {score.label}
        </span>
        <span className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] tabular-nums font-mono">
          {score.value}
        </span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={score.value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${score.label} score`}
        className="h-[var(--spacing-2)] w-full rounded-[var(--radius-full)] bg-[var(--color-neutral-200)] overflow-hidden"
      >
        <motion.div
          initial={{ width: reduced ? `${score.value}%` : 0 }}
          whileInView={{ width: `${score.value}%` }}
          transition={{
            duration: reduced ? 0.01 : 0.9,
            ease: EASE,
            delay: reduced ? 0 : delay + 0.2,
          }}
          viewport={{ once: true, amount: 0.4 }}
          className="h-full rounded-[var(--radius-full)]"
          style={{
            background:
              "linear-gradient(90deg, var(--color-brand-400), var(--color-accent-400))",
          }}
        />
      </div>
    </div>
  );
}

function ScoreDelta({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-[var(--spacing-6)] py-[var(--spacing-5)] shadow-[var(--shadow-sm)]">
      <span className="text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)] font-medium">
        After /refine
      </span>
      <div className="flex items-center gap-[var(--spacing-3)]">
        <span className="text-[length:var(--text-xl)] font-mono tabular-nums text-[var(--color-fg-muted)] line-through decoration-[var(--color-fg-subtle)]/50">
          67
        </span>
        <motion.svg
          width="22"
          height="14"
          viewBox="0 0 22 14"
          fill="none"
          aria-hidden="true"
          initial={{ x: reduced ? 0 : -6, opacity: reduced ? 1 : 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : 0.4, delay: reduced ? 0 : 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-[var(--color-brand)]"
        >
          <path
            d="M1 7h18m0 0l-5-5m5 5l-5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
        <span className="text-[length:var(--text-3xl)] font-mono tabular-nums font-semibold text-[var(--color-brand)]">
          91
        </span>
        <span className="text-[length:var(--text-sm)] text-[var(--color-fg-subtle)]">
          /100
        </span>
      </div>
      <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
        one pass, +24 points
      </span>
    </div>
  );
}

export default Refine;
