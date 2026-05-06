"use client";

import * as React from "react";

interface IsoCubeProps {
  animated?: boolean;
  className?: string;
  size?: number;
}

/**
 * IsoCube — wireframe-isometric cube/stack illustration. Three faces visible
 * (top, left, right) with subtle brand-tinted gradient fills, 1px stroke. Two
 * small floating data points orbit the cube. Animated rotation respects
 * reduced motion via CSS @media block.
 */
export function IsoCube({
  animated = false,
  className,
  size = 200,
}: IsoCubeProps) {
  const id = React.useId();
  const topId = `iso-top-${id}`;
  const leftId = `iso-left-${id}`;
  const rightId = `iso-right-${id}`;
  const groupAnim = animated ? `iso-spin-${id}` : undefined;

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={topId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-300)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id={leftId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--color-brand-700)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={rightId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent-300)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <g
        style={{
          transformOrigin: "100px 100px",
          animation: groupAnim ? `${groupAnim} 22s linear infinite` : undefined,
        }}
      >
        {/* Top face */}
        <path
          d="M100 38 L156 70 L100 102 L44 70 Z"
          fill={`url(#${topId})`}
          stroke="var(--color-brand-400)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Left face */}
        <path
          d="M44 70 L100 102 L100 162 L44 130 Z"
          fill={`url(#${leftId})`}
          stroke="var(--color-brand-400)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Right face */}
        <path
          d="M156 70 L100 102 L100 162 L156 130 Z"
          fill={`url(#${rightId})`}
          stroke="var(--color-brand-400)"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Inner cross-line on top for depth */}
        <line
          x1="100"
          y1="38"
          x2="100"
          y2="102"
          stroke="var(--color-brand-400)"
          strokeWidth="0.6"
          opacity="0.6"
        />
      </g>

      {/* Floating data points */}
      <g>
        <circle
          cx="170"
          cy="40"
          r="4"
          fill="var(--color-accent-400)"
          style={{
            animation: animated ? `iso-float-a-${id} 5s ease-in-out infinite` : undefined,
          }}
        />
        <circle
          cx="170"
          cy="40"
          r="9"
          fill="var(--color-accent-400)"
          opacity="0.18"
        />
        <circle
          cx="30"
          cy="160"
          r="3"
          fill="var(--color-brand-400)"
          style={{
            animation: animated ? `iso-float-b-${id} 7s ease-in-out infinite` : undefined,
          }}
        />
        <circle
          cx="30"
          cy="160"
          r="7"
          fill="var(--color-brand-400)"
          opacity="0.18"
        />
      </g>

      <style>{`
        @keyframes iso-spin-${id} {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes iso-float-a-${id} {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(0, -6px); }
        }
        @keyframes iso-float-b-${id} {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(0, 5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="iso-spin-${id}"],
          [style*="iso-float-a-${id}"],
          [style*="iso-float-b-${id}"] { animation: none !important; }
        }
      `}</style>
    </svg>
  );
}

export default IsoCube;
