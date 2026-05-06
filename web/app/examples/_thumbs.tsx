"use client";

import * as React from "react";

const stroke = "fill-none stroke-current [stroke-width:1] [stroke-linecap:round] [stroke-linejoin:round]";

export function ThumbSettings() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Settings page silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      <g transform="translate(16 16)">
        <rect width="80" height="148" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} transform={`translate(8 ${10 + i * 22})`}>
            <rect width="64" height="16" rx="4" fill={i === 1 ? "var(--color-brand-50)" : "transparent"} />
            {i === 1 && <rect width="2" height="16" rx="1" fill="var(--color-brand-500)" />}
            <rect x="8" y="6" width="44" height="4" rx="2" fill={i === 1 ? "var(--color-brand-700)" : "var(--color-fg-muted)"} opacity={i === 1 ? 1 : 0.8} />
          </g>
        ))}
      </g>
      <g transform="translate(108 16)">
        <rect width="196" height="148" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        <rect x="12" y="12" width="100" height="6" rx="3" fill="var(--color-fg)" opacity="0.85" />
        <rect x="12" y="26" width="140" height="3" rx="1.5" fill="var(--color-border)" />
        <g transform="translate(12 44)">
          <circle cx="14" cy="14" r="14" fill="var(--color-brand-100)" />
          <rect x="34" y="6" width="60" height="4" rx="2" fill="var(--color-fg)" opacity="0.7" />
          <rect x="34" y="14" width="80" height="3" rx="1" fill="var(--color-border)" />
          <rect x="34" y="22" width="40" height="3" rx="1" fill="var(--color-border)" />
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(12 ${82 + i * 18})`}>
            <rect width="172" height="12" rx="3" fill="var(--color-bg)" stroke="var(--color-border-subtle)" />
            <rect x="6" y="4" width={[70, 50, 90][i]} height="4" rx="2" fill="var(--color-fg-muted)" />
          </g>
        ))}
        <rect x="142" y="138" width="40" height="14" rx="4" fill="var(--color-brand-500)" />
      </g>
    </svg>
  );
}

export function ThumbCards() {
  const tones = [
    "var(--color-brand-100)",
    "var(--color-accent-100)",
    "var(--color-brand-300)",
    "var(--color-surface)",
    "var(--color-brand-500)",
    "var(--color-accent-400)",
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Card gallery silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => {
          const i = row * 3 + col;
          const tone = tones[i % tones.length];
          return (
            <g key={`${row}-${col}`} transform={`translate(${16 + col * 100} ${16 + row * 52})`}>
              <rect width="92" height="44" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
              <rect width="92" height="6" rx="3" fill={tone} />
              <rect x="8" y="14" width="50" height="4" rx="2" fill="var(--color-fg)" opacity="0.7" />
              <rect x="8" y="22" width="70" height="3" rx="1.5" fill="var(--color-border)" />
              <rect x="8" y="30" width="40" height="3" rx="1.5" fill="var(--color-border)" />
              {i % 3 === 1 && <circle cx="80" cy="36" r="4" fill={tone} />}
              {i % 3 === 2 && (
                <path d="M8 38 L24 32 L40 36 L60 28 L78 32" stroke="var(--color-brand-500)" className={stroke} strokeWidth="1.2" />
              )}
            </g>
          );
        }),
      )}
    </svg>
  );
}

export function ThumbForms() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" role="img" aria-label="Form gallery silhouette">
      <rect width="320" height="180" fill="var(--color-surface-elevated)" />
      <g transform="translate(20 14)">
        <rect width="280" height="152" rx="6" fill="var(--color-surface)" stroke="var(--color-border-subtle)" />
        <rect x="14" y="12" width="80" height="6" rx="3" fill="var(--color-fg)" opacity="0.85" />
        {[
          { y: 30, w: 252, h: 16 },
          { y: 54, w: 252, h: 28 },
          { y: 90, w: 120, h: 16 },
          { y: 90, x: 142, w: 110, h: 16 },
          { y: 114, w: 252, h: 16 },
        ].map((f, i) => (
          <rect
            key={i}
            x={14 + (f.x ?? 0)}
            y={f.y}
            width={f.w}
            height={f.h}
            rx="3"
            fill="var(--color-bg)"
            stroke={i === 1 ? "var(--color-brand-500)" : "var(--color-border-subtle)"}
            strokeWidth={i === 1 ? 1.5 : 1}
          />
        ))}
        {/* labels */}
        {[26, 50, 86, 110].map((y, i) => (
          <rect key={i} x="14" y={y} width="36" height="3" rx="1.5" fill="var(--color-fg-muted)" opacity="0.7" />
        ))}
        {/* error inline */}
        <rect x="14" y="84" width="44" height="3" rx="1.5" fill="oklch(60% 0.18 27)" opacity="0.8" />
        {/* checkboxes */}
        <g transform="translate(14 134)">
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${i * 70} 0)`}>
              <rect width="10" height="10" rx="2" fill={i === 0 ? "var(--color-brand-500)" : "var(--color-bg)"} stroke="var(--color-border)" />
              <rect x="14" y="2" width="50" height="4" rx="2" fill="var(--color-fg)" opacity="0.7" />
            </g>
          ))}
        </g>
        {/* submit */}
        <rect x="220" y="130" width="50" height="14" rx="4" fill="var(--color-brand-500)" />
      </g>
    </svg>
  );
}
