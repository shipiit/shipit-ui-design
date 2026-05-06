"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { DashboardMockup } from "@/components/illustrations/DashboardMockup";
import { motion, useFadeUp, useStagger, useFloatGentle } from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const REPO = "https://github.com/shipiit/shipit-ui-design";
const INSTALL_SNIPPET = `/plugin marketplace add shipiit/shipit-ui-design
/plugin install shipit-ui-design@shipit
/reload-plugins`;
const STATS = ["8 commands", "8 skills", "100-pt rubric", "MIT"];

interface FloatChip { label: string; sub: string; pos: string; delay: number; icon: React.ReactNode; }

export function Hero() {
  const fadeUp = useFadeUp();
  const stagger = useStagger(0.12);
  const floatA = useFloatGentle(8, 7);
  const floatB = useFloatGentle(6, 9);
  const floatC = useFloatGentle(7, 11);
  const reduced = useReducedMotion();

  const chips: FloatChip[] = [
    { label: "100/100 score", sub: "rubric pass", pos: "left-[-4%] top-[6%]", delay: 0, icon: <CheckIcon /> },
    { label: "Auto dark mode", sub: "tokens swap", pos: "right-[-4%] bottom-[10%]", delay: 0.15, icon: <MoonIcon /> },
    { label: "OKLCH palette", sub: "perceptual", pos: "right-[-6%] top-[42%]", delay: 0.3, icon: <SwatchIcon /> },
  ];
  const chipFloats = [floatA, floatB, floatC];

  return (
    <section
      id="top"
      className={cn(
        "relative isolate overflow-hidden min-h-[88vh] flex items-center",
        "py-[var(--spacing-16)] lg:py-[var(--spacing-24)]",
      )}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <MeshOrb className="left-[-8%] top-[-12%] h-[44rem] w-[44rem]" color="var(--color-brand-500)" opacity={0.22} animate={!reduced} variant="A" />
        <MeshOrb className="right-[-10%] top-[8%] h-[40rem] w-[40rem]" color="var(--color-accent-400)" opacity={0.2} animate={!reduced} variant="B" />
        <MeshOrb className="left-[20%] bottom-[-18%] h-[42rem] w-[42rem]" color="var(--color-brand-300)" opacity={0.18} animate={!reduced} variant="C" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-bg))" }}
        />
      </div>

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid items-center gap-[var(--spacing-12)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]"
        >
          {/* LEFT */}
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
                  <span
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ background: "var(--color-accent-400)", opacity: 0.6 }}
                  />
                )}
                <span
                  className="relative inline-flex h-full w-full rounded-full"
                  style={{ background: "var(--color-accent-400)" }}
                />
              </span>
              Claude Code plugin · v0.1.0
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className={cn(
                "mt-[var(--spacing-6)] font-extrabold text-balance text-[var(--color-fg)]",
                "text-[length:var(--text-5xl)] lg:text-[length:var(--text-6xl)]",
              )}
              style={{ letterSpacing: "-0.025em", lineHeight: 1.05 }}
            >
              <span className="text-gradient-brand">Senior UI/UX</span>
              <br />
              in your terminal.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className={cn(
                "mt-[var(--spacing-6)] max-w-xl text-balance leading-relaxed",
                "text-[length:var(--text-lg)] text-[var(--color-fg-muted)]",
              )}
            >
              A Claude Code plugin that turns Claude Code into a senior designer. Bootstraps design systems,
              generates polished components and dashboards, and iterates visually with a screenshot-based
              critique loop.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-[var(--spacing-8)] flex flex-wrap items-center gap-[var(--spacing-3)]"
            >
              <Button as="a" href="#install" size="lg" variant="primary">Install in Claude Code</Button>
              <Button as="a" href={REPO} target="_blank" rel="noreferrer noopener" size="lg" variant="ghost">
                <span>View on GitHub</span>
                <ArrowRight />
              </Button>
            </motion.div>

            <motion.ul
              variants={fadeUp}
              className={cn(
                "mt-[var(--spacing-8)] flex flex-wrap items-center",
                "gap-x-[var(--spacing-6)] gap-y-[var(--spacing-2)]",
                "text-[length:var(--text-sm)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]",
              )}
            >
              {STATS.map((s, i) => (
                <li
                  key={s}
                  className={cn(
                    "flex items-center",
                    i > 0 && "lg:pl-[var(--spacing-6)] lg:border-l lg:border-[var(--color-border-subtle)]",
                  )}
                >
                  {s}
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT */}
          <motion.div variants={fadeUp} className="relative w-full max-w-full">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 blur-3xl opacity-50"
              style={{ background: "radial-gradient(closest-side, var(--color-brand-400), transparent 70%)" }}
            />
            <motion.div
              variants={floatA}
              animate="rest"
              className="relative w-full lg:[transform:perspective(1200px)_rotateY(-6deg)_rotateX(2deg)]"
              style={{ filter: "drop-shadow(var(--shadow-xl))" }}
            >
              <DashboardMockup className="w-full h-auto" />
            </motion.div>

            <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
              {chips.map((chip, i) => (
                <motion.div
                  key={chip.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + chip.delay, duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={cn("absolute", chip.pos)}
                >
                  <motion.div
                    variants={chipFloats[i]}
                    animate="rest"
                    className={cn(
                      "flex items-center gap-[var(--spacing-2)]",
                      "py-[var(--spacing-2)] px-[var(--spacing-3)] rounded-[var(--radius-lg)]",
                      "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)]",
                    )}
                  >
                    <span className={cn(
                      "flex items-center justify-center h-7 w-7 rounded-[var(--radius-md)]",
                      "bg-[var(--color-brand-50)] text-[var(--color-brand)]",
                      "dark:bg-[var(--color-surface-elevated)]",
                    )}>
                      {chip.icon}
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">{chip.label}</span>
                      <span className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">{chip.sub}</span>
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Container variant="narrow" className="mt-[var(--spacing-16)] px-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: reduced ? 0.01 : 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <CodeBlock code={INSTALL_SNIPPET} language="bash" caption="Install in 60 seconds" />
          </motion.div>
        </Container>
      </Container>
    </section>
  );
}

function MeshOrb({ className, color, opacity, animate, variant }: {
  className: string; color: string; opacity: number; animate: boolean; variant: "A" | "B" | "C";
}) {
  const motions: Record<"A" | "B" | "C", { x: number[]; y: number[] }> = {
    A: { x: [0, 24, -16, 0], y: [0, -18, 12, 0] },
    B: { x: [0, -22, 16, 0], y: [0, 14, -16, 0] },
    C: { x: [0, 18, -22, 0], y: [0, -14, 18, 0] },
  };
  const m = motions[variant];
  return (
    <motion.div
      className={cn("absolute rounded-full blur-3xl", className)}
      style={{ background: `radial-gradient(closest-side, ${color}, transparent 70%)`, opacity }}
      animate={animate ? { x: m.x, y: m.y } : undefined}
      transition={animate ? { duration: 15, repeat: Infinity, ease: "easeInOut" } : undefined}
    />
  );
}

function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
function SwatchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
      <circle cx="17" cy="17" r="4" />
    </svg>
  );
}

export default Hero;
