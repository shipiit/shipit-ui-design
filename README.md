<p align="center">
  <img src="./assets/logo-wordmark.svg" alt="shipit/ui" width="360"/>
</p>

<p align="center">
  <b>A Claude Code plugin that turns Claude Code into a senior UI/UX designer.</b><br/>
  Bootstraps design systems, generates polished components, builds dashboards with charts and KPIs,<br/>
  and iterates visually — screenshot, critique, fix, repeat — until the result looks right.
</p>

<p align="center">
  <img alt="version" src="https://img.shields.io/badge/version-0.1.0-blue?style=flat-square"/>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-green?style=flat-square"/>
  <img alt="stack" src="https://img.shields.io/badge/stack-TypeScript%20%7C%20Markdown-2b6cb0?style=flat-square"/>
  <img alt="status" src="https://img.shields.io/badge/status-v0.1%20scaffold-orange?style=flat-square"/>
</p>

---

## What it is

`shipit-ui-design` is a Claude Code plugin. After install, when you work on a UI project, Claude Code follows the plugin's design rules: tokenized values, full state coverage, accessibility, motion, dark mode by default, dashboard and chart literacy, and a senior eye for hierarchy and rhythm.

It does not generate slide decks, prototypes, or standalone artifacts. It works **inside** your project — adapting to your stack (Next, Vite, Remix, Astro, Nuxt, SvelteKit, React Native).

## Why

Most AI-generated UI looks junior — flat hierarchy, inconsistent spacing, hardcoded hex, missing states, broken dark mode. Audit-style plugins catch some of this after the fact. This plugin flips it: it ships a constitution, a rubric, and a screenshot-driven feedback loop so the UI lands clean the first time, and is improved against rendered pixels — not just source code — when it doesn't.

## Install

You'll need [Claude Code](https://claude.com/claude-code) installed and authenticated.

```bash
# 1. Open Claude Code in any project
cd your-project
claude

# 2. Add this plugin's marketplace
/plugin marketplace add shipiit/shipit-ui-design

# 3. Open the plugin menu and install `shipit-ui-design`
/plugin menu

# 4. Restart Claude Code
```

For the visual loop (`/refine`), one-time browser install per machine:

```bash
npx playwright install chromium
```

That's it. From now on, the plugin's skills auto-activate when you open UI files, and the slash commands are available everywhere.

## Quickstart

```bash
# Bootstrap a design system in your project
/design init

# Generate a coherent palette from a brand color
/palette #4f46e5

# Generate a polished component
/component subscription card with hover lift and a sparkline

# Iterate visually until it looks right
/refine /pricing
```

## Commands

| Command | What it does |
|---|---|
| `/design init` | Bootstrap a design system: tokens (color, spacing, type, radius, shadow, motion, z-index), Tailwind/CSS-vars wiring, base primitives (Button, Input, Card, Stack, Text, Container), motion presets, dark mode. Idempotent — merges into existing tokens. |
| `/palette [seed\|mood]` | Generate a coherent 11-step light + dark palette using OKLCH-correct interpolation. Accepts a hex (`#4f46e5`), an image path, or a mood string (`warm editorial`, `neon brutalism`). Verifies WCAG-AA contrast on key pairs. |
| `/component <intent>` | Generate a polished, fully-stated, fully-tokenized component. Reads project tokens; prompts for `/design init` first if missing. Splits across files if approaching the 300-line cap. |
| `/refine [route\|file]` | The visual loop. Boots your dev server, screenshots 3 viewports × light/dark + scroll + hover, scores against the 100-point rubric, applies fixes, re-screenshots, iterates. See "How `/refine` works" below. |
| `/audit [path\|url]` | Read-only design audit. Covers Nielsen heuristics + the rubric: hierarchy, spacing, color, type, motion, density, component quality, accessibility. Multi-route audits fan out parallel subagents (cap 4). |
| `/motion <element>` | Add tasteful motion: page transitions, scroll-driven, hover micro-interactions, stagger lists. Picks Framer Motion for React, Motion One for vanilla, GSAP for heavy timelines. Always wraps in `prefers-reduced-motion`. |
| `/illustrate <description>` | Generate a clean SVG illustration matched to project tokens. Styles: geometric, two-tone, soft-gradient, isometric, line-art. Saves to `public/illustrations/` with a typed React wrapper. |
| `/scene <description>` | Generate a React Three Fiber scene. **Asks before adding deps** (`three`, `@react-three/fiber`, `@react-three/drei`). Templates: ambient-particles, product-showcase, hero-gradient-mesh, scroll-driven-camera. |

