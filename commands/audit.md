---
name: audit
description: Read-only design audit covering Nielsen heuristics and the rubric. No code edits.
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
  - Agent
---

# /audit [path | url]

Produces a read-only report. Never edits code. Never installs anything.

Argument forms:

- `/audit` — audit the current project's primary route(s).
- `/audit /pricing` — audit a specific route.
- `/audit https://example.com` — audit a deployed URL.
- `/audit src/components/Card.tsx` — audit a single component file (source-level only; no rendering).

## The constitution (used as evaluation criteria, not as edit rules here)

1. Max 300 lines per file.
2. No hardcoded design values.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought.
7. Stack-respect.

Findings that violate the constitution are flagged with severity `major`.

## Procedure

### 1. Pre-flight

- Determine the audit target type: project routes, single route, deployed URL, or single source file.
- For project / route audits, detect the stack (or use cached detection) so you know how routes are organised.
- For URL audits, no source is available — score from screenshots and DOM only.
- For file audits, no rendering is possible — score from source against the rubric categories that apply (component quality, accessibility, constitution adherence).

This command makes no edits. Reaffirm this to the user before any heavyweight work.

### 2. Capture (when a render exists)

For project / route / URL audits, invoke the visual-loop tool's capture phase only — do not boot any local server for a remote URL; for project audits, boot once and capture, same viewport matrix as `/refine`:

- mobile 390x844 — light + dark
- tablet 820x1180 — light + dark
- desktop 1440x900 — light + dark + hover-on-key-elements
- desktop full-page scroll

Save screenshots; record paths.

### 3. Multi-route parallel-subagent pattern

When auditing more than one route:

- Fan out one subagent per route via the Agent tool.
- Cap concurrency at 4 subagents at any time. Queue the rest.
- Each subagent:
  - Captures its route (the visual-loop tool is safe to invoke concurrently — it serialises browser context creation internally).
  - Runs the rubric and Nielsen heuristic checks (Step 4).
  - Returns a structured report: scores, findings list, evidence.
- The main agent aggregates:
  - Combined score table per route.
  - Cross-cutting findings (issues that appear on multiple routes — usually token, layout primitive, or theming problems).
  - Top-priority recommendations across the whole audit.

The single-route case skips the fan-out and runs the same checks inline.

### 4. Evaluate

Score against the rubric (100 points total):

| Category | Weight | Measures |
|---|---|---|
| Visual hierarchy | 10 | Type ramp, weight contrast, focal point |
| Spacing & rhythm | 15 | 4/8px grid adherence, vertical rhythm |
| Color & contrast | 15 | WCAG AA min, palette coherence, dark-mode parity |
| Typography | 10 | Pairing, line-height, measure (45–75ch) |
| Motion & polish | 10 | Hover/active/focus, easings, reduced-motion |
| Density & whitespace | 10 | Breathing room appropriate to surface |
| Component quality | 10 | Affordance clarity, state coverage |
| Accessibility | 10 | Focus rings, semantic HTML, aria, keyboard |
| Visual richness | 10 | Illustrated art, layered surfaces, decorative motion on marketing surfaces |

**Visual richness — what to surface as findings.**

For every marketing surface (hero, landing, /about, /pricing, /home, feature pages), check for and report:

- Hero lacks illustrated visual (no SVG mockup, no mesh gradient, no orbiting chips) → severity `major`, links to `skills/rich-ui-patterns/SKILL.md` and `skills/svg-illustration/SKILL.md`.
- Feature cards use 24×24 monochrome icons → severity `major`, links to `skills/svg-illustration/SKILL.md`.
- Code blocks render as plain `<pre>` (no syntax highlighting, no chrome) → severity `major`, links to `skills/code-presentation/SKILL.md`.
- Stat row shows bare numbers without decoration or counter animation → severity `minor` (severity 2).
- No section background alternation or ornament across a long marketing scroll → severity `minor` (severity 2).

Severity scale: 1 = info, 2 = minor, 3 = major. Visual richness findings start at severity 2 (significant) and escalate to 3 when the page is explicitly a hero or top-level marketing surface.

**Score cap.** If Visual richness scores < 4/10, hard-cap the overall score at 80 in the report and call this out at the top of the findings list.

Then run Nielsen's 15 heuristics (the mistyhx/frontend-design-audit superset):

1. Visibility of system status
2. Match between system and real world
3. User control and freedom
4. Consistency and standards
5. Error prevention
6. Recognition rather than recall
7. Flexibility and efficiency of use
8. Aesthetic and minimalist design
9. Help users recognise, diagnose, and recover from errors
10. Help and documentation
11. Information architecture clarity
12. Mobile responsiveness adequacy
13. Performance perception (CLS, perceived speed cues)
14. Trust signals and content scannability
15. Form usability and validation feedback

For each heuristic, mark `pass`, `partial`, or `fail`, with one-line evidence.

Constitution check: scan the source (when available) for:
- Files > 300 lines.
- Hardcoded hex / rgb() / px in style props or CSS rules where tokens should apply.
- Interactive elements missing any of hover / active / focus-visible / disabled states.
- Motion not gated on `prefers-reduced-motion`.
- Images without alt text or `aria-hidden`.
- Dark-mode parity gaps.
- New frameworks or styling systems layered onto an existing stack.

### 5. Severity classification

Each finding gets a severity:

- `critical` — accessibility blocker, broken interaction, contrast below AA on body text.
- `major` — constitution violation, broken state coverage, dark-mode parity gap.
- `minor` — polish issues, small spacing inconsistency, copy nitpick.
- `info` — observation, no fix required.

### 6. Report

Emit a single structured report:

- Header: target, date, stack (if known), total score, score per category.
- Top 10 findings, ordered by severity then by impact.
- Heuristic table: 15 rows with pass/partial/fail and evidence.
- Constitution check: rule-by-rule pass/fail with file:line references.
- Per-route breakdown (when multi-route).
- Cross-cutting findings (when multi-route).
- Suggested next commands: `/refine <route>` for the worst-scoring route, `/palette` if contrast failures dominate, `/design init` if tokens are absent or thin.

The report is the output. Do not modify any project file.

## Error cases

- No tokens, no styles, no rendered route: tell the user the project is too early-stage for an audit and suggest `/design init`.
- URL unreachable: stop, surface the network error, do not retry silently.
- Local dev server fails to boot: same handling as `/refine` step 2 — stop, surface stderr.
- More than ~30 routes detected: ask the user to scope the audit before fanning out, to avoid runaway subagent costs.
