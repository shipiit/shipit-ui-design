---
name: design
description: Bootstrap a design system in the current project (subcommand: init).
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /design

Subcommand router. Currently supported: `init`.

If the user invokes `/design` with no subcommand, ask which subcommand they want and list the supported ones. If invoked with anything other than `init`, refuse and list supported subcommands.

## The constitution (apply to every artifact you produce)

1. Max 300 lines per file. If a generated file would exceed, split before writing.
2. No hardcoded design values. Colors, spacing, radii, shadows, durations, easings — all from tokens.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought — emit alongside light from the start.
7. Stack-respect — never introduce a new framework or styling system; adapt to what is already in the project.

## /design init — procedure

### 1. Detect the stack (read-only)

Read the project's `package.json`, lockfiles, and config files. Record:

- Framework — look for deps: `next`, `vite`, `@remix-run/*`, `astro`, `nuxt`, `@sveltejs/kit`. If none, treat as plain Node + bundler unknown and ask the user before generating.
- Styling system — `tailwind.config.*` → Tailwind. `unocss.config.*` → UnoCSS. Any `*.module.css` under `src/` or `app/` → CSS Modules. `styled-components` dep → styled-components. Else fall back to plain CSS.
- TypeScript — `tsconfig.json` present → TS.
- Package manager — `pnpm-lock.yaml` → pnpm; `yarn.lock` → yarn; `bun.lockb` → bun; else npm.
- Dev script + port — read `package.json` scripts; use framework defaults if not customised.

Print the detection result to the user before doing anything else.

### 2. Locate or define the tokens target

Look for an existing `tokens.css`, `tokens.ts`, `theme.ts`, or comparable file. If found, treat this as an idempotent merge (Step 5). If absent, choose a sensible location based on framework convention (e.g. `app/tokens.css` for Next App Router, `src/tokens.css` for Vite, `src/styles/tokens.css` for SvelteKit).

### 3. Plan, then confirm before writing

Print a numbered list of every file you intend to create or modify, with one-line descriptions. Wait for the user to confirm before any Write or Edit. Never write silently.

### 4. Produce the artifacts

When confirmed, generate the following. Each file must satisfy the constitution.

- `tokens.css` — CSS custom properties for:
  - Color: 11-step ramp (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) for primary, neutral, and at minimum one semantic accent (success/warning/danger). Provide both light and dark sets, scoped via `:root` and `[data-theme="dark"]` (or `@media (prefers-color-scheme: dark)` plus an override class — pick the convention that fits the framework).
  - Spacing: 4px base, exponential scale `--space-0` through `--space-16`.
  - Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`, `--radius-full`.
  - Shadow: `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`. Tints derived from token colors, not raw black.
  - Type scale: perfect-fourth ratio 1.250 default. Sizes `--text-xs` through `--text-5xl`. Include `--leading-*` and `--tracking-*`.
  - Motion: `--duration-fast: 150ms`, `--duration-base: 200ms`, `--duration-slow: 300ms`, `--duration-page: 600ms`. Easings: `--ease-out-quint`, `--ease-in-out-cubic`, `--ease-spring`.
  - Z-index: a small named ladder (`--z-dropdown`, `--z-sticky`, `--z-overlay`, `--z-modal`, `--z-toast`).
- `tailwind.config.*` — only when Tailwind is present. Wire every theme value to `var(--…)`. Never inline hex or px. Preserve any user customisations not covered by the design system; merge instead of overwriting.
- `theme.ts` — only when TS is present. Typed re-export of token names so component code can reference them with autocomplete.
- Base primitives — generate `Button`, `Input`, `Card`, `Stack`, `Text`, `Container`. One file each, ≤ 300 lines, fully tokenised, every interactive primitive covers hover / active / focus-visible / disabled. Place under the framework's component convention (`components/ui/` for most React stacks; `lib/components/` for SvelteKit).
- `motion.ts` (or stack equivalent) — variants `fade`, `slide`, `stagger`, `pageTransition`. Wrap every consumer in a `prefers-reduced-motion` check helper exported from this file. The choice of motion library is not yet locked (see Section 11 of the design spec, item "Motion library default") — ask the user before adding a dependency, and fall back to CSS-only variants if they decline.

### 5. Idempotent merge behaviour

If any artifact already exists:

- Diff the existing file against what you intend to write.
- Show the user the diff.
- Ask whether to merge (default), skip, or overwrite. Never overwrite without explicit confirmation. Treat any file containing user-authored tokens as load-bearing.

### 6. Dependency installs

- Never run `npm install` (or pnpm/yarn/bun equivalents) without confirmation.
- Print the exact command and the package list before asking.
- The motion library and any other tooling that the design spec marks "verify at build time" (Section 11) must be selected with the user, not silently chosen.

### 7. Report

When complete, print:
- Files created.
- Files modified (with summary of the merge).
- Anything skipped, with reason.
- Suggested next steps: `/palette` to refine colors, `/component <intent>` to start generating components, `/refine` once a route renders.

## Error cases

- Stack not detectable (no `package.json`): stop, tell the user, ask them to point you at the project root.
- Multiple frameworks detected: ask the user which one is primary.
- Existing tokens use a different convention (e.g. SCSS variables in a Sass project): adapt — do not force CSS variables on a project that already uses Sass tokens. Mirror the existing convention.
- User declines the proposed file list: stop. Do not write anything.
