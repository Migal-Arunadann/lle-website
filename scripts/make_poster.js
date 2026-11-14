import puppeteer from 'puppeteer-core';
import path from 'path';

async function makePoster() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#0f1013;">
        <video id="v" src="http://localhost:3000/hero-programming-dark.mp4" style="width:100%;height:100%;object-fit:cover;" muted></video>
      </body>
    </html>
  `;
  await page.setContent(html);
  await page.evaluate(() => {
    document.getElementById('v').currentTime = 2;
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve('public/hero-video-poster.jpg'), type: 'jpeg', quality: 90 });
  await browser.close();
  console.log('Saved public/hero-video-poster.jpg');
}

makePoster();

