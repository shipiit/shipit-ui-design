# claude-design-studio — Design Spec

**Date:** 2026-05-06
**Status:** Design — pending user review
**Type:** Claude Code plugin (publicly distributable via plugin marketplace)

## 1. Goals

Ship a Claude Code plugin that turns Claude Code into a senior UI/UX designer when working on UI projects. The plugin must:

1. **Adapt to existing projects** — detect stack (Next/Vite/Remix/Astro/Nuxt/SvelteKit + Tailwind/CSS Modules/styled-components/etc.) and respect it.
2. **Bootstrap design systems** — `/design init` produces tokens, base primitives, motion presets.
3. **Generate polished components** — `/component <intent>` writes clean, fully-stated, fully-tokenized components.
4. **Iterate visually** — `/refine` runs a Playwright screenshot → critique → fix → re-screenshot loop until a quality bar is met. This is the plugin's central differentiator.
5. **Generate palettes** — `/palette` creates light + dark 11-step ramps from a hex, image, or mood, written into project tokens.
6. **Generate assets** — `/illustrate` writes SVG illustrations matched to project tokens; `/scene` generates React Three Fiber scenes (only when invoked).
7. **Add motion** — `/motion` adds tasteful, accessibility-aware micro-interactions and page transitions.
8. **Audit existing UI** — `/audit` produces a read-only report (covers and exceeds mistyhx/frontend-design-audit).

## 2. Non-goals (explicit YAGNI)

- PPTX / slide-deck export — separate plugin.
- Prototype / template scaffolding — separate plugin.
- Standalone web app — Anthropic Labs Claude Design owns that surface.
- Cloud rendering — everything runs on the user's machine.
- Image generation via external APIs — SVG only, written by Claude.
- Auto-fix on hooks — hooks warn, never edit.

## 3. Architecture

Three independent surfaces, each with one purpose:

| Surface | Role | Activation |
|---|---|---|
| **Skills** | Persistent design knowledge that auto-activates on relevant files | Auto, by file pattern / mention |
| **Slash commands** | Discrete user-invoked workflows | Explicit `/command` |
| **Hooks** | Lightweight, non-destructive feedback on edits | Event (PostToolUse on Edit) |

Plus two support assets:

| Asset | Role |
|---|---|
| **References** | Bundled docs read by skills/commands at runtime (rubrics, palettes, blueprints, motion curves, SVG style guide) |
| **Tools** | Local Node scripts the plugin shells out to (the visual-loop runner that drives Playwright) |

## 4. File layout

```
claude-design-studio/
├── plugin.json                          # Marketplace manifest
├── README.md
├── LICENSE
├── skills/
│   ├── ui-design-principles/SKILL.md    # The rubric, expanded
│   ├── motion-design/SKILL.md
│   ├── design-system-keeper/SKILL.md    # Enforces "no hardcoded values"
│   ├── svg-illustration/SKILL.md
│   └── three-d-scene/SKILL.md
├── commands/
│   ├── design.md                        # subcommand: init
│   ├── palette.md
│   ├── component.md
│   ├── refine.md
│   ├── audit.md
│   ├── motion.md
│   ├── illustrate.md
│   └── scene.md
├── hooks/
│   └── design-lint.sh                   # PostToolUse warning only
├── references/
│   ├── palettes/                        # Curated starter palettes
│   ├── type-scales/
│   ├── motion-curves/
│   ├── component-blueprints/            # Reference impls per stack
│   └── svg-style-guide/
└── tools/
    └── visual-loop/                     # Playwright runner
        ├── package.json
        ├── src/
        │   ├── index.ts                 # Entry, ≤300 lines
        │   ├── detect-stack.ts          # ≤300 lines
        │   ├── boot-dev-server.ts       # ≤300 lines
        │   ├── capture.ts               # Playwright screenshots
        │   └── score.ts                 # Rubric scoring helpers
        └── README.md
```

