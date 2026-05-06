---
name: illustrate
description: Generate a tokenized SVG illustration written by Claude, plus a typed React wrapper.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /illustrate &lt;description&gt;

Examples:

- `/illustrate empty inbox state, two-tone, friendly`
- `/illustrate hero abstract gradient mesh, geometric`
- `/illustrate 404 line-art mascot`

Claude writes the SVG directly. No external image generation API. No raster output.

## The constitution (apply to every illustration)

1. Max 300 lines per file. SVGs that would exceed this are split into composed parts.
2. No hardcoded design values. Colors come from project tokens via CSS variables (`fill="var(--color-primary-500)"`). Radii align with token radii where applicable.
3. Every interactive element has hover, active, focus-visible, and disabled states. (Most illustrations are non-interactive — but if the user asks for an interactive illustration, this rule applies.)
4. All motion respects `prefers-reduced-motion`. Animated SVGs must include the media-query guard.
5. **Every image / illustration has alt text or `aria-hidden` if decorative.** This rule is the headline rule for this command. The React wrapper must enforce it via prop typing.
6. Dark mode is never an afterthought — colors must be tokens so dark mode swaps automatically.
7. Stack-respect — emit a wrapper that matches the project's component conventions.

## Inputs

A free-form description plus, optionally, a style hint. Available styles from `references/svg-style-guide/`:

- `geometric` — hard edges, primary shapes, flat or two-tone fills.
- `two-tone` — exactly two color steps from a single ramp; one dark, one light.
- `soft-gradient` — radial / conic gradients between token colors; smooth, no banding.
- `isometric` — 30/60/90 projection, layered planes, used for product / object illustrations.
- `line-art` — stroke-only, fill-none, weights derived from viewBox size.

If the user does not specify a style, infer from the description and confirm before generating.

## Procedure

### 1. Pre-flight

- Read the project tokens. Confirm color and radius tokens exist. If absent, stop and prompt for `/design init`.
- Detect stack (or use cached detection).
- Decide the output paths:
  - SVG asset: `public/illustrations/<slug>.svg` (Next, Vite, Astro) — adapt the public-asset path to the framework convention if different.
  - React wrapper: `components/illustrations/<Slug>.tsx` — adapt to the project's component convention.

### 2. Plan, confirm, write

- Print the chosen style, the tokens you will use, the viewBox, and the output paths. Wait for confirmation.
- Generate the SVG:
  - Set a clean `viewBox` per the style guide (default `0 0 400 300` for spot illustrations, `0 0 1200 600` for hero, `0 0 200 200` for icon-grade).
  - Use `currentColor` for stroke when the illustration should follow surrounding text color, otherwise `var(--color-…-…)` from project tokens.
  - Stroke widths scale with viewBox: line-art at 200 viewBox uses ~2; at 1200 viewBox ~6. Do not set sub-pixel strokes.
  - For gradients, define them inline via `<defs>` with token-driven `stop-color`.
  - Add `role="img"` on the root `<svg>` and a `<title>` element — the wrapper will swap this between alt text and `aria-hidden` based on the prop.
- Generate the React wrapper:
  - Typed props: at minimum `{ alt: string } | { decorative: true }` — discriminated union so TypeScript enforces that the consumer picks one. If the project is plain JS, document the prop convention in a comment and runtime-warn on missing alt.
  - When `decorative`, set `aria-hidden="true"` on the root `<svg>`, drop the `<title>`, and remove `role="img"`.
  - When `alt`, render the alt as the `<title>` and keep `role="img"`.
  - Forward `className` and `style` so consumers can size the illustration.
  - File ≤ 300 lines. Split into helper sub-components only if needed.

### 3. Verify

After writing, re-read both files and self-check:

- All color values reference tokens or `currentColor`. No bare hex.
- Either `<title>` is present and matches a passed alt, or `aria-hidden="true"` is on the root.
- No stray IDs that would collide if multiple instances are rendered (use the React `useId` hook to suffix gradient IDs).
- The wrapper compiles against the project's TS config (no implicit any, prop types satisfy strict mode if the project uses it).

Print a small usage snippet for the user.

## Error cases

- Tokens absent: hard stop, prompt for `/design init`.
- Description is too vague to render meaningfully (e.g. "draw something nice"): ask 1–2 clarifying questions before generating. Do not guess.
- Requested style is not in the style guide: ask the user to pick from the available styles or describe the new style explicitly so it can be added later.
- Project has no public/asset directory and no convention for static SVGs: ask the user where to write the SVG before creating directories.
- The illustration the user describes would require photographic detail or licensed imagery: refuse — this command is for SVG only — and suggest they source the asset and use `/component` to wrap it.
