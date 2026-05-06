import * as React from "react";

interface SectionOrnamentProps {
  variant?: "left" | "right" | "top";
  tone?: "brand" | "accent";
  className?: string;
}

/**
 * SectionOrnament — large blurred radial decoration intended to sit
 * absolutely-positioned behind a section. Consumer wraps it appropriately.
 */
export function SectionOrnament({
  variant = "top",
  tone = "brand",
  className,
}: SectionOrnamentProps) {
  const positionClass =
    variant === "left"
      ? "absolute -left-32 top-1/3 -translate-y-1/2 w-[28rem] h-[28rem]"
      : variant === "right"
        ? "absolute -right-32 top-1/3 -translate-y-1/2 w-[28rem] h-[28rem]"
        : "absolute left-1/2 -top-24 -translate-x-1/2 w-[44rem] h-[24rem]";

  const stop1 =
    tone === "brand" ? "var(--color-brand-400)" : "var(--color-accent-400)";
  const stop2 =
    tone === "brand" ? "var(--color-brand-700)" : "var(--color-accent-600)";
  const gradId = `so-${variant}-${tone}`;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={`${positionClass} pointer-events-none -z-10 ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ filter: "blur(48px)", opacity: 0.35 }}
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={stop1} stopOpacity="0.65" />
          <stop offset="55%" stopColor={stop2} stopOpacity="0.25" />
          <stop offset="100%" stopColor={stop2} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="180" fill={`url(#${gradId})`} />
      {/* Secondary smaller blob for organic feel */}
      <circle cx="280" cy="140" r="80" fill={`url(#${gradId})`} opacity="0.7" />
    </svg>
  );
}

export default SectionOrnament;
