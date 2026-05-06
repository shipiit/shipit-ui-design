import * as React from "react";

interface ActivateIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function ActivateIcon({
  size = 64,
  className,
  animated = false,
}: ActivateIconProps) {
  return (
    <svg
      role="img"
      aria-label="Activate power"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ai-ring" cx="50%" cy="50%" r="50%">
          <stop offset="60%" stopColor="var(--color-brand-400)" stopOpacity="0" />
          <stop offset="80%" stopColor="var(--color-brand-400)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--color-brand-400)" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ai-power" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-300)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
      </defs>

      {/* Glow ring */}
      <circle
        cx="26"
        cy="32"
        r="22"
        fill="url(#ai-ring)"
        style={
          animated
            ? { animation: "ai-pulse 2s ease-in-out infinite", transformOrigin: "26px 32px" }
            : undefined
        }
      />

      {/* Power button base */}
      <circle
        cx="26"
        cy="32"
        r="16"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <circle
        cx="26"
        cy="32"
        r="13"
        fill="none"
        stroke="url(#ai-power)"
        strokeWidth="2.5"
      />

      {/* Power glyph */}
      <path
        d="M26 24 L26 33"
        stroke="url(#ai-power)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M20 30 A 8 8 0 1 0 32 30"
        stroke="url(#ai-power)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Motion lines on right */}
      <g
        stroke="var(--color-brand-400)"
        strokeWidth="2.25"
        strokeLinecap="round"
      >
        <line x1="48" y1="22" x2="56" y2="22" opacity="0.9">
          {animated && (
            <animate
              attributeName="x2"
              values="52;56;52"
              dur="1.4s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="48" y1="32" x2="58" y2="32" opacity="0.7">
          {animated && (
            <animate
              attributeName="x2"
              values="54;58;54"
              dur="1.6s"
              repeatCount="indefinite"
            />
          )}
        </line>
        <line x1="48" y1="42" x2="55" y2="42" opacity="0.85">
          {animated && (
            <animate
              attributeName="x2"
              values="51;55;51"
              dur="1.5s"
              repeatCount="indefinite"
            />
          )}
        </line>
      </g>

      {/* Lightning accent in corner */}
      <path
        d="M52 8 L47 16 L51 16 L48 22 L55 13 L51 13 Z"
        fill="var(--color-accent-400)"
        stroke="var(--color-accent-500)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />

      <style>
        {`@keyframes ai-pulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.06); opacity: 0.8; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ai-pulse"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default ActivateIcon;
