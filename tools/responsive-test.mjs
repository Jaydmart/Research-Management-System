import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const FRONTEND_BASE = process.env.FRONTEND_BASE || 'http://localhost:5173';
const BACKEND_BASE = process.env.BACKEND_BASE || 'http://localhost:4000';

const pages = [
  '/',
  '/datasets',
  '/papers',
  '/dashboard',
  '/settings'
];

const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 }
];

const outDir = path.resolve('./tools/screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Try to fetch datasets to get a real dataset id for detail page
let datasetId = null;
try {
  const res = await fetch(`${BACKEND_BASE}/api/datasets`);
  const list = await res.json();
  if (Array.isArray(list) && list.length) datasetId = list[0]._id || list[0].id || null;
} catch (e) {
  console.warn('Could not fetch datasets from backend:', e.message);
}

if (datasetId) pages.splice(2, 0, `/datasets/${datasetId}`);

const browser = await chromium.launch();
const context = await browser.newContext();

for (const vp of viewports) {
  for (const p of pages) {
    const url = `${FRONTEND_BASE.replace(/\/$/, '')}${p}`;
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });
    try {
      console.log(`Navigating to ${url} at ${vp.name} (${vp.width}x${vp.height})`);
      const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      const status = res && res.status ? res.status() : 'no-status';
      console.log(`Status: ${status}`);
      const safeName = p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-/, '');
      const filename = path.join(outDir, `${safeName}_${vp.name}_${vp.width}x${vp.height}.png`);
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`Saved screenshot: ${filename}`);
    } catch (err) {
      console.error(`Failed to capture ${url} at ${vp.name}:`, err.message);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
console.log('Responsive screenshot run complete. Files in:', outDir);
