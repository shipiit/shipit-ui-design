import * as React from "react";

interface MotionIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function MotionIcon({
  size = 64,
  className,
  animated = false,
}: MotionIconProps) {
  return (
    <svg
      role="img"
      aria-label="Motion curve with stagger dots"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mo-curve" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-500)" />
          <stop offset="100%" stopColor="var(--color-accent-400)" />
        </linearGradient>
      </defs>

      {/* Baseline */}
      <line
        x1="8"
        y1="52"
        x2="56"
        y2="52"
        stroke="var(--color-border)"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* Curve */}
      <path
        d="M8 52 C 22 52, 26 14, 56 12"
        stroke="url(#mo-curve)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        style={
          animated
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: "mo-draw 1.6s ease-out forwards",
              }
            : undefined
        }
      />

      {/* Stagger dots — increasing size along curve */}
      <circle cx="16" cy="48" r="2" fill="var(--color-brand-500)" />
      <circle cx="16" cy="48" r="3.5" fill="var(--color-brand-500)" opacity="0.18" />

      <circle cx="32" cy="32" r="3" fill="var(--color-brand-400)" />
      <circle cx="32" cy="32" r="5" fill="var(--color-brand-400)" opacity="0.18" />

      <circle cx="50" cy="16" r="4" fill="var(--color-accent-400)" />
      <circle cx="50" cy="16" r="6.5" fill="var(--color-accent-400)" opacity="0.2" />

      {/* Tiny tick marks on baseline */}
      <line x1="16" y1="50" x2="16" y2="54" stroke="var(--color-border)" strokeWidth="1" />
      <line x1="32" y1="50" x2="32" y2="54" stroke="var(--color-border)" strokeWidth="1" />
      <line x1="50" y1="50" x2="50" y2="54" stroke="var(--color-border)" strokeWidth="1" />

      <style>
        {`@keyframes mo-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mo-draw"] { animation: none !important; stroke-dasharray: none !important; stroke-dashoffset: 0 !important; }
        }`}
      </style>
    </svg>
  );
}

export default MotionIcon;
