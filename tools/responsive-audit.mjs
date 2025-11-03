import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const FRONTEND_BASE = process.env.FRONTEND_BASE || 'http://localhost:5173';
const BACKEND_BASE = process.env.BACKEND_BASE || 'http://localhost:4000';

const pages = ['/', '/datasets', '/papers', '/dashboard', '/settings'];
const viewports = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 }
];

const outDir = path.resolve('./tools/screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const report = [];

const getSafeName = (p) => p === '/' ? 'home' : p.replace(/\//g, '-').replace(/^-/, '');

const auditPage = async (page, url, vp, screenshotPath) => {
  const issues = { horizontalScroll: false, oversizedElements: [], consoleErrors: [], pageErrors: [] };

  page.on('console', msg => {
    if (msg.type() === 'error') issues.consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => issues.pageErrors.push(err.message));

  const metrics = await page.evaluate(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const docWidth = document.documentElement.scrollWidth;
    const docHeight = document.documentElement.scrollHeight;

    // find oversized elements
    const els = Array.from(document.querySelectorAll('body *'));
    const offenders = [];
    for (const el of els) {
      try {
        const r = el.getBoundingClientRect();
        if (r.width > w + 1 || r.right > w + 1 || r.left < -1) {
          offenders.push({
            tag: el.tagName.toLowerCase(),
            class: el.className ? el.className.toString().slice(0,200) : '',
            id: el.id || null,
            width: Math.round(r.width),
            left: Math.round(r.left),
            right: Math.round(r.right)
          });
        }
      } catch(e) {
        // ignore
      }
    }
    return { w, h, docWidth, docHeight, offenders: offenders.slice(0,20) };
  });

  if (metrics.docWidth > vp.width + 1) issues.horizontalScroll = true;
  issues.oversizedElements = metrics.offenders;

  return { url, viewport: vp, screenshot: screenshotPath, issues, metrics };
};

(async () => {
  // try to fetch first dataset id to include details page
  try {
    const res = await fetch(`${BACKEND_BASE}/api/datasets`);
    const list = await res.json();
    if (Array.isArray(list) && list.length) {
      const datasetId = list[0]._id || list[0].id || null;
      if (datasetId) pages.splice(2, 0, `/datasets/${datasetId}`);
    }
  } catch (e) {
    console.warn('Could not fetch datasets from backend:', e.message);
  }

  const browser = await chromium.launch();
  const context = await browser.newContext();

  for (const vp of viewports) {
    for (const p of pages) {
      const url = `${FRONTEND_BASE.replace(/\/$/, '')}${p}`;
      const page = await context.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });
      let screenshotPath = '';
      try {
        const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        const status = res && res.status ? res.status() : 'no-status';
        const safeName = getSafeName(p);
        screenshotPath = path.join(outDir, `${safeName}_${vp.name}_${vp.width}x${vp.height}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        const result = await auditPage(page, url, vp, screenshotPath);
        report.push({ status, ...result });
        console.log(`Audited ${url} at ${vp.name} -> issues:`, result.issues.horizontalScroll ? 'horizontalScroll' : (result.issues.oversizedElements.length ? 'oversizedElements' : 'ok'));
      } catch (err) {
        console.error(`Error auditing ${url} at ${vp.name}:`, err.message);
        report.push({ status: 'error', url, viewport: vp, error: err.message });
      } finally {
        await page.close();
      }
    }
  }

  await browser.close();
  const reportPath = path.join(outDir, 'responsive-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log('Audit complete. Report:', reportPath);
})();
