const MEMBERS = [
  { initials: "AR", from: "var(--color-brand-500)", to: "var(--color-brand-700)" },
  { initials: "JL", from: "var(--color-accent-500)", to: "var(--color-accent-700)" },
  { initials: "TM", from: "var(--color-brand-400)", to: "var(--color-accent-500)" },
  { initials: "SK", from: "var(--color-brand-700)", to: "var(--color-brand-300)" },
];

export function ProjectCard() {
  const progress = 72;
  return (
    <article className="overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-sm)]">
      <div
        aria-hidden="true"
        className="relative h-24"
        style={{
          background:
            "radial-gradient(80% 120% at 20% 0%, var(--color-brand-400), transparent 60%), radial-gradient(80% 120% at 100% 100%, var(--color-accent-400), transparent 60%), var(--color-brand-700)",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
      </div>
      <div className="flex flex-col gap-[var(--spacing-3)] p-[var(--spacing-5)]">
        <div className="flex items-start justify-between gap-[var(--spacing-3)]">
          <div className="min-w-0">
            <p className="text-[length:var(--text-xs)] uppercase tracking-wider text-[var(--color-brand-600)]">
              Marketing site
            </p>
            <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
              Q3 launch — pricing rework
            </h3>
          </div>
          <span className="rounded-full bg-[var(--color-accent-50)] px-[var(--spacing-2)] py-[2px] text-[length:var(--text-xs)] font-semibold text-[var(--color-accent-700)]">
            Due May 18
          </span>
        </div>
        <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed">
          New plan structure, gradient-bordered featured tier, comparison table.
        </p>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-[length:var(--text-xs)] font-medium text-[var(--color-fg-muted)]">
              Progress
            </span>
            <span className="text-[length:var(--text-xs)] font-semibold tabular-nums text-[var(--color-fg)]">
              {progress}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Project progress"
            className="mt-[var(--spacing-1)] h-1.5 w-full overflow-hidden rounded-full bg-[var(--color-surface-elevated)]"
          >
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, var(--color-brand-500), var(--color-accent-500))",
              }}
            />
          </div>
        </div>
        <footer className="flex items-center justify-between pt-[var(--spacing-1)]">
          <ul className="flex -space-x-2" aria-label="Project members">
            {MEMBERS.map((m, i) => (
              <li key={i}>
                <span
                  aria-label={m.initials}
                  className="grid h-7 w-7 place-items-center rounded-full text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-on-brand)] ring-2 ring-[var(--color-surface)]"
                  style={{
                    background: `linear-gradient(135deg, ${m.from}, ${m.to})`,
                  }}
                >
                  {m.initials}
                </span>
              </li>
            ))}
            <li>
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--color-surface-elevated)] text-[length:var(--text-2xs)] font-semibold text-[var(--color-fg-muted)] ring-2 ring-[var(--color-surface)]">
                +3
              </span>
            </li>
          </ul>
          <span className="text-[length:var(--text-xs)] text-[var(--color-fg-muted)] tabular-nums">
            18 / 25 tasks
          </span>
        </footer>
      </div>
    </article>
  );
}

export default ProjectCard;