**Hard rule:** every source file in this plugin ≤ 300 lines. The same rule is taught to Claude as part of every skill (so generated user code follows it too).

## 5. The constitution (hard rules baked into every skill)

These appear verbatim in every SKILL.md and in every command's reference docs:

1. **Max 300 lines per file.** If a generated component would exceed, split before writing.
2. **No hardcoded design values.** Colors, spacing, radii, shadows, durations, easings — all from tokens.
3. **Every interactive element has hover, active, focus-visible, and disabled states.**
4. **All motion respects `prefers-reduced-motion`.**
5. **Every image / illustration has alt text or `aria-hidden` if decorative.**
6. **Dark mode is never an afterthought** — emitted alongside light from the start.
7. **Stack-respect:** never introduce a new framework or styling system; adapt to what's there.

## 6. Slash commands — full surface

### 6.1 `/design init`

Bootstraps a design system in the current project.

**Detects:** package manager, framework, styling system, TypeScript usage.

**Produces:**
- `tokens.css` — CSS variables for color (11-step light + dark), spacing (4px base, exponential scale), radius, shadow, type scale (perfect-fourth 1.250 default), motion (durations: 150/200/300/600ms; easings: out-quint, in-out-cubic, spring), z-index.
- `tailwind.config.*` (when Tailwind present) wired to `tokens.css` via `var(--…)`. **Never hardcoded.**
- `theme.ts` (when TS) — typed token export.
- Base primitives — `Button`, `Input`, `Card`, `Stack`, `Text`, `Container`, each ≤ 300 lines, single file, fully tokenized, all states covered.
- `motion.ts` — Framer-Motion variants (or stack-equivalent): `fade`, `slide`, `stagger`, `pageTransition`.

**Idempotent:** detects existing tokens and merges instead of overwriting. Asks before any destructive change.

### 6.2 `/palette [seed | mood]`

Generates a coherent light + dark 11-step palette (50, 100, 200, …, 950, matching Tailwind/Radix step convention).

**Inputs:**
- Hex (`/palette #4f46e5`)
- Image path (`/palette ./brand.png` — extracts dominant + accent)
- Mood string (`/palette warm editorial` — picks from curated palettes in `references/palettes/`)

**Algorithm:** OKLCH-correct interpolation (perceptual, not naive HSL). Dark variant derived by hue-preserving lightness inversion + chroma adjustment. Verifies WCAG AA contrast on key pairs before writing.

**Output:** writes into `tokens.css`, prints terminal preview swatches with contrast ratios.

### 6.3 `/component <intent>`

Generates a polished component from a natural-language intent.

**Examples:** `/component subscription card with hover lift`, `/component command palette with keyboard nav`, `/component stat tile`.

**Process:**
1. Read project tokens (must exist — prompts to run `/design init` first if missing).
2. Read existing components for naming/style conventions.
3. Pick a blueprint from `references/component-blueprints/` matched to stack.
4. Generate component: full state coverage (loading, empty, error, success), keyboard nav, motion-aware, tokenized. Splits across files if approaching 300 lines.

### 6.4 `/refine [route | file]`

The visual loop: Playwright captures the rendered page, Claude critiques the pixels against the rubric, applies fixes, re-captures, iterates until the quality bar is met. See Section 7 for the full algorithm.

### 6.5 `/audit [path | url]`

Read-only report. Covers Nielsen heuristics (15 from mistyhx) plus the rubric in Section 7.2. No code edits.

**Parallelism:** for multi-route audit, fans out one subagent per route, capped at 4 concurrent.

### 6.6 `/motion <element-or-page>`

Adds motion to a target. Picks library by stack: Framer Motion (React), Motion One (vanilla), GSAP (heavy timelines).

**Defaults:**
- Hover: 200ms ease-out
- Layout shifts: 300ms spring
- Entrance: 600ms with stagger
- Exit: 200ms ease-in

