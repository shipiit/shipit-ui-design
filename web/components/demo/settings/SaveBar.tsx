"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Button } from "@/components/primitives/Button";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

interface SaveBarProps {
  visible: boolean;
  onDiscard: () => void;
  onSave: () => void;
  saving?: boolean;
}

/**
 * SaveBar — sticky bottom-of-content bar that animates up when there are
 * unsaved changes. Reduced-motion: instant fade. z-30 to sit above content
 * but under modal/topbar layers.
 */
export function SaveBar({ visible, onDiscard, onSave, saving }: SaveBarProps) {
  const reduced = useReducedMotion();
  const initial = reduced ? { opacity: 0 } : { opacity: 0, y: 24 };
  const animate = reduced ? { opacity: 1 } : { opacity: 1, y: 0 };
  const exit = reduced ? { opacity: 0 } : { opacity: 0, y: 24 };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="region"
          aria-label="Unsaved changes"
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{
            duration: reduced ? 0.01 : 0.2,
            delay: reduced ? 0 : 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="sticky bottom-[var(--spacing-4)] z-30 mx-auto mt-[var(--spacing-8)] flex w-full max-w-2xl items-center justify-between gap-[var(--spacing-3)] rounded-[var(--radius-2xl)] border border-[var(--color-border)] bg-[color-mix(in_oklch,var(--color-surface)_88%,transparent)] px-[var(--spacing-4)] py-[var(--spacing-3)] shadow-[var(--shadow-lg)] backdrop-blur-md sm:px-[var(--spacing-5)]"
        >
          <div className="flex min-w-0 items-center gap-[var(--spacing-3)]">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-[var(--color-brand-50)] ring-1 ring-[var(--color-brand-200)]"
            >
              <SparkleIcon size={16} />
            </span>
            <div className="min-w-0">
              <p
                className="truncate text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]"
                aria-live="polite"
              >
                You have unsaved changes
              </p>
              <p className="truncate text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
                Review your edits before they go live.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-[var(--spacing-2)]">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDiscard}
              disabled={saving}
              type="button"
            >
              Discard
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onSave}
              disabled={saving}
              type="button"
            >
              {saving ? "Saving…" : "Save changes"}
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SaveBar;
