import { chromium } from 'playwright';

const PAGES = [
  '/',
  '/datasets',
  '/datasets/690818db3975124675a516cd',
  '/papers',
  '/dashboard',
  '/settings'
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();

  const traces = [];
  for (const path of PAGES) {
    const url = `http://localhost:5173${path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const trace = await page.evaluate(() => {
      const vw = window.innerWidth;
      const all = Array.from(document.querySelectorAll('body *'));
      // find elements with left > 0 and right > vw
      const offenders = all.filter(el => {
        const r = el.getBoundingClientRect();
        return (r.right > vw || r.left < 0) && !(el.tagName === 'HTML' || el.tagName === 'BODY');
      });
      const results = offenders.slice(0,50).map(el => {
        const path = [];
        let cur = el;
        while (cur && cur.tagName && cur.tagName !== 'HTML') {
          const cs = window.getComputedStyle(cur);
          const r = cur.getBoundingClientRect();
          path.push({ tag: cur.tagName, class: cur.className || null, id: cur.id || null, rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }, style: { display: cs.display, position: cs.position, transform: cs.transform, marginLeft: cs.marginLeft, left: cs.left } });
          cur = cur.parentElement;
        }
        return { snippet: el.outerHTML ? el.outerHTML.slice(0,200) : null, path };
      });
      return { vw, results };
    });
    // capture sidebar candidate (has border-r class from Sidebar component)
    const sidebarInfo = await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('*')).find(e => (e.className || '').toString().includes('border-r'));
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, class: el.className, rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) }, style: { display: cs.display, visibility: cs.visibility } };
    });
    trace.sidebar = sidebarInfo;
    traces.push({ url, trace });
    console.log(`Traced ${url}`);
  }

  console.log(JSON.stringify(traces, null, 2));
  await browser.close();
})();