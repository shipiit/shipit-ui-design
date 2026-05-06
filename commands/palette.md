---
name: palette
description: Generate a coherent light + dark 11-step palette from a hex, image, or mood string.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /palette [seed | mood]

Generates a perceptually correct 11-step ramp (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950) in both light and dark variants, writes it into the project's tokens, and prints a terminal preview with contrast ratios.

## The constitution (apply to every artifact)

1. Max 300 lines per file.
2. No hardcoded design values — output goes into tokens, never inlined into components.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought — emit alongside light from the start.
7. Stack-respect — adapt to existing token conventions.

## Inputs

The argument is one of:

- A hex string: `/palette #4f46e5`. Treat as the seed for the primary ramp's mid-tone (step 500 or 600 depending on lightness).
- A path to a local image: `/palette ./brand.png`. Extract dominant + accent colors. Use the dominant for primary, the strongest accent for the secondary semantic ramp.
- A mood string: `/palette warm editorial`. Pick from curated palettes in `references/palettes/`. If no curated match exists, ask the user for a hex seed instead — never invent a mood-to-color mapping silently.

If the argument is missing, ask the user which input they want to use.

## Procedure

### 1. Pre-flight

- Verify a tokens file exists (look for `tokens.css`, `tokens.ts`, `theme.ts`, or stack equivalent). If absent, instruct the user to run `/design init` first and stop.
- Read existing color tokens. You will merge into this file, preserving non-color tokens untouched.

### 2. Algorithm

Use OKLCH-correct interpolation. Naive HSL is forbidden — it produces dead mid-tones and hue drift.

- Convert seed to OKLCH.
- Build the light ramp by varying L (lightness) along a perceptually even curve from ~98 (step 50) to ~15 (step 950), holding hue, attenuating chroma at the extremes so 50 and 950 do not look saturated.
- Build the dark ramp by hue-preserving lightness inversion plus chroma adjustment — typically reduce chroma by ~10–20% in dark and shift the L curve so step 500 in dark mode reads close to step 400 in light.
- The OKLCH library is not yet locked (design spec Section 11, "Palette library"). Ask the user once whether to use `culori`, `colorjs.io`, or a hand-rolled implementation. Never install silently.

### 3. Verify contrast before writing

Compute WCAG contrast ratios on at least these pairs and require AA (4.5:1 for body text, 3:1 for large text and UI components):

- text on surface: step 900 on step 50 (light); step 50 on step 950 (dark).
- primary button: white on step 600; step 50 on step 500 (dark).
- subtle text: step 700 on step 50; step 300 on step 950 (dark).
- focus ring: step 500 on step 50 and on step 950.

If any pair fails, adjust the ramp (typically nudge the relevant step's L) and re-verify. If three adjustment attempts fail, stop, print which pairs failed and by how much, and ask the user how to resolve.

### 4. Write

Merge the generated ramps into the tokens file. Preserve all non-color tokens. Show a diff and confirm before writing if the file already had primary/secondary ramps.

### 5. Preview

Print a terminal preview:

- Each step rendered with an ANSI background block, the hex value, and the OKLCH triple.
- Contrast ratios for the pairs in Step 3.
- Both light and dark sets.

If the terminal does not support truecolor, fall back to writing a `palette-preview.html` file under the project's tmp/build directory and tell the user to open it.

## Error cases

- Tokens file absent: tell the user to run `/design init`. Do not create a tokens file from `/palette` alone — that is `/design init`'s job.
- Image input fails to decode or has no clear dominant: ask the user for a hex fallback.
- Mood string with no curated match: ask for a hex.
- AA contrast unachievable for the requested seed (e.g. a near-yellow primary): explain the constraint and offer to either shift the seed hue or accept reduced semantic roles (e.g. "use this hue only for accents, not for buttons").
