---
name: scene
description: Generate a React Three Fiber scene from a description. Asks before adding 3D dependencies.
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
  - Grep
  - Glob
---

# /scene &lt;description&gt;

Examples:

- `/scene ambient particles for hero background`
- `/scene product showcase with orbit controls`
- `/scene scroll-driven camera through a tunnel`

Generates a React Three Fiber (R3F) scene component. **Never installs 3D dependencies silently.**

## The constitution (apply to the generated scene)

1. Max 300 lines per file. Heavy scenes are split into a directory: `index.tsx`, `meshes.tsx`, `effects.tsx`, etc.
2. No hardcoded design values. Colors come from project tokens (read into JS via `getComputedStyle(document.documentElement).getPropertyValue('--…')` or via a tokens module). No raw hex.
3. Every interactive element has hover, active, focus-visible, and disabled states. R3F objects with pointer events get hover and active equivalents (cursor change, emissive bump, scale tween).
4. All motion respects `prefers-reduced-motion`. Idle animations, camera drift, and scroll-driven motion all have a reduced-motion fallback (static frame or muted version).
5. Every image / illustration has alt text or `aria-hidden` if decorative. Wrap the canvas in an accessible container — most decorative scenes get `aria-hidden="true"` on the wrapping element with a textual fallback nearby.
6. Dark mode is never an afterthought — token-driven colors swap automatically; verify scene readability in both.
7. Stack-respect — refuse to scaffold R3F into a non-React project. Offer to point the user at Three.js vanilla instead, but do not generate that here.

## Hard requirement: dependency confirmation

R3F is a non-trivial install. The bundle includes:

- `three`
- `@react-three/fiber`
- `@react-three/drei`

You must:

1. Detect whether these are already in the project's `package.json`.
2. If any are missing, before writing any file, list the missing packages and the exact install command (matching the project's package manager).
3. Wait for the user to explicitly say yes. Do not interpret silence, "ok", or "go ahead" on an unrelated previous question as consent. The user must affirm the install of these specific packages.
4. If the user declines, stop. Do not write a partial scene that will not compile. Suggest `/illustrate` for a 2D alternative.

This confirmation gate is mandatory. Skipping it violates design spec Section 7.4 ("Never silent dependency installs").

## Bundled templates

When a user description matches one of these closely, start from the template and customise rather than generating from scratch:

- `ambient-particles` — drifting points with subtle camera sway, good for hero backgrounds.
- `product-showcase` — single object on a turntable with orbit controls and rim lighting.
- `hero-gradient-mesh` — large-scale shader-driven gradient plane, no real geometry, very cheap.
- `scroll-driven-camera` — camera moves along a path tied to scroll position; uses reduced-motion fallback.

The templates live in the plugin's references and the `three-d-scene` skill explains them.

## Procedure

### 1. Pre-flight

- Read project tokens. Confirm color tokens exist. If absent, stop and prompt for `/design init`.
- Detect stack. Confirm React. If not React, stop (see constitution rule 7).
- Check installed deps for `three`, `@react-three/fiber`, `@react-three/drei`.

### 2. Confirm dependencies

If any are missing, run the dependency confirmation gate above. Do not proceed without explicit affirmation.

### 3. Plan, confirm, write

- Pick a template (or generate from scratch if no template fits) and tell the user which one and why.
- Print the file plan: scene component path, any sub-files, where it will be mounted (or not — by default, write the component but do not auto-import it into a route).
- Wait for confirmation.
- Generate the scene:
  - Use `<Canvas>` with sensible defaults (`dpr={[1, 2]}`, `gl={{ antialias: true, powerPreference: 'high-performance' }}`).
  - Wrap dynamic content in `<Suspense>`. Provide a fallback that does not flash.
  - Use drei utilities where they reduce code (`OrbitControls`, `Environment`, `PerspectiveCamera`, `useScroll`) — but do not pull in heavy drei pieces (effects composer, postprocessing) unless the description requires them.
  - Read motion preference once via `window.matchMedia('(prefers-reduced-motion: reduce)')`. Gate idle animation, camera drift, and scroll motion on the result.
  - Cap pixel ratio. Cap geometry counts. Use `InstancedMesh` for any repeating geometry > 50 instances.
  - Provide a mobile fallback strategy: either render at a lower resolution, render fewer particles / less geometry, or render a static SVG instead — depends on the scene. Document the choice in a comment.
  - Add an accessible wrapping element: `aria-hidden="true"` for decorative scenes, with a brief textual description nearby for context.
  - Color and emissive values driven by token reads, not raw hex.

### 4. Verify

After writing, re-read the files and self-check:

- File ≤ 300 lines, split if not.
- Reduced-motion guard present and effective (test by tracing the code path mentally).
- No hardcoded hex.
- Suspense boundary in place.
- Mobile fallback documented.
- The wrapping accessibility container is correct (decorative vs labelled).

Print a usage snippet showing how to mount the scene and where to size it.

## Error cases

- Project is not React: refuse to generate. Constitution rule 7.
- User declines the dependency install: stop, do not write anything, suggest `/illustrate`.
- Description requires assets the plugin cannot provide (custom GLTF models, HDRIs, textures): refuse to fabricate them. Ask the user to point at real asset paths, then generate the scene that consumes them.
- Project already has a different 3D library installed (e.g. Babylon.js, vanilla Three): ask which to standardise on; do not stack two 3D engines.
- Tokens absent: hard stop, prompt for `/design init`.
