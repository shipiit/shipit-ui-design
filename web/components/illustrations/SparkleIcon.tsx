import * as React from "react";

interface SparkleIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function SparkleIcon({
  size = 24,
  className,
  animated = false,
}: SparkleIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Large sparkle */}
      <path
        d="M14 3 L15.4 9.6 L22 11 L15.4 12.4 L14 19 L12.6 12.4 L6 11 L12.6 9.6 Z"
        fill="var(--color-brand-500)"
        style={
          animated
            ? {
                transformOrigin: "14px 11px",
                animation: "spk-twinkle 2.4s ease-in-out infinite",
              }
            : undefined
        }
      />
      {/* Small sparkle */}
      <path
        d="M5 14 L5.6 16.4 L8 17 L5.6 17.6 L5 20 L4.4 17.6 L2 17 L4.4 16.4 Z"
        fill="var(--color-accent-400)"
        style={
          animated
            ? {
                transformOrigin: "5px 17px",
                animation: "spk-twinkle 2.4s ease-in-out infinite",
                animationDelay: "0.6s",
              }
            : undefined
        }
      />

      <style>
        {`@keyframes spk-twinkle {
          0%,100% { transform: scale(1) rotate(0deg); opacity: 1; }
          50% { transform: scale(0.85) rotate(15deg); opacity: 0.7; }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="spk-twinkle"] { animation: none !important; }
        }`}
      </style>
    </svg>
  );
}

export default SparkleIcon;