## Skills (auto-activate)

Skills are persistent design knowledge that activates without you asking when you're working on relevant files.

| Skill | Auto-activates on |
|---|---|
| `ui-design-principles` | `.tsx`, `.jsx`, `.vue`, `.svelte` |
| `motion-design` | motion-related work, `/motion` |
| `design-system-keeper` | `tailwind.config.*`, `tokens.css`, theme files |
| `svg-illustration` | `/illustrate`, `.svg` edits |
| `three-d-scene` | `/scene`, R3F files |
| `dashboard-design` | files in `/admin`, `/dashboard`, `/console`, chart-lib imports |
| `data-visualization` | chart code, KPI tiles, data tables |
| `color-engineering` | `tokens.css` color sections, palette/contrast/colorblind work |

## The constitution

Every artifact the plugin generates follows seven rules:

1. **Max 300 lines per file.** If a component would exceed, it splits.
2. **No hardcoded design values.** Colors, spacing, radii, shadows, durations all from tokens.
3. **Every interactive element has hover, active, focus-visible, disabled.**
4. **All motion respects `prefers-reduced-motion`.**
5. **Every image / illustration has alt text or `aria-hidden` if decorative.**
6. **Dark mode is never an afterthought** — emitted alongside light from the start.
7. **Stack-respect:** never introduce a new framework or styling system; adapt to what's there.

The lint hook (`hooks/design-lint.sh`) warns on edits that violate rules 1 or 2. It never auto-fixes.

## How `/refine` works

The loop is **Claude-driven**. The `tools/visual-loop/` Node + TypeScript runner is mechanical only — it boots the dev server, drives Playwright, saves screenshots. Critique, planning, edits, and verification are Claude's work using the screenshots as input.

```
detect    → find dev script + base URL from package.json
boot      → start dev server in background; poll URL until 200 OK (max 30s)
capture   → Playwright captures, in parallel:
              mobile  390 × 844     light + dark
              tablet  820 × 1180    light + dark
              desktop 1440 × 900    light + dark + hover-on-key-elements
              full-page scroll screenshot at desktop
critique  → Claude scores against the 100-point rubric (see below)
plan      → top fixes where impact > risk; risky fixes need explicit confirm
edit      → apply via Edit; one logical change per fix
recapture → screenshot the same viewports
verify    → if a fix regresses the score, revert that fix specifically
loop      → until score ≥ 85, OR max 4 iterations, OR Δ < 2 (diminishing returns)
report    → before/after side-by-side + diff of edits + score breakdown
```

For multi-route refines (`/refine all`) and audits, the plugin fans out one subagent per route, capped at 4 concurrent.

### The rubric (100 pts)

| Category | Weight | Measures |
|---|---|---|
| Visual hierarchy | 15 | Type ramp, weight contrast, focal point |
| Spacing & rhythm | 15 | 4/8 px grid adherence, vertical rhythm |
| Color & contrast | 15 | WCAG AA min, palette coherence, dark-mode parity, 60–30–10 distribution |
| Typography | 10 | Pairing, line-height, measure (45–75 ch) |
| Motion & polish | 15 | Hover/active/focus, easings, reduced-motion |
| Density & whitespace | 10 | Breathing room appropriate to surface |
| Component quality | 10 | Affordance clarity, state coverage |
| Accessibility | 10 | Focus rings, semantic HTML, ARIA, keyboard nav |

## What ships in the box