Always wraps motion in `prefers-reduced-motion` check.

### 6.7 `/illustrate <description>`

Claude writes SVG directly. Style picked from `references/svg-style-guide/` and project tokens (colors, radius). Available styles: geometric, two-tone, soft-gradient, isometric, line-art.

**Output:** `public/illustrations/<slug>.svg` + a typed React wrapper in `components/illustrations/<Slug>.tsx`.

### 6.8 `/scene <description>`

Generates a React Three Fiber scene. **Asks before adding deps** (`three`, `@react-three/fiber`, `@react-three/drei`).

**Bundled templates:** `ambient-particles`, `product-showcase`, `hero-gradient-mesh`, `scroll-driven-camera`.

## 7. The visual loop — `/refine` algorithm

This is the central differentiator over rule-based audit plugins.

### 7.1 Algorithm

The loop is **Claude-driven**: the `tools/visual-loop/` Node script handles only the mechanical parts (boot dev server, drive Playwright, save screenshots). Critique, planning, edits, and verification are Claude's work using the screenshots as input.

```
detect    → find dev script + base URL from package.json
boot      → start dev server in background; poll URL until 200 OK (max 30s)
capture   → Playwright captures, in parallel:
              mobile  390×844     light + dark
              tablet  820×1180    light + dark
              desktop 1440×900    light + dark + hover-on-key-elements
              full-page scroll screenshot at desktop
critique  → Claude views screenshots + reads source; scores against rubric (7.2)
plan      → top-N fixes (default 5) where impact > risk; risky fixes need confirm
edit      → applies fixes via Edit; one logical change per fix
recapture → screenshot same viewports
verify    → compare scores; if regression, revert that specific fix
loop      → repeat until score ≥ 85 OR iterations ≥ 4 OR Δ < 2
report    → before/after side-by-side + diff of edits + score breakdown
              + list of issues left unresolved with reasons
```

### 7.2 Rubric (100 points)

| Category | Weight | Measures |
|---|---|---|
| Visual hierarchy | 15 | Type ramp, weight contrast, focal point |
| Spacing & rhythm | 15 | 4/8px grid adherence, vertical rhythm |
| Color & contrast | 15 | WCAG AA min, palette coherence, dark-mode parity |
| Typography | 10 | Pairing, line-height, measure (45–75ch) |
| Motion & polish | 15 | Hover/active/focus, easings, reduced-motion |
| Density & whitespace | 10 | Breathing room appropriate to surface |
| Component quality | 10 | Affordance clarity, state coverage |
| Accessibility | 10 | Focus rings, semantic HTML, aria, keyboard |

### 7.3 Parallelism

`/refine all` (multi-route): one subagent per route, max 4 concurrent. Each subagent runs the full loop on its route, returns a report. Main agent aggregates.

Per-route: viewport captures parallelized within Playwright (`Promise.all`).

### 7.4 Safety

- **Never silent dependency installs.** Confirm before `npm install` of any new package.
- **Never destructive edits without diff confirmation** for fixes flagged "risky" (>20-line change, layout rewrite, file move).
- **Always reversible.** Each iteration is a separate logical commit-able unit; fixes that regress are reverted before continuing.

## 8. Skills

### 8.1 `ui-design-principles` (auto-activates on `.tsx/.jsx/.vue/.svelte`)

The rubric (7.2) expanded into per-category reference docs with positive and negative examples. Linked from `/component`, `/refine`, `/audit`.

### 8.2 `motion-design` (auto on motion-related work or `/motion`)

Easing curves, duration ladders, stagger patterns, page transition recipes per stack, reduced-motion patterns.

### 8.3 `design-system-keeper` (auto on `tailwind.config.*`, `tokens.css`, theme files)

Single job: enforce constitution rule #2 (no hardcoded design values). Catches bare hex, bare px in margin/padding, hardcoded shadows, raw transition durations.

