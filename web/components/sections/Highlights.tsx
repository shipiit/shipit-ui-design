"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import {
  motion,
  useFadeUp,
  useStagger,
} from "@/components/animations/Motion";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "motion/react";
import { SectionOrnament } from "@/components/illustrations/SectionOrnament";
import { Backdrop3D } from "@/components/illustrations/Backdrop3D";

type StatGlyph = "terminal" | "sparkles" | "target" | "ruler";

interface Stat {
  target: number;
  label: string;
  glyph: StatGlyph;
}

const STATS: Stat[] = [
  { target: 8, label: "Slash commands", glyph: "terminal" },
  { target: 8, label: "Auto-activating skills", glyph: "sparkles" },
  { target: 100, label: "Point design rubric", glyph: "target" },
  { target: 300, label: "Line cap on every file", glyph: "ruler" },
];

function StatGlyphSvg({ glyph }: { glyph: StatGlyph }) {
  const size = 32;
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    "aria-hidden": true as const,
    xmlns: "http://www.w3.org/2000/svg",
  };
  switch (glyph) {
    case "terminal":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="20" rx="3" fill="var(--color-brand-50)" stroke="var(--color-brand-300)" strokeWidth="1" />
          <path d="M9 13 l4 3 l-4 3" stroke="var(--color-brand-600)" strokeWidth="1.75" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="16" y1="20" x2="22" y2="20" stroke="var(--color-brand-600)" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      );
    case "sparkles":
      return (
        <svg {...common}>
          <path d="M20 4 L21.6 9.4 L27 11 L21.6 12.6 L20 18 L18.4 12.6 L13 11 L18.4 9.4 Z" fill="var(--color-brand-500)" />
          <path d="M9 18 L9.8 21 L13 22 L9.8 23 L9 26 L8.2 23 L5 22 L8.2 21 Z" fill="var(--color-accent-400)" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" fill="none" stroke="var(--color-brand-300)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="8" fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3.5" fill="var(--color-accent-400)" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...common}>
          <rect x="3" y="11" width="26" height="10" rx="1.5" fill="var(--color-accent-100)" stroke="var(--color-accent-400)" strokeWidth="1" />
          <g stroke="var(--color-accent-600)" strokeWidth="1" strokeLinecap="round">
            <line x1="7" y1="11" x2="7" y2="16" />
            <line x1="11" y1="11" x2="11" y2="14" />
            <line x1="15" y1="11" x2="15" y2="16" />
            <line x1="19" y1="11" x2="19" y2="14" />
            <line x1="23" y1="11" x2="23" y2="16" />
            <line x1="27" y1="11" x2="27" y2="14" />
          </g>
        </svg>
      );
  }
}

function CountUp({ to }: { to: number }) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(reduced ? to : 0);
  const formatter = React.useMemo(() => new Intl.NumberFormat("en-US"), []);
  const rounded = useTransform(mv, (v) => formatter.format(Math.round(v)));

  React.useEffect(() => {
    if (!inView) return;
    if (reduced) {
      mv.set(to);
      return;
    }
    const controls = animate(mv, to, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => controls.stop();
  }, [inView, to, mv, reduced]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export function Highlights() {
  const stagger = useStagger(0.08);
  const fadeUp = useFadeUp();

  return (
    <section
      aria-labelledby="highlights-eyebrow"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <SectionOrnament variant="top" tone="brand" />
      <Backdrop3D variant="orbs" />

      <Container className="relative z-10">
        <motion.p
          id="highlights-eyebrow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="
            text-center uppercase tracking-[0.18em]
            text-[length:var(--text-xs)] font-medium
            text-[var(--color-fg-subtle)]
            mb-12 lg:mb-16
          "
        >
          By the numbers
        </motion.p>

        <motion.ul
          role="list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="
            relative
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
            gap-y-10 sm:gap-y-12 lg:gap-y-0
            lg:divide-x lg:divide-[var(--color-border-subtle)]
          "
        >
          {/* Decorative dotted hairline connecting stats on lg+ */}
          <span
            aria-hidden="true"
            className="
              hidden lg:block absolute left-8 right-8 top-[42px]
              border-t border-dashed border-[var(--color-border)]
              -z-0
            "
          />

          {STATS.map((stat) => (
            <motion.li
              key={stat.label}
              variants={fadeUp}
              className="
                relative flex flex-col items-center text-center
                px-4 lg:px-8
              "
            >
              <span
                aria-hidden="true"
                className="
                  mb-4 inline-flex items-center justify-center
                  h-12 w-12 rounded-[var(--radius-full)]
                  bg-[var(--color-surface)]
                  border border-[var(--color-border-subtle)]
                  shadow-[var(--shadow-sm)]
                "
              >
                <StatGlyphSvg glyph={stat.glyph} />
              </span>
              <span
                className="
                  text-gradient-brand
                  text-[length:var(--text-5xl)] lg:text-[length:var(--text-6xl)]
                  font-extrabold leading-none
                  tabular-nums tracking-tight
                "
                aria-hidden="true"
              >
                <CountUp to={stat.target} />
              </span>
              <span
                className="
                  mt-3 lg:mt-4
                  uppercase tracking-[0.16em]
                  text-[length:var(--text-2xs)] font-semibold
                  text-[var(--color-fg-muted)]
                "
              >
                {stat.label}
              </span>
              <span className="sr-only">
                {stat.target} {stat.label}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}

export default Highlights;
