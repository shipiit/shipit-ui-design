---
name: motion
description: Add tasteful, accessibility-aware micro-interactions and page transitions to a target.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /motion &lt;element-or-page&gt;

Examples:

- `/motion primary button hover`
- `/motion page transition for app router`
- `/motion stat tile entrance with stagger`

## The constitution (apply to every motion change)

1. Max 300 lines per file.
2. No hardcoded design values — durations and easings come from the motion tokens defined in `/design init`.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`. This is the most important rule for this command.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought.
7. Stack-respect — never introduce a new framework or styling system.

## Defaults (always apply unless the user overrides)

- Hover: 200ms ease-out (`--duration-base`, `--ease-out-quint`).
- Layout shifts: 300ms spring (`--duration-slow`, `--ease-spring`).
- Entrance: 600ms with stagger (`--duration-page`, `--ease-out-quint`, stagger 40–80ms).
- Exit: 200ms ease-in.
- Focus ring: instant — no transition. Focus must never feel laggy.

## Procedure

### 1. Pre-flight

- Read the project's tokens. Confirm motion tokens exist (`--duration-*`, `--ease-*`). If they do not, instruct the user to run `/design init` first and stop.
- Read the project's existing `motion.ts` (or stack equivalent) to understand the helper conventions and the `prefers-reduced-motion` wrapper.
- Detect the stack (use cached detection).

### 2. Pick the library

Choose by stack:

- React + complex orchestration → Framer Motion (or Motion / Matt Perry's fork — the choice between these is not yet locked, design spec Section 11. Ask the user once per project before installing, then cache the choice).
- Vanilla / web-component / non-React → Motion One.
- Heavy timeline-based work (hero scroll-tied sequences, complex SVG morphs) → GSAP. Confirm explicitly — GSAP is the largest dep of the three.
- If the project already imports one of these, prefer that one. Stack-respect.

If no motion library is installed and the change is small enough to do in CSS (single hover, single transition), prefer CSS — do not add a dep for a one-line transition.

### 3. Confirm before installing

If a library install is required:

- Print the exact command (`pnpm add framer-motion` etc.) and the package list.
- Wait for explicit user confirmation. Never install silently.

### 4. Apply

Make the motion change. Every consumer must:

- Use motion tokens, never inlined durations or cubic-bezier strings.
- Be wrapped in a `prefers-reduced-motion` check. The wrapper helper lives in `motion.ts` from `/design init`. Use it. If the user is reduced-motion, fall back to either no animation, or a simple opacity fade ≤ 100ms.
- Not animate properties that cause layout thrash (top, left, width, height, margin) when transform / opacity will do.
- Not animate focus-visible — focus must be instant.
- Stay within the duration ladder. Anything longer than 600ms should be questioned and confirmed with the user.

For entrance animations on a list, use stagger via the project's existing variant helpers. Default stagger 40–80ms; longer for hero sections, shorter for dense lists.

For page transitions, gate on the framework's routing primitive (Next App Router's `template.tsx` + `motion` wrappers, Remix outlet wrappers, SvelteKit page transitions). Do not invent your own router hook.

### 5. Verify

After applying, re-read the touched files and self-check:

- Every animation is gated on `prefers-reduced-motion`.
- Every duration / easing is a token.
- No focus-visible transitions.
- No layout-thrashing properties animated.
- File is still ≤ 300 lines.

Suggest the user run `/refine <route>` to see the motion in the visual loop and confirm the polish improves the rubric score.

## Error cases

- Motion tokens absent: hard stop, prompt for `/design init`.
- User asks for a motion that conflicts with reduced-motion (e.g. "always show parallax"): refuse the always-on framing; offer a reduced-motion fallback alongside the full version. Constitution rule 4 is not negotiable.
- User asks for a duration outside the token ladder: explain the ladder, offer the closest token, and only override the ladder if the user explicitly insists — and then write a comment documenting why.
- Conflicting motion libraries already installed (e.g. both Framer Motion and GSAP): ask the user which one to standardise on; do not silently pick.
