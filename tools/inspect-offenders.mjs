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

  const results = [];
  for (const path of PAGES) {
    const url = `http://localhost:5173${path}`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const pageInfo = await page.evaluate(() => {
      const vw = window.innerWidth;
      const nodes = Array.from(document.querySelectorAll('*'));
      const offenders = nodes
        .map((el) => {
          const r = el.getBoundingClientRect ? el.getBoundingClientRect() : { left: 0, right: 0, top: 0, width: 0, height: 0 };
          return {
            tag: el.tagName.toLowerCase(),
            class: el.className || null,
            id: el.id || null,
            rect: { left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width), top: Math.round(r.top), height: Math.round(r.height) },
            styles: window.getComputedStyle(el) ? { display: window.getComputedStyle(el).display, position: window.getComputedStyle(el).position, marginLeft: window.getComputedStyle(el).marginLeft, marginRight: window.getComputedStyle(el).marginRight, paddingLeft: window.getComputedStyle(el).paddingLeft } : null,
            snippet: el.outerHTML ? el.outerHTML.slice(0, 240) : null
          };
        })
        .filter(n => n.rect.right > vw || n.rect.left < 0)
        .sort((a,b) => (b.rect.right - vw) - (a.rect.right - vw));

      // Also capture some targeted selectors for convenience
      const header = document.querySelector('header');
      const searchInput = document.querySelector('input[placeholder]');
      const actions = Array.from(document.querySelectorAll('.ml-6, .items-center.space-x-4'));

      return { vw, offenders: offenders.slice(0, 50), header: header ? { tag: header.tagName, class: header.className, rect: header.getBoundingClientRect() } : null, searchInput: searchInput ? { class: searchInput.className, rect: searchInput.getBoundingClientRect() } : null, actions: actions.map(a=>({class: a.className, rect: a.getBoundingClientRect()})) };
    });
    results.push({ url, pageInfo });
    console.log(`Inspected ${url}`);
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
})();