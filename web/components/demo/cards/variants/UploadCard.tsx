"use client";

import * as React from "react";

type UploadState = "idle" | "hover" | "error" | "success";

interface Props {
  state?: UploadState;
}

const COPY: Record<UploadState, { title: string; body: string }> = {
  idle: { title: "Drop files to upload", body: "PNG, SVG, or PDF up to 10 MB." },
  hover: { title: "Release to upload", body: "We'll process them in the background." },
  error: { title: "Couldn't upload 1 file", body: "logo-final-FINAL.psd is too big. Max size is 10 MB." },
  success: { title: "Uploaded 3 files", body: "logo.svg, favicon.png, and og-banner.png are live." },
};

const TONE: Record<UploadState, { border: string; bg: string; iconBg: string; iconFg: string; titleFg: string }> = {
  idle: {
    border: "var(--color-border)",
    bg: "var(--color-surface)",
    iconBg: "var(--color-surface-elevated)",
    iconFg: "var(--color-fg-muted)",
    titleFg: "var(--color-fg)",
  },
  hover: {
    border: "var(--color-brand-500)",
    bg: "var(--color-brand-50)",
    iconBg: "var(--color-brand-100)",
    iconFg: "var(--color-brand-700)",
    titleFg: "var(--color-brand-900)",
  },
  error: {
    border: "color-mix(in oklch, oklch(62% 0.2 25) 45%, transparent)",
    bg: "color-mix(in oklch, oklch(62% 0.2 25) 8%, transparent)",
    iconBg: "color-mix(in oklch, oklch(62% 0.2 25) 14%, transparent)",
    iconFg: "oklch(58% 0.2 25)",
    titleFg: "oklch(40% 0.18 25)",
  },
  success: {
    border: "color-mix(in oklch, oklch(70% 0.16 150) 45%, transparent)",
    bg: "color-mix(in oklch, oklch(70% 0.16 150) 8%, transparent)",
    iconBg: "color-mix(in oklch, oklch(70% 0.16 150) 16%, transparent)",
    iconFg: "oklch(50% 0.14 150)",
    titleFg: "oklch(40% 0.13 150)",
  },
};

export function UploadCard({ state = "idle" }: Props) {
  const inputId = React.useId();
  const t = TONE[state];
  const c = COPY[state];
  return (
    <label
      htmlFor={inputId}
      className="flex cursor-pointer flex-col items-center justify-center gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border-2 border-dashed p-[var(--spacing-6)] text-center transition-colors duration-[var(--dur-default)] ease-[var(--ease-out)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--color-ring)] focus-within:ring-offset-2"
      style={{
        borderColor: t.border,
        background: t.bg,
        color: t.titleFg,
      }}
    >
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-full"
        style={{ background: t.iconBg, color: t.iconFg }}
      >
        <Icon state={state} />
      </span>
      <div>
        <p className="text-[length:var(--text-base)] font-semibold" style={{ color: t.titleFg }}>
          {c.title}
        </p>
        <p className="mt-[var(--spacing-1)] text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {c.body}
        </p>
      </div>
      <span
        className="inline-flex items-center gap-[var(--spacing-1)] rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-medium text-[var(--color-fg)] shadow-[var(--shadow-sm)]"
      >
        Browse files
      </span>
      <input id={inputId} type="file" multiple className="sr-only" />
    </label>
  );
}

function Icon({ state }: { state: UploadState }) {
  if (state === "error") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    );
  }
  if (state === "success") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.7 2.7L16 9.5" />
      </svg>
    );
  }
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M17 8l-5-5-5 5M12 3v12" />
    </svg>
  );
}

export default UploadCard;
