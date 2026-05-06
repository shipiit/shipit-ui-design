import { Button } from "@/components/primitives/Button";

export function GradientCard() {
  return (
    <article
      className="relative flex flex-col gap-[var(--spacing-4)] overflow-hidden rounded-[var(--radius-xl)] p-[var(--spacing-6)] text-[var(--color-fg-on-brand)] shadow-[var(--shadow-lg)]"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-700), var(--color-brand-500) 60%, var(--color-accent-500))",
      }}
    >
      {/* Decorative orbs */}
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-50 blur-2xl"
        style={{ background: "var(--color-accent-300)" }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-12 -left-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{ background: "var(--color-brand-300)" }}
      />
      {/* Subtle grid overlay */}
      <span
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 flex flex-col gap-[var(--spacing-4)]">
        <span className="inline-flex w-fit items-center gap-[var(--spacing-2)] rounded-full bg-white/20 px-[var(--spacing-3)] py-[var(--spacing-1)] text-[length:var(--text-xs)] font-semibold backdrop-blur-sm">
          <span aria-hidden="true">✦</span>
          Pro plan
        </span>
        <div>
          <h3 className="text-[length:var(--text-2xl)] font-bold tracking-tight">
            Ship faster with shipit Pro.
          </h3>
          <p className="mt-[var(--spacing-2)] text-[length:var(--text-sm)] opacity-90">
            Unlimited projects, custom themes, and priority refine queues.
          </p>
        </div>
        <div className="mt-[var(--spacing-2)] flex flex-wrap gap-[var(--spacing-2)]">
          <Button
            size="md"
            variant="secondary"
            className="border-transparent bg-white text-[var(--color-brand-700)] hover:bg-white/90"
          >
            Upgrade now
          </Button>
          <Button
            size="md"
            variant="ghost"
            className="text-[var(--color-fg-on-brand)] hover:bg-white/15"
          >
            See plans
          </Button>
        </div>
      </div>
    </article>
  );
}

export default GradientCard;
