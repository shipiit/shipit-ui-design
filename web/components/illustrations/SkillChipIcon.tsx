import * as React from "react";

export type SkillChipVariant =
  | "ui"
  | "motion"
  | "keeper"
  | "svg"
  | "3d"
  | "dashboard"
  | "viz"
  | "color";

interface SkillChipIconProps {
  variant: SkillChipVariant;
  size?: number;
  className?: string;
}

export function SkillChipIcon({
  variant,
  size = 32,
  className,
}: SkillChipIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    className,
  };

  switch (variant) {
    case "ui":
      return (
        <svg {...common}>
          <rect x="5" y="6" width="22" height="6" rx="1.5" fill="var(--color-brand-300)" />
          <rect x="5" y="14" width="14" height="6" rx="1.5" fill="var(--color-brand-500)" />
          <rect x="5" y="22" width="18" height="4" rx="1.5" fill="var(--color-accent-400)" />
        </svg>
      );
    case "motion":
      return (
        <svg {...common}>
          <path
            d="M4 24 C 10 24, 12 8, 28 8"
            stroke="var(--color-brand-500)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="10" cy="22" r="1.5" fill="var(--color-brand-500)" />
          <circle cx="18" cy="14" r="2" fill="var(--color-brand-400)" />
          <circle cx="26" cy="8" r="2.5" fill="var(--color-accent-400)" />
        </svg>
      );
    case "keeper":
      return (
        <svg {...common}>
          <path
            d="M16 4 L26 8 V 16 C 26 22, 21 26, 16 28 C 11 26, 6 22, 6 16 V 8 Z"
            fill="var(--color-brand-400)"
            stroke="var(--color-brand-600)"
            strokeWidth="1"
          />
          <path
            d="M11 16 l4 4 l6 -8"
            stroke="var(--color-surface)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "svg":
      return (
        <svg {...common}>
          <path
            d="M22 4 L28 10 L14 24 L8 26 L10 20 Z"
            fill="var(--color-accent-400)"
            stroke="var(--color-accent-600)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <path
            d="M20 6 L26 12"
            stroke="var(--color-accent-700)"
            strokeWidth="1"
          />
          <circle cx="9" cy="25" r="1.25" fill="var(--color-brand-500)" />
        </svg>
      );
    case "3d":
      return (
        <svg {...common}>
          <path
            d="M16 4 L28 10 V 22 L16 28 L4 22 V 10 Z"
            fill="none"
            stroke="var(--color-brand-500)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M16 4 V 16 M4 10 L16 16 M28 10 L16 16 M16 16 V 28"
            stroke="var(--color-brand-300)"
            strokeWidth="1"
          />
          <circle cx="16" cy="16" r="1.5" fill="var(--color-accent-400)" />
        </svg>
      );
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="24" height="20" rx="2" fill="var(--color-surface-elevated)" stroke="var(--color-border)" strokeWidth="0.75" />
          <rect x="6" y="9" width="8" height="6" rx="1" fill="var(--color-brand-300)" />
          <rect x="16" y="9" width="10" height="6" rx="1" fill="var(--color-accent-300)" />
          <polyline points="6,22 10,18 14,20 18,15 22,17 26,12" fill="none" stroke="var(--color-brand-500)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "viz":
      return (
        <svg {...common}>
          <line x1="5" y1="27" x2="27" y2="27" stroke="var(--color-border)" strokeWidth="1" />
          <rect x="6" y="20" width="4" height="7" rx="1" fill="var(--color-brand-300)" />
          <rect x="12" y="14" width="4" height="13" rx="1" fill="var(--color-brand-500)" />
          <rect x="18" y="9" width="4" height="18" rx="1" fill="var(--color-accent-400)" />
          <rect x="24" y="17" width="4" height="10" rx="1" fill="var(--color-brand-400)" />
        </svg>
      );
    case "color":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="6" fill="var(--color-brand-400)" />
          <circle cx="20" cy="12" r="6" fill="var(--color-accent-400)" opacity="0.85" />
          <circle cx="16" cy="20" r="6" fill="var(--color-brand-700)" opacity="0.85" />
        </svg>
      );
  }
}

export default SkillChipIcon;
