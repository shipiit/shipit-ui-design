---
name: component
description: Generate a polished, fully-stated, fully-tokenized component from a natural-language intent.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /component &lt;intent&gt;

Examples:

- `/component subscription card with hover lift`
- `/component command palette with keyboard nav`
- `/component stat tile`

## The constitution (apply to the generated component)

1. Max 300 lines per file. If the component approaches the limit, split it before writing.
2. No hardcoded design values. Every color, spacing, radius, shadow, duration, easing comes from a token.
3. Every interactive element has hover, active, focus-visible, and disabled states.
4. All motion respects `prefers-reduced-motion`.
5. Every image / illustration has alt text or `aria-hidden` if decorative.
6. Dark mode is never an afterthought — emit alongside light from the start.
7. Stack-respect — never introduce a new framework or styling system.

## Procedure

### 1. Tokens must exist (hard gate)

Before doing anything else, confirm the project has a tokens file. Look for:

- `tokens.css`, `app/tokens.css`, `src/tokens.css`, `src/styles/tokens.css`
- `theme.ts`, `tokens.ts`
- A `tailwind.config.*` whose theme references `var(--…)` (indicating tokens elsewhere)

If none of these exist, stop and say:

> This project does not have a design-system tokens file yet. Run `/design init` first, then re-run `/component`.

Do not generate a component against ad-hoc values. This is non-negotiable.

### 2. Read context

- Read the tokens file. Note available color steps, spacing scale, radii, shadows, motion durations and easings.
- Read 2–3 existing components from the project (ideally near where the new one will live) to learn naming, file structure, prop conventions, import style, and any stylesheet pattern (Tailwind classes vs CSS Modules vs styled-components).
- Detect the stack (or use the cached detection from this session).

### 3. Pick a blueprint

Find a matching blueprint in `references/component-blueprints/` keyed by stack + intent family (card, list, dialog, command-menu, form, tile, nav, etc.). If no exact match, pick the closest and adapt. If no blueprint family matches, generate from first principles using the rubric in `skills/ui-design-principles/`.

### 4. Plan, confirm, write

- Print a short plan: target file path(s), proposed prop API, the states you intend to cover, motion you plan to use.
- Wait for user confirmation before writing.
- Generate the component:
  - Full state coverage: loading, empty, error, success/idle. If any state is not applicable to the intent, say so explicitly in a code comment.
  - Keyboard navigation where relevant (lists, menus, dialogs, tabs): arrow keys, Enter / Space, Esc, Home / End. Roving tabindex pattern when appropriate.
  - Focus-visible ring using a token (never `outline: none` without a replacement).
  - Hover, active, focus-visible, disabled visuals — distinct, not the same color twice.
  - Motion via the project's motion module (created by `/design init`). All motion gated on `prefers-reduced-motion`.
  - Dark mode — emit styles for both, do not patch later.
  - Accessibility: semantic HTML first (`<button>`, `<dialog>`, `<nav>` etc.), `aria-*` only when semantic HTML is insufficient, alt text on images, `aria-hidden="true"` on decorative SVG.
- If the file would exceed 300 lines, split into a directory (`ComponentName/index.tsx`, `ComponentName/parts.tsx`, etc.) before writing the first file.
- Write a brief usage snippet at the top of the file (in a comment) showing the most common case.

### 5. Verify

After writing, re-read the file and self-check against the constitution and the rubric. List any concessions you made and why. Suggest the user run `/refine <route>` once the component is wired up to a route.

## Error cases

- Tokens absent: hard stop, prompt for `/design init`.
- Stack not detectable: ask the user to clarify before generating.
- Intent ambiguous (e.g. "card" with no further detail): ask 1–2 clarifying questions before writing. Do not guess.
- Component would require a new dependency: ask before adding it. Never silently install.
- Existing component with the same name: show a diff plan and ask whether to replace, augment, or pick a new name.
