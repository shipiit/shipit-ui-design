import * as React from "react";

interface StackIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function StackIcon({
  size = 64,
  className,
  animated = false,
}: StackIconProps) {
  return (
    <svg
      role="img"
      aria-label="Stack of framework plates"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bottom plate (neutral) */}
      <g transform="rotate(-6 32 46)">
        <rect
          x="12"
          y="38"
          width="40"
          height="14"
          rx="3"
          fill="var(--color-neutral-200)"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
        <circle cx="18" cy="45" r="1.5" fill="var(--color-neutral-500)" />
        <rect x="22" y="44" width="16" height="2" rx="1" fill="var(--color-neutral-500)" opacity="0.5" />
      </g>

      {/* Middle plate (accent) */}
      <g transform="rotate(4 32 32)" style={animated ? { animation: "st-float 3s ease-in-out infinite" } : undefined}>
        <rect
          x="11"
          y="22"
          width="42"
          height="16"
          rx="3"
          fill="var(--color-accent-300)"
          stroke="var(--color-accent-500)"
          strokeWidth="1"
        />
        <circle cx="17" cy="30" r="1.75" fill="var(--color-accent-700)" />
        <rect x="22" y="29" width="22" height="2.5" rx="1.25" fill="var(--color-accent-700)" opacity="0.6" />
      </g>

      {/* Top plate (brand) */}
      <g transform="rotate(-3 32 18)" style={animated ? { animation: "st-float 3s ease-in-out infinite", animationDelay: "0.4s" } : undefined}>
        <rect
          x="13"
          y="8"
          width="38"
          height="16"
          rx="3"
          fill="var(--color-brand-400)"
          stroke="var(--color-brand-600)"
          strokeWidth="1"
        />
        <circle cx="19" cy="16" r="1.75" fill="var(--color-brand-50)" />
        <rect x="24" y="15" width="20" height="2.5" rx="1.25" fill="var(--color-brand-50)" opacity="0.7" />
      </g>

      <style>
        {`@keyframes st-float {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-1.5px) rotate(-3deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="st-float"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default StackIcon;
