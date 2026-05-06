"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";

const BAD_CODE = `.button {
  background: #4f46e5;
  padding: 12px 24px;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  /* no hover. no active. no focus.
     no disabled. no dark mode. */
}`;

const GOOD_CODE = `.button {
  background: var(--color-brand);
  padding: var(--space-3) var(--space-6);
  color: var(--color-fg-on-brand);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  transition: transform var(--dur-fast) var(--ease-out),
              background-color var(--dur-fast) var(--ease-out);
}
.button:hover    { background: var(--color-brand-hover); }
.button:active   { transform: scale(0.98); }
.button:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
@media (prefers-reduced-motion: reduce) {
  .button { transition: none; }
}`;

export function CodeExample() {
  const stagger = useStagger(0.06);
  const fadeUp = useFadeUp();

  return (
    <section
      id="example"
      aria-labelledby="example-title"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <Backdrop3D variant="grid-tilt" />
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
            Generated code
          </motion.p>
          <motion.h2
            id="example-title"
            variants={fadeUp}
            className="mt-4 text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)] font-semibold tracking-tight text-[var(--color-fg)] text-balance leading-[1.1]"
          >
            Tokenized on day one.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="
            mt-16 lg:mt-20
            grid grid-cols-1 lg:grid-cols-2
            gap-[var(--spacing-6)] lg:gap-[var(--spacing-8)]
          "
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-[var(--spacing-4)]">
            <ColumnHeader
              tone="bad"
              title="What most LLMs ship"
              caption="bare hex, raw px, no states"
            />
            <CodeBlock
              code={BAD_CODE}
              language="css"
              caption="button.css — anti-pattern"
              showCopy={false}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-[var(--spacing-4)]">
            <ColumnHeader
              tone="good"
              title="What shipit-ui-design ships"
              caption="tokens, full states, reduced-motion safe"
            />
            <CodeBlock
              code={GOOD_CODE}
              language="css"
              caption="button.css — tokenized"
              showCopy={false}
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="
            mt-[var(--spacing-10)] lg:mt-[var(--spacing-12)]
            max-w-2xl mx-auto text-center
            text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed
          "
        >
          Every token resolves to a value in{" "}
          <code className="font-mono text-[var(--color-fg)] bg-[var(--color-surface-elevated)] border border-[var(--color-border-subtle)] rounded-[var(--radius-sm)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)]">
            tokens.css
          </code>
          {" "}— flip dark mode, swap brand color, reskin the whole product.
        </motion.p>
      </Container>
    </section>
  );
}

function ColumnHeader({
  tone,
  title,
  caption,
}: {
  tone: "bad" | "good";
  title: string;
  caption: string;
}) {
  const dotColor =
    tone === "bad"
      ? "bg-[oklch(70%_0.18_25)]"
      : "bg-[var(--color-brand)]";
  return (
    <div className="flex items-center gap-[var(--spacing-3)] px-[var(--spacing-1)]">
      <span
        aria-hidden="true"
        className={`h-[var(--spacing-2)] w-[var(--spacing-2)] rounded-[var(--radius-full)] shrink-0 ${dotColor}`}
      />
      <div className="min-w-0">
        <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)] leading-tight">
          {title}
        </h3>
        <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)] mt-[2px]">
          {caption}
        </p>
      </div>
    </div>
  );
}

export default CodeExample;
