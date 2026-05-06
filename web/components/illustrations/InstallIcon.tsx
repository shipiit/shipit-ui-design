import * as React from "react";

interface InstallIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function InstallIcon({
  size = 64,
  className,
  animated = false,
}: InstallIconProps) {
  return (
    <svg
      role="img"
      aria-label="Install package onto card"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ii-glow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ii-arrow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-300)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
      </defs>

      {/* Glow under card */}
      <ellipse
        cx="32"
        cy="52"
        rx="22"
        ry="6"
        fill="url(#ii-glow)"
      />

      {/* Card */}
      <rect
        x="12"
        y="32"
        width="40"
        height="20"
        rx="3"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <rect
        x="16"
        y="38"
        width="14"
        height="3"
        rx="1.5"
        fill="var(--color-brand-200)"
      />
      <rect
        x="16"
        y="44"
        width="22"
        height="2"
        rx="1"
        fill="var(--color-neutral-200)"
      />

      {/* Arrow drawing in from above */}
      <g
        style={
          animated
            ? { animation: "ii-drop 1.6s ease-in-out infinite" }
            : undefined
        }
      >
        <path
          d="M32 8 L32 28"
          stroke="url(#ii-arrow)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M24 22 L32 30 L40 22"
          stroke="url(#ii-arrow)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Spark dots ascending */}
      <circle cx="14" cy="22" r="1.5" fill="var(--color-accent-400)" opacity="0.9" />
      <circle cx="50" cy="18" r="1" fill="var(--color-accent-300)" opacity="0.85" />
      <circle cx="48" cy="28" r="1.25" fill="var(--color-brand-400)" opacity="0.9" />

      <style>
        {`@keyframes ii-drop {
          0%,100% { transform: translateY(-2px); }
          50% { transform: translateY(2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ii-drop"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default InstallIcon;
