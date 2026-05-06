export function GlassCard() {
  return (
    <div
      className="relative overflow-hidden rounded-[var(--radius-xl)] p-[var(--spacing-3)]"
      style={{
        background:
          "radial-gradient(60% 50% at 30% 20%, color-mix(in oklch, var(--color-brand-400) 32%, transparent), transparent), radial-gradient(50% 60% at 80% 90%, color-mix(in oklch, var(--color-accent-400) 28%, transparent), transparent), var(--color-brand-900)",
      }}
    >
      {/* Decorative orbs to make the glass actually have something behind it */}
      <span
        aria-hidden="true"
        className="absolute -left-4 top-8 h-24 w-24 rounded-full blur-2xl"
        style={{ background: "var(--color-accent-400)", opacity: 0.6 }}
      />
      <span
        aria-hidden="true"
        className="absolute right-6 bottom-8 h-20 w-20 rounded-full blur-2xl"
        style={{ background: "var(--color-brand-300)", opacity: 0.55 }}
      />

      <article
        className="relative flex flex-col gap-[var(--spacing-3)] rounded-[var(--radius-lg)] p-[var(--spacing-5)] text-[var(--color-fg-on-brand)] shadow-[var(--shadow-lg)]"
        style={{
          background: "color-mix(in oklch, var(--color-neutral-50) 14%, transparent)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid color-mix(in oklch, var(--color-neutral-50) 22%, transparent)",
        }}
      >
        <div className="flex items-center gap-[var(--spacing-2)]">
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-[var(--radius-md)]"
            style={{
              background: "color-mix(in oklch, var(--color-neutral-50) 18%, transparent)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2l2.4 6.6L21 11l-5.6 4 1.8 6.5L12 18l-5.2 3.5L8.6 15 3 11l6.6-2.4z" />
            </svg>
          </span>
          <h3 className="text-[length:var(--text-base)] font-semibold">
            Crafted on the glass
          </h3>
        </div>
        <p className="text-[length:var(--text-sm)] opacity-90 leading-relaxed">
          Glassmorphism lives on overlays — sticky nav, command palettes, sheets — never on body cards. This one sits over a brand-tinted hero.
        </p>
        <dl className="mt-[var(--spacing-1)] grid grid-cols-2 gap-[var(--spacing-2)] border-t pt-[var(--spacing-3)]" style={{ borderColor: "color-mix(in oklch, var(--color-neutral-50) 18%, transparent)" }}>
          <div>
            <dt className="text-[length:var(--text-xs)] opacity-70">Blur</dt>
            <dd className="font-semibold tabular-nums">20px</dd>
          </div>
          <div>
            <dt className="text-[length:var(--text-xs)] opacity-70">Saturation</dt>
            <dd className="font-semibold tabular-nums">180%</dd>
          </div>
        </dl>
      </article>
    </div>
  );
}

export default GlassCard;
