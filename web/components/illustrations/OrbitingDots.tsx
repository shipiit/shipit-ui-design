"use client";

import * as React from "react";

interface OrbitingDotsProps {
  className?: string;
  size?: number;
}

/**
 * OrbitingDots — three concentric elliptical orbits with small filled dots
 * tracing each. SMIL animateMotion drives the dots; CSS @media reduced-motion
 * pauses animation and leaves dots at distinct rest positions.
 */
export function OrbitingDots({ className, size = 240 }: OrbitingDotsProps) {
  const id = React.useId();
  const o1 = `orbit-${id}-1`;
  const o2 = `orbit-${id}-2`;
  const o3 = `orbit-${id}-3`;

  return (
    <svg
      aria-hidden="true"
      role="presentation"
      viewBox="0 0 240 240"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        stroke="var(--color-brand-300)"
        strokeWidth="1"
        opacity="0.45"
      >
        <ellipse cx="120" cy="120" rx="100" ry="38" />
        <ellipse cx="120" cy="120" rx="80" ry="52" />
        <ellipse cx="120" cy="120" rx="60" ry="78" />
      </g>

      <defs>
        <path
          id={o1}
          d="M 220 120 a 100 38 0 1 1 -200 0 a 100 38 0 1 1 200 0"
        />
        <path
          id={o2}
          d="M 200 120 a 80 52 0 1 1 -160 0 a 80 52 0 1 1 160 0"
        />
        <path
          id={o3}
          d="M 180 120 a 60 78 0 1 1 -120 0 a 60 78 0 1 1 120 0"
        />
      </defs>

      {/* Orbit 1 — fastest, brand */}
      <circle r="4" fill="var(--color-brand-500)" className={`orbit-dot-${id}`}>
        <animateMotion dur="8s" repeatCount="indefinite">
          <mpath href={`#${o1}`} />
        </animateMotion>
      </circle>
      {/* Orbit 2 — accent */}
      <circle r="3.5" fill="var(--color-accent-400)" className={`orbit-dot-${id}`}>
        <animateMotion dur="12s" repeatCount="indefinite">
          <mpath href={`#${o2}`} />
        </animateMotion>
      </circle>
      {/* Orbit 3 — slowest, brand-300 */}
      <circle r="3" fill="var(--color-brand-400)" className={`orbit-dot-${id}`}>
        <animateMotion dur="18s" repeatCount="indefinite">
          <mpath href={`#${o3}`} />
        </animateMotion>
      </circle>
      {/* Second pair on orbit 2 for parallax */}
      <circle r="2.5" fill="var(--color-brand-300)" className={`orbit-dot-${id}`}>
        <animateMotion dur="12s" begin="-6s" repeatCount="indefinite">
          <mpath href={`#${o2}`} />
        </animateMotion>
      </circle>

      {/* Static rest fallback positions for reduced motion */}
      <g className={`orbit-rest-${id}`}>
        <circle cx="220" cy="120" r="4" fill="var(--color-brand-500)" />
        <circle cx="160" cy="80" r="3.5" fill="var(--color-accent-400)" />
        <circle cx="120" cy="42" r="3" fill="var(--color-brand-400)" />
        <circle cx="80" cy="160" r="2.5" fill="var(--color-brand-300)" />
      </g>

      <style>{`
        .orbit-rest-${id} { display: none; }
        @media (prefers-reduced-motion: reduce) {
          .orbit-dot-${id} { display: none; }
          .orbit-rest-${id} { display: block; }
        }
      `}</style>
    </svg>
  );
}

export default OrbitingDots;
