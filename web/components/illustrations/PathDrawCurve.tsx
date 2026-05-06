"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

interface PathDrawCurveProps {
  className?: string;
}

/**
 * PathDrawCurve — animated SVG path drawn left to right when in viewport.
 * Brand to accent gradient stroke. Reduced-motion: instant.
 */
export function PathDrawCurve({ className }: PathDrawCurveProps) {
  const reduced = useReducedMotion();
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 240 80"
      width={240}
      height={80}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="pdc-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-accent-400)" />
        </linearGradient>
      </defs>

      <motion.path
        d="M4 60 C 40 60, 60 12, 110 28 S 200 70, 236 16"
        stroke="url(#pdc-stroke)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: reduced ? 1 : 0, opacity: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: reduced ? 0.01 : 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      />

      {/* Endpoint dots */}
      <circle cx="4" cy="60" r="2.5" fill="var(--color-brand-500)" />
      <circle cx="236" cy="16" r="3" fill="var(--color-accent-400)" />
    </svg>
  );
}

export default PathDrawCurve;
