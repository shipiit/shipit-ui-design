"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { motion, useFadeUp } from "@/components/animations/Motion";
import { cn } from "@/lib/utils";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";

interface CommandTab {
  id: string;
  label: string;
  description: string;
  invocation: string;
}

const COMMANDS: CommandTab[] = [
  {
    id: "design",
    label: "design init",
    description:
      "Bootstrap a design system: tokens, primitives, motion presets, dark mode.",
    invocation: "/shipit-ui-design:design init",
  },
  {
    id: "palette",
    label: "palette",
    description:
      "Generate an OKLCH 11-step light + dark palette from a hex, image, or mood.",
    invocation: "/shipit-ui-design:palette #6366f1",
  },
  {
    id: "component",
    label: "component",
    description:
      "Generate a polished, fully-stated, fully-tokenized component.",
    invocation:
      "/shipit-ui-design:component subscription card with hover lift",
  },
  {
    id: "refine",
    label: "refine",
    description:
      "Visual loop — screenshot, critique, fix, re-screenshot, iterate.",
    invocation: "/shipit-ui-design:refine /pricing",
  },
  {
    id: "audit",
    label: "audit",
    description:
      "Read-only design audit. Multi-route audits fan out parallel subagents.",
    invocation: "/shipit-ui-design:audit",
  },
  {
    id: "motion",
    label: "motion",
    description: "Add tasteful, accessibility-aware motion.",
    invocation: "/shipit-ui-design:motion hero entrance",
  },
  {
    id: "illustrate",
    label: "illustrate",
    description:
      "Generate clean SVG illustrations matched to your tokens.",
    invocation: "/shipit-ui-design:illustrate empty inbox isometric",
  },
  {
    id: "scene",
    label: "scene",
    description:
      "Generate a React Three Fiber scene. Asks before adding 3D deps.",
    invocation: "/shipit-ui-design:scene ambient particles",
  },
];

export function Commands() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<Array<HTMLButtonElement | null>>([]);
  const fadeUp = useFadeUp();

  const focusTab = React.useCallback((index: number) => {
    const next = (index + COMMANDS.length) % COMMANDS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        focusTab(i + 1);
        break;
      case "ArrowLeft":
        e.preventDefault();
        focusTab(i - 1);
        break;
      case "Home":
        e.preventDefault();
        focusTab(0);
        break;
      case "End":
        e.preventDefault();
        focusTab(COMMANDS.length - 1);
        break;
    }
  };

  const current = COMMANDS[active];

  return (
    <section
      id="commands"
      aria-labelledby="commands-title"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <Backdrop3D variant="lattice" />
      <Container className="relative z-10">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <p
            className="
              uppercase tracking-[0.18em]
              text-[length:var(--text-xs)] font-medium
              text-[var(--color-fg-subtle)] mb-4
            "
          >
            Eight slash commands
          </p>
          <h2
            id="commands-title"
            className="
              text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)]
              font-bold tracking-tight text-[var(--color-fg)]
            "
          >
            Everything Claude needs to ship clean UI.
          </h2>
        </div>

        {/* Tab strip */}
        <div
          role="tablist"
          aria-label="Slash commands"
          className="
            relative
            border-b border-[var(--color-border)]
            mb-8
            -mx-6 sm:-mx-8 lg:-mx-10
            px-6 sm:px-8 lg:px-10
            overflow-x-auto
          "
        >
          <div className="flex gap-1 min-w-max">
            {COMMANDS.map((cmd, i) => {
              const selected = i === active;
              return (
                <button
                  key={cmd.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  type="button"
                  id={`commands-tab-${cmd.id}`}
                  aria-selected={selected}
                  aria-controls={`commands-panel-${cmd.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "relative h-10 px-4 inline-flex items-center",
                    "font-[var(--font-mono)] text-[length:var(--text-sm)]",
                    "rounded-[var(--radius-sm)]",
                    "transition-[color,background-color]",
                    "duration-[var(--dur-fast)] ease-[var(--ease-out)]",
                    "outline-none",
                    "hover:text-[var(--color-fg)]",
                    "active:bg-[var(--color-surface-elevated)]",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]",
                    "focus-visible:ring-offset-2",
                    "focus-visible:ring-offset-[var(--color-bg)]",
                    selected
                      ? "text-[var(--color-fg)]"
                      : "text-[var(--color-fg-muted)]",
                  )}
                >
                  /{cmd.label}
                  {selected && (
                    <motion.span
                      layoutId="commands-tab-indicator"
                      aria-hidden="true"
                      className="
                        absolute left-2 right-2 -bottom-px
                        h-0.5 rounded-full
                        bg-[var(--color-brand)]
                      "
                      transition={{
                        duration: 0.2,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active panel */}
        <motion.div
          key={current.id}
          role="tabpanel"
          id={`commands-panel-${current.id}`}
          aria-labelledby={`commands-tab-${current.id}`}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="
            rounded-[var(--radius-xl)]
            border border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-[var(--shadow-sm)]
            p-6 lg:p-8
            flex flex-col gap-6
          "
        >
          <p
            className="
              text-[length:var(--text-base)] lg:text-[length:var(--text-lg)]
              text-[var(--color-fg)] leading-relaxed
              max-w-2xl
            "
          >
            {current.description}
          </p>
          <CodeBlock
            code={current.invocation}
            language="bash"
            caption={`/${current.label}`}
          />
        </motion.div>
      </Container>
    </section>
  );
}

export default Commands;