| Section | Contents |
|---|---|
| **Skills** | 8 SKILL.md files — UI principles, motion, design-system keeper, SVG, R3F, dashboards, data viz, color engineering |
| **Slash commands** | 8 commands wired to subagent fan-out where parallelism helps |
| **Visual-loop tool** | Node + TypeScript runner: stack detect, dev-server boot + healthcheck, parallel Playwright captures, score helpers |
| **Curated palettes** | 6 OKLCH-anchored palettes (warm-editorial, neon-brutalism, cool-corporate, soft-pastel, deep-monochrome, vibrant-tech) with WCAG-checked pairs |
| **Type scales** | minor-third, major-third, perfect-fourth, golden ratio |
| **Motion library** | 5 easings, 5-step duration ladder, reduced-motion policy, interaction-to-curve table |
| **Component blueprints** | Button, Card, Input, Stack — anatomy, states, a11y, React/Vue/Svelte snippets |
| **Dashboard blueprints** | App-shell sidebar + topbar, KPI tile + KPI row, data table, chart card, filter bar, notification center, command palette |
| **Charts knowledge** | Pick-the-right-chart matrix, color encoding, anatomy, motion |
| **Data tables** | Anatomy, interaction, responsive strategy, accessibility |
| **Responsive grids** | Breakpoint ladder, dashboard grid, density tiers |
| **Color toolbox** | Color spaces, conversions, harmonies, ramps, accessibility (WCAG + APCA + colorblind), extraction, mixing, gradients, naming, tokens recipe, pitfalls |
| **SVG style guide** | Geometric, two-tone, soft-gradient, isometric, line-art rules |
| **Design rules** | Tinted neutrals, 60–30–10, mobile iOS/Android grid, learning resources |
| **Spacing cheat sheets** | Desktop sidebar (logo, search, sections, items, promo card, user row, collapsed rail) |
| **Canonical tokens** | Single source of truth resolving naming variants |

## Tech stack

| Component | Stack | Notes |
|---|---|---|
| Skills, commands, references | Markdown with YAML frontmatter | Read by Claude Code at runtime |
| Visual-loop runner | TypeScript / Node 20+ / ES modules | Strict TypeScript, single dep on `playwright` |
| Lint hook | POSIX shell, dependency-free | ≤ 100 lines |
| Plugin manifest | `plugin.json` | Lists skills, commands, hooks, tools |
| Bundled assets | SVG | The plugin generates SVG; the logo is itself a generated SVG |

No Python anywhere. No build step required for skills/commands/references. The visual-loop runner compiles to `dist/` via `tsc`.

## Project structure

```
shipit-ui-design/
├── plugin.json                      # marketplace manifest
├── README.md
├── LICENSE
├── assets/
│   ├── logo.svg
│   └── logo-wordmark.svg
├── skills/
│   ├── ui-design-principles/SKILL.md
│   ├── motion-design/SKILL.md
│   ├── design-system-keeper/SKILL.md
│   ├── svg-illustration/SKILL.md
│   ├── three-d-scene/SKILL.md
│   ├── dashboard-design/SKILL.md
│   ├── data-visualization/SKILL.md
│   └── color-engineering/SKILL.md
├── commands/
│   ├── design.md   palette.md   component.md   refine.md
│   ├── audit.md    motion.md    illustrate.md  scene.md
├── hooks/
│   └── design-lint.sh
├── references/
│   ├── canonical-tokens.md
│   ├── palettes/   type-scales/   motion-curves/
│   ├── component-blueprints/   dashboard-blueprints/
│   ├── charts/   data-tables/   responsive-grids/
│   ├── color-tools/   svg-style-guide/
│   ├── design-rules/   spacing-cheat-sheets/
├── tools/
│   └── visual-loop/                # TypeScript Node runner
│       ├── package.json   tsconfig.json   README.md
│       └── src/
│           ├── index.ts
│           ├── detect-stack.ts
│           ├── boot-dev-server.ts
│           ├── capture.ts
│           └── score.ts
└── docs/
    └── superpowers/specs/
        └── 2026-05-06-shipit-ui-design-design.md
```

## Open decisions (verified at build time)

A few library choices were deliberately not pinned in the design — to be confirmed when implementation lands:

- **Headless browser** — Playwright (bundled chromium) vs Puppeteer-core (uses system Chrome).
- **Palette library** — `culori` vs `colorjs.io` vs hand-rolled OKLCH.
- **Motion library default** — Framer Motion vs Motion (Matt Perry fork).
- **Chart library recommendation** — Recharts vs Visx vs Tremor vs ECharts vs Chart.js.
- **Plugin manifest schema** — matches whatever Claude Code's marketplace currently expects.

If you hit a mismatch, please open an issue.

## Contributing

PRs welcome. When proposing additions:

- Skills and commands stay ≤ 300 lines each.
- Every new design rule goes in `references/design-rules/` with the same template (rule, why, recommended approach, when to break, common mistakes, token mapping, cross-references).
- New library dependencies for the visual-loop tool need a strong reason — one runtime dep today, keep it lean.

## License

MIT. See `LICENSE`.
