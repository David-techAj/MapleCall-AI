/**
 * screenshot.mjs — MapleCall AI
 * Takes a full-page screenshot of a local URL and saves it to
 * /temporary screenshots/screenshot-N[-label].png
 *
 * Usage:
 *   node screenshot.mjs http://localhost:3000
 *   node screenshot.mjs http://localhost:3000 hero
 *   node screenshot.mjs http://localhost:3000 pricing
 *
 * Requirements: npm install puppeteer
 */

import puppeteer from 'puppeteer';
import fs        from 'fs';
import path      from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Args ──────────────────────────────────────────────────────
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

// ── Output dir ────────────────────────────────────────────────
const outDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// ── Auto-increment filename ───────────────────────────────────
function nextFilename() {
  const existing = fs.readdirSync(outDir)
    .filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
    .map(f => parseInt(f.match(/screenshot-(\d+)/)?.[1] || '0', 10))
    .filter(n => !isNaN(n));

  const n = existing.length ? Math.max(...existing) + 1 : 1;
  const suffix = label ? `-${label}` : '';
  return path.join(outDir, `screenshot-${n}${suffix}.png`);
}

// ── Screenshot ────────────────────────────────────────────────
(async () => {
  console.log(`📸 Screenshotting: ${url}`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

  // Let fonts and animations settle
  await new Promise(r => setTimeout(r, 800));

  const file = nextFilename();
  await page.screenshot({ path: file, fullPage: true });
  await browser.close();

  console.log(`✅ Saved: ${file}`);
})();
