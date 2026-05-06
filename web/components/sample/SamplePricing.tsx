"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { motion, useFadeUp, useStagger } from "@/components/animations/Motion";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";
import { cn } from "@/lib/utils";

interface Tier {
  name: string;
  price: string;
  unit: string;
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
  ctaVariant: "primary" | "ghost" | "secondary";
}

const TIERS: Tier[] = [
  {
    name: "Free",
    price: "$0",
    unit: "/mo",
    tagline: "for solo founders",
    features: [
      "Up to 5,000 events / mo",
      "1 project",
      "Community support",
      "All core charts",
    ],
    cta: "Start free",
    ctaVariant: "ghost",
  },
  {
    name: "Pro",
    price: "$19",
    unit: "/mo",
    tagline: "for growing teams",
    features: [
      "100,000 events / mo",
      "5 projects",
      "Custom alerts",
      "All integrations",
      "Email support",
    ],
    cta: "Start 14-day trial",
    ctaVariant: "primary",
    popular: true,
  },
  {
    name: "Team",
    price: "$79",
    unit: "/mo",
    tagline: "for serious products",
    features: [
      "Unlimited events",
      "Unlimited projects",
      "Custom retention",
      "Priority support",
      "SAML SSO",
    ],
    cta: "Talk to us",
    ctaVariant: "ghost",
  },
];

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="var(--color-brand-50)" />
      <path d="M8 12.5 l3 3 L16 9" stroke="var(--color-brand-700)" strokeWidth="2.5"
        fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PricingCard({ tier }: { tier: Tier }) {
  return (
    <article
      className={cn(
        "relative h-full flex flex-col rounded-[var(--radius-2xl)] overflow-hidden",
        "bg-[var(--color-surface)] border shadow-[var(--shadow-sm)]",
        "transition-[transform,box-shadow,border-color] duration-[var(--dur-default)] ease-[var(--ease-out)]",
        "hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)]",
        tier.popular
          ? "border-[var(--color-brand-400)] shadow-[var(--shadow-md)]"
          : "border-[var(--color-border)]",
      )}
    >
      {tier.popular && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1"
          style={{ background: "linear-gradient(90deg, var(--color-brand-400), var(--color-brand-700))" }}
        />
      )}
      {tier.popular && (
        <span className={cn(
          "absolute right-[var(--spacing-4)] top-[var(--spacing-4)]",
          "px-[var(--spacing-2)] py-[var(--spacing-1)] rounded-[var(--radius-full)]",
          "bg-[var(--color-brand-500)] text-[var(--color-fg-on-brand)]",
          "text-[length:var(--text-2xs)] font-bold uppercase tracking-[0.12em]",
        )}>
          Popular
        </span>
      )}

      <div
        className="p-[var(--spacing-8)] pb-[var(--spacing-6)] border-b border-[var(--color-border-subtle)]"
        style={
          tier.popular
            ? {
                background:
                  "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-brand-500) 12%, var(--color-surface) 88%) 0%, var(--color-surface) 75%)",
              }
            : undefined
        }
      >
        <h3 className="text-[length:var(--text-lg)] font-semibold tracking-tight text-[var(--color-fg)]">
          {tier.name}
        </h3>
        <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {tier.tagline}
        </p>
        <div className="mt-[var(--spacing-5)] flex items-baseline gap-[var(--spacing-1)]">
          <span className="text-[length:var(--text-5xl)] font-extrabold tracking-tight tabular-nums text-[var(--color-fg)]">
            {tier.price}
          </span>
          <span className="text-[length:var(--text-sm)] text-[var(--color-fg-subtle)] font-[var(--font-mono)]">
            {tier.unit}
          </span>
        </div>
      </div>

      <div className="p-[var(--spacing-8)] pt-[var(--spacing-6)] flex flex-col flex-1 gap-[var(--spacing-4)]">
        <ul className="flex flex-col gap-[var(--spacing-3)] flex-1">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg)]">
              <span className="mt-[2px] shrink-0"><CheckIcon /></span>
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button as="a" href="#cta" variant={tier.ctaVariant} size="lg" className="w-full">
          {tier.cta}
        </Button>
      </div>
    </article>
  );
}

export function SamplePricing() {
  const stagger = useStagger(0.06);
  const fadeUp = useFadeUp();

  return (
    <section id="pricing" aria-labelledby="sample-pricing-title"
      className="relative py-[var(--spacing-24)] overflow-hidden">
      <Backdrop3D variant="soft-mesh" />

      <Container className="relative z-10">
        <div className="max-w-3xl mb-[var(--spacing-16)] text-center mx-auto">
          <p className="inline-flex items-center gap-[var(--spacing-2)] uppercase tracking-[0.18em] text-[length:var(--text-xs)] font-medium text-[var(--color-fg-subtle)] mb-[var(--spacing-4)]">
            <SparkleIcon size={16} />
            Pricing
          </p>
          <h2 id="sample-pricing-title"
            className="text-[length:var(--text-3xl)] lg:text-[length:var(--text-4xl)] font-bold tracking-tight text-[var(--color-fg)] text-balance">
            Pick the tier that fits today. Change anytime.
          </h2>
          <p className="mt-[var(--spacing-4)] text-[length:var(--text-base)] text-[var(--color-fg-muted)] max-w-xl mx-auto">
            No hidden seats, no per-event surprises. Start free, upgrade when the events catch up.
          </p>
        </div>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-[var(--spacing-5)] lg:gap-[var(--spacing-6)] items-stretch"
        >
          {TIERS.map((t) => (
            <motion.li key={t.name} variants={fadeUp} className="flex">
              <div className="w-full">
                <PricingCard tier={t} />
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default SamplePricing;
