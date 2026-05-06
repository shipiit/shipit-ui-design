"use client";

import * as React from "react";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#docs", label: "Docs" },
  { href: "#login", label: "Login" },
];

function LumeMark() {
  return (
    <a href="#top" className="inline-flex items-center gap-[var(--spacing-2)] group" aria-label="Lume — home">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true"
        className="transition-transform duration-[var(--dur-default)] group-hover:scale-[1.04]">
        <defs>
          <linearGradient id="lume-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-400)" />
            <stop offset="100%" stopColor="var(--color-brand-700)" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="28" height="28" rx="8" fill="url(#lume-mark)" />
        <path d="M10 9 V21 H22" stroke="var(--color-fg-on-brand)" strokeWidth="3"
          strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="22" cy="21" r="2.5" fill="var(--color-accent-400)" />
      </svg>
      <span className="font-semibold tracking-tight text-[length:var(--text-base)] text-[var(--color-fg)]">
        Lume
      </span>
    </a>
  );
}

export function SampleNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const sheetRef = React.useRef<HTMLDivElement | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); setOpen(false); triggerRef.current?.focus(); }
      if (e.key === "Tab" && sheetRef.current) {
        const f = sheetRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      sheetRef.current?.querySelector<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')?.focus();
    });
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);

  const linkCls = cn(
    "px-[var(--spacing-3)] h-9 inline-flex items-center rounded-[var(--radius-md)]",
    "text-[length:var(--text-sm)] text-[var(--color-fg-muted)]",
    "hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]",
    "transition-colors duration-[var(--dur-fast)]",
  );

  return (
    <header
      className={cn(
        "fixed top-[var(--spacing-10)] inset-x-0 z-40 transition-[background-color,backdrop-filter,border-color]",
        "duration-[var(--dur-medium)] ease-[var(--ease-out)]",
        scrolled
          ? "bg-[color-mix(in_oklch,var(--color-surface)_80%,transparent)] backdrop-blur-md border-b border-[var(--color-border-subtle)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-[var(--spacing-4)]">
        <LumeMark />
        <nav className="hidden md:flex items-center gap-[var(--spacing-1)]" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-[var(--spacing-2)]">
          <Button as="a" href="#cta" variant="primary" size="sm" className="hidden sm:inline-flex">
            Start free
          </Button>
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="sample-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex h-9 w-9 items-center justify-center",
              "rounded-[var(--radius-md)] border border-[var(--color-border-subtle)]",
              "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]",
              "transition-[color,background-color,transform] duration-[var(--dur-fast)] active:scale-[0.95]",
            )}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <div id="sample-mobile-menu" role="dialog" aria-modal="true" aria-label="Primary navigation"
          className="md:hidden fixed inset-0 top-16 z-40">
          <div className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm"
            onClick={() => setOpen(false)} aria-hidden="true" />
          <div ref={sheetRef}
            className={cn(
              "relative mx-[var(--spacing-4)] mt-[var(--spacing-3)] rounded-[var(--radius-xl)]",
              "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] p-[var(--spacing-2)]",
            )}
          >
            <ul className="flex flex-col">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)}
                    className={cn(
                      "block px-[var(--spacing-4)] h-11 leading-[44px] rounded-[var(--radius-md)]",
                      "text-[length:var(--text-base)] text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]",
                    )}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-[var(--spacing-2)]">
                <Button as="a" href="#cta" variant="primary" size="md" className="w-full">Start free</Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default SampleNav;
