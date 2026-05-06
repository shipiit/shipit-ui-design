"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { Button } from "@/components/primitives/Button";
import {
  motion,
  useFadeUp,
  useStagger,
} from "@/components/animations/Motion";
import { useReducedMotion } from "motion/react";
import { MarketplaceIcon } from "@/components/illustrations/MarketplaceIcon";
import { InstallIcon } from "@/components/illustrations/InstallIcon";
import { ActivateIcon } from "@/components/illustrations/ActivateIcon";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { InstallPreview } from "@/components/sections/InstallPreview";

type IconKey = "marketplace" | "install" | "activate";

interface Step {
  n: number;
  title: string;
  body: string;
  code: string;
  caption: string;
  icon: IconKey;
  preview: string[];
}

const STEPS: Step[] = [
  {
    n: 1,
    title: "Add the marketplace",
    body: "Inside Claude Code, register the shipit catalog.",
    code: "/plugin marketplace add shipiit/shipit-ui-design",
    caption: "claude-code",
    icon: "marketplace",
    preview: ["✓ Successfully added marketplace: shipit"],
  },
  {
    n: 2,
    title: "Install the plugin",
    body: "Defaults to user scope (every project on your machine).",
    code: "/plugin install shipit-ui-design@shipit",
    caption: "claude-code",
    icon: "install",
    preview: [
      "✓ Installed shipit-ui-design",
      "  Run /reload-plugins to apply.",
    ],
  },
  {
    n: 3,
    title: "Activate",
    body: "Skills and commands light up.",
    code: "/reload-plugins",
    caption: "claude-code",
    icon: "activate",
    preview: [
      "✓ Reloaded plugins",
      "  · 8 skills · 8 commands · 1 hook",
    ],
  },
];

function StepIcon({ icon }: { icon: IconKey }) {
  if (icon === "marketplace") return <MarketplaceIcon size={36} />;
  if (icon === "install") return <InstallIcon size={36} />;
  return <ActivateIcon size={36} />;
}

export function Install() {
  const stagger = useStagger(0.06);
  const fadeUp = useFadeUp();
  const reduced = useReducedMotion();

  return (
    <section
      id="install"
      aria-labelledby="install-title"
      className="py-24 lg:py-32"
    >
      <Container variant="wide">
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p
            className="
              flex items-center gap-2
              uppercase tracking-[0.18em]
              text-[length:var(--text-xs)] font-medium
              text-[var(--color-fg-subtle)] mb-4
            "
          >
            <SparkleIcon size={18} />
            Three commands. Three minutes.
          </p>
          <h2
            id="install-title"
            className="
              text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)]
              font-bold tracking-tight text-[var(--color-fg)]
            "
          >
            Install.
          </h2>
        </div>

        <motion.ol
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="relative flex flex-col gap-12 lg:gap-16"
        >
          {/* Vertical rail (animated draw-in) */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleY: reduced ? 1 : 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: reduced ? 0.01 : 0.9,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "top" }}
            className="
              absolute left-7 top-2 bottom-2
              w-px bg-[var(--color-border)]
              lg:left-7
            "
          />

          {STEPS.map((step, idx) => (
            <motion.li
              key={step.n}
              variants={fadeUp}
              className="
                relative pl-20
                grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10
                items-start
              "
            >
              {/* Illustrated icon in circle */}
              <span
                aria-hidden="true"
                className="
                  absolute left-0 top-0
                  inline-flex items-center justify-center
                  h-14 w-14
                  rounded-[var(--radius-full)]
                  bg-[var(--color-brand-50)]
                  ring-1 ring-[var(--color-border-subtle)]
                  shadow-[var(--shadow-sm)]
                "
                style={{
                  // Subtle dark-mode-safe brand wash via color-mix
                  background:
                    "color-mix(in oklab, var(--color-brand-500) 12%, var(--color-surface) 88%)",
                }}
              >
                <StepIcon icon={step.icon} />
              </span>

              <div>
                <h3
                  className="
                    text-[length:var(--text-lg)] lg:text-[length:var(--text-xl)]
                    font-semibold tracking-tight
                    text-[var(--color-fg)]
                    mb-2
                  "
                >
                  <span className="sr-only">Step {idx + 1}: </span>
                  {step.title}
                </h3>
                <p
                  className="
                    text-[length:var(--text-sm)] leading-relaxed
                    text-[var(--color-fg-muted)]
                    mb-4
                  "
                >
                  {step.body}
                </p>
                <CodeBlock
                  code={step.code}
                  language="bash"
                  caption={step.caption}
                />
                <span className="sr-only">
                  Step {idx + 1} of {STEPS.length}
                </span>
              </div>

              <div className="hidden lg:block">
                <InstallPreview lines={step.preview} />
              </div>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="
            mt-12 lg:mt-16 pl-20
            flex flex-col sm:flex-row sm:items-center
            gap-4 sm:gap-6
          "
        >
          <Button
            as="a"
            href="https://github.com/shipiit/shipit-ui-design"
            variant="primary"
            size="lg"
            rel="noreferrer noopener"
            target="_blank"
          >
            Open the README on GitHub
            <ArrowIcon />
          </Button>
          <p
            className="
              text-[length:var(--text-xs)]
              text-[var(--color-fg-muted)]
              leading-relaxed
            "
          >
            Optional:{" "}
            <code
              className="
                font-[var(--font-mono)]
                text-[var(--color-fg)]
                bg-[var(--color-surface-elevated)]
                border border-[var(--color-border-subtle)]
                rounded-[var(--radius-sm)]
                px-1.5 py-0.5
              "
            >
              npx playwright install chromium
            </code>{" "}
            for the visual loop.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export default Install;
