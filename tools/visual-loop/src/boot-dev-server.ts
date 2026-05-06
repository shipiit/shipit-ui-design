import { spawn, type ChildProcess } from "node:child_process";
import type { PackageManager, StackInfo } from "./detect-stack.js";

export interface BootedServer {
  url: string;
  shutdown: () => Promise<void>;
}

export interface BootOptions {
  cwd: string;
  stack: StackInfo;
  maxWaitMs?: number;
  pollIntervalMs?: number;
}

const RUNNERS: Record<PackageManager, [string, string[]]> = {
  pnpm: ["pnpm", ["run"]],
  yarn: ["yarn", ["run"]],
  bun: ["bun", ["run"]],
  npm: ["npm", ["run"]],
};

export async function bootDevServer(opts: BootOptions): Promise<BootedServer> {
  const maxWaitMs = opts.maxWaitMs ?? 30_000;
  const pollIntervalMs = opts.pollIntervalMs ?? 500;
  const url = `http://localhost:${opts.stack.port}`;

  const [cmd, baseArgs] = RUNNERS[opts.stack.packageManager];
  const child = spawn(cmd, [...baseArgs, opts.stack.devScript], {
    cwd: opts.cwd,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, BROWSER: "none", PORT: String(opts.stack.port) },
    detached: false,
  });

  child.stdout?.on("data", (chunk: Buffer) => process.stderr.write(`[dev] ${chunk}`));
  child.stderr?.on("data", (chunk: Buffer) => process.stderr.write(`[dev!] ${chunk}`));

  const shutdown = installCleanup(child);

  const exitedEarly = new Promise<never>((_, reject) => {
    child.once("exit", (code, signal) => {
      reject(new Error(`Dev server exited before becoming ready (code=${code} signal=${signal}).`));
    });
  });

  const ready = pollUntilReady(url, maxWaitMs, pollIntervalMs);

  await Promise.race([ready, exitedEarly]);

  return { url, shutdown };
}

async function pollUntilReady(url: string, maxWaitMs: number, pollIntervalMs: number): Promise<void> {
  const started = Date.now();
  while (Date.now() - started < maxWaitMs) {
    if (await probe(url)) return;
    await sleep(pollIntervalMs);
  }
  throw new Error(`Dev server at ${url} did not respond with 200 within ${maxWaitMs}ms.`);
}

async function probe(url: string): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 2_000);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: "manual" });
    return res.status >= 200 && res.status < 400;
  } catch (err) {
    if (err instanceof Error && (err.name === "AbortError" || (err as NodeJS.ErrnoException).code === "ECONNREFUSED")) {
      return false;
    }
    if (err instanceof TypeError) return false;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function installCleanup(child: ChildProcess): () => Promise<void> {
  let shutdownStarted = false;

  const stop = async (): Promise<void> => {
    if (shutdownStarted) return;
    shutdownStarted = true;
    if (child.exitCode !== null || child.signalCode !== null) return;
    child.kill("SIGTERM");
    const exited = await waitForExit(child, 5_000);
    if (!exited) child.kill("SIGKILL");
  };

  const onSignal = (sig: NodeJS.Signals): void => {
    void stop().finally(() => process.exit(sig === "SIGINT" ? 130 : 143));
  };
  process.once("SIGINT", onSignal);
  process.once("SIGTERM", onSignal);
  process.once("exit", () => {
    if (child.exitCode === null && child.signalCode === null) child.kill("SIGTERM");
  });

  return stop;
}

function waitForExit(child: ChildProcess, ms: number): Promise<boolean> {
  return new Promise((resolve) => {
    if (child.exitCode !== null || child.signalCode !== null) {
      resolve(true);
      return;
    }
    const timer = setTimeout(() => resolve(false), ms);
    child.once("exit", () => {
      clearTimeout(timer);
      resolve(true);
    });
  });
}
