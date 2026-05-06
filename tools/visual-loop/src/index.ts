#!/usr/bin/env node
import { writeFile, mkdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { detectStack, type StackInfo } from "./detect-stack.js";
import { bootDevServer } from "./boot-dev-server.js";
import { capture, VIEWPORT_PRESETS, type CaptureManifest, type Theme, type Viewport } from "./capture.js";

interface CliArgs {
  route: string;
  baseUrl: string | null;
  outDir: string;
  viewports: Viewport[];
  themes: Theme[];
  cwd: string;
}

const VALID_THEMES: ReadonlySet<Theme> = new Set<Theme>(["light", "dark"]);

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  let baseUrl = args.baseUrl;
  let stack: StackInfo | null = null;
  let shutdown: (() => Promise<void>) | null = null;

  try {
    if (!baseUrl) {
      stack = await detectStack(args.cwd);
      const booted = await bootDevServer({ cwd: args.cwd, stack });
      baseUrl = booted.url;
      shutdown = booted.shutdown;
    }

    const manifest = await capture({
      baseUrl,
      route: args.route,
      outDir: args.outDir,
      viewports: args.viewports,
      themes: args.themes,
    });

    await mkdir(args.outDir, { recursive: true });
    const manifestPath = join(args.outDir, "manifest.json");
    await writeFile(manifestPath, JSON.stringify(serialize(manifest, stack), null, 2), "utf8");
    process.stdout.write(`${manifestPath}\n`);
  } finally {
    if (shutdown) await shutdown();
  }
}

function parseArgs(argv: string[]): CliArgs {
  const cwd = process.cwd();
  let route = "/";
  let baseUrl: string | null = null;
  let outDir = resolve(cwd, ".claude-design/visual-loop");
  let viewports: Viewport[] = [VIEWPORT_PRESETS["mobile"]!, VIEWPORT_PRESETS["tablet"]!, VIEWPORT_PRESETS["desktop"]!];
  let themes: Theme[] = ["light", "dark"];

  for (let i = 0; i < argv.length; i++) {
    const flag = argv[i];
    const value = argv[i + 1];
    switch (flag) {
      case "--route":
        route = required(flag, value);
        i++;
        break;
      case "--base-url":
        baseUrl = required(flag, value);
        i++;
        break;
      case "--out":
        outDir = resolve(cwd, required(flag, value));
        i++;
        break;
      case "--viewports":
        viewports = parseViewports(required(flag, value));
        i++;
        break;
      case "--themes":
        themes = parseThemes(required(flag, value));
        i++;
        break;
      case "--help":
      case "-h":
        printUsage();
        process.exit(0);
        break;
      default:
        throw new Error(`Unknown argument: ${flag}`);
    }
  }

  if (!route.startsWith("/")) throw new Error(`--route must start with "/", got "${route}".`);
  return { route, baseUrl, outDir, viewports, themes, cwd };
}

function required(flag: string, value: string | undefined): string {
  if (!value || value.startsWith("--")) {
    throw new Error(`Flag ${flag} requires a value.`);
  }
  return value;
}

function parseViewports(list: string): Viewport[] {
  const names = list.split(",").map((s) => s.trim()).filter(Boolean);
  if (names.length === 0) throw new Error("--viewports list is empty.");
  return names.map((name) => {
    const preset = VIEWPORT_PRESETS[name];
    if (!preset) {
      throw new Error(`Unknown viewport "${name}". Valid: ${Object.keys(VIEWPORT_PRESETS).join(", ")}.`);
    }
    return preset;
  });
}

function parseThemes(list: string): Theme[] {
  const names = list.split(",").map((s) => s.trim()).filter(Boolean);
  if (names.length === 0) throw new Error("--themes list is empty.");
  return names.map((name) => {
    if (!VALID_THEMES.has(name as Theme)) {
      throw new Error(`Unknown theme "${name}". Valid: light, dark.`);
    }
    return name as Theme;
  });
}

function serialize(manifest: CaptureManifest, stack: StackInfo | null): Record<string, unknown> {
  return { ...manifest, stack };
}

function printUsage(): void {
  process.stdout.write(
    [
      "claude-design-visual-loop",
      "  --route <path>           Route to capture (default: /)",
      "  --base-url <url>         Skip dev-server boot, use this URL",
      "  --out <dir>              Output directory (default: .claude-design/visual-loop)",
      "  --viewports <csv>        mobile,tablet,desktop (default: all three)",
      "  --themes <csv>           light,dark (default: both)",
      "",
    ].join("\n"),
  );
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.stack ?? err.message : String(err);
  process.stderr.write(`${message}\n`);
  process.exit(1);
});
