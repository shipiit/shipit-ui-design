"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

type StageId =
  | "detect" | "boot" | "capture" | "critique" | "plan" | "edit" | "loop";

interface Stage { id: StageId; label: string; caption: string }

const STAGES: Stage[] = [
  { id: "detect", label: "detect", caption: "find dev script" },
  { id: "boot", label: "boot", caption: "start dev server" },
  { id: "capture", label: "capture", caption: "screenshot viewports" },
  { id: "critique", label: "critique", caption: "score the rubric" },
  { id: "plan", label: "plan", caption: "rank fixes by impact" },
  { id: "edit", label: "edit", caption: "apply changes" },
  { id: "loop", label: "loop", caption: "until score ≥ 85" },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const STAGE_PATHS: Record<StageId, React.ReactNode> = {
  detect: (<><circle cx="14" cy="14" r="8" /><path d="M28 28l-8-8" /></>),
  boot: (<><polygon points="8 5 26 16 8 27 8 5" fill="currentColor" opacity="0.18" /><polygon points="8 5 26 16 8 27 8 5" /></>),
  capture: (<><path d="M4 9h5l2-3h10l2 3h5v17H4z" /><circle cx="16" cy="17" r="4.5" /></>),
  critique: (<><path d="M5 8h22M5 16h14M5 24h22" /><circle cx="24" cy="16" r="2" fill="currentColor" /></>),
  plan: (<><circle cx="16" cy="16" r="11" /><circle cx="16" cy="16" r="6" /><circle cx="16" cy="16" r="1.5" fill="currentColor" /></>),
  edit: (<><path d="M14 26h12" /><path d="M21 5.5a2.5 2.5 0 1 1 3.5 3.5L9 24l-5 1 1-5z" /></>),
  loop: (<><path d="M28 16a12 12 0 1 1-4-9" /><path d="M28 4v8h-8" /></>),
};

function StageIcon({ id }: { id: StageId }) {
  return (
    <svg
      width={32} height={32} viewBox="0 0 32 32" fill="none"
      stroke="currentColor" strokeWidth={1.75}
      strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
    >
      {STAGE_PATHS[id]}
    </svg>
  );
}

export interface RefinePipelineProps {
  className?: string;
}

export function RefinePipeline({ className }: RefinePipelineProps) {
  const reduced = !!useReducedMotion();
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
            staggerChildren: reduced ? 0 : 0.08,
            delayChildren: reduced ? 0 : 0.12,
          },
        },
      }}
      className={[
        "relative mt-16 lg:mt-20",
        "flex flex-col lg:flex-row items-stretch lg:items-start",
        "gap-[var(--spacing-4)] lg:gap-[var(--spacing-2)]",
        className ?? "",
      ].join(" ")}
    >
      {STAGES.map((s, i) => (
        <React.Fragment key={s.id}>
          <PipelineChip stage={s} index={i} reduced={reduced} />
          {i < STAGES.length - 1 && (
            <Connector index={i} reduced={reduced} />
          )}
        </React.Fragment>
      ))}
    </motion.ol>
  );
}

function PipelineChip({
  stage,
  index,
  reduced,
}: {
  stage: Stage;
  index: number;
  reduced: boolean;
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, y: 12, scale: 0.96 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.45, ease: EASE },
        },
      }}
      className="flex-1 min-w-0 flex flex-col items-center text-center"
    >
      <motion.div
        animate={
          reduced
            ? undefined
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: 4.8,
          repeat: reduced ? 0 : Infinity,
          ease: "easeInOut",
          delay: (index * 200) / 1000,
        }}
        className="
          relative w-full
          flex flex-col items-center justify-center
          gap-[var(--spacing-2)]
          min-h-[88px]
          py-[var(--spacing-3)] px-[var(--spacing-5)]
          rounded-[var(--radius-2xl)]
          bg-[var(--color-surface)]
          border border-[var(--color-border-subtle)]
          shadow-[var(--shadow-sm)]
          text-[var(--color-fg)]
        "
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, color-mix(in oklab, var(--color-brand-500) 10%, transparent), transparent 65%)",
        }}
      >
        <span
          aria-hidden="true"
          className="
            inline-flex items-center justify-center
            text-[var(--color-brand)]
            h-8 w-8
          "
        >
          <StageIcon id={stage.id} />
        </span>
        <span className="flex flex-col items-center leading-tight">
          <span className="text-[length:var(--text-sm)] font-semibold tracking-tight">
            <span className="text-[var(--color-fg-subtle)] mr-1 font-mono tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            {stage.label}
          </span>
          <span className="mt-[2px] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
            {stage.caption}
          </span>
        </span>
      </motion.div>
    </motion.li>
  );
}

function Connector({ index, reduced }: { index: number; reduced: boolean }) {
  const lineVariants = {
    hidden: { pathLength: reduced ? 1 : 0 },
    visible: {
      pathLength: 1,
      transition: { duration: 0.5, ease: EASE, delay: index * 0.04 },
    },
  };
  return (
    <motion.div
      aria-hidden="true"
      variants={{
        hidden: { opacity: reduced ? 1 : 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.5, ease: EASE, delay: index * 0.04 },
        },
      }}
      className="self-center shrink-0"
    >
      <svg className="hidden lg:block" width="32" height="2" viewBox="0 0 32 2">
        <motion.path
          d="M0 1 L32 1"
          stroke="var(--color-brand-400)"
          strokeWidth="2"
          strokeLinecap="round"
          variants={lineVariants}
        />
      </svg>
      <svg
        className="block lg:hidden mx-auto"
        width="2"
        height="20"
        viewBox="0 0 2 20"
      >
        <motion.path
          d="M1 0 L1 20"
          stroke="var(--color-brand-400)"
          strokeWidth="2"
          strokeLinecap="round"
          variants={lineVariants}
        />
      </svg>
    </motion.div>
  );
}

export default RefinePipeline;
