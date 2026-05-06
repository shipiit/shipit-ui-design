import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";

export type Framework =
  | "next"
  | "vite"
  | "remix"
  | "astro"
  | "nuxt"
  | "sveltekit"
  | "unknown";

export type Styling =
  | "tailwind"
  | "unocss"
  | "css-modules"
  | "styled-components"
  | "plain-css";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

export interface StackInfo {
  framework: Framework;
  devScript: string;
  port: number;
  styling: Styling;
  ts: boolean;
  packageManager: PackageManager;
}

interface RawPackageJson {
  scripts?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

const FRAMEWORK_DEFAULT_PORTS: Record<Framework, number> = {
  next: 3000,
  vite: 5173,
  remix: 3000,
  astro: 4321,
  nuxt: 3000,
  sveltekit: 5173,
  unknown: 3000,
};

export async function detectStack(cwd: string): Promise<StackInfo> {
  const pkg = await readPackageJson(cwd);
  const allDeps = mergeDeps(pkg);

  const framework = detectFramework(allDeps);
  const styling = await detectStyling(cwd, allDeps);
  const ts = await fileExists(join(cwd, "tsconfig.json"));
  const packageManager = await detectPackageManager(cwd);
  const devScript = pickDevScript(pkg.scripts ?? {});
  const port = parsePortFromScript(pkg.scripts?.[devScript]) ?? FRAMEWORK_DEFAULT_PORTS[framework];

  return { framework, devScript, port, styling, ts, packageManager };
}

async function readPackageJson(cwd: string): Promise<RawPackageJson> {
  const raw = await readFile(join(cwd, "package.json"), "utf8");
  return JSON.parse(raw) as RawPackageJson;
}

function mergeDeps(pkg: RawPackageJson): Record<string, string> {
  return { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) };
}

function detectFramework(deps: Record<string, string>): Framework {
  if ("next" in deps) return "next";
  if ("@sveltejs/kit" in deps) return "sveltekit";
  if ("nuxt" in deps) return "nuxt";
  if ("astro" in deps) return "astro";
  if (Object.keys(deps).some((k) => k.startsWith("@remix-run/"))) return "remix";
  if ("vite" in deps) return "vite";
  return "unknown";
}

async function detectStyling(
  cwd: string,
  deps: Record<string, string>,
): Promise<Styling> {
  if (await anyExists(cwd, ["tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs"])) {
    return "tailwind";
  }
  if (await anyExists(cwd, ["unocss.config.js", "unocss.config.ts"])) {
    return "unocss";
  }
  if ("styled-components" in deps) return "styled-components";
  if ("tailwindcss" in deps) return "tailwind";
  if ("unocss" in deps) return "unocss";
  return "plain-css";
}

async function detectPackageManager(cwd: string): Promise<PackageManager> {
  if (await fileExists(join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (await fileExists(join(cwd, "yarn.lock"))) return "yarn";
  if (await fileExists(join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

function pickDevScript(scripts: Record<string, string>): string {
  if (scripts["dev"]) return "dev";
  if (scripts["start"]) return "start";
  if (scripts["serve"]) return "serve";
  throw new Error("No dev script found in package.json (looked for dev/start/serve).");
}

function parsePortFromScript(script: string | undefined): number | null {
  if (!script) return null;
  const flagMatch = script.match(/--port[=\s]+(\d+)/);
  if (flagMatch && flagMatch[1]) return Number(flagMatch[1]);
  const pMatch = script.match(/(?:^|\s)-p\s+(\d+)/);
  if (pMatch && pMatch[1]) return Number(pMatch[1]);
  const envMatch = script.match(/PORT=(\d+)/);
  if (envMatch && envMatch[1]) return Number(envMatch[1]);
  return null;
}

async function fileExists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return false;
    throw err;
  }
}

async function anyExists(cwd: string, names: string[]): Promise<boolean> {
  for (const name of names) {
    if (await fileExists(join(cwd, name))) return true;
  }
  return false;
}
