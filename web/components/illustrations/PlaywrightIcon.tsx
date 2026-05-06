import * as React from "react";

interface PlaywrightIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

const BLADE_COLORS = [
  "var(--color-brand-400)",
  "var(--color-accent-400)",
  "var(--color-brand-500)",
  "var(--color-accent-500)",
  "var(--color-brand-300)",
  "var(--color-accent-300)",
];

export function PlaywrightIcon({
  size = 64,
  className,
  animated = false,
}: PlaywrightIconProps) {
  // Build 6-blade shutter via rotated triangular wedges around (32, 36).
  const cx = 32;
  const cy = 36;
  const r = 12;
  return (
    <svg
      role="img"
      aria-label="Browser with camera shutter"
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Browser frame */}
      <rect
        x="6"
        y="14"
        width="52"
        height="40"
        rx="4"
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <rect
        x="6"
        y="14"
        width="52"
        height="8"
        rx="4"
        fill="var(--color-surface-elevated)"
      />
      <rect x="6" y="20" width="52" height="2" fill="var(--color-border-subtle)" />

      {/* Traffic lights */}
      <circle cx="11" cy="18" r="1.4" fill="var(--color-accent-500)" />
      <circle cx="15" cy="18" r="1.4" fill="var(--color-accent-400)" />
      <circle cx="19" cy="18" r="1.4" fill="var(--color-brand-400)" />

      {/* URL pill */}
      <rect
        x="26"
        y="16"
        width="22"
        height="4"
        rx="2"
        fill="var(--color-border-subtle)"
      />

      {/* Shutter housing */}
      <circle
        cx={cx}
        cy={cy}
        r={r + 2}
        fill="var(--color-neutral-900)"
        opacity="0.08"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r + 1}
        fill="var(--color-surface)"
        stroke="var(--color-border)"
        strokeWidth="0.75"
      />

      {/* Shutter blades */}
      <g
        style={
          animated
            ? {
                transformOrigin: `${cx}px ${cy}px`,
                animation: "pw-spin 4s linear infinite",
              }
            : undefined
        }
      >
        {BLADE_COLORS.map((color, i) => {
          const a = (i * 60 * Math.PI) / 180;
          const a2 = ((i * 60 + 60) * Math.PI) / 180;
          const x1 = cx + Math.cos(a) * r;
          const y1 = cy + Math.sin(a) * r;
          const x2 = cx + Math.cos(a2) * r;
          const y2 = cy + Math.sin(a2) * r;
          return (
            <path
              key={i}
              d={`M${cx} ${cy} L${x1} ${y1} L${x2} ${y2} Z`}
              fill={color}
              opacity="0.92"
              stroke="var(--color-surface)"
              strokeWidth="0.5"
            />
          );
        })}
      </g>

      {/* Center aperture */}
      <circle cx={cx} cy={cy} r="2.5" fill="var(--color-neutral-900)" />
      <circle cx={cx - 0.6} cy={cy - 0.6} r="0.8" fill="var(--color-neutral-50)" opacity="0.7" />

      <style>
        {`@keyframes pw-spin {
          0% { transform: rotate(0deg); }
          50% { transform: rotate(30deg); }
          100% { transform: rotate(0deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="pw-spin"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default PlaywrightIcon;
