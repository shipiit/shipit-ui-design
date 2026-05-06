---
name: hero
description: Generate a rich, illustrated hero section from intent. Defaults to two-column layout with illustrated mockup, animated mesh gradient bg, orbiting chips, primary + ghost CTAs, and a syntax-highlighted code block where install steps belong. Use when the user asks for "hero", "landing page top", "marketing top section", "above the fold".
allowed-tools: [Read, Write, Edit, Bash, Grep, Glob]
type: command
---

# /hero &lt;intent&gt;

Examples:

- `/hero for a SaaS analytics product, show a dashboard mockup`
- `/hero ecommerce home page with product card mockup`
- `/hero docs site landing, show a document preview`

This command exists because plain hero sections — headline + subhead + button + nothing — are the single most common failure mode of generated marketing UI. `/hero` defaults to **rich**. If the user asks for "minimal", honor it explicitly.

## The constitution (apply to the generated hero)

1. Max 300 lines per file. If the hero approaches the limit, split into `Hero.tsx` + `HeroMockup.tsx` before writing.
2. No hardcoded design values. Every color, spacing, radius, shadow, duration, easing comes from a token.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought — emit alongside light from the start.
7. Stack-respect — never introduce a new framework or styling system.

## Procedure

### 1. Tokens must exist (hard gate)

Confirm the project has a tokens file (`tokens.css`, `app/tokens.css`, `src/tokens.css`, `theme.ts`, or a `tailwind.config.*` referencing `var(--…)`). If absent, stop and say:

> This project does not have a design-system tokens file yet. Run `/design init` first, then re-run `/hero`.

### 2. Detect stack and project conventions

- Read the tokens file. Note brand, accent, neutral steps, spacing scale, radii, shadows, motion durations and easings.
- Read 2–3 existing components to learn naming, file structure, styling system (Tailwind classes vs CSS Modules vs styled-components).
- Detect domain from the user's intent (SaaS dashboard, ecom product, docs document, finance chart, etc.) — this drives the mockup illustration.

### 3. Plan the hero anatomy

Default anatomy (rich by default):

- **Eyebrow pill.** Small `--color-brand-50` background, `--color-brand-700` text, with a pulsing `--color-accent-400` accent dot.
- **2-line gradient headline.** `text-wrap: balance`. Gradient text using `--color-brand-500` → `--color-accent-400`. Two lines max on desktop.
- **Subhead.** `--color-fg-subtle`, `max-width: 65ch` (or `max-w-2xl`). One sentence.
- **CTA row.** Primary filled (`--color-brand-500`) + ghost (transparent, `--color-border` outline).
- **Optional stats strip.** 3–4 stats with vertical-line dividers (`--color-border`), each stat with an animated counter and a small decorative shape.
- **Right column: illustrated mockup.** Use the `svg-illustration` skill. Hand-rolled SVG matching the project's domain — dashboard mockup for SaaS, product card for ecom, document for docs, chart for fintech. 6° perspective tilt on desktop (`transform: perspective(1200px) rotateY(-6deg)`), straightens on mobile.
- **Three orbiting chips.** Absolutely positioned around the mockup, each with a stagger-offset float (4–6 px y oscillation, 6–10 s, ease-in-out). Each chip has a small illustrated icon and one short label.
- **Background.** Three mesh-gradient orbs (`--color-brand-400`, `--color-accent-400`, `--color-brand-300` at 18–25% opacity) with slow position drift; `bg-grid` overlay (1 px lines, 4–6% opacity).
- **Below the grid (optional).** Install / code block, syntax-highlighted via the `code-presentation` skill. Never plain `<pre>`.

For a docs landing or developer tool, the code block becomes the primary visual instead of the mockup. Pick one — both is overkill.

### 4. Confirm the plan with the user

Print:

- Target file path(s) — usually `Hero.tsx` plus `HeroMockup.tsx` when over 220 lines combined.
- The chosen mockup domain (dashboard / product / document / chart / terminal).
- Which 3 rich patterns are active (default: mesh gradient + illustrated mockup + orbiting chips).
- The states you intend to cover on each interactive element.

Wait for confirmation before writing.

### 5. Generate

- JSX always under 300 lines per file. Split `Hero.tsx` + `HeroMockup.tsx` before writing the first line if the budget is tight.
- Full state coverage on every CTA: default, hover, active, focus-visible, disabled.
- Motion gated on `prefers-reduced-motion`. Static fallback for chips, drift, and counters.
- Dark mode emitted alongside light — mesh-gradient opacities re-tuned (typically 25–35% in dark).
- Mockup as SVG, never a raster image — keeps the hero token-driven and dark-mode-safe.
- Decorative SVG marked `aria-hidden="true"`. Illustrative SVG (the mockup) gets a one-line `aria-label` describing what it shows ("Dashboard preview with revenue chart and KPI tiles").
- All values from tokens. No bare hex, no raw px, no magic ms.

### 6. Verify

Re-read the file and self-check:

- 3 simultaneous rich patterns or fewer (the budget from `rich-ui-patterns`).
- Every interactive element covers default + hover + active + focus-visible + disabled.
- Mockup is SVG.
- Code block (if present) goes through `code-presentation`, not plain `<pre>`.
- Reduced-motion fallback emitted.
- Light + dark both shipped.

### 7. Suggest next step

Always recommend `/refine <route>` immediately after generation so the visual loop catches anything the static check missed.

## Anti-patterns (rich-by-default specific)

- **Single-column hero with no visual on the right.** Fail. The two-column anatomy is the default; opt out only on explicit "minimal" request.
- **Mockup as a raster `<img>`.** Fail. Always SVG — token-driven, dark-mode-safe, no asset pipeline.
- **More than 3 simultaneous rich patterns active.** Reduce. Pick the three that serve hierarchy and brand; cut the rest.
- **Mesh gradient behind body copy.** Fail. The gradient stays behind the headline area; subhead and CTA sit on a clean band.
- **Animated chips without reduced-motion fallback.** Fail. Static positions when the user prefers reduced motion.
- **Plain `<pre>` for the install snippet.** Fail. Route through `code-presentation` for syntax highlighting and chrome.

## Cross-references

- `skills/rich-ui-patterns/SKILL.md` — the pattern catalog (mesh gradient, mockup, chips, gradient borders, eyebrow pills) and the 3-pattern budget.
- `skills/svg-illustration/SKILL.md` — SVG recipes for mockup chrome, dashboard preview, product card, document, chart.
- `skills/motion-design/SKILL.md` — easings and reduced-motion patterns for chip float, mesh drift, counter animation.
- `skills/ui-design-principles/SKILL.md` — the rubric the hero is graded against, including Visual richness.
- `skills/code-presentation/SKILL.md` — syntax highlighting and code chrome for the optional install block.
- `references/design-rules/visual-richness.md` — the rule this command implements.
- `commands/refine.md` — run after generation.

## Error cases

- Tokens absent: hard stop, prompt for `/design init`.
- Domain unclear from intent: ask 1 clarifying question (SaaS dashboard, ecom product, docs document, dev tool terminal — which best fits?). Do not guess.
- Existing `Hero.tsx` in the project: show a diff plan and ask whether to replace, augment, or pick a new name.
- User asks for "minimal hero": honor it. Drop the mockup, drop the chips, keep eyebrow + headline + subhead + single CTA. Note in the verify step that you intentionally departed from the rich default.