### 8.4 `svg-illustration` (auto on `/illustrate` and `.svg` edits)

The SVG style guide: viewBox conventions, stroke-width relative to size, gradient construction, two-tone vs full-color rules, accessibility attributes.

### 8.5 `three-d-scene` (auto on `/scene` and R3F files)

R3F patterns, camera setup, performance pitfalls (instanced meshes, suspense boundaries), drei utilities to prefer, mobile-fallback strategy.

## 9. Hooks

`PostToolUse` on Edit/Write of `.tsx/.jsx/.vue/.svelte/.css/.scss`:

- **Line-count check:** warn if file > 300 lines.
- **Hardcoded-value check:** grep for bare hex / bare px in style props / inline color names.

Output is informational only — printed to the user, never auto-applied. The hook script is shell, ≤ 100 lines, dependency-free.

## 10. Stack detection

Runs once per session on first command, caches result.

| Signal | Detection |
|---|---|
| Framework | `package.json` deps: `next`, `vite`, `@remix-run/*`, `astro`, `nuxt`, `@sveltejs/kit` |
| Styling | `tailwind.config.*` → Tailwind; `unocss.config.*` → UnoCSS; `*.module.css` → CSS Modules; `styled-components` dep → SC; else plain CSS |
| TypeScript | `tsconfig.json` present |
| Package manager | `pnpm-lock.yaml` / `yarn.lock` / `bun.lockb` / fallback npm |
| Dev script + port | `package.json` scripts; framework defaults if not customized |

Cache lives in-memory for the session. Re-detected if `package.json` mtime changes.

## 11. Open decisions to verify at build time

These are deliberately not locked in the design — each is a real fork that wants empirical verification when implementation begins. Each must be resolved before coding starts on the affected component.

| Decision | Options | Trigger to resolve |
|---|---|---|
| Headless browser | Playwright (bundled chromium ~170MB) vs Puppeteer-core (uses system Chrome) | Visual-loop tool |
| Palette library | `culori` vs `colorjs.io` vs hand-rolled OKLCH | `/palette` command |
| Motion library default | Framer Motion vs Motion (Matt Perry fork) | `/motion`, `/design init` |
| Screenshot helper | Raw Playwright vs `pageres` | Visual-loop tool |
| Dev-server detection | `wait-on` lib vs hand-rolled health poll | Visual-loop tool |
| Plugin manifest format | Whatever Claude Code marketplace currently requires | Before publish |

Verification approach: read primary docs / GitHub READMEs at the moment the relevant component is built. Do not rely on prior-knowledge claims.

## 12. Testing strategy

- **Skill content:** manual review against constitution; no automated test for prose.
- **Commands:** golden-path integration tests using a fixture project per stack (Next, Vite, SvelteKit). Each command runs end-to-end on each fixture; output diffed against committed snapshot.
- **Visual loop:** test against fixture project with deliberate ugly pages; assert rubric score improves by ≥10 points after one iteration. No flake-tolerance for the score check (deterministic critique prompt).
- **Stack detection:** unit tests on `package.json` fixtures.
- **Hooks:** shellcheck + golden-output tests on sample edits.

## 13. Out of scope (worth restating)

- PPTX export, prototype scaffolding, standalone web app.
- Multi-user / cloud sync — plugin is single-user, local.
- AI image generation via external APIs.
- Auto-fix from hooks.
- Adapting to non-web UI (mobile native, desktop native).

## 14. Success criteria

The plugin ships when:

1. Install via `claude /plugin marketplace add` works on a clean machine.
2. All eight slash commands produce non-broken output on the three fixture projects.
3. `/refine` improves rubric score by ≥ 15 points on the deliberately-ugly fixture.
4. Every plugin source file ≤ 300 lines.
5. Constitution rules 1–7 hold on every generated artifact across the test matrix.
6. README shows before/after screenshots for `/refine` matching mistyhx/frontend-design-audit's example quality bar or higher.
