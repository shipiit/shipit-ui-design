"use client";

import * as React from "react";
import Image from "next/image";
import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { ThemeToggle } from "@/components/primitives/ThemeToggle";
import { cn } from "@/lib/utils";

const REPO = "https://github.com/shipiit/shipit-ui-design";

const LINKS = [
  { href: "#install", label: "Install" },
  { href: "#commands", label: "Commands" },
  { href: "#refine", label: "How it works" },
];

export function Nav() {
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

  // Close on escape + simple focus trap.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "Tab" && sheetRef.current) {
        const focusables = sheetRef.current.querySelectorAll<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    // Lock body scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Focus first item
    requestAnimationFrame(() => {
      sheetRef.current
        ?.querySelector<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])')
        ?.focus();
    });
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color]",
        "duration-[var(--dur-medium)] ease-[var(--ease-out)]",
        scrolled
          ? "bg-[color-mix(in_oklch,var(--color-surface)_80%,transparent)] backdrop-blur-md border-b border-[var(--color-border-subtle)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2 group"
          aria-label="shipit/ui home"
        >
          <Image
            src="/logo.svg"
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="font-semibold tracking-tight text-[length:var(--text-base)] text-[var(--color-fg)]">
            shipit<span className="text-[var(--color-fg-subtle)]">/</span>ui
          </span>
        </a>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Primary"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 h-9 inline-flex items-center rounded-[var(--radius-md)]",
                "text-[length:var(--text-sm)] text-[var(--color-fg-muted)]",
                "hover:text-[var(--color-fg)] hover:bg-[var(--color-surface-elevated)]",
                "transition-colors duration-[var(--dur-fast)]",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            as="a"
            href={REPO}
            target="_blank"
            rel="noreferrer noopener"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <GitHubIcon />
            <span>GitHub</span>
          </Button>
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="primary-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "md:hidden inline-flex h-9 w-9 items-center justify-center",
              "rounded-[var(--radius-md)] border border-[var(--color-border-subtle)]",
              "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
              "hover:bg-[var(--color-surface-elevated)]",
              "transition-[color,background-color,transform] duration-[var(--dur-fast)]",
              "active:scale-[0.95]",
            )}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      {open && (
        <div
          id="primary-mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Primary navigation"
          className="md:hidden fixed inset-0 top-16 z-40"
        >
          <div
            className="absolute inset-0 bg-[var(--color-bg)]/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={sheetRef}
            className={cn(
              "relative mx-4 mt-3 rounded-[var(--radius-xl)]",
              "bg-[var(--color-surface)] border border-[var(--color-border)]",
              "shadow-[var(--shadow-lg)] p-2",
            )}
          >
            <ul className="flex flex-col">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block px-4 h-11 leading-[44px] rounded-[var(--radius-md)]",
                      "text-[length:var(--text-base)] text-[var(--color-fg)]",
                      "hover:bg-[var(--color-surface-elevated)]",
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2">
                <Button
                  as="a"
                  href={REPO}
                  target="_blank"
                  rel="noreferrer noopener"
                  variant="primary"
                  size="md"
                  className="w-full"
                >
                  <GitHubIcon />
                  <span>GitHub</span>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.58 2 12.21c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.46-1.18-1.11-1.49-1.11-1.49-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.55-1.13-4.55-5.04 0-1.11.39-2.02 1.03-2.74-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.04A9.4 9.4 0 0 1 12 6.83c.85 0 1.71.12 2.51.34 1.91-1.31 2.75-1.04 2.75-1.04.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.74 0 3.92-2.34 4.78-4.57 5.03.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.78 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.21C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default Nav;
