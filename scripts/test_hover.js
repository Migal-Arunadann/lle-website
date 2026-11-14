import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testHover() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  const workEl = await page.$('#work');
  const box = await workEl.boundingBox();

  // Scroll to work section
  await page.evaluate((top) => window.scrollTo(0, top - 60), box.y);
  await new Promise((r) => setTimeout(r, 600));

  // Hover over the first card
  const firstCard = await page.$('#work a');
  if (firstCard) {
    await firstCard.hover();
    await new Promise((r) => setTimeout(r, 500));
  }

  await page.screenshot({ path: path.resolve(process.cwd(), 'work_hover.png') });
  console.log('Saved work_hover.png');
  await browser.close();
}

testHover().catch(console.error);

