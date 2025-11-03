import { chromium } from 'playwright';
(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const rootFlex = document.querySelector('.flex');
    const getStyle = (el) => {
      const cs = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        width: el.clientWidth,
        rect: el.getBoundingClientRect ? el.getBoundingClientRect() : null,
        marginLeft: cs.marginLeft,
        marginRight: cs.marginRight,
        paddingLeft: cs.paddingLeft,
        transform: cs.transform
      };
    };
    return { html: getStyle(html), body: getStyle(body), rootFlex: rootFlex ? getStyle(rootFlex) : null };
  });
  console.log(JSON.stringify(info, null, 2));
  await browser.close();
})();