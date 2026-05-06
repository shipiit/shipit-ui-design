# claude-design-studio

A Claude Code plugin that makes Claude Code a senior UI/UX designer when working in your React, Next, Vue, Svelte, Astro, or Remix project.

It does not generate slide decks or standalone artifacts. It works inside your project — bootstraps a design system, generates polished components, iterates on rendered pages until they look right, and adds motion / SVG / 3D when asked.

## Install

```
claude
/plugin marketplace add rahulraj/claude-design-studio
/plugin menu
```

Then select `claude-design-studio` and restart.

For the visual loop (`/refine`), one-time browser install:

```
npx playwright install chromium
```

## Commands

| Command | What it does |
|---|---|
| `/design init` | Bootstrap design system: tokens, base primitives, motion presets, dark mode |
| `/palette [seed\|mood]` | Generate a coherent 11-step light + dark palette and write it to tokens |
| `/component <intent>` | Generate a polished, fully-stated, fully-tokenized component |
| `/refine [route\|file]` | Visual loop: screenshot → critique → fix → repeat until quality bar met |
| `/audit [path\|url]` | Read-only design audit report |
| `/motion <element>` | Add tasteful, accessibility-aware motion |
| `/illustrate <desc>` | Write a clean SVG illustration matched to project tokens |
| `/scene <desc>` | Generate a React Three Fiber scene (asks before adding deps) |

## The constitution

Every generated artifact follows seven rules:

1. **Max 300 lines per file.** If a component would exceed, it splits.
2. **No hardcoded design values.** Colors, spacing, radii, shadows, durations all from tokens.
3. **Every interactive element has hover, active, focus-visible, disabled.**
4. **All motion respects `prefers-reduced-motion`.**
5. **Every image / illustration has alt text or `aria-hidden` if decorative.**
6. **Dark mode is never an afterthought** — emitted alongside light from the start.
7. **Stack-respect:** never introduce a new framework or styling system.

## Skills (auto-activate)

| Skill | Triggers on |
|---|---|
| `ui-design-principles` | `.tsx/.jsx/.vue/.svelte` |
| `motion-design` | motion-related work |
| `design-system-keeper` | `tailwind.config.*`, `tokens.css`, theme files |
| `svg-illustration` | `/illustrate`, `.svg` edits |
| `three-d-scene` | `/scene`, R3F files |
| `dashboard-design` | files in `/admin`, `/dashboard`, `/console`, chart-lib imports |
| `data-visualization` | chart code, KPI tiles, data tables |
| `color-engineering` | `tokens.css` color sections, palette/contrast/colorblind work |

## Bundled references

The plugin ships a deep reference library that skills and commands read at runtime:

- `references/palettes/` — six curated OKLCH-anchored palettes (warm-editorial, neon-brutalism, cool-corporate, soft-pastel, deep-monochrome, vibrant-tech) with WCAG-checked pairs
- `references/type-scales/` — minor-third, major-third, perfect-fourth, golden ratio
- `references/motion-curves/` — five easings, five-step duration ladder, reduced-motion policy
- `references/component-blueprints/` — button, card, input, stack with React/Vue/Svelte snippets
- `references/svg-style-guide/` — geometric, two-tone, soft-gradient, isometric, line-art rules
- `references/dashboard-blueprints/` — app shells, KPI tiles/rows, data tables, chart cards, filter bars, notifications, command palette
- `references/charts/` — chart-type matrix, color encoding, anatomy, motion rules
- `references/data-tables/` — anatomy, interaction, responsive strategies, accessibility
- `references/responsive-grids/` — breakpoint ladder, dashboard grid, density tiers
- `references/color-tools/` — color spaces, conversions, harmonies, ramps, accessibility (WCAG + APCA), extraction, mixing, gradients, naming, tokens recipe, pitfalls

## Hooks

`PostToolUse` on edits to UI files runs `hooks/design-lint.sh` — warns on >300-line files and on hardcoded design values. Never edits.

## How `/refine` works

Claude-driven loop. The `tools/visual-loop/` Node script is mechanical only — it boots the dev server, drives Playwright, saves screenshots. Critique, planning, edits, and verification are Claude's work.

```
detect    → find dev script + base URL
boot      → start dev server, poll until 200
capture   → 3 viewports × light/dark + scroll + hover, in parallel
critique  → Claude scores against rubric (100 pts across 8 categories)
plan      → top fixes where impact > risk
edit      → apply fixes
recapture → screenshot again
verify    → revert any fix that regressed
loop      → until score ≥ 85, or 4 iterations, or Δ < 2
report    → before/after side-by-side
```

For multi-route audits and refines, the plugin fans out one subagent per route (capped at 4 concurrent).

## Open decisions (verified at build time)

Several library choices were deliberately deferred to implementation:

- Headless browser: Playwright vs Puppeteer-core
- Palette library: `culori` vs `colorjs.io` vs hand-rolled OKLCH
- Motion library default: Framer Motion vs Motion (Matt Perry fork)
- Plugin manifest schema: matches whatever `claude` CLI currently expects

If you hit a mismatch, open an issue.

## Design spec

Full design at `docs/superpowers/specs/2026-05-06-claude-design-studio-design.md`.

## License

MIT.
