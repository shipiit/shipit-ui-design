"use client";

import * as React from "react";
import { SparkleIcon } from "@/components/illustrations/SparkleIcon";

/**
 * DemoNav — top banner used on every dogfood demo route.
 * Tells the visitor this is a working layout produced by the plugin
 * and links back to the marketing home and to the examples index.
 */
export function DemoNav() {
  return (
    <div
      role="region"
      aria-label="Dogfood demo banner"
      className="w-full border-b border-[var(--color-border-subtle)] bg-[var(--color-surface)]"
    >
      <div className="mx-auto flex w-full max-w-[80rem] items-center justify-between gap-[var(--spacing-3)] px-[var(--spacing-4)] py-[var(--spacing-2)] sm:px-[var(--spacing-6)]">
        <div className="flex items-center gap-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
          <SparkleIcon size={14} />
          <span className="hidden sm:inline">
            Dogfood demo &middot; built via{" "}
            <span className="font-medium text-[var(--color-fg)]">
              shipit-ui-design
            </span>{" "}
            rules
          </span>
          <span className="sm:hidden font-medium text-[var(--color-fg)]">
            shipit-ui-design demo
          </span>
        </div>
        <nav
          aria-label="Demo nav"
          className="flex items-center gap-[var(--spacing-1)]"
        >
          <a
            href="/examples"
            className="inline-flex h-7 items-center rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
          >
            All demos
          </a>
          <a
            href="/"
            className="inline-flex h-7 items-center rounded-[var(--radius-md)] px-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)] transition-colors duration-[var(--dur-fast)] hover:bg-[var(--color-surface-elevated)] hover:text-[var(--color-fg)]"
          >
            &larr; Back to home
          </a>
        </nav>
      </div>
    </div>
  );
}

export default DemoNav;
