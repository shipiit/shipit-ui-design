import * as React from "react";

interface InstallPreviewProps {
  lines: string[];
}

/**
 * InstallPreview — faux terminal output card for the Install section's
 * "what you'll see" desktop preview. Decorative inside the section.
 */
export function InstallPreview({ lines }: InstallPreviewProps) {
  return (
    <div
      className="
        rounded-[var(--radius-xl)]
        bg-[var(--color-surface-elevated)]
        border border-[var(--color-border)]
        shadow-[var(--shadow-sm)]
        overflow-hidden
      "
    >
      <div
        className="
          flex items-center gap-1.5 px-4 h-8
          bg-[var(--color-surface)]
          border-b border-[var(--color-border-subtle)]
        "
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-[var(--radius-full)] bg-[var(--color-accent-500)]" />
        <span className="h-2.5 w-2.5 rounded-[var(--radius-full)] bg-[var(--color-accent-400)]" />
        <span className="h-2.5 w-2.5 rounded-[var(--radius-full)] bg-[var(--color-brand-400)]" />
        <span
          className="
            ml-2 font-[var(--font-mono)]
            text-[length:var(--text-2xs)]
            uppercase tracking-[0.08em]
            text-[var(--color-fg-subtle)]
          "
        >
          output
        </span>
      </div>
      <pre
        className="
          font-[var(--font-mono)]
          text-[length:var(--text-xs)] leading-relaxed
          text-[var(--color-fg)]
          px-4 py-3
          whitespace-pre-wrap
        "
      >
        {lines.map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-[var(--color-brand-500)] font-bold select-none">
              $
            </span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}

export default InstallPreview;
