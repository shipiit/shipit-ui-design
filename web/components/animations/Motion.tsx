"use client";

import { useReducedMotion, type Variants } from "motion/react";

// Re-export motion components for convenience at call sites.
export { motion, AnimatePresence } from "motion/react";

/**
 * fadeUp — initial: opacity 0, y 16; whileInView/animate: opacity 1, y 0.
 * Reduced-motion: opacity-only, no translate.
 */
export function useFadeUp(): Variants {
  const reduced = useReducedMotion();
  if (reduced) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } },
    };
  }
  return {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

/** fade — opacity-only entrance. */
export function useFade(): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: reduced ? 0.01 : 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };
}

/** stagger — parent variant; children stagger by 60ms. */
export function useStagger(delayChildren = 0.05): Variants {
  const reduced = useReducedMotion();
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.06,
        delayChildren: reduced ? 0 : delayChildren,
      },
    },
  };
}

/**
 * floatGentle — subtle 6px y oscillation; loops infinitely.
 * Reduced-motion: stays at 0.
 */
export function useFloatGentle(offset = 6, duration = 6): Variants {
  const reduced = useReducedMotion();
  if (reduced) {
    return { rest: { y: 0 } };
  }
  return {
    rest: {
      y: [0, -offset, 0, offset, 0],
      transition: {
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
}
