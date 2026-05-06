"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  punchline: string;
  name: string;
  role: string;
  initials: string;
}

const ITEMS: Testimonial[] = [
  {
    quote: "Replaced my $200/mo Mixpanel setup in an afternoon.",
    punchline: "Funnels are stupid simple.",
    name: "A.K.",
    role: "Founder, Stripe consultancy",
    initials: "AK",
  },
  {
    quote: "The only tool where dark mode actually looks designed.",
    punchline: "My eyes thank me.",
    name: "Pri R.",
    role: "Solo dev, Indie Hackers",
    initials: "PR",
  },
  {
    quote: "Got my first \"something dropped\" alert at 2am —",
    punchline: "fixed it before customers noticed.",
    name: "Marco D.",
    role: "CTO, indie SaaS",
    initials: "MD",
  },
];

function QuoteMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <path
        d="M11 8 H6 a3 3 0 0 0 -3 3 v6 a3 3 0 0 0 3 3 h2 v3 a3 3 0 0 1 -3 3 h-1 v3 h1 a6 6 0 0 0 6 -6 V11 a3 3 0 0 0 -3 -3 z"
        fill="var(--color-brand-100)"
      />
      <path
        d="M27 8 h-5 a3 3 0 0 0 -3 3 v6 a3 3 0 0 0 3 3 h2 v3 a3 3 0 0 1 -3 3 h-1 v3 h1 a6 6 0 0 0 6 -6 V11 a3 3 0 0 0 -3 -3 z"
        fill="var(--color-brand-300)"
      />
    </svg>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article
      className={cn(
        "h-full flex flex-col justify-between rounded-[var(--radius-2xl)]",
        "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-sm)]",
        "p-[var(--spacing-8)] gap-[var(--spacing-6)]",
        "transition-[transform,box-shadow] duration-[var(--dur-default)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
      )}
    >
      <div className="flex flex-col gap-[var(--spacing-4)]">
        <QuoteMark />
        <p className="text-[length:var(--text-base)] leading-relaxed text-[var(--color-fg-muted)]">
          {t.quote}{" "}
          <span className="font-semibold text-[var(--color-fg)]">{t.punchline}</span>
        </p>
      </div>

      <div className="flex items-center gap-[var(--spacing-3)] pt-[var(--spacing-4)] border-t border-[var(--color-border-subtle)]">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex items-center justify-center h-10 w-10 rounded-[var(--radius-full)]",
            "bg-[var(--color-brand-50)] text-[var(--color-brand-700)]",
            "text-[length:var(--text-sm)] font-bold",
            "border border-[var(--color-brand-100)]",
          )}
        >
          {t.initials}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-[length:var(--text-sm)] font-semibold text-[var(--color-fg)]">
            {t.name}
          </span>
          <span className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">
            {t.role}
          </span>
        </div>
      </div>
    </article>
  );
}

export function SampleTestimonials() {
  const stagger = useStagger(0.06);
  const fadeUp = useFadeUp();

  return (
    <section
      aria-labelledby="sample-testimonials-title"
      className="relative py-[var(--spacing-24)] overflow-hidden"
    >
      <Backdrop3D variant="grid-tilt" />

      <Container className="relative z-10">
        <div className="max-w-3xl mb-[var(--spacing-16)]">
          <p className="flex items-center gap-[var(--spacing-2)] uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)] mb-[var(--spacing-4)]">
            <SparkleIcon size={16} />
            Loved by indie founders
          </p>
          <h2
            id="sample-testimonials-title"
            className="text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-bold tracking-tight text-[var(--color-fg)] text-balance"
          >
            The tool you'd recommend in your group chat.
          </h2>
        </div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] items-stretch"
        >
          {ITEMS.map((t) => (
            <motion.li key={t.name} variants={fadeUp} className="flex">
              <div className="w-full">
                <TestimonialCard t={t} />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default SampleTestimonials;
