"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";

interface QA {
  q: string;
  a: React.ReactNode;
}

const FAQS: QA[] = [
  {
    q: "What does it actually do?",
    a: (
      <>
        Bootstraps design systems, generates polished components and dashboards,
        and iterates visually via screenshot critique. It works inside your
        existing project — never as a standalone artifact.
      </>
    ),
  },
  {
    q: "Which stacks does it work with?",
    a: (
      <>
        Adapts to React, Next, Vite, Remix, Astro, Nuxt, SvelteKit, and React
        Native. Styling: Tailwind, CSS Modules, styled-components, or vanilla
        CSS. It auto-detects what you already use.
      </>
    ),
  },
  {
    q: "Do I need Playwright?",
    a: (
      <>
        Only for the <Code>/refine</Code> command. Other commands work without
        it. One-time install: <Code>npx playwright install chromium</Code>.
      </>
    ),
  },
  {
    q: "Is it free?",
    a: (
      <>
        Yes — MIT licensed. Claude Code itself follows Anthropic&rsquo;s
        pricing.
      </>
    ),
  },
  {
    q: "Can I install it for my whole team?",
    a: (
      <>
        Yes. During install, choose <em>Project</em> scope. The plugin gets
        committed to <Code>.claude/settings.json</Code> so collaborators on the
        repo install automatically.
      </>
    ),
  },
  {
    q: "How is this different from a linter?",
    a: (
      <>
        Linters check rules. This plugin generates polished UI from scratch and
        iterates against rendered pixels via screenshot critique. It&rsquo;s a
        designer, not a linter.
      </>
    ),
  },
  {
    q: "Why slate-tinted neutrals?",
    a: (
      <>
        See the <Code>tinted-neutrals.md</Code> design rule. Pure white on pure
        black is too high-contrast and tiring; tinted greys carry depth,
        elevation, and a hint of harmony with your brand.
      </>
    ),
  },
  {
    q: "Will it conflict with my own design system?",
    a: (
      <>
        No. It detects existing tokens and merges; it never overwrites. It also
        auto-discovers your stack and respects your styling system.
      </>
    ),
  },
];

const FAQ_CSS = `
details.faq-row > summary { list-style: none; cursor: pointer; }
details.faq-row > summary::-webkit-details-marker { display: none; }
details.faq-row .faq-body-wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--dur-medium) var(--ease-in-out-cubic);
}
details.faq-row[open] .faq-body-wrap { grid-template-rows: 1fr; }
details.faq-row .faq-body-inner { overflow: hidden; }
details.faq-row .faq-chevron {
  transition: transform var(--dur-default) var(--ease-out);
}
details.faq-row[open] .faq-chevron { transform: rotate(180deg); }
@media (prefers-reduced-motion: reduce) {
  details.faq-row .faq-body-wrap,
  details.faq-row .faq-chevron { transition: none; }
}
`;

export function FAQ() {
  const stagger = useStagger(0.05);
  const fadeUp = useFadeUp();

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-24 lg:py-32"
    >
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
            Common questions
          </motion.p>
          <motion.h2
            id="faq-title"
            variants={fadeUp}
            className="mt-4 text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)] font-semibold tracking-tight text-[var(--color-fg)] text-balance leading-[1.1]"
          >
            Things people ask.
          </motion.h2>
        </motion.div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="
            mt-16 lg:mt-20
            max-w-3xl mx-auto
            flex flex-col gap-[var(--spacing-3)]
          "
        >
          {FAQS.map((item) => (
            <FAQItem key={item.q} item={item} />
          ))}
        </motion.ul>
      </Container>

      {/* Local CSS — keeps the open/close animation pure CSS, zero JS. */}
      <style
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: FAQ_CSS }}
      />
    </section>
  );
}

function FAQItem({ item }: { item: QA }) {
  const fadeUp = useFadeUp();
  return (
    <motion.li variants={fadeUp}>
      <details
        className="
          faq-row group
          rounded-[var(--radius-lg)]
          bg-[var(--color-surface-elevated)]
          border border-[var(--color-border-subtle)]
          shadow-[var(--shadow-sm)]
          transition-[border-color,box-shadow]
          duration-[var(--dur-default)]
          hover:border-[var(--color-border)]
          focus-within:border-[var(--color-ring)]
          focus-within:shadow-[var(--shadow-md)]
          motion-reduce:transition-none
        "
      >
        <summary
          className="
            flex items-center justify-between gap-[var(--spacing-4)]
            px-[var(--spacing-6)] py-[var(--spacing-5)]
            text-[length:var(--text-base)] font-medium
            text-[var(--color-fg)]
            select-none
            rounded-[var(--radius-lg)]
            outline-none
            focus-visible:outline-2
            focus-visible:outline-[var(--color-ring)]
            focus-visible:outline-offset-2
          "
        >
          <span className="leading-snug">{item.q}</span>
          <span
            aria-hidden="true"
            className="faq-chevron shrink-0 text-[var(--color-fg-muted)]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </summary>
        <div className="faq-body-wrap">
          <div className="faq-body-inner">
            <div
              className="
                px-[var(--spacing-6)] pb-[var(--spacing-5)]
                text-[length:var(--text-sm)]
                text-[var(--color-fg-muted)] leading-relaxed
                max-w-[65ch]
              "
            >
              {item.a}
            </div>
          </div>
        </div>
      </details>
    </motion.li>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code
      className="
        font-mono text-[length:var(--text-xs)]
        text-[var(--color-fg)]
        bg-[var(--color-surface)]
        border border-[var(--color-border-subtle)]
        rounded-[var(--radius-sm)]
        px-[var(--spacing-2)] py-[1px]
      "
    >
      {children}
    </code>
  );
}

export default FAQ;
