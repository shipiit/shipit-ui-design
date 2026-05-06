---
name: ui-design-principles
description: Apply the claude-design-studio rubric (visual hierarchy, spacing, color/contrast, typography, motion, density, component quality, accessibility) when generating, refining, or auditing UI in .tsx/.jsx/.vue/.svelte files.
type: skill
---

# UI Design Principles

This skill is the rubric used by `/component`, `/refine`, and `/audit`. Score 0–N per category; total to 100. Below 85 means more work.

## Constitution (verbatim — applies to every artifact)

> 1. Max 300 lines per file. If a generated component would exceed, split before writing.
> 2. No hardcoded design values. Colors, spacing, radii, shadows, durations, easings — all from tokens.
> 3. Every interactive element has hover, active, focus-visible, and disabled states.
> 4. All motion respects `prefers-reduced-motion`.
> 5. Every image / illustration has alt text or `aria-hidden` if decorative.
> 6. Dark mode is never an afterthought — emitted alongside light from the start.
> 7. Stack-respect: never introduce a new framework or styling system; adapt to what's there.

## Bundled rules and cheat sheets — read when relevant

These augment the rubric below. Each is a short, authoritative file the skill reads in context:

| File | When to read |
|---|---|
| `references/canonical-tokens.md` | Before generating any code that references tokens — converges naming variants. |
| `references/design-rules/tinted-neutrals.md` | Designing neutrals; defining `--color-bg` / `--color-fg`. |
| `references/design-rules/sixty-thirty-ten.md` | Reviewing color distribution on a page or screen. |
| `references/design-rules/mobile-grid-ios-android.md` | Working in a React Native / Flutter / mobile-web app context. |
| `references/design-rules/learning-resources.md` | User asks for inspiration or examples. |
| `references/spacing-cheat-sheets/desktop-sidebar.md` | Building or refining a desktop sidebar. |

## Rubric weights

| Category | Weight |
|---|---|
| Visual hierarchy | 15 |
| Spacing & rhythm | 15 |
| Color & contrast | 15 |
| Typography | 10 |
| Motion & polish | 15 |
| Density & whitespace | 10 |
| Component quality | 10 |
| Accessibility | 10 |

---

## 1. Visual hierarchy (15)

One primary focal point per surface. Size + weight + color combine to rank elements; never use color alone.

**Good**
```
H1 text-4xl font-semibold  → page title
H2 text-2xl font-medium    → section
body text-base             → content
caption text-sm text-muted → metadata
```

**Bad**
- All headings at the same size, distinguished only by weight.
- Three competing "primary" buttons (filled, brand color, large) on one screen.
- Decorative text larger than content text.

Rules:
- Type ramp must have ≥ 1.2× ratio between adjacent levels.
- Exactly one CTA per primary surface gets the filled brand variant; siblings are ghost/outline.
- Numbers and metrics get tabular-nums and a heavier weight than their label.

---

## 2. Spacing & rhythm (15)

4 px base, exponential scale (`--space-1` = 4, `-2` = 8, `-3` = 12, `-4` = 16, `-6` = 24, `-8` = 32, `-12` = 48, `-16` = 64). Never freehand pixels.

**Good**
```
gap: var(--space-4)
padding: var(--space-6) var(--space-8)
```

**Bad**
```
margin-top: 13px       /* off-grid, no token */
padding: 17px 22px     /* random */
```

Vertical rhythm: every block aligns to a 4 or 8 px line. Form rows have equal vertical gaps; group related controls tighter than unrelated. Section padding scales with viewport (mobile `--space-6`, desktop `--space-12`+).

---

## 3. Color & contrast (15)

WCAG AA minimum (4.5:1 body, 3:1 large/UI). Use the 11-step ramp (50–950). Always emit dark alongside light.

**Good**
```
color: var(--color-fg)
background: var(--color-surface)
border: 1px solid var(--color-border)
```

**Bad**
```
color: #444;                      /* bare hex, no token */
background: rgba(0,0,0,0.5);      /* magic alpha */
color: gray;                      /* CSS named color */
```

