import puppeteer from 'puppeteer-core';
import path from 'path';

async function captureMulti(videoFile, prefix, times) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 720 }
  });
  const page = await browser.newPage();
  const html = `
    <!DOCTYPE html>
    <html>
      <body style="margin:0; background:#000;">
        <video id="v" src="http://localhost:3000/${videoFile}" style="width:100%;height:100%;object-fit:cover;" muted autoplay></video>
      </body>
    </html>
  `;
  await page.setContent(html);
  for (const t of times) {
    await page.evaluate((sec) => {
      const v = document.getElementById('v');
      v.currentTime = sec;
    }, t);
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.resolve(`${prefix}_${t}s.png`) });
  }
  await browser.close();
  console.log(`Captured ${prefix} frames`);
}

captureMulti('hero-responsive-devices.mp4', 'resp', [1, 7, 12]);

