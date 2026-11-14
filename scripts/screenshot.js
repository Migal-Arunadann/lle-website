import puppeteer from 'puppeteer-core';
import path from 'path';

const outPath = process.argv[2] || 'screenshot.png';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  // Wait a bit for Framer motion and scramble text to render
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.resolve(outPath), fullPage: false });
  await browser.close();
  console.log(`Saved screenshot to ${outPath}`);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

