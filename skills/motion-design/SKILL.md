---
name: motion-design
description: Pick easings, durations, stagger, and page-transition recipes for UI motion; auto-activates on `/motion` and motion-related edits across React/Vue/Svelte stacks.
type: skill
---

# Motion Design

Tasteful motion = imperceptible-when-needed, expressive-when-warranted. Defaults below come from `tokens.css` written by `/design init`.

## Constitution (verbatim — applies to every artifact)

> 1. Max 300 lines per file. If a generated component would exceed, split before writing.
> 2. No hardcoded design values. Colors, spacing, radii, shadows, durations, easings — all from tokens.
> 3. Every interactive element has hover, active, focus-visible, and disabled states.
> 4. All motion respects `prefers-reduced-motion`.
> 5. Every image / illustration has alt text or `aria-hidden` if decorative.
> 6. Dark mode is never an afterthought — emitted alongside light from the start.
> 7. Stack-respect: never introduce a new framework or styling system; adapt to what's there.

---

## Library defaults (per stack)

Spec-locked defaults. Alternates noted, do not switch without explicit user request.

| Stack | Default | Alternate |
|---|---|---|
| React | Framer Motion | Motion (Matt Perry fork) — listed in spec section 11 as a build-time decision |
| Vanilla / non-React | Motion One | — |
| Heavy timelines, scrollytelling | GSAP | — |
| Vue / Svelte / Nuxt | native transitions + `tokens.css` | Motion One when complex |

Never introduce a motion library if one is already present in `package.json`. Stack-respect (rule 7).

---

## Duration ladder

All durations are tokens. Never write a raw `ms` literal.

| Token | Value | Use |
|---|---|---|
| `--dur-150` | 150 ms | Micro: tooltip, color flash, focus ring |
| `--dur-200` | 200 ms | Hover, exit transitions, small toggles |
| `--dur-300` | 300 ms | Layout shifts, drawer/popover, dialog |
| `--dur-600` | 600 ms | Entrance, hero reveal, page fade |

Above 600 ms is reserved for orchestrated sequences (`/scene`, scroll-driven). Never put > 600 ms on a click response.

---

## Easing curves

Tokens, not hand-typed cubic-béziers.

| Token | Curve | Use |
|---|---|---|
| `--ease-out-quint` | `cubic-bezier(0.22, 1, 0.36, 1)` | Entrance, hover-in, layout grow |
| `--ease-in-out-cubic` | `cubic-bezier(0.65, 0, 0.35, 1)` | Symmetrical transitions, drawers |
| `--ease-spring` | spring (stiffness 300, damping 30) | Layout, drag-release, success bounce |
| `linear` | linear | Progress bars, scrubbing only |

Never use bare `ease`, `ease-in`, `ease-out` defaults — they are ugly. Never use `ease-in` alone on entrance (feels stuck).

---

## Default recipes

From spec section 6.6.

| Event | Duration | Easing |
|---|---|---|
| Hover | 200 ms | ease-out-quint |
| Active / press | 100 ms | ease-out-quint |
| Layout shift | 300 ms | spring |
| Entrance | 600 ms | ease-out-quint, with stagger |
| Exit | 200 ms | ease-in-cubic |
| Page transition | 300 ms in / 200 ms out | ease-in-out-cubic |

---

## Stagger patterns

Stagger reveals natural reading order. Default delay between children: 40–80 ms. Cap total at ~400 ms (8 children × 50 ms) so the last item is not perceived as late.

**Good**
```jsx
<motion.ul variants={list} initial="hidden" animate="visible">
  {items.map(i => (
    <motion.li key={i.id} variants={item}>…</motion.li>
  ))}
</motion.ul>

const list = { visible: { transition: { staggerChildren: 0.05 } } };
const item = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22,1,0.36,1] } },
};
```

**Bad**
- Stagger 200 ms × 12 children = 2.4 s — user reads it as broken.
- Stagger applied to every list site-wide — becomes wallpaper, loses meaning.
- Stagger that runs every time a list re-renders (only on initial mount or explicit transition).

---

## Page transitions

Choose one and apply globally; never mix techniques on the same site.

**Crossfade (default)**
- Out: 200 ms opacity 1 → 0
- In:  300 ms opacity 0 → 1, y 8 → 0

**Slide**
- Forward: new page from right, old to left, 300 ms ease-in-out-cubic
- Back: reverse direction (use route-history hook)

**Shared-element**
- Use Framer Motion `layoutId` (React) or View Transitions API where supported.
- Reserve for hero → detail navigation. Never on every link.

---

## `prefers-reduced-motion`

Mandatory. Two acceptable patterns:

**Pattern A — disable transform/translate, keep opacity**
```css
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```

**Pattern B — Framer Motion**
```jsx
import { useReducedMotion } from "framer-motion";
const reduced = useReducedMotion();
const variants = reduced
  ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  : { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } };
```

Rule: opacity-only transitions are still allowed under reduced-motion (they don't trigger vestibular issues). Translate, scale, rotate, parallax must be disabled.

---

## Hover / active / focus baseline

Every interactive element gets all four. From `tokens.css`:

```css
.btn {
  transition:
    transform var(--dur-200) var(--ease-out-quint),
    background-color var(--dur-200) var(--ease-out-quint),
    box-shadow var(--dur-200) var(--ease-out-quint);
}
.btn:hover  { transform: translateY(-1px); box-shadow: var(--shadow-md); }
.btn:active { transform: translateY(0);    box-shadow: var(--shadow-sm); transition-duration: var(--dur-150); }
.btn:focus-visible { outline: 2px solid var(--color-ring); outline-offset: 2px; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
```

---

## Anti-patterns (do not generate)

- `transition: all <time>` — force-specifies every property; explicit list only.
- Infinite loops on UI chrome (spinners excepted; always have a stop condition).
- Parallax on text bodies (vestibular trigger and reading hostile).
- Bouncy springs on layout-blocking transitions (router, modal open).
- Motion on first-paint above the fold without skeleton — perceived as jank.
- Auto-playing carousels with no pause control.

---

## Library cheat-sheet

**Framer Motion**
- `motion.<element>`, `variants`, `AnimatePresence` for exit, `layout` for layout animations, `useReducedMotion()`.

**Motion One**
- `animate(el, { y: [10, 0], opacity: [0, 1] }, { duration: 0.6, easing: [0.22, 1, 0.36, 1] })`

**GSAP**
- Reserved for timelines and ScrollTrigger. Always pair with `prefers-reduced-motion` guard before `gsap.to`.

**Native (Vue/Svelte/CSS)**
- Vue `<Transition>` / Svelte `transition:` directives + token-driven CSS classes. Never inline `0.3s` literals.
