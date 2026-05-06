"use client";

import * as React from "react";

type StateName = "default" | "hover" | "focus" | "disabled" | "error" | "success";

interface StateDef {
  name: StateName;
  label: string;
  helper: string;
  value: string;
  caption: string;
}

const STATES: StateDef[] = [
  {
    name: "default",
    label: "Email address",
    helper: "We'll send a confirmation link.",
    value: "",
    caption: "Resting state — neutral border, surface bg.",
  },
  {
    name: "hover",
    label: "Email address",
    helper: "Border darkens as the cursor enters.",
    value: "",
    caption: "Hover — border darkens one step (no fill change).",
  },
  {
    name: "focus",
    label: "Email address",
    helper: "Brand ring while focused; never outline:none without a replacement.",
    value: "ada@",
    caption: "Focus — 2px brand ring, brand-tinted border.",
  },
  {
    name: "disabled",
    label: "Email address",
    helper: "Locked while the parent step is in flight.",
    value: "ada@reyes.studio",
    caption: "Disabled — opacity 0.6, cursor not-allowed.",
  },
  {
    name: "error",
    label: "Email address",
    helper: "Validate on blur, then live-update as the user fixes it.",
    value: "ada@",
    caption: "Error — token-mixed red border, message announced via role=alert.",
  },
  {
    name: "success",
    label: "Email address",
    helper: "Confirmed — debounced after blur, never on every keystroke.",
    value: "ada@reyes.studio",
    caption: "Success — token-mixed green border, leading check icon.",
  },
];

const ERROR_BORDER = "color-mix(in oklch, oklch(62% 0.2 25) 60%, var(--color-border))";
const ERROR_RING = "color-mix(in oklch, oklch(62% 0.2 25) 28%, transparent)";
const ERROR_FG = "oklch(50% 0.2 25)";
const OK_BORDER = "color-mix(in oklch, oklch(70% 0.16 150) 55%, var(--color-border))";
const OK_FG = "oklch(45% 0.14 150)";

export function InputStates() {
  return (
    <ul className="grid gap-[var(--spacing-5)] sm:grid-cols-2 lg:grid-cols-3">
      {STATES.map((s) => (
        <li key={s.name}>
          <Field def={s} />
        </li>
      ))}
    </ul>
  );
}

function Field({ def }: { def: StateDef }) {
  const id = React.useId();
  const helperId = `${id}-helper`;
  const msgId = `${id}-msg`;
  const isError = def.name === "error";
  const isOk = def.name === "success";
  const isDisabled = def.name === "disabled";
  const isFocus = def.name === "focus";
  const isHover = def.name === "hover";

  const wrapperStyle: React.CSSProperties = {};
  if (isError) {
    wrapperStyle.borderColor = ERROR_BORDER;
    wrapperStyle.boxShadow = `0 0 0 3px ${ERROR_RING}`;
  } else if (isOk) {
    wrapperStyle.borderColor = OK_BORDER;
  } else if (isFocus) {
    wrapperStyle.borderColor = "var(--color-brand-500)";
    wrapperStyle.boxShadow = "0 0 0 3px color-mix(in oklch, var(--color-brand-500) 28%, transparent)";
  } else if (isHover) {
    wrapperStyle.borderColor = "var(--color-fg-subtle)";
  } else {
    wrapperStyle.borderColor = "var(--color-border)";
  }

  return (
    <div className="flex flex-col gap-[var(--spacing-2)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-4)] shadow-[var(--shadow-sm)]">
      <span className="inline-flex w-fit items-center rounded-full bg-[var(--color-surface-elevated)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-2xs)] font-semibold uppercase tracking-[0.14em] text-[var(--color-fg-muted)]">
        {def.name}
      </span>
      <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
        {def.label}
      </label>
      <div
        className="flex items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-[var(--spacing-3)] transition-[border-color,box-shadow] duration-[var(--dur-fast)]"
        style={{
          ...wrapperStyle,
          background: isDisabled ? "var(--color-surface-elevated)" : "var(--color-surface)",
          opacity: isDisabled ? 0.7 : 1,
        }}
      >
        {isOk && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: OK_FG }}>
            <path d="M4 12.5l4.5 4.5L20 6.5" />
          </svg>
        )}
        <input
          id={id}
          type="email"
          defaultValue={def.value}
          placeholder="you@team.com"
          disabled={isDisabled}
          readOnly={!isFocus}
          tabIndex={isFocus ? 0 : -1}
          aria-invalid={isError || undefined}
          aria-describedby={isError ? `${helperId} ${msgId}` : helperId}
          className="h-10 w-full bg-transparent text-[length:var(--text-sm)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] outline-none focus:outline-none focus-visible:outline-none disabled:cursor-not-allowed"
        />
      </div>
      <p id={helperId} className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
        {def.helper}
      </p>
      {isError && (
        <p id={msgId} role="alert" className="text-[length:var(--text-xs)] font-medium" style={{ color: ERROR_FG }}>
          Looks like that email is missing a domain.
        </p>
      )}
      {isOk && (
        <p className="text-[length:var(--text-xs)] font-medium" style={{ color: OK_FG }}>
          Email looks good.
        </p>
      )}
      <p className="mt-[var(--spacing-1)] border-t border-[var(--color-border-subtle)] pt-[var(--spacing-2)] text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
        {def.caption}
      </p>
    </div>
  );
}

export default InputStates;
