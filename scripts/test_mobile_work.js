import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  const workEl = await page.$('#work');
  if (!workEl) return;

  const box = await workEl.boundingBox();
  for (let y = 0; y <= box.y + box.height; y += 500) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise((r) => setTimeout(r, 100));
  }

  await page.evaluate((top) => window.scrollTo(0, top), box.y);
  await new Promise((r) => setTimeout(r, 1000));

  await page.screenshot({ path: path.resolve(process.cwd(), 'work_mobile.png') });
  console.log('Saved work_mobile.png');
  await browser.close();
}

testMobile().catch(console.error);

