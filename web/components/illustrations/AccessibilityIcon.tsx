import * as React from "react";

interface AccessibilityIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function AccessibilityIcon({
  size = 64,
  className,
  animated = false,
}: AccessibilityIconProps) {
  return (
    <svg
      role="img"
      aria-label="Accessible person with audible waves"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="a11y-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Head glow */}
      <circle cx="24" cy="20" r="14" fill="url(#a11y-glow)" />

      {/* Head */}
      <circle
        cx="24"
        cy="20"
        r="6"
        fill="var(--color-brand-400)"
        stroke="var(--color-brand-600)"
        strokeWidth="1"
      />
      <circle
        cx="24"
        cy="20"
        r="9"
        fill="none"
        stroke="var(--color-brand-300)"
        strokeWidth="1"
        opacity="0.6"
        strokeDasharray="2 2"
      />

      {/* Body */}
      <path
        d="M24 28 L24 38 M16 32 L32 32 M24 38 L18 52 M24 38 L30 52"
        stroke="var(--color-brand-500)"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Audible arcs to the right */}
      <g
        fill="none"
        stroke="var(--color-accent-400)"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M40 24 Q 44 32 40 40" opacity="0.95">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M46 20 Q 52 32 46 44" opacity="0.75">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.2;0.85;0.2"
              dur="1.6s"
              begin="0.2s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <path d="M52 16 Q 60 32 52 48" opacity="0.5">
          {animated && (
            <animate
              attributeName="opacity"
              values="0.1;0.6;0.1"
              dur="1.6s"
              begin="0.4s"
              repeatCount="indefinite"
            />
          )}
        </path>
      </g>
    </svg>
  );
}

export default AccessibilityIcon;
