"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";

type StageId =
  | "detect" | "boot" | "capture" | "critique" | "plan" | "edit" | "loop";

interface Stage { id: StageId; label: string; caption: string }

const STAGES: Stage[] = [
  { id: "detect",   label: "detect",   caption: "find dev script" },
  { id: "boot",     label: "boot",     caption: "start dev server" },
  { id: "capture",  label: "capture",  caption: "screenshot viewports" },
  { id: "critique", label: "critique", caption: "score the rubric" },
  { id: "plan",     label: "plan",     caption: "rank fixes by impact" },
  { id: "edit",     label: "edit",     caption: "apply changes" },
  { id: "loop",     label: "loop",     caption: "until score ≥ 85" },
];

const ICON_PATHS: Record<StageId, React.ReactNode> = {
  detect:   (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  boot:     <polygon points="5 3 19 12 5 21 5 3" />,
  capture:  (<><path d="M3 7h4l2-3h6l2 3h4v12H3z" /><circle cx="12" cy="13" r="3.5" /></>),
  critique: <path d="M4 7h16M4 12h10M4 17h16" />,
  plan:     (<><path d="M9 11l3 3 8-8" /><path d="M20 12v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h11" /></>),
  edit:     (<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4z" /></>),
  loop:     (<><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /></>),
};

interface Score { label: string; value: number }
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
    <section id="refine" aria-labelledby="refine-title" className="py-24 lg:py-32">
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
            The visual loop screenshots your rendered page across viewports
            and themes, scores it against a 100-point rubric, applies fixes,
            re-screenshots, and iterates until the bar is met.
          </motion.p>
        </motion.div>

        <Pipeline reduced={reduced} />
        <ScoreCard reduced={reduced} />
      </Container>
    </section>
  );
}

function Pipeline({ reduced }: { reduced: boolean }) {
  return (
    <motion.ol
      role="list"
      aria-label="Refine pipeline stages"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduced ? 0 : 0.06,
            delayChildren: reduced ? 0 : 0.1,
          },
        },
      }}
      className="relative mt-16 lg:mt-20 flex flex-col lg:flex-row items-stretch lg:items-start gap-4 lg:gap-2"
    >
      {STAGES.map((s, i) => (
        <React.Fragment key={s.id}>
          <motion.li
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.96 },
              visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE } },
            }}
            className="flex-1 flex flex-col items-center text-center min-w-0"
          >
            <div className="inline-flex items-center justify-center gap-[var(--spacing-2)] h-[var(--spacing-10)] px-[var(--spacing-4)] rounded-[var(--radius-full)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-sm)] text-[var(--color-fg)]">
              <span className="text-[var(--color-fg-muted)] flex items-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICON_PATHS[s.id]}
                </svg>
              </span>
              <span className="text-[length:var(--text-sm)] font-medium tabular-nums">
                <span className="text-[var(--color-fg-subtle)] mr-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </span>
            </div>
            <p className="mt-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
              {s.caption}
            </p>
          </motion.li>
          {i < STAGES.length - 1 && (
            <motion.div
              aria-hidden="true"
              variants={{
                hidden: { scaleX: reduced ? 1 : 0, scaleY: reduced ? 1 : 0, opacity: 0 },
                visible: { scaleX: 1, scaleY: 1, opacity: 1, transition: { duration: 0.35, ease: EASE } },
              }}
              className="self-center origin-left shrink-0 w-[2px] h-[var(--spacing-6)] lg:w-[var(--spacing-6)] lg:h-[2px] bg-[var(--color-border)] mt-[var(--spacing-2)] lg:mt-[var(--spacing-5)]"
            />
          )}
        </React.Fragment>
      ))}
    </motion.ol>
  );
}

function ScoreCard({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0.01 : 0.5, ease: EASE }}
      viewport={{ once: true, amount: 0.3 }}
      className="mt-16 lg:mt-20 max-w-4xl mx-auto rounded-[var(--radius-xl)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] shadow-[var(--shadow-md)] p-[var(--spacing-6)] lg:p-[var(--spacing-8)] grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[var(--spacing-8)] items-center"
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
  );
}

function ScoreBar({ score, reduced, delay }: { score: Score; reduced: boolean; delay: number }) {
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
          transition={{ duration: reduced ? 0.01 : 0.9, ease: EASE, delay: reduced ? 0 : delay + 0.2 }}
          viewport={{ once: true, amount: 0.4 }}
          className="h-full bg-[var(--color-brand)] rounded-[var(--radius-full)]"
        />
      </div>
    </div>
  );
}

function ScoreDelta({ reduced }: { reduced: boolean }) {
  return (
    <div className="flex flex-col items-center gap-[var(--spacing-2)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-subtle)] px-[var(--spacing-6)] py-[var(--spacing-5)]">
      <span className="text-[length:var(--text-xs)] uppercase tracking-[0.14em] text-[var(--color-fg-subtle)] font-medium">
        After /refine
      </span>
      <div className="flex items-center gap-[var(--spacing-3)]">
        <span className="text-[length:var(--text-xl)] font-mono tabular-nums text-[var(--color-fg-muted)] line-through decoration-[var(--color-fg-subtle)]/50">
          67
        </span>
        <motion.svg
          width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true"
          initial={{ x: reduced ? 0 : -6, opacity: reduced ? 1 : 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: reduced ? 0.01 : 0.4, delay: reduced ? 0 : 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
          className="text-[var(--color-brand)]"
        >
          <path d="M1 7h18m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
        <span className="text-[length:var(--text-3xl)] font-mono tabular-nums font-semibold text-[var(--color-brand)]">
          91
        </span>
        <span className="text-[length:var(--text-sm)] text-[var(--color-fg-subtle)]">/100</span>
      </div>
      <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
        one pass, +24 points
      </span>
    </div>
  );
}

export default Refine;
