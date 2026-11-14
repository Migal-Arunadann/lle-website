import puppeteer from 'puppeteer-core';
import path from 'path';

async function testMobile() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 390, height: 844, isMobile: true }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.resolve('hero_mobile.png') });
  await browser.close();
  console.log('Saved hero_mobile.png');
}

testMobile();

