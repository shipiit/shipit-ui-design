export function ActionCard() {
  return (
    <a
      href="#"
      className="group flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] p-[var(--spacing-5)] shadow-[var(--shadow-sm)] transition-[transform,box-shadow,border-color] duration-[var(--dur-default)] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[var(--color-brand-300)] hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
    >
      <span
        aria-hidden="true"
        className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] text-[var(--color-brand-700)] transition-transform duration-[var(--dur-default)] ease-[var(--ease-out)] group-hover:scale-105"
        style={{
          background:
            "radial-gradient(circle at 30% 20%, color-mix(in oklch, var(--color-brand-400) 22%, var(--color-brand-50)) 0%, var(--color-brand-50) 70%)",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4.09 12.97A1 1 0 0 0 4.86 14.5H11l-1 7.5 9-12H13z" />
        </svg>
      </span>
      <h3 className="text-[length:var(--text-base)] font-semibold text-[var(--color-fg)]">
        Generate from intent
      </h3>
      <p className="text-[length:var(--text-sm)] text-[var(--color-fg-muted)] leading-relaxed">
        Describe what you want; the plugin reads tokens, picks patterns, and outputs production code.
      </p>
      <span className="mt-auto inline-flex items-center gap-[var(--spacing-1)] text-[length:var(--text-sm)] font-semibold text-[var(--color-brand-600)]">
        Try /component
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="transition-transform duration-[var(--dur-default)] ease-[var(--ease-out)] group-hover:translate-x-0.5"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      </span>
    </a>
  );
}

export default ActionCard;
