import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,1080'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080, deviceScaleFactor: 2 });

  console.log('Navigating to http://localhost:3000/#work ...');
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });

  const workEl = await page.$('#work');
  if (!workEl) {
    console.error('Could not find #work section!');
    await browser.close();
    return;
  }

  const box = await workEl.boundingBox();
  console.log('Work section bounding box:', box);

  // Scroll down step by step to trigger intersection observers
  for (let y = 0; y <= box.y + box.height; y += 400) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await new Promise((r) => setTimeout(r, 100));
  }

  // Scroll back to the top of #work
  await page.evaluate((top) => window.scrollTo(0, top - 80), box.y);
  await new Promise((r) => setTimeout(r, 1200));

  // Take screenshot of the #work element itself
  await workEl.screenshot({
    path: path.resolve(process.cwd(), 'work_section.png'),
  });
  console.log('Saved work_section.png');

  // Also take viewport screenshots in parts for high detail examination
  await page.evaluate((top) => window.scrollTo(0, top - 60), box.y);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve(process.cwd(), 'work_part1.png') });
  console.log('Saved work_part1.png');

  await page.evaluate((top) => window.scrollTo(0, top + 650), box.y);
  await new Promise((r) => setTimeout(r, 400));
  await page.screenshot({ path: path.resolve(process.cwd(), 'work_part2.png') });
  console.log('Saved work_part2.png');

  await browser.close();
  console.log('Done!');
}

capture().catch((err) => {
  console.error(err);
  process.exit(1);
});
