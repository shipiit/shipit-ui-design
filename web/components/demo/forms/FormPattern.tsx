"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";

interface Errors {
  fullName?: string;
  email?: string;
  password?: string;
  role?: string;
  terms?: string;
}

const ROLES = ["Engineering", "Design", "Product", "Marketing", "Other"];

const ERROR_BORDER = "color-mix(in oklch, oklch(62% 0.2 25) 60%, var(--color-border))";
const ERROR_FG = "oklch(50% 0.2 25)";

export function FormPattern() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Errors = {};
    const fullName = String(fd.get("fullName") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const role = String(fd.get("role") ?? "");
    const terms = fd.get("terms") === "on";
    if (!fullName) next.fullName = "Please enter your full name.";
    if (!email || !/.+@.+\..+/.test(email)) next.email = "Enter a valid email address.";
    if (!password || password.length < 8) next.password = "Use at least 8 characters.";
    if (!role) next.role = "Pick the role that fits best.";
    if (!terms) next.terms = "You must agree to continue.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    setSubmitted(false);
    timer.current = setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const errorList = Object.entries(errors).filter(([, v]) => v) as [keyof Errors, string][];

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-[var(--spacing-5)] rounded-[var(--radius-xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-6)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-8)]"
    >
      <header className="flex flex-col gap-[var(--spacing-1)]">
        <h3 className="text-[length:var(--text-xl)] font-semibold text-[var(--color-fg)]">
          Create your account
        </h3>
        <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          Free for 14 days, no credit card required.
        </p>
      </header>

      {errorList.length > 0 && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-[var(--radius-md)] border p-[var(--spacing-3)]"
          style={{
            borderColor: ERROR_BORDER,
            background: "color-mix(in oklch, oklch(62% 0.2 25) 6%, transparent)",
            color: ERROR_FG,
          }}
        >
          <p className="text-[length:var(--text-sm)] font-semibold">
            {errorList.length} {errorList.length === 1 ? "field needs" : "fields need"} attention
          </p>
          <ul className="mt-[var(--spacing-1)] list-disc pl-[var(--spacing-5)] text-[length:var(--text-xs)]">
            {errorList.map(([k, v]) => (
              <li key={k}>{v}</li>
            ))}
          </ul>
        </div>
      )}

      {submitted && (
        <div
          role="status"
          className="rounded-[var(--radius-md)] border p-[var(--spacing-3)] text-[length:var(--text-sm)]"
          style={{
            borderColor: "color-mix(in oklch, oklch(70% 0.16 150) 50%, transparent)",
            background: "color-mix(in oklch, oklch(70% 0.16 150) 8%, transparent)",
            color: "oklch(40% 0.13 150)",
          }}
        >
          Account created — check your email for a confirmation link.
        </div>
      )}

      <Field name="fullName" label="Full name" placeholder="Ada Reyes" autoComplete="name" error={errors.fullName} />
      <Field name="email" label="Work email" type="email" placeholder="you@team.com" autoComplete="email" helper="We'll only use this for account-critical notifications." error={errors.email} />
      <Field name="password" label="Password" type="password" autoComplete="new-password" placeholder="At least 8 characters" error={errors.password} />

      <fieldset className="flex flex-col gap-[var(--spacing-2)]">
        <legend className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
          What best describes your role?
        </legend>
        <div className="grid grid-cols-2 gap-[var(--spacing-2)] sm:grid-cols-3">
          {ROLES.map((r) => (
            <label
              key={r}
              className="group flex cursor-pointer items-center gap-[var(--spacing-2)] rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg)] transition-colors duration-[var(--dur-fast)] hover:border-[var(--color-fg-subtle)] has-[:checked]:border-[var(--color-brand-500)] has-[:checked]:bg-[var(--color-brand-50)] has-[:checked]:text-[var(--color-brand-900)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--color-ring)]"
            >
              <input type="radio" name="role" value={r} className="sr-only" />
              <span aria-hidden="true" className="grid h-4 w-4 place-items-center rounded-full border border-[var(--color-border)] group-has-[:checked]:border-[var(--color-brand-600)]">
                <span className="hidden h-2 w-2 rounded-full bg-[var(--color-brand-600)] group-has-[:checked]:block" />
              </span>
              {r}
            </label>
          ))}
        </div>
        {errors.role && (
          <p role="alert" className="text-[length:var(--text-xs)] font-medium" style={{ color: ERROR_FG }}>
            {errors.role}
          </p>
        )}
      </fieldset>

      <label className="group flex cursor-pointer items-start gap-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg)]">
        <input type="checkbox" name="terms" className="peer sr-only" />
        <span aria-hidden="true" className="mt-[2px] grid h-4 w-4 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-[var(--color-border)] group-has-[:checked]:border-[var(--color-brand-600)] group-has-[:checked]:bg-[var(--color-brand-600)] peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--color-ring)] peer-focus-visible:ring-offset-2">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100">
            <path d="M2.5 6.5l2.5 2.5 4.5-5" />
          </svg>
        </span>
        <span>
          I agree to the{" "}
          <a href="#" className="font-medium text-[var(--color-brand-600)] underline underline-offset-2">terms</a>{" "}
          and{" "}
          <a href="#" className="font-medium text-[var(--color-brand-600)] underline underline-offset-2">privacy policy</a>.
        </span>
      </label>
      {errors.terms && (
        <p role="alert" className="text-[length:var(--text-xs)] font-medium" style={{ color: ERROR_FG }}>
          {errors.terms}
        </p>
      )}

      <div className="flex flex-col-reverse gap-[var(--spacing-2)] sm:flex-row sm:items-center sm:justify-end">
        <Button type="button" variant="ghost" disabled={submitting}>
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} aria-busy={submitting || undefined}>
          {submitting && (
            <span aria-hidden="true" className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent motion-reduce:animate-none" />
          )}
          {submitting ? "Submitting…" : "Create account"}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  helper?: string;
  error?: string;
}

function Field({ name, label, type = "text", placeholder, autoComplete, helper, error }: FieldProps) {
  const id = React.useId();
  const helperId = helper ? `${id}-help` : undefined;
  const errId = error ? `${id}-err` : undefined;
  return (
    <div className="flex flex-col gap-[var(--spacing-1)]">
      <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={!!error || undefined}
        aria-describedby={[helperId, errId].filter(Boolean).join(" ") || undefined}
        className="h-10 rounded-[var(--radius-md)] border bg-[var(--color-surface)] px-[var(--spacing-3)] text-[length:var(--text-sm)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-[border-color,box-shadow] duration-[var(--dur-fast)] hover:border-[var(--color-fg-subtle)] focus:border-[var(--color-brand-500)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--color-brand-500)_28%,transparent)]"
        style={{ borderColor: error ? ERROR_BORDER : "var(--color-border)" }}
      />
      {helper && (
        <p id={helperId} className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
          {helper}
        </p>
      )}
      {error && (
        <p id={errId} role="alert" className="text-[length:var(--text-xs)] font-medium" style={{ color: ERROR_FG }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormPattern;
