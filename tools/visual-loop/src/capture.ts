import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { chromium, type Browser, type Page } from "playwright";

export type Theme = "light" | "dark";

export interface Viewport {
  name: string;
  width: number;
  height: number;
}

export interface CaptureOptions {
  baseUrl: string;
  route: string;
  outDir: string;
  viewports: Viewport[];
  themes: Theme[];
}

export interface ScreenshotEntry {
  kind: "viewport" | "full-page" | "hover";
  viewport: string;
  theme: Theme;
  width: number;
  height: number;
  path: string;
}

export interface CaptureManifest {
  baseUrl: string;
  route: string;
  capturedAt: string;
  screenshots: ScreenshotEntry[];
}

export const VIEWPORT_PRESETS: Record<string, Viewport> = {
  mobile: { name: "mobile", width: 390, height: 844 },
  tablet: { name: "tablet", width: 820, height: 1180 },
  desktop: { name: "desktop", width: 1440, height: 900 },
};

const HOVER_SELECTORS = [
  "a[href]",
  "button:not([disabled])",
  "[role=button]:not([aria-disabled=true])",
];

export async function capture(opts: CaptureOptions): Promise<CaptureManifest> {
  await mkdir(opts.outDir, { recursive: true });
  const targetUrl = new URL(opts.route, opts.baseUrl).toString();

  const browser = await chromium.launch();
  try {
    const tasks: Promise<ScreenshotEntry[]>[] = [];
    for (const vp of opts.viewports) {
      for (const theme of opts.themes) {
        tasks.push(captureViewport(browser, targetUrl, vp, theme, opts.outDir));
      }
    }
    const desktop = opts.viewports.find((v) => v.name === "desktop");
    const desktopTheme: Theme = opts.themes.includes("light") ? "light" : (opts.themes[0] ?? "light");
    if (desktop) {
      tasks.push(captureFullPage(browser, targetUrl, desktop, desktopTheme, opts.outDir));
      tasks.push(captureHover(browser, targetUrl, desktop, desktopTheme, opts.outDir));
    }

    const results = await Promise.all(tasks);
    const screenshots = results.flat();

    return {
      baseUrl: opts.baseUrl,
      route: opts.route,
      capturedAt: new Date().toISOString(),
      screenshots,
    };
  } finally {
    await browser.close();
  }
}

async function captureViewport(
  browser: Browser,
  url: string,
  vp: Viewport,
  theme: Theme,
  outDir: string,
): Promise<ScreenshotEntry[]> {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    colorScheme: theme,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await gotoStable(page, url);
    const file = join(outDir, `${vp.name}-${theme}.png`);
    await page.screenshot({ path: file, fullPage: false });
    return [{ kind: "viewport", viewport: vp.name, theme, width: vp.width, height: vp.height, path: file }];
  } finally {
    await context.close();
  }
}

async function captureFullPage(
  browser: Browser,
  url: string,
  vp: Viewport,
  theme: Theme,
  outDir: string,
): Promise<ScreenshotEntry[]> {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    colorScheme: theme,
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  try {
    await gotoStable(page, url);
    await scrollThroughPage(page);
    await page.evaluate(() => window.scrollTo(0, 0));
    const file = join(outDir, `${vp.name}-${theme}-fullpage.png`);
    await page.screenshot({ path: file, fullPage: true });
    return [{ kind: "full-page", viewport: vp.name, theme, width: vp.width, height: vp.height, path: file }];
  } finally {
    await context.close();
  }
}

async function captureHover(
  browser: Browser,
  url: string,
  vp: Viewport,
  theme: Theme,
  outDir: string,
): Promise<ScreenshotEntry[]> {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    colorScheme: theme,
    deviceScaleFactor: 2,
    reducedMotion: "reduce",
    hasTouch: false,
  });
  const page = await context.newPage();
  try {
    await gotoStable(page, url);
    const target = await firstVisibleHoverable(page);
    if (target) {
      await target.scrollIntoViewIfNeeded();
      await target.hover();
      await page.waitForTimeout(250);
    }
    const file = join(outDir, `${vp.name}-${theme}-hover.png`);
    await page.screenshot({ path: file, fullPage: false });
    return [{ kind: "hover", viewport: vp.name, theme, width: vp.width, height: vp.height, path: file }];
  } finally {
    await context.close();
  }
}

async function gotoStable(page: Page, url: string): Promise<void> {
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  await page.evaluate(() =>
    document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(),
  );
}

async function scrollThroughPage(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    const total = document.documentElement.scrollHeight;
    for (let y = 0; y < total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => requestAnimationFrame(() => r(null)));
    }
  });
}

async function firstVisibleHoverable(page: Page) {
  for (const sel of HOVER_SELECTORS) {
    const loc = page.locator(sel).first();
    if ((await loc.count()) === 0) continue;
    if (await loc.isVisible()) return loc;
  }
  return null;
}

