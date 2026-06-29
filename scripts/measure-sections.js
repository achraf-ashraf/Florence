const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto('file:///home/z/my-project/download/florence-brochure.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const heights = await page.evaluate(() => {
    return [...document.querySelectorAll('section.page')].map((s, i) => {
      const r = s.getBoundingClientRect();
      const cs = s.scrollHeight;
      return { idx: i + 1, h: Math.round(r.height), sh: cs, overflow: cs - Math.round(r.height), title: s.querySelector('h2')?.textContent || s.querySelector('.cover-tagline')?.textContent?.slice(0,40) || 'cover' };
    });
  });
  console.log(JSON.stringify(heights, null, 2));
  await browser.close();
})();
