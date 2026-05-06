import { Button } from "@/components/primitives/Button";

export function ProfileCard() {
  return (
    <article className="flex flex-col items-center gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-6)] text-center shadow-[var(--shadow-sm)]">
      <span
        aria-hidden="true"
        className="grid h-16 w-16 place-items-center rounded-full text-[length:var(--text-xl)] font-semibold text-[var(--color-fg-on-brand)] shadow-[var(--shadow-md)]"
        style={{
          background:
            "conic-gradient(from 200deg, var(--color-brand-500), var(--color-accent-500), var(--color-brand-700))",
        }}
      >
        AR
      </span>
      <div>
        <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
          Ada Reyes
        </h3>
        <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)]">
          Senior Product Designer
        </p>
      </div>
      <dl className="mt-[var(--spacing-2)] grid w-full grid-cols-3 gap-[var(--spacing-2)] border-t border-[var(--color-border-subtle)] pt-[var(--spacing-3)] text-center">
        {[
          { l: "Posts", v: "128" },
          { l: "Followers", v: "4.2k" },
          { l: "Following", v: "318" },
        ].map((s) => (
          <div key={s.l}>
            <dt className="text-[length:var(--text-xs)] text-[var(--color-fg-subtle)]">
              {s.l}
            </dt>
            <dd className="text-[length:var(--text-sm)] font-semibold tabular-nums text-[var(--color-fg)]">
              {s.v}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-[var(--spacing-2)] flex w-full gap-[var(--spacing-2)]">
        <Button size="sm" className="flex-1">
          Follow
        </Button>
        <Button size="sm" variant="secondary" className="flex-1">
          Message
        </Button>
      </div>
    </article>
  );
}

export default ProfileCard;
