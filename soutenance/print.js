// Imprime slides_full.html en PDF 1280x720 (et, en option, une capture PNG
// par transparent pour relecture).  node print.js <html> <pdf> [dossier_png]
// Avec "a4" en 3e argument : impression A4 portrait (notes d'oral).
const { chromium } = require('playwright');

(async () => {
  const [src, pdf, shots] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto('file://' + src, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  if (shots === 'a4') {
    await page.pdf({ path: pdf, format: 'A4', printBackground: true,
                     margin: { top: '16mm', bottom: '16mm', left: '16mm', right: '16mm' } });
    await browser.close();
    return;
  }
  await page.pdf({ path: pdf, width: '1280px', height: '720px',
                   printBackground: true, preferCSSPageSize: true });
  if (shots) {
    const slides = await page.$$('section.slide');
    for (let i = 0; i < slides.length; i++) {
      await slides[i].screenshot({ path: `${shots}/s${String(i).padStart(2, '0')}.png` });
    }
  }
  await browser.close();
})();
