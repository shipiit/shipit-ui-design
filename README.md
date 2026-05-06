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

`shipit-ui-design` is a [Claude Code](https://claude.com/claude-code) plugin. After install, when you work on a UI project, Claude Code follows the plugin's design rules: tokenized values, full state coverage, accessibility, motion, dark mode by default, dashboard and chart literacy, and a senior eye for hierarchy and rhythm.

It does not generate slide decks, prototypes, or standalone artifacts. It works **inside** your project — adapting to your stack (Next, Vite, Remix, Astro, Nuxt, SvelteKit, React Native).

## Why

Most AI-generated UI looks junior — flat hierarchy, inconsistent spacing, hardcoded hex, missing states, broken dark mode. Audit-style plugins catch some of this after the fact. This plugin flips it: it ships a constitution, a rubric, and a screenshot-driven feedback loop so the UI lands clean the first time, and gets improved against rendered pixels — not just source code — when it doesn't.

## Install — full guide for new users

Six steps, ~3 minutes total. Every step shows what to type and what you'll see.

### Step 1 — Install Claude Code

Skip if you already have Claude Code installed.

| OS | Command |
|---|---|
| macOS | `brew install claude-code` |
| Windows | Install via the [Claude Code installer](https://claude.com/claude-code) |
| Linux | `npm install -g @anthropic-ai/claude-code` |
| Any (npm) | `npm install -g @anthropic-ai/claude-code` |

Verify the install:

```bash
claude --version
```

You should see a version number. If you get "command not found", restart your terminal so the new binary is on your PATH.

### Step 2 — Authenticate

```bash
claude
```

The first run opens a browser for you to sign in to your Anthropic account. After sign-in, the terminal app is ready.

### Step 3 — Update if your version is older

`/plugin` requires a recent Claude Code. Update before continuing:

```bash
brew upgrade claude-code            # macOS Homebrew
npm install -g @anthropic-ai/claude-code@latest    # npm
```

Restart your terminal after upgrading.

### Step 4 — Open Claude Code in any project

```bash
cd your-project
claude
```

You don't have to install the plugin from a specific project — user-scope installs work everywhere — but you'll want to test it inside a real UI project.

### Step 5 — Add the marketplace

Inside Claude Code, run:

```
/plugin marketplace add shipiit/shipit-ui-design
```

What you'll see: a confirmation that the marketplace `shipit` was added, with one plugin available (`shipit-ui-design`). No plugins are installed yet — this just registers the catalog.

### Step 6 — Install the plugin

```
/plugin install shipit-ui-design@shipit
```

What you'll see: a progress message, then a confirmation that the plugin installed. By default it installs to your **user scope** — available across every project on your machine.

If you'd rather install at a different scope, type `/plugin` instead, go to **Discover**, press **Enter** on `shipit-ui-design`, and pick a scope:

| Scope | Who sees it |
|---|---|
| **User** (default) | Just you, in every project |
| **Project** | Everyone on this repo (committed to `.claude/settings.json`) |
| **Local** | Just you, only this repo |

### Step 7 — Activate

```
/reload-plugins
```

Skills and commands light up immediately, no restart needed. Restarting Claude Code works too if you prefer.

### Step 8 — Verify

```
/plugin
```

Open the **Installed** tab — you should see `shipit-ui-design@shipit`. Open the **Errors** tab — it should be empty.

If you see errors, jump to [Troubleshooting](#troubleshooting).

### Step 9 (optional) — Install the visual-loop browser

The `/refine` command uses Playwright to screenshot rendered pages. One-time install per machine:

```bash
npx playwright install chromium
```

Skip this if you don't plan to use `/refine`. The other commands work without it.

---

You're done. Try `/shipit-ui-design:design init` in any project to bootstrap a design system, or jump to [Quickstart](#quickstart) for more examples.

## Slash command names

Claude Code namespaces plugin commands with the plugin name. So a command defined as `design.md` becomes `/shipit-ui-design:design`.

| Short form (in this README) | Actual command in Claude Code |
|---|---|
| `/design init` | `/shipit-ui-design:design init` |
| `/palette` | `/shipit-ui-design:palette` |
| `/component` | `/shipit-ui-design:component` |
| `/refine` | `/shipit-ui-design:refine` |
| `/audit` | `/shipit-ui-design:audit` |
| `/motion` | `/shipit-ui-design:motion` |
| `/illustrate` | `/shipit-ui-design:illustrate` |
| `/scene` | `/shipit-ui-design:scene` |

The rest of this README uses the short form for readability.

## Quickstart

Once installed:

```
# Bootstrap a design system in your project
/shipit-ui-design:design init

# Generate a coherent palette from a brand color
/shipit-ui-design:palette #4f46e5

# Generate a polished component
/shipit-ui-design:component subscription card with hover lift and a sparkline

# Iterate visually until it looks right
/shipit-ui-design:refine /pricing
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

The lint hook (`hooks/design-lint.sh`, registered via `hooks/hooks.json`) warns on edits that violate rules 1 or 2. It never auto-fixes.

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

| Component | Stack |
|---|---|
| Skills, commands, references | Markdown with YAML frontmatter |
| Visual-loop runner | TypeScript / Node 20+ / ES modules / strict TS |
| Lint hook | POSIX shell, dependency-free, ≤ 100 lines |
| Plugin manifest | `.claude-plugin/plugin.json` |
| Marketplace catalog | `.claude-plugin/marketplace.json` |
| Bundled assets | SVG (the logo is itself a generated SVG using OKLCH colors) |

No Python anywhere. No build step required for skills/commands/references. The visual-loop runner compiles to `dist/` via `tsc`.

## Project structure

```
shipit-ui-design/
├── .claude-plugin/
│   ├── plugin.json              # plugin manifest
│   └── marketplace.json         # marketplace catalog
├── README.md                    # this file
├── LICENSE                      # MIT
├── assets/
│   ├── logo.svg
│   └── logo-wordmark.svg
├── skills/                      # auto-discovered SKILL.md files
│   ├── ui-design-principles/SKILL.md
│   ├── motion-design/SKILL.md
│   ├── design-system-keeper/SKILL.md
│   ├── svg-illustration/SKILL.md
│   ├── three-d-scene/SKILL.md
│   ├── dashboard-design/SKILL.md
│   ├── data-visualization/SKILL.md
│   └── color-engineering/SKILL.md
├── commands/                    # auto-discovered slash commands
│   ├── design.md   palette.md   component.md   refine.md
│   ├── audit.md    motion.md    illustrate.md  scene.md
├── hooks/
│   ├── hooks.json               # PostToolUse on Edit|Write → design-lint
│   └── design-lint.sh           # POSIX shell, ≤ 100 lines
├── references/                  # bundled docs read by skills/commands
│   ├── canonical-tokens.md
│   ├── palettes/   type-scales/   motion-curves/
│   ├── component-blueprints/   dashboard-blueprints/
│   ├── charts/   data-tables/   responsive-grids/
│   ├── color-tools/   svg-style-guide/
│   ├── design-rules/   spacing-cheat-sheets/
└── tools/
    └── visual-loop/             # TypeScript Node runner
        ├── package.json   tsconfig.json   README.md
        └── src/
            ├── index.ts
            ├── detect-stack.ts
            ├── boot-dev-server.ts
            ├── capture.ts
            └── score.ts
```

## Manage the plugin

| Action | Command |
|---|---|
| List installed | `/plugin` → **Installed** tab |
| Disable | `/plugin disable shipit-ui-design@shipit` |
| Re-enable | `/plugin enable shipit-ui-design@shipit` |
| Uninstall | `/plugin uninstall shipit-ui-design@shipit` |
| Update marketplace | `/plugin marketplace update shipit` |
| Apply changes without restart | `/reload-plugins` |

## Troubleshooting

**`/plugin` command not recognized.** Update Claude Code (`brew upgrade claude-code` or `npm install -g @anthropic-ai/claude-code@latest`) and restart your terminal.

**Marketplace not loading.** Verify `https://github.com/shipiit/shipit-ui-design` is reachable and the `.claude-plugin/marketplace.json` file exists at its root.

**Plugin skills/commands not appearing.** Run `/reload-plugins`. If still missing, clear the cache and reinstall:

```bash
rm -rf ~/.claude/plugins/cache
```

Then restart Claude Code, run `/plugin marketplace update shipit`, and reinstall.

**`/refine` errors with "browser not installed".** Run `npx playwright install chromium`.

**Hook isn't firing.** Make sure `hooks/design-lint.sh` is executable (`chmod +x hooks/design-lint.sh`).

**Errors tab in `/plugin` shows a load error.** Open the **Errors** tab in `/plugin` for specifics — typical causes are a malformed `plugin.json` or a missing referenced file.

## Open decisions (verified at build time)

A few library choices were deliberately not pinned in the design — to be confirmed when implementation lands:

- **Headless browser** — Playwright (bundled chromium) vs Puppeteer-core (uses system Chrome).
- **Palette library** — `culori` vs `colorjs.io` vs hand-rolled OKLCH.
- **Motion library default** — Framer Motion vs Motion (Matt Perry fork).
- **Chart library recommendation** — Recharts vs Visx vs Tremor vs ECharts vs Chart.js.

If you hit a mismatch, please open an issue.

## Contributing

PRs welcome. When proposing additions:

- Skills, commands, and source files stay ≤ 300 lines each.
- New design rules go in `references/design-rules/` with the same template (rule, why, recommended approach, when to break, common mistakes, token mapping, cross-references).
- New runtime dependencies for the visual-loop tool need a strong reason — one runtime dep today, keep it lean.

## License

MIT. See [`LICENSE`](./LICENSE).
