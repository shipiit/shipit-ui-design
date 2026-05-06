"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

type BackdropVariant =
  | "orbs"
  | "wireframe"
  | "grid-tilt"
  | "lattice"
  | "soft-mesh";

interface Backdrop3DProps {
  variant: BackdropVariant;
  className?: string;
}

/**
 * Backdrop3D — subtle 3D-feeling backdrop for marketing sections.
 * Absolutely positioned, pointer-events-none, aria-hidden. Token-driven.
 * Five distinct motifs. All motion respects reduced-motion.
 */
export function Backdrop3D({ variant, className }: Backdrop3DProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className ?? ""}`}
      style={{ zIndex: 0 }}
    >
      {variant === "orbs" && <Orbs />}
      {variant === "wireframe" && <Wireframe />}
      {variant === "grid-tilt" && <GridTilt />}
      {variant === "lattice" && <Lattice />}
      {variant === "soft-mesh" && <SoftMesh />}
    </div>
  );
}

interface BlobSpec {
  pos: React.CSSProperties;
  hue: string;
  blur: number;
  opacity: number;
  duration: number;
  scale?: number;
  drift?: { y?: number; x?: number };
}

function Blob({ spec, reduced }: { spec: BlobSpec; reduced: boolean }) {
  return (
    <motion.span
      className="absolute"
      style={{
        ...spec.pos,
        filter: `blur(${spec.blur}px)`,
        opacity: spec.opacity,
        background: `radial-gradient(closest-side, var(--color-${spec.hue}), transparent 70%)`,
      }}
      animate={
        reduced
          ? undefined
          : {
              scale: spec.scale ? [1, spec.scale, 1] : undefined,
              y: spec.drift?.y ? [0, spec.drift.y, 0] : undefined,
              x: spec.drift?.x ? [0, spec.drift.x, 0] : undefined,
              opacity: [
                spec.opacity * 0.78,
                spec.opacity,
                spec.opacity * 0.78,
              ],
            }
      }
      transition={{
        duration: spec.duration,
        repeat: reduced ? 0 : Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

const ORB_BLOBS: BlobSpec[] = [
  { pos: { left: "10%", top: "12%", width: "28rem", height: "28rem" }, hue: "brand-400", blur: 72, opacity: 0.28, duration: 20, scale: 1.06 },
  { pos: { right: "8%", top: "30%", width: "24rem", height: "24rem" }, hue: "accent-400", blur: 64, opacity: 0.22, duration: 22, scale: 1.05 },
  { pos: { left: "40%", bottom: "-6rem", width: "32rem", height: "20rem" }, hue: "brand-300", blur: 80, opacity: 0.2, duration: 18, scale: 1.04 },
];

function Orbs() {
  const reduced = !!useReducedMotion();
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          opacity: 0.06,
        }}
      />
      {ORB_BLOBS.map((b, i) => (
        <Blob key={i} spec={b} reduced={reduced} />
      ))}
    </>
  );
}

function Wireframe() {
  const reduced = !!useReducedMotion();
  return (
    <div
      className="absolute"
      style={{
        right: "-6rem",
        top: "50%",
        transform: "translateY(-50%)",
        width: "32rem",
        height: "32rem",
        perspective: "1200px",
        opacity: 0.5,
      }}
    >
      <motion.svg
        viewBox="0 0 200 200"
        width="100%"
        height="100%"
        animate={reduced ? undefined : { rotateY: [0, 360] }}
        transition={{ duration: 60, repeat: reduced ? 0 : Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <g
          fill="none"
          stroke="var(--color-brand-400)"
          strokeWidth="0.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          <path d="M100 20 L160 100 L100 180 L40 100 Z" />
          <path d="M100 20 L100 180" />
          <path d="M40 100 L160 100" />
          <path d="M70 70 L130 70 L150 100 L130 130 L70 130 L50 100 Z" />
          <path d="M70 70 L70 130" />
          <path d="M130 70 L130 130" />
          <path d="M50 100 L150 100" />
          <circle cx="100" cy="100" r="86" stroke="var(--color-accent-400)" opacity="0.3" />
          <circle cx="100" cy="100" r="60" stroke="var(--color-brand-300)" opacity="0.4" />
        </g>
      </motion.svg>
    </div>
  );
}

function GridTilt() {
  const reduced = !!useReducedMotion();
  return (
    <div
      className="absolute inset-0"
      style={{ perspective: "1000px", perspectiveOrigin: "50% 0%" }}
    >
      <motion.div
        className="absolute inset-0"
        animate={reduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 24, repeat: reduced ? 0 : Infinity, ease: "easeInOut" }}
        style={{
          transform: "rotateX(60deg) translateZ(0)",
          transformOrigin: "50% 100%",
          backgroundImage:
            "linear-gradient(var(--color-brand-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-400) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          opacity: 0.12,
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}

function Lattice() {
  const reduced = !!useReducedMotion();
  const cols = 18;
  const rows = 12;
  const dots: { cx: number; cy: number; key: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ cx: 20 + c * 36, cy: 20 + r * 36, key: `${r}-${c}` });
    }
  }
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`0 0 ${20 + cols * 36} ${20 + rows * 36}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="lattice-wave" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-brand-400)" stopOpacity="0.05" />
          <stop offset="50%" stopColor="var(--color-brand-300)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-accent-400)" stopOpacity="0.05" />
          {!reduced && (
            <animate attributeName="x1" values="-1;1;-1" dur="14s" repeatCount="indefinite" />
          )}
          {!reduced && (
            <animate attributeName="x2" values="0;2;0" dur="14s" repeatCount="indefinite" />
          )}
        </linearGradient>
      </defs>
      {dots.map((d) => (
        <circle key={d.key} cx={d.cx} cy={d.cy} r="1.4" fill="url(#lattice-wave)" />
      ))}
    </svg>
  );
}

const MESH_BLOBS: BlobSpec[] = [
  { pos: { left: "20%", top: "20%", width: "60rem", height: "40rem" }, hue: "brand-400", blur: 120, opacity: 0.22, duration: 26, drift: { x: 16 } },
  { pos: { left: "12%", bottom: "-8rem", width: "22rem", height: "22rem" }, hue: "accent-400", blur: 60, opacity: 0.18, duration: 22, drift: { y: -16 } },
  { pos: { right: "10%", top: "10%", width: "18rem", height: "18rem" }, hue: "brand-300", blur: 64, opacity: 0.16, duration: 19, drift: { y: 12 } },
];

function SoftMesh() {
  const reduced = !!useReducedMotion();
  return (
    <>
      {MESH_BLOBS.map((b, i) => (
        <Blob key={i} spec={b} reduced={reduced} />
      ))}
    </>
  );
}

export default Backdrop3D;
