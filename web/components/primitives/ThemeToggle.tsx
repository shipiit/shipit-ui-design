"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<Theme>("light");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    setMounted(true);
  }, []);

  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        // storage unavailable; ignore
      }
      document.documentElement.setAttribute("data-theme", next);
      return next;
    });
  }, []);

  const isDark = theme === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex items-center justify-center",
        "h-9 w-9 rounded-[var(--radius-md)]",
        "text-[var(--color-fg-muted)] hover:text-[var(--color-fg)]",
        "bg-transparent hover:bg-[var(--color-surface-elevated)]",
        "border border-[var(--color-border-subtle)]",
        "transition-[color,background-color,transform] duration-[var(--dur-fast)]",
        "active:scale-[0.95] disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
    >
      {/* Render an icon only after mount to avoid SSR/CSR mismatch */}
      {mounted ? (isDark ? <SunIcon /> : <MoonIcon />) : <SunIcon />}
    </button>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
    </svg>
  );
}

export default ThemeToggle;
