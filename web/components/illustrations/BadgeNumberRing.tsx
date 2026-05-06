import * as React from "react";

interface BadgeNumberRingProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

/**
 * BadgeNumberRing — concentric brand rings + dotted accent outer ring.
 * Consumer renders the number/text as `children`, positioned absolutely centered.
 */
export function BadgeNumberRing({
  size = 96,
  className,
  children,
}: BadgeNumberRingProps) {
  return (
    <span
      className={className}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 96 96"
        width={size}
        height={size}
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
      >
        <defs>
          <radialGradient id="bnr-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--color-brand-50)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--color-brand-50)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer dotted accent ring */}
        <circle
          cx="48"
          cy="48"
          r="44"
          fill="none"
          stroke="var(--color-accent-400)"
          strokeWidth="1"
          strokeDasharray="2 4"
          opacity="0.7"
        />
        {/* Mid brand ring */}
        <circle
          cx="48"
          cy="48"
          r="38"
          fill="url(#bnr-fill)"
          stroke="var(--color-brand-300)"
          strokeWidth="1"
          opacity="0.55"
        />
        {/* Inner brand ring */}
        <circle
          cx="48"
          cy="48"
          r="32"
          fill="var(--color-surface)"
          stroke="var(--color-brand-400)"
          strokeWidth="1.5"
        />
        {/* Tick marks */}
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const x1 = 48 + Math.cos(a) * 41;
          const y1 = 48 + Math.sin(a) * 41;
          const x2 = 48 + Math.cos(a) * 45;
          const y2 = 48 + Math.sin(a) * 45;
          return (
            <line
              key={deg}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--color-brand-500)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
      <span
        style={{
          position: "relative",
          zIndex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </span>
    </span>
  );
}

export default BadgeNumberRing;
