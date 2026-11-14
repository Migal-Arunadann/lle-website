import puppeteer from 'puppeteer-core';
import path from 'path';

async function captureFrame(videoFile, outFile, time = 2) {
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
  await page.evaluate((t) => {
    const v = document.getElementById('v');
    v.currentTime = t;
  }, time);
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.resolve(outFile) });
  await browser.close();
  console.log(`Captured ${videoFile} -> ${outFile}`);
}

async function run() {
  await captureFrame('hero-pexels-office.mp4', 'frame_office.png', 3);
  await captureFrame('hero-pexels-code.mp4', 'frame_code.png', 2);
  await captureFrame('hero-pexels-workspace.mp4', 'frame_workspace.png', 2);
}

run();

