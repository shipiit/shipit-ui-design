"use client";

import * as React from "react";
import { Button } from "@/components/primitives/Button";

interface ProfileSectionProps {
  onDirtyChange: (dirty: boolean) => void;
  resetKey: number;
}

const INITIAL = {
  displayName: "Rahul Raj",
  bio: "Designer-engineer building shipit-ui-design. Posting plant pics in #random.",
  website: "https://iamrraj.com",
  handle: "rahulraj",
  pronouns: "he/him",
};

const BIO_LIMIT = 160;

export function ProfileSection({ onDirtyChange, resetKey }: ProfileSectionProps) {
  const [form, setForm] = React.useState(INITIAL);

  React.useEffect(() => {
    setForm(INITIAL);
    onDirtyChange(false);
  }, [resetKey, onDirtyChange]);

  const update = <K extends keyof typeof INITIAL>(k: K, v: string) => {
    setForm((f) => {
      const next = { ...f, [k]: v };
      const dirty = (Object.keys(next) as (keyof typeof INITIAL)[]).some(
        (key) => next[key] !== INITIAL[key],
      );
      onDirtyChange(dirty);
      return next;
    });
  };

  const handleAvailable = form.handle.length >= 3 && form.handle !== "admin";

  return (
    <div className="flex flex-col gap-[var(--spacing-8)]">
      <SectionHeader
        title="Profile"
        description="How your name, handle, and bio show up across your workspace."
      />

      <Card title="Public profile" description="Visible to teammates and on shared docs.">
        <div className="flex flex-col gap-[var(--spacing-4)] sm:flex-row sm:items-center">
          <div
            role="img"
            aria-label="Profile avatar with initials R R"
            className="relative inline-flex h-24 w-24 shrink-0 items-center justify-center rounded-[var(--radius-full)] bg-gradient-to-br from-[var(--color-brand-400)] to-[var(--color-brand-700)] text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg-on-brand)] shadow-[var(--shadow-md)]"
          >
            RR
            <span aria-hidden="true" className="absolute -right-1 -bottom-1 h-5 w-5 rounded-full border-2 border-[var(--color-surface)] bg-[var(--color-accent-400)]" />
          </div>
          <div className="flex flex-col gap-[var(--spacing-2)]">
            <div className="flex flex-wrap gap-[var(--spacing-2)]">
              <Button variant="secondary" size="sm" type="button">
                Change photo
              </Button>
              <Button variant="ghost" size="sm" type="button">
                Remove
              </Button>
            </div>
            <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">
              PNG or JPG, square, at least 256×256.
            </p>
          </div>
        </div>

        <div className="mt-[var(--spacing-6)] grid gap-[var(--spacing-5)]">
          <Field
            id="displayName"
            label="Display name"
            helper="The name your teammates see in mentions and reviews."
          >
            <input
              id="displayName"
              type="text"
              value={form.displayName}
              onChange={(e) => update("displayName", e.target.value)}
              className={inputCls}
            />
          </Field>

          <Field
            id="bio"
            label="Bio"
            helper="Up to 160 characters. Shown on your profile card."
            trailing={
              <span
                className={`tabular-nums text-[length:var(--text-2xs)] ${
                  form.bio.length > BIO_LIMIT
                    ? "text-[var(--color-accent-700)] dark:text-[var(--color-accent-300)]"
                    : "text-[var(--color-fg-subtle)]"
                }`}
              >
                {form.bio.length}/{BIO_LIMIT}
              </span>
            }
          >
            <textarea
              id="bio"
              rows={3}
              value={form.bio}
              onChange={(e) => update("bio", e.target.value)}
              className={`${inputCls} resize-y leading-snug`}
            />
          </Field>

          <Field id="website" label="Website" helper="Your personal site or portfolio.">
            <input
              id="website"
              type="url"
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Card>

      <Card title="Email + handle" description="Used for login, mentions, and unique URLs.">
        <div className="grid gap-[var(--spacing-5)] md:grid-cols-2">
          <Field id="email" label="Email" helper="Sign-in address. Verified.">
            <div className="flex items-center gap-[var(--spacing-2)]">
              <input
                id="email"
                type="email"
                readOnly
                value="rahul@iamrraj.com"
                className={`${inputCls} cursor-not-allowed bg-[var(--color-surface-elevated)] text-[var(--color-fg-muted)]`}
              />
              <button
                type="button"
                className="shrink-0 text-[length:var(--text-xs)] font-medium text-[var(--color-brand-700)] underline-offset-2 hover:underline dark:text-[var(--color-brand-200)]"
              >
                Change
              </button>
            </div>
          </Field>

          <Field
            id="handle"
            label="Handle"
            helper={handleAvailable ? "Available." : "Pick at least 3 characters."}
          >
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-[var(--spacing-3)] top-1/2 -translate-y-1/2 text-[length:var(--text-sm)] text-[var(--color-fg-subtle)]"
              >
                @
              </span>
              <input
                id="handle"
                type="text"
                value={form.handle}
                onChange={(e) => update("handle", e.target.value)}
                className={`${inputCls} pl-7`}
              />
              <span
                aria-hidden="true"
                className={`absolute right-[var(--spacing-3)] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${
                  handleAvailable
                    ? "bg-[oklch(70%_0.16_150)]"
                    : "bg-[var(--color-accent-500)]"
                }`}
              />
            </div>
          </Field>

          <Field id="pronouns" label="Pronouns" helper="Optional, shown next to your name.">
            <input
              id="pronouns"
              type="text"
              value={form.pronouns}
              onChange={(e) => update("pronouns", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>
      </Card>
    </div>
  );
}

const inputCls =
  "block w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface)] px-[var(--spacing-3)] py-[var(--spacing-2)] text-[length:var(--text-sm)] text-[var(--color-fg)] placeholder:text-[var(--color-fg-subtle)] transition-[border-color,box-shadow] duration-[var(--dur-fast)] hover:border-[var(--color-fg-subtle)] focus:border-[var(--color-brand)] focus:outline-none focus:ring-2 focus:ring-[color-mix(in_oklch,var(--color-brand-400)_30%,transparent)] disabled:cursor-not-allowed disabled:opacity-60";

function SectionHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-[var(--spacing-3)]">
      <div className="min-w-0">
        <h2 className="text-[length:var(--text-2xl)] font-semibold tracking-tight text-[var(--color-fg)]">
          {title}
        </h2>
        <p className="mt-[var(--spacing-1)] max-w-prose text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}

function Card({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[var(--radius-2xl)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] sm:p-[var(--spacing-6)]">
      <header className="mb-[var(--spacing-5)] border-b border-[var(--color-border-subtle)] pb-[var(--spacing-4)]">
        <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">{title}</h3>
        {description && (
          <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{description}</p>
        )}
      </header>
      {children}
    </section>
  );
}

function Field({
  id,
  label,
  helper,
  trailing,
  children,
}: {
  id: string;
  label: string;
  helper?: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[var(--spacing-1)]">
      <div className="flex items-center justify-between gap-[var(--spacing-2)]">
        <label htmlFor={id} className="text-[length:var(--text-sm)] font-medium text-[var(--color-fg)]">
          {label}
        </label>
        {trailing}
      </div>
      {children}
      {helper && (
        <p className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)]">{helper}</p>
      )}
    </div>
  );
}

export default ProfileSection;
