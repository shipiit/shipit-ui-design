import * as React from "react";

interface PaletteIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const SWATCHES = [
  { x: 8, y: 12, fill: "var(--color-brand-300)" },
  { x: 26, y: 12, fill: "var(--color-brand-500)", selected: true },
  { x: 44, y: 12, fill: "var(--color-brand-700)" },
  { x: 8, y: 36, fill: "var(--color-accent-300)" },
  { x: 26, y: 36, fill: "var(--color-accent-500)" },
  { x: 44, y: 36, fill: "var(--color-neutral-700)" },
];

export function PaletteIcon({
  size = 64,
  className,
  animated = false,
}: PaletteIconProps) {
  return (
    <svg
      role="img"
      aria-label="Palette swatches"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {SWATCHES.map((s, i) => {
        const lifted = s.selected;
        return (
          <g
            key={i}
            style={
              animated && lifted
                ? { animation: "pal-lift 1.8s ease-in-out infinite" }
                : undefined
            }
            transform={lifted ? "translate(0 -3)" : undefined}
          >
            {/* Soft drop shadow on lifted */}
            {lifted && (
              <rect
                x={s.x + 0.5}
                y={s.y + 3}
                width="12"
                height="14"
                rx="2.5"
                fill="var(--color-neutral-900)"
                opacity="0.12"
              />
            )}
            <rect
              x={s.x}
              y={s.y}
              width="12"
              height="14"
              rx="2.5"
              fill={s.fill}
            />
            {/* Highlight on top */}
            <rect
              x={s.x + 1.5}
              y={s.y + 1.5}
              width="9"
              height="3"
              rx="1.5"
              fill="var(--color-neutral-50)"
              opacity="0.18"
            />
            {lifted && (
              <rect
                x={s.x - 2}
                y={s.y - 2}
                width="16"
                height="18"
                rx="3.5"
                fill="none"
                stroke="var(--color-brand-500)"
                strokeWidth="1.5"
              />
            )}
            {/* Tiny checkmark on selected */}
            {lifted && (
              <path
                d={`M${s.x + 4} ${s.y + 7} l2 2 l3.5 -4`}
                stroke="var(--color-surface)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            )}
          </g>
        );
      })}

      <style>
        {`@keyframes pal-lift {
          0%,100% { transform: translateY(-3px); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="pal-lift"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default PaletteIcon;
