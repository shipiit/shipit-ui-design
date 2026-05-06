---
name: refine
description: Visual loop — Playwright captures, Claude critiques, applies fixes, re-captures, iterates until the rubric is met.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
  - Agent
---

# /refine [route | file]

The central differentiator of this plugin. The loop is Claude-driven: the bundled `tools/visual-loop/` Node script handles only mechanical work (boot dev server, drive Playwright, save screenshots). Critique, planning, edits, and verification are Claude's work using the screenshots as input.

Argument forms:

- `/refine` — refine the current route detected from the project (root or whatever is foregrounded in the dev server config).
- `/refine /pricing` — refine a specific route.
- `/refine path/to/Page.tsx` — refine the page that file backs.
- `/refine all` — fan out across every detected route. See parallelism rules below.

## The constitution (apply to every fix you propose)

1. Max 300 lines per file. If a fix grows a file past the limit, split before applying.
2. No hardcoded design values. Every fix references tokens.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode parity is part of the rubric — never improve light at the cost of dark.
7. Stack-respect — never introduce a new framework or styling system to fix a visual issue.

## The loop algorithm (follow exactly)

Each numbered step is one phase of one iteration. The loop runs until the exit conditions in step 8.

### 1. detect

Read `package.json`. Identify:

- The dev script (`dev`, `start`, `serve`, framework default).
- The base URL and port (read from script flags, framework defaults: Next 3000, Vite 5173, Astro 4321, SvelteKit 5173, Remix 3000, Nuxt 3000).
- The TypeScript / styling stack (use cached detection if available).

If detection is ambiguous, ask the user before proceeding.

### 2. boot

Invoke the visual-loop tool to start the dev server in the background and poll the URL until it returns 200, with a 30-second timeout. If boot fails:

- Show the dev-server stderr to the user.
- Stop the loop. Do not retry silently.

If boot succeeds, the tool returns the live base URL.

### 3. capture

Invoke the visual-loop tool to take screenshots in parallel via Playwright. The required matrix per route:

- mobile 390x844 — light + dark
- tablet 820x1180 — light + dark
- desktop 1440x900 — light + dark + hover-on-key-elements (primary buttons, nav links, cards)
- desktop full-page scroll capture

All viewports captured concurrently within Playwright via `Promise.all`. Save under a tool-managed temp dir; the tool returns absolute file paths.

### 4. critique

You (Claude) view the screenshots and read the relevant source files. Score the route against the rubric below. Total = 100.

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

Record per-category scores and brief evidence (one line each) citing what you saw in the screenshots and source.

### 5. plan

Generate a list of candidate fixes. Each fix has:

- Target file + line region
- One-line description
- Estimated rubric impact (which categories, point delta)
- Estimated risk: `safe` (style-only, ≤ 20 lines) or `risky` (layout rewrite, file move, > 20 lines, prop API change, dependency add)

Pick the top N where impact > risk. Default N = 5. Cap one fix per file per iteration to keep diffs reviewable.

For any `risky` fix, present the diff to the user and require explicit confirmation before applying. Never apply a risky fix silently.

### 6. edit

Apply the selected fixes via Edit. One logical change per fix. Keep each fix mechanically isolated so it can be reverted in step 8 without affecting others.

If a fix grows a file past 300 lines, split first.

### 7. recapture

Re-invoke the visual-loop tool. Same viewport matrix as step 3. Same route(s).

### 8. verify

Re-run the critique (step 4) on the new screenshots. Compare per-category scores.

- For each fix applied this iteration, attribute its score delta. If a fix produced a net regression in any category, revert that specific fix (Edit it back) before continuing.
- Compute the total score and the delta from the previous iteration.

### 9. loop

Continue iterating until any exit condition holds:

- Total score ≥ 85, OR
- Iteration count ≥ 4, OR
- Score delta < 2 between consecutive iterations (the loop has plateaued).

When you exit, emit the report (step 10).

### 10. report

Print:

- Before / after side-by-side screenshot pairs (paths the user can open).
- The final per-category and total scores, with the deltas.
- The diff of every applied fix, grouped by iteration.
- A list of issues you saw but did not fix, with reasons (out of scope, requires user decision, requires new dependency, would violate constitution).

## Parallelism — `/refine all`

When the user invokes `/refine all` or passes multiple routes:

- Discover routes from the framework's routing convention (`app/**/page.tsx` for Next App Router, `pages/**` for Pages Router, `src/routes/**` for SvelteKit, `src/pages/**` for Astro/Vue).
- Fan out one subagent per route via the Agent tool.
- Cap concurrency at 4 subagents at any time. If more than 4 routes, queue.
- Each subagent runs the full loop (steps 1–10) on its route and returns a structured report.
- The main agent aggregates: combined score table, list of fixes per route, any cross-cutting issues (e.g. token problems that show up everywhere).

Per-route, viewport captures are already parallel inside the visual-loop tool via `Promise.all` — do not serialise them.

## Safety rules (non-negotiable)

These come from the design spec Section 7.4. Read them before every iteration.

- **Never silent dependency installs.** If a fix requires a new package (motion library, icon set, etc.), stop and confirm with the user. Show the package name, the version, and why it is needed. The motion library and other tooling marked "verify at build time" in the design spec Section 11 are not yet locked — never auto-pick.
- **Never destructive edits without diff confirmation** for any fix flagged `risky` (> 20-line change, layout rewrite, file move, prop API change, dependency add). Show the diff, wait for confirmation.
- **Always reversible.** Each iteration is a separate logical, commit-able unit. Each fix within an iteration is mechanically isolated. Fixes that regress are reverted in step 8 before the next iteration begins. Never collapse fixes into a single mega-edit that cannot be partially reverted.
- **Never edit user content** (copy text, marketing claims, legal text). Visual fixes only. If copy is part of the issue, flag it and let the user decide.

## Error cases

- Dev server fails to boot in 30s: stop, surface stderr, ask the user.
- Playwright fails (browser missing, port collision, CSP blocking screenshots): stop, surface the actual error, do not retry blindly. Ask the user.
- Score never reaches 85 in 4 iterations: emit the report with whatever score was reached and a clear list of what is blocking further progress (often: missing tokens, ambiguous design intent, copy issues). Do not loop past 4 iterations.
- The visual-loop tool is missing or fails to install: do not attempt to reimplement screenshotting inline. Tell the user to install the plugin's tool dependencies and stop.
- Route returns non-200 at boot (auth-walled, 404): ask for a different route or for credentials/setup hints. Do not guess.
