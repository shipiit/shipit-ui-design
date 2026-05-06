"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { motion, useFadeUp } from "@/components/animations/Motion";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { cn } from "@/lib/utils";

export function SampleCTA() {
  const fadeUp = useFadeUp();

  return (
    <section
      id="cta"
      aria-labelledby="sample-cta-title"
      className="relative py-[var(--spacing-24)] overflow-hidden"
    >
      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className={cn(
            "relative isolate overflow-hidden",
            "rounded-[var(--radius-2xl)] border border-[var(--color-border)]",
            "shadow-[var(--shadow-xl)]",
            "px-[var(--spacing-8)] py-[var(--spacing-16)] lg:px-[var(--spacing-16)] lg:py-[var(--spacing-20)]",
          )}
          style={{
            background:
              "radial-gradient(120% 100% at 50% 0%, color-mix(in oklab, var(--color-brand-500) 18%, var(--color-surface) 82%) 0%, var(--color-surface) 80%)",
          }}
        >
          <Backdrop3D variant="wireframe" />

          <div className="relative z-[1] max-w-2xl mx-auto text-center flex flex-col items-center gap-[var(--spacing-6)]">
            <span
              className={cn(
                "inline-flex items-center gap-[var(--spacing-2)]",
                "py-[var(--spacing-1)] px-[var(--spacing-3)] rounded-[var(--radius-full)]",
                "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
                "border border-[var(--color-brand-100)]",
                "text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em]",
              )}
            >
              Ready when you are
            </span>

            <h2
              id="sample-cta-title"
              className="text-[length:var(--text-4xl)] lg:text-[length:var(--text-5xl)] font-extrabold tracking-tight text-[var(--color-fg)] text-balance"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.08 }}
            >
              Start tracking what{" "}
              <span className="text-gradient-brand">actually moves</span>{" "}
              the needle.
            </h2>

            <p className="text-[length:var(--text-lg)] text-[var(--color-fg-muted)] leading-relaxed max-w-xl">
              Free for the first 5,000 events / month. No card, no sales call. Set up in
              under 5 minutes.
            </p>

            <div className="mt-[var(--spacing-2)] flex flex-wrap justify-center gap-[var(--spacing-3)]">
              <Button as="a" href="#start" size="lg" variant="primary">
                Start free
                <ArrowRight />
              </Button>
              <Button as="a" href="#docs" size="lg" variant="ghost">
                Read the docs
              </Button>
            </div>

            <ul className="mt-[var(--spacing-4)] flex flex-wrap justify-center gap-x-[var(--spacing-6)] gap-y-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">
              <li className="flex items-center gap-[var(--spacing-2)]"><Dot /> No credit card</li>
              <li className="flex items-center gap-[var(--spacing-2)]"><Dot /> Cancel anytime</li>
              <li className="flex items-center gap-[var(--spacing-2)]"><Dot /> SOC 2 in flight</li>
            </ul>
          </div>
        </motion.div>

        <footer
          className="mt-[var(--spacing-12)] flex flex-col sm:flex-row items-center justify-between gap-[var(--spacing-4)] pt-[var(--spacing-8)] border-t border-[var(--color-border-subtle)]"
          aria-label="Sample page footer"
        >
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">
            © Lume — fictional product for demonstration only.
          </p>
          <p className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
            Built end-to-end with{" "}
            <a
              href="/"
              className={cn(
                "font-semibold text-[var(--color-brand-700)] dark:text-[var(--color-brand-300)]",
                "hover:underline underline-offset-4",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] rounded-[var(--radius-sm)]",
              )}
            >
              shipit-ui-design
            </a>
            .
          </p>
        </footer>
      </Container>
    </section>
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

function Dot() {
  return (
    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]" />
  );
}

export default SampleCTA;
