"use client";

import { motion } from "motion/react";
import { useFadeUp, useStagger } from "@/components/animations/Motion";
import { StatCard } from "./variants/StatCard";
import { ProfileCard } from "./variants/ProfileCard";
import { ProductCard } from "./variants/ProductCard";
import { PricingCard } from "./variants/PricingCard";
import { StatusCard } from "./variants/StatusCard";
import { GradientCard } from "./variants/GradientCard";
import { GlassCard } from "./variants/GlassCard";
import { ActionCard } from "./variants/ActionCard";
import { ListCard } from "./variants/ListCard";
import { AlertCard } from "./variants/AlertCard";
import { CommentCard } from "./variants/CommentCard";
import { ProjectCard } from "./variants/ProjectCard";
import { CalendarCard } from "./variants/CalendarCard";
import { UploadCard } from "./variants/UploadCard";

interface SectionDef {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  render: () => React.ReactNode;
  cols?: 1 | 2 | 3;
}

const SECTIONS: SectionDef[] = [
  {
    id: "stat",
    eyebrow: "01 · KPI",
    title: "Stat card",
    body: "A KPI tile with delta pill and inline sparkline. Use in dashboards and on marketing stat rows. Brand for positive deltas, accent for negative — color is never the only signal.",
    render: () => <StatCard />,
    cols: 1,
  },
  {
    id: "profile",
    eyebrow: "02 · Identity",
    title: "Profile card",
    body: "Centered avatar, name, role, three-stat strip, and a primary + secondary action. Drop-in for member directories and hover-cards.",
    render: () => <ProfileCard />,
    cols: 1,
  },
  {
    id: "product",
    eyebrow: "03 · Commerce",
    title: "Product card",
    body: "Tokenized illustration in lieu of raster — full token coverage, zero asset pipeline. Hover lifts the surface; the rating is text-and-icon, not color-only.",
    render: () => <ProductCard />,
    cols: 1,
  },
  {
    id: "pricing",
    eyebrow: "04 · Plans",
    title: "Pricing card",
    body: "Two tiers side-by-side with a gradient-bordered featured tier. Spend the loud pattern (gradient border) on the page's single most important card — the one we want users to pick.",
    render: () => (
      <div className="grid gap-[var(--spacing-6)] sm:grid-cols-2">
        <PricingCard />
        <PricingCard featured />
      </div>
    ),
    cols: 2,
  },
  {
    id: "status",
    eyebrow: "05 · Health",
    title: "Status card",
    body: "Status pill + title + body + tertiary action. Three tones — operational, degraded, outage — using brand, accent, and a token-mixed red.",
    render: () => (
      <div className="grid gap-[var(--spacing-4)] md:grid-cols-3">
        <StatusCard tone="ok" />
        <StatusCard tone="warn" />
        <StatusCard tone="err" />
      </div>
    ),
    cols: 3,
  },
  {
    id: "gradient",
    eyebrow: "06 · Marketing",
    title: "Gradient card",
    body: "Full-bleed brand gradient with decorative orbs and a faint grid. White-on-brand contrast verified; CTAs swap to a white surface for AA on the gradient.",
    render: () => <GradientCard />,
    cols: 1,
  },
  {
    id: "glass",
    eyebrow: "07 · Overlay",
    title: "Glass card",
    body: "Glassmorphism only over a tinted scene — never on body content. backdrop-filter falls back gracefully when unsupported.",
    render: () => <GlassCard />,
    cols: 1,
  },
  {
    id: "action",
    eyebrow: "08 · Affordance",
    title: "Action card",
    body: "Whole card is a link. Icon, title, body, ghost arrow CTA. One affordance per card — no nested clickable rows.",
    render: () => <ActionCard />,
    cols: 1,
  },
  {
    id: "list",
    eyebrow: "09 · Density",
    title: "List card",
    body: "A header with metadata + an ordered list with right-aligned deltas. Tabular numerals throughout — counts and percentages line up across rows.",
    render: () => <ListCard />,
    cols: 1,
  },
  {
    id: "alert",
    eyebrow: "10 · Notice",
    title: "Alert card",
    body: "Info, warn, danger banners with icon, title, body, dismiss. Each tone has matched bg/border/foreground at AA; the icon doubles the color signal.",
    render: () => (
      <div className="flex flex-col gap-[var(--spacing-3)]">
        <AlertCard tone="info" />
        <AlertCard tone="warn" />
        <AlertCard tone="danger" />
      </div>
    ),
    cols: 1,
  },
  {
    id: "comment",
    eyebrow: "11 · Social",
    title: "Comment card",
    body: "Avatar + name + handle + timestamp, body, reactions row. Each reaction is a real toggle button with aria-pressed.",
    render: () => <CommentCard />,
    cols: 1,
  },
  {
    id: "project",
    eyebrow: "12 · Workflow",
    title: "Project card",
    body: "Gradient cover, title, due-date pill, stacked member avatars, and a real progressbar with aria-valuenow.",
    render: () => <ProjectCard />,
    cols: 1,
  },
  {
    id: "calendar",
    eyebrow: "13 · Time",
    title: "Calendar card",
    body: "Date block with month label + day, time, title, location, attendees, and primary/secondary actions. The date block uses brand-on-fg for AA in both themes.",
    render: () => <CalendarCard />,
    cols: 1,
  },
  {
    id: "upload",
    eyebrow: "14 · Input",
    title: "Upload card",
    body: "Native <input type='file'> hidden under a styled drop-zone label. Four states — idle, hover, error, success — token-mixed for missing danger/success tokens.",
    render: () => (
      <div className="grid gap-[var(--spacing-4)] md:grid-cols-2">
        <UploadCard state="idle" />
        <UploadCard state="hover" />
        <UploadCard state="error" />
        <UploadCard state="success" />
      </div>
    ),
    cols: 2,
  },
];

export function CardGallery() {
  const fadeUp = useFadeUp();
  const stagger = useStagger();
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      className="flex flex-col gap-[var(--spacing-20)]"
    >
      {SECTIONS.map((s) => (
        <motion.section
          key={s.id}
          variants={fadeUp}
          aria-labelledby={`card-${s.id}-title`}
          className="grid gap-[var(--spacing-6)] lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-start lg:gap-[var(--spacing-12)]"
        >
          <header className="flex flex-col gap-[var(--spacing-2)]">
            <span className="inline-flex w-fit items-center gap-[var(--spacing-2)] rounded-full bg-[var(--color-brand-50)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold uppercase tracking-[0.12em] text-[var(--color-brand-700)]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-400)]" />
              {s.eyebrow}
            </span>
            <h2
              id={`card-${s.id}-title`}
              className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]"
              style={{ textWrap: "balance" }}
            >
              {s.title}
            </h2>
            <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed">
              {s.body}
            </p>
          </header>
          <div className="min-w-0">{s.render()}</div>
        </motion.section>
      ))}
    </motion.div>
  );
}

export default CardGallery;
