# visual-loop

Headless-browser screenshot runner for the `shipit-ui-design` plugin. Shell-out target for the `/refine` slash command.

This tool does only the mechanical work — boot dev server, drive Playwright, write screenshots and a manifest. Critique, scoring, planning, and edits are Claude's job (see spec section 7.1).

## Build-time-verify notice

`package.json` pins `playwright` to `^1` deliberately. Per spec section 11, the exact version (and the choice of Playwright vs Puppeteer-core) is a build-time verification decision: read the upstream README at the moment this tool is wired in, then narrow the range. Do not assume prior-knowledge claims about either library's current API.

## Install

```sh
cd tools/visual-loop
npm install
npx playwright install chromium  # one-time per machine
npm run build
```

The plugin invokes the compiled binary `claude-design-visual-loop` from `dist/index.js`.

## Usage

```sh
claude-design-visual-loop \
  --route /pricing \
  --out .claude-design/visual-loop/pricing \
  [--base-url http://localhost:3000] \
  [--viewports mobile,tablet,desktop] \
  [--themes light,dark]
```

Run from the user's project root (the cwd is what gets stack-detected).

| Flag | Default | Notes |
|---|---|---|
| `--route` | `/` | Must start with `/`. |
| `--base-url` | (auto) | If omitted, the tool detects the stack and boots the project's dev script. If given, dev-server boot is skipped. |
| `--out` | `.claude-design/visual-loop` | Created if missing. |
| `--viewports` | `mobile,tablet,desktop` | Presets only: mobile 390×844, tablet 820×1180, desktop 1440×900. |
| `--themes` | `light,dark` | Sets Playwright `colorScheme`. |

## What it captures (in parallel)

For every viewport × theme combination: a viewport-sized screenshot.

For desktop only: an additional full-page scroll screenshot and a hover-on-first-interactive-element screenshot, both at the first available theme.

All captures run via `Promise.all`.

## Output

Files in `--out`:

- `<viewport>-<theme>.png` — viewport screenshot
- `desktop-<theme>-fullpage.png` — full-page desktop
- `desktop-<theme>-hover.png` — hover state on first interactive element
- `manifest.json` — see schema below

### `manifest.json` schema

```jsonc
{
  "baseUrl": "http://localhost:3000",
  "route": "/pricing",
  "capturedAt": "2026-05-06T12:34:56.000Z",
  "screenshots": [
    {
      "kind": "viewport" | "full-page" | "hover",
      "viewport": "mobile" | "tablet" | "desktop",
      "theme": "light" | "dark",
      "width": 1440,
      "height": 900,
      "path": "/abs/path/to/desktop-light.png"
    }
  ],
  "stack": {
    "framework": "next" | "vite" | "remix" | "astro" | "nuxt" | "sveltekit" | "unknown",
    "devScript": "dev",
    "port": 3000,
    "styling": "tailwind" | "unocss" | "css-modules" | "styled-components" | "plain-css",
    "ts": true,
    "packageManager": "pnpm" | "yarn" | "bun" | "npm"
  }
}
```

`stack` is `null` when the caller passes `--base-url` (no detection runs).

## Exit codes

| Code | Meaning |
|---|---|
| `0` | Success — manifest path written to stdout. |
| `1` | Any error — full stack written to stderr. No silent fallbacks. |
| `130` | SIGINT during dev-server boot/run; child cleaned up. |
| `143` | SIGTERM during dev-server boot/run; child cleaned up. |

## Scoring helpers

`src/score.ts` exports pure functions Claude calls after critique to aggregate per-viewport rubric scores (`aggregateScores`), compute iteration deltas (`delta`), and check the quality bar (`passesBar`, default 85). The CLI itself does not score — that work is Claude's, per spec 7.1.
