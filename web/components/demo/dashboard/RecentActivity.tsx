"use client";

import * as React from "react";

type ActivityKind = "user" | "billing" | "deploy" | "comment" | "alert";

interface Event {
  id: string;
  kind: ActivityKind;
  who: string;
  initials: string;
  text: string;
  ago: string;
}

const EVENTS: Event[] = [
  { id: "e1", kind: "user", who: "Priya N.", initials: "PN", text: "invited 3 teammates to Acme workspace.", ago: "2m ago" },
  { id: "e2", kind: "billing", who: "Stripe", initials: "ST", text: "captured $480.00 from invoice #1042.", ago: "12m ago" },
  { id: "e3", kind: "deploy", who: "CI", initials: "CI", text: "deployed web@2.14.0 to production.", ago: "38m ago" },
  { id: "e4", kind: "comment", who: "Marco D.", initials: "MD", text: "left a note on the onboarding flow.", ago: "1h ago" },
  { id: "e5", kind: "alert", who: "Monitoring", initials: "MN", text: "p99 latency above 1.2s for 4 minutes.", ago: "2h ago" },
  { id: "e6", kind: "user", who: "Sarah K.", initials: "SK", text: "upgraded Acme to the Team plan.", ago: "3h ago" },
  { id: "e7", kind: "comment", who: "Ari T.", initials: "AT", text: "approved the new pricing copy.", ago: "5h ago" },
];

export function RecentActivity() {
  return (
    <section
      aria-labelledby="activity-title"
      className="rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] sm:p-[var(--spacing-6)]"
    >
      <header className="mb-[var(--spacing-4)] flex items-center justify-between gap-[var(--spacing-3)]">
        <h3 id="activity-title" className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
          Activity feed
        </h3>
        <a href="#" className="text-[length:var(--text-xs)] font-medium text-[var(--color-brand-700)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ring)]">
          View all
        </a>
      </header>
      <ul className="flex flex-col gap-[var(--spacing-4)]">
        {EVENTS.map((e) => (
          <li key={e.id} className="flex items-start gap-[var(--spacing-3)]">
            <Avatar kind={e.kind} initials={e.initials} />
            <div className="min-w-0 flex-1">
              <p className="text-[length:var(--text-sm)] leading-snug text-[var(--color-fg)]">
                <span className="font-medium">{e.who}</span>{" "}
                <span className="text-[var(--color-fg-muted)]">{e.text}</span>
              </p>
              <p className="mt-[var(--spacing-1)] text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">{e.ago}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Avatar({ kind, initials }: { kind: ActivityKind; initials: string }) {
  const tone =
    kind === "billing" || kind === "alert"
      ? "bg-[var(--color-accent-100)] text-[var(--color-accent-700)]"
      : kind === "deploy"
      ? "bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)]"
      : "bg-[var(--color-brand-100)] text-[var(--color-brand-700)]";
  return (
    <span aria-hidden="true" className={`relative mt-[2px] inline-flex h-8 w-8 flex-none items-center justify-center rounded-full text-[length:var(--text-xs)] font-semibold ${tone}`}>
      {initials}
      <span className="absolute -bottom-0.5 -right-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-surface)] text-[var(--color-fg-muted)]">
        <KindGlyph kind={kind} />
      </span>
    </span>
  );
}

function KindGlyph({ kind }: { kind: ActivityKind }) {
  const common = { width: 8, height: 8, viewBox: "0 0 12 12", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  switch (kind) {
    case "user":     return <svg {...common}><circle cx="6" cy="4" r="2" /><path d="M2 11c.6-2.2 2.2-3.2 4-3.2s3.4 1 4 3.2" /></svg>;
    case "billing":  return <svg {...common}><rect x="1.5" y="3" width="9" height="6" rx="1" /><path d="M1.5 5h9" /></svg>;
    case "deploy":   return <svg {...common}><path d="M6 1v8M3 4l3-3 3 3" /></svg>;
    case "comment":  return <svg {...common}><path d="M2 4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5l-3 2V4z" /></svg>;
    case "alert":    return <svg {...common}><path d="M6 2v4M6 8.5v.01" /><circle cx="6" cy="6" r="5" /></svg>;
  }
}

export default RecentActivity;
