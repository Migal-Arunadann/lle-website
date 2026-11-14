import puppeteer from 'puppeteer-core';
import path from 'path';

async function captureFrame(videoFile, outFile) {
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
        <video id="v" src="http://localhost:3000/${videoFile}" style="width:100%;height:100%;object-fit:cover;" autoplay muted playsinline></video>
      </body>
    </html>
  `;
  await page.setContent(html);
  // wait 2 seconds for video to play
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.resolve(outFile) });
  await browser.close();
  console.log(`Captured frame from ${videoFile} to ${outFile}`);
}

async function run() {
  await captureFrame('hero-video-1.mp4', 'frame_k72.png');
  await captureFrame('hero-video-solodev.mp4', 'frame_solodev.png');
  await captureFrame('hero-video-agency.mp4', 'frame_agency.png');
}

run();

