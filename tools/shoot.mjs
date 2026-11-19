// Takes SUNLINE's screenshots: a fresh browser context per shot, the demo save imported through the app's own
// Import input, then a hash route. Usage: node tools/shoot.mjs <app-url> <out-dir> <demo-file> [shot names...]
// Playwright is loaded from the folder named by the PW_NODE_MODULES environment variable.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const [appUrl, outDir, demoFile, ...only] = process.argv.slice(2);
if (!appUrl || !outDir || !demoFile || !process.env.PW_NODE_MODULES) {
  console.error("usage: PW_NODE_MODULES=<dir> node tools/shoot.mjs <app-url> <out-dir> <demo-file> [shots...]");
  process.exit(2);
}
const require = createRequire(join(resolve(process.env.PW_NODE_MODULES), "noop.js"));
const { chromium } = require("playwright");

const PMA = 28; // Positive Mental Attitude
const PARADISE_LOST = 3; // a story trophy the demo save leaves unearned

const SHOTS = {
  "1-checklist-guide.jpg": { hash: `#/checklist?f=all&t=${PMA}`, waitToastGone: true },
  "2-roadmap.jpg": { hash: "#/roadmap", spoilersShown: true, waitToastGone: true },
  "2-checklist-missable.jpg": { hash: `#/checklist?f=missable&t=${PMA}`, waitToastGone: true },
  "3-spoilers-save.jpg": { hash: `#/save?t=${PARADISE_LOST}` },
};

const MAX_BYTES = 210 * 1024;

async function shoot(browser, name, spec) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("pageerror", (err) => console.error(`[${name}] page error: ${err.message}`));
  await page.goto(`${appUrl.replace(/#.*$/, "")}#/checklist`);
  await page.waitForSelector('body[data-ready="1"]');
  await page.setInputFiles("#import-progress", resolve(demoFile));
  await page.waitForSelector(".toast.show");
  await page.evaluate((hash) => {
    location.hash = hash;
  }, spec.hash);
  await page.waitForFunction((route) => document.body.dataset.route === route, spec.hash.slice(2).split("?")[0]);
  if (spec.spoilersShown) await page.click("#spoiler-switch");
  if (spec.waitToastGone) {
    await page.waitForSelector(".toast:not(.show)", { timeout: 15000 });
    await page.waitForTimeout(350);
  } else {
    await page.waitForTimeout(250);
  }
  let quality = 92;
  let buffer = await page.screenshot({ type: "jpeg", quality });
  while (buffer.length > MAX_BYTES && quality > 85) {
    quality -= 1;
    buffer = await page.screenshot({ type: "jpeg", quality });
  }
  writeFileSync(join(outDir, name), buffer);
  console.log(`${name}: ${buffer.length} bytes at q${quality}${buffer.length > MAX_BYTES ? " (OVER 210 KiB)" : ""}`);
  await context.close();
}

mkdirSync(outDir, { recursive: true });
// Grayscale text antialiasing keeps colour fringes (and JPEG bytes) out of the small type.
const browser = await chromium.launch({ args: ["--disable-lcd-text"] });
try {
  for (const [name, spec] of Object.entries(SHOTS)) {
    if (only.length ? only.includes(name) : name !== "2-checklist-missable.jpg") await shoot(browser, name, spec);
  }
} finally {
  await browser.close();
}
