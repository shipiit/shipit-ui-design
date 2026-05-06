import { Button } from "@/components/primitives/Button";

type Tone = "ok" | "warn" | "err";

interface Props {
  tone?: Tone;
}

const COPY: Record<Tone, { pill: string; title: string; body: string; cta: string }> = {
  ok: {
    pill: "Operational",
    title: "All systems normal",
    body: "All 14 services responding under target latency. Last check 12s ago.",
    cta: "View status page",
  },
  warn: {
    pill: "Degraded",
    title: "Elevated latency in EU-WEST",
    body: "Average response time +180ms. Investigation in progress.",
    cta: "Open incident",
  },
  err: {
    pill: "Outage",
    title: "Checkout API unreachable",
    body: "Payments are failing. On-call engineer paged 4 minutes ago.",
    cta: "View runbook",
  },
};

const PILL_STYLE: Record<Tone, { dotBg: string; pillBg: string; pillFg: string; dotPulse: boolean }> = {
  ok: {
    dotBg: "oklch(70% 0.16 150)",
    pillBg: "color-mix(in oklch, oklch(70% 0.16 150) 14%, transparent)",
    pillFg: "oklch(40% 0.13 150)",
    dotPulse: false,
  },
  warn: {
    dotBg: "var(--color-accent-500)",
    pillBg: "var(--color-accent-50)",
    pillFg: "var(--color-accent-700)",
    dotPulse: true,
  },
  err: {
    dotBg: "oklch(62% 0.2 25)",
    pillBg: "color-mix(in oklch, oklch(62% 0.2 25) 12%, transparent)",
    pillFg: "oklch(46% 0.18 25)",
    dotPulse: true,
  },
};

export function StatusCard({ tone = "ok" }: Props) {
  const c = COPY[tone];
  const s = PILL_STYLE[tone];
  return (
    <article
      role="status"
      className="flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)]"
    >
      <span
        className="inline-flex w-fit items-center gap-[var(--spacing-2)] rounded-full px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold"
        style={{ background: s.pillBg, color: s.pillFg }}
      >
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 rounded-full ${s.dotPulse ? "motion-safe:animate-pulse" : ""}`}
          style={{ background: s.dotBg }}
        />
        {c.pill}
      </span>
      <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
        {c.title}
      </h3>
      <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed">
        {c.body}
      </p>
      <div className="mt-[var(--spacing-1)]">
        <Button size="sm" variant="ghost">
          {c.cta} →
        </Button>
      </div>
    </article>
  );
}

export default StatusCard;
