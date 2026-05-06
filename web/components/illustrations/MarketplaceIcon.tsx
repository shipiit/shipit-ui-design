import * as React from "react";

interface MarketplaceIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * MarketplaceIcon — storefront with stacked cards, flag, and price tag.
 * All colors via tokens; light + dark mode safe.
 */
export function MarketplaceIcon({
  size = 64,
  className,
  animated = false,
}: MarketplaceIconProps) {
  return (
    <svg
      role="img"
      aria-label="Marketplace storefront"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mp-awning" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" />
          <stop offset="100%" stopColor="var(--color-brand-600)" />
        </linearGradient>
        <linearGradient id="mp-flag" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent-400)" />
          <stop offset="100%" stopColor="var(--color-accent-300)" />
        </linearGradient>
      </defs>

      {/* Back card 2 */}
      <rect
        x="10"
        y="14"
        width="40"
        height="32"
        rx="3"
        fill="var(--color-neutral-200)"
        opacity="0.55"
      />
      {/* Back card 1 */}
      <rect
        x="8"
        y="18"
        width="44"
        height="34"
        rx="3"
        fill="var(--color-surface-elevated)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />

      {/* Storefront body */}
      <rect
        x="12"
        y="24"
        width="40"
        height="28"
        rx="2"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />

      {/* Awning */}
      <path
        d="M10 24 L54 24 L50 30 L14 30 Z"
        fill="url(#mp-awning)"
      />
      {/* Awning stripes */}
      <path
        d="M22 24 L20 30 M30 24 L28 30 M38 24 L36 30 M46 24 L44 30"
        stroke="var(--color-brand-200)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Door */}
      <rect
        x="28"
        y="36"
        width="8"
        height="16"
        rx="1"
        fill="var(--color-brand-100)"
        stroke="var(--color-brand-300)"
        strokeWidth="0.75"
      />
      <circle cx="34" cy="44" r="0.75" fill="var(--color-brand-600)" />

      {/* Windows */}
      <rect
        x="16"
        y="34"
        width="8"
        height="6"
        rx="1"
        fill="var(--color-brand-50)"
        stroke="var(--color-border-subtle)"
        strokeWidth="0.5"
      />
      <rect
        x="40"
        y="34"
        width="8"
        height="6"
        rx="1"
        fill="var(--color-brand-50)"
        stroke="var(--color-border-subtle)"
        strokeWidth="0.5"
      />

      {/* Flag pole + flag */}
      <line
        x1="32"
        y1="8"
        x2="32"
        y2="22"
        stroke="var(--color-neutral-400)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <g style={animated ? { transformOrigin: "32px 10px", animation: "mp-wave 2.4s ease-in-out infinite" } : undefined}>
        <path
          d="M32 8 L42 10 L40 14 L42 18 L32 16 Z"
          fill="url(#mp-flag)"
        />
      </g>
      <circle cx="32" cy="8" r="1.25" fill="var(--color-brand-600)" />

      {/* Price tag bottom-right */}
      <g transform="translate(46 44) rotate(-12)">
        <path
          d="M0 0 L10 0 L13 5 L10 10 L0 10 Z"
          fill="var(--color-accent-400)"
          stroke="var(--color-accent-500)"
          strokeWidth="0.5"
        />
        <circle cx="2.5" cy="5" r="1" fill="var(--color-surface)" />
      </g>

      <style>
        {`@keyframes mp-wave {
          0%,100% { transform: skewX(0deg); }
          50% { transform: skewX(-8deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="mp-wave"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default MarketplaceIcon;