Rules:
- Body text on background: contrast ≥ 4.5:1 in both light and dark.
- Brand color used sparingly (CTAs, active state, links) — not as a wash.
- Borders: use `--color-border` (typically step 200 light / 800 dark), not literal `#e5e7eb`.
- Disabled state reduces opacity OR shifts to a muted token, never both.

---

## 4. Typography (10)

Default scale: perfect-fourth (1.250). Pair at most two families (one display, one text). Line-height shrinks as size grows: body 1.5–1.6, headings 1.1–1.25. Measure (line length) 45–75 ch for body copy.

**Good**
```
font: var(--font-sans)
font-size: var(--text-base)
line-height: var(--leading-relaxed)
max-width: 65ch
```

**Bad**
- `line-height: 1.0` on a heading.
- Body text at 13 px (too small) or 20 px (too large).
- Text spans the full viewport width on desktop with no max-width.

Tabular numerals for tables and metrics. Trim widow lines on display headings (`text-wrap: balance`).

---

## 5. Motion & polish (15)

See the `motion-design` skill for the full ladder. At minimum:

**Good**
```
transition: transform var(--dur-200) var(--ease-out-quint);
@media (prefers-reduced-motion: reduce) { transition: none; }
```

**Bad**
```
transition: all 0.5s ease;        /* "all" + arbitrary 0.5s + default ease */
animation: bounce infinite;        /* perpetual motion, no reduced-motion guard */
```

Polish checks:
- Hover: subtle scale (1.02), translate (-1 to -2 px), or shadow lift — pick one.
- Active: 1 px translate down or 0.98 scale; revert on release.
- Focus-visible: 2 px ring at `--color-ring`, offset 2 px, never removed without replacement.
- Disabled: cursor-not-allowed, no hover transform.

---

## 6. Density & whitespace (10)

Match density to surface. Marketing/hero: airy. Dashboards/tables: compact. Forms: medium.

**Good**
- Card padding `--space-6` on desktop, `--space-4` on mobile.
- Table rows 40–48 px on desktop, comfortable variant 56 px.
- Hero section vertical padding `--space-16` to `--space-24`.

**Bad**
- A dashboard with marketing-page padding (cramped data after first card).
- A landing page with dashboard density (data-feel where breathing is wanted).
- Equal padding on every container regardless of content type.

Never let a card touch a viewport edge on desktop — use a `Container` with max-width and outer padding.

---

## 7. Component quality (10)

Every component covers loading, empty, error, success — visibly designed, not just absent. Affordance must be obvious without a tooltip.

**Good**
- Button: filled variant only for primary CTAs; ghost/outline for secondary; icon-only buttons have `aria-label` and visible focus ring.
- Input: visible label, helper text slot, error slot below, leading/trailing slot, clear-on-error semantics.
- Card: hover lift only when card is clickable; static cards do not animate.
- Empty states: icon + title + one-sentence body + action.

**Bad**
- "Click here" links with no underline and no hover hint.
- Loading spinner with no skeleton on first paint (layout jump).
- Errors shown as red border alone with no message.
- Disabled buttons that visually look enabled.

State coverage table per component:
```
default | hover | active | focus-visible | disabled | loading | error
```

---

## 8. Accessibility (10)

Semantic HTML before ARIA. Visible focus ring on every interactive element. Keyboard reachable in document order. Color is never the sole channel.

**Good**
```
<button type="button" aria-pressed={isOn}>…</button>
<nav aria-label="Primary">…</nav>
<img src="…" alt="Quarterly revenue chart, Q3 highest" />
<svg aria-hidden="true">…</svg>   /* decorative */
```

**Bad**
```
<div onClick={…}>Save</div>                /* not a button */
<a href="#" onClick={…}>…</a>              /* fake link */
<img src="logo.svg" />                      /* missing alt */
outline: none                               /* removes focus, no replacement */
```

Checks:
- Tab order matches visual order. No `tabindex` > 0.
- Form inputs have an associated `<label>` (not just placeholder).
- Live regions (`aria-live="polite"`) for async results.
- Modals trap focus and restore on close.
- Skip-link to main on every page.

---

## Scoring shorthand

When critiquing screenshots, write findings as `category: -N (reason)`; sum deductions from 100. A category cannot deduct more than its weight.
