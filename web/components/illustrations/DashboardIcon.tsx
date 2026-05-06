import * as React from "react";

interface DashboardIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function DashboardIcon({
  size = 64,
  className,
  animated = false,
}: DashboardIconProps) {
  return (
    <svg
      role="img"
      aria-label="Dashboard preview with KPI tiles"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="db-spark" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-accent-400)" />
        </linearGradient>
      </defs>

      {/* Main frame */}
      <rect
        x="6"
        y="10"
        width="52"
        height="44"
        rx="3"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />

      {/* Top bar */}
      <rect
        x="6"
        y="10"
        width="52"
        height="6"
        rx="3"
        fill="var(--color-surface-elevated)"
      />
      <line x1="6" y1="16" x2="58" y2="16" stroke="var(--color-border-subtle)" strokeWidth="0.75" />
      <circle cx="10" cy="13" r="1" fill="var(--color-accent-500)" />
      <circle cx="13" cy="13" r="1" fill="var(--color-accent-400)" />
      <circle cx="16" cy="13" r="1" fill="var(--color-brand-400)" />

      {/* Sidebar rail */}
      <rect x="6" y="16" width="10" height="38" fill="var(--color-surface-elevated)" />
      <line x1="16" y1="16" x2="16" y2="54" stroke="var(--color-border-subtle)" strokeWidth="0.75" />
      <circle cx="11" cy="22" r="1.5" fill="var(--color-brand-500)" />
      <circle cx="11" cy="30" r="1.25" fill="var(--color-neutral-400)" />
      <circle cx="11" cy="38" r="1.25" fill="var(--color-neutral-400)" />
      <circle cx="11" cy="46" r="1.25" fill="var(--color-neutral-400)" />

      {/* KPI tiles 2x2 */}
      <g>
        <rect x="20" y="20" width="16" height="14" rx="2" fill="var(--color-brand-50)" stroke="var(--color-brand-200)" strokeWidth="0.5" />
        <rect x="22" y="23" width="6" height="1.5" rx="0.75" fill="var(--color-brand-500)" opacity="0.5" />
        <text x="22" y="32" fontSize="6" fontWeight="700" fill="var(--color-brand-600)">4.2K</text>

        <rect x="38" y="20" width="16" height="14" rx="2" fill="var(--color-accent-100)" stroke="var(--color-accent-300)" strokeWidth="0.5" />
        <rect x="40" y="23" width="6" height="1.5" rx="0.75" fill="var(--color-accent-500)" opacity="0.5" />
        <text x="40" y="32" fontSize="6" fontWeight="700" fill="var(--color-accent-700)">92%</text>

        {/* Bottom-left tile with mini sparkline */}
        <rect x="20" y="36" width="34" height="14" rx="2" fill="var(--color-surface-elevated)" stroke="var(--color-border-subtle)" strokeWidth="0.5" />
        <rect x="22" y="39" width="10" height="1.5" rx="0.75" fill="var(--color-fg-muted)" opacity="0.5" />
        <polyline
          points="22,46 26,44 30,45 34,42 38,43 42,40 46,41 50,38"
          fill="none"
          stroke="url(#db-spark)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          style={
            animated
              ? {
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  animation: "db-draw 1.6s ease-out forwards",
                }
              : undefined
          }
        />
      </g>

      <style>
        {`@keyframes db-draw {
          to { stroke-dashoffset: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="db-draw"] { animation: none !important; stroke-dasharray: none !important; stroke-dashoffset: 0 !important; }
        }`}
      </style>
    </svg>
  );
}

export default DashboardIcon;
