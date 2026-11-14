import puppeteer from 'puppeteer-core';
import path from 'path';

async function testOfficeNudge() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  await page.evaluate(() => {
    const v = document.querySelector('section#top video');
    if (v) {
      v.src = './hero-pexels-office.mp4';
      v.style.objectPosition = '100% center';
      v.style.transform = 'scale(1.08) translate(3%, 0)';
      v.style.filter = 'brightness(0.72) contrast(1.15)';
      v.play();
    }
  });
  
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.resolve('comp_office_perfect.png') });
  await browser.close();
  console.log('Saved comp_office_perfect.png');
}

testOfficeNudge();

