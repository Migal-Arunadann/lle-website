import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

async function renderMockup(imageSrc, title, tag, outFile, type = 'laptop') {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1200, height: 750, deviceScaleFactor: 2 }
  });
  const page = await browser.newPage();

  // Convert image to base64 for reliable local rendering
  const imgData = fs.readFileSync(path.resolve(imageSrc)).toString('base64');
  const ext = imageSrc.endsWith('.png') ? 'png' : 'jpeg';
  const dataUrl = `data:image/${ext};base64,${imgData}`;

  let screenContent = '';
  if (type === 'phone') {
    screenContent = `
      <div class="phone-container">
        <div class="phone-frame">
          <div class="notch"></div>
          <img src="${dataUrl}" class="screen-img phone-fit" />
        </div>
      </div>
    `;
  } else if (type === 'tablet') {
    screenContent = `
      <div class="tablet-container">
        <div class="tablet-frame">
          <img src="${dataUrl}" class="screen-img tablet-fit" />
        </div>
      </div>
    `;
  } else {
    // Display / browser mockup
    screenContent = `
      <div class="display-container">
        <div class="display-frame">
          <div class="browser-header">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
            <span class="url-bar">${tag}</span>
          </div>
          <div class="browser-viewport">
            <img src="${dataUrl}" class="screen-img" />
          </div>
        </div>
      </div>
    `;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            width: 1200px;
            height: 750px;
            background: radial-gradient(circle at 50% 40%, #1e222a 0%, #0f1013 75%, #08090a 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            perspective: 1400px;
          }
          
          /* Ambient studio lighting */
          .glow {
            position: absolute;
            width: 700px;
            height: 400px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 77, 46, 0.08) 0%, rgba(62, 230, 193, 0.04) 50%, transparent 70%);
            filter: blur(60px);
            top: 20%;
            left: 20%;
            pointer-events: none;
          }

          /* Display / Monitor */
          .display-container {
            transform: rotateX(8deg) rotateY(-12deg) rotateZ(2deg);
            transform-style: preserve-3d;
            box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.8), 0 20px 40px -10px rgba(0,0,0,0.6);
            border-radius: 14px;
            transition: all 0.5s ease;
          }
          .display-frame {
            width: 960px;
            height: 580px;
            background: #15171c;
            border: 1px solid rgba(255, 255, 255, 0.12);
            border-radius: 14px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
          }
          .browser-header {
            height: 38px;
            background: #1a1d24;
            display: flex;
            align-items: center;
            padding: 0 16px;
            gap: 8px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }
          .dot { width: 10px; height: 10px; border-radius: 50%; }
          .dot.red { background: #ff5f56; }
          .dot.yellow { background: #ffbd2e; }
          .dot.green { background: #27c93f; }
          .url-bar {
            margin-left: 12px;
            background: #0f1013;
            color: #9ba1ac;
            font-size: 11px;
            font-family: monospace;
            padding: 4px 14px;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.05);
            letter-spacing: 0.05em;
          }
          .browser-viewport {
            flex: 1;
            overflow: hidden;
            background: #ffffff;
            position: relative;
          }
          .screen-img {
            width: 100%;
            height: auto;
            display: block;
          }

          /* Tablet */
          .tablet-container {
            transform: rotateX(18deg) rotateY(-14deg) rotateZ(3deg);
            box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.85);
            border-radius: 28px;
          }
          .tablet-frame {
            width: 840px;
            height: 560px;
            background: #1e2229;
            border: 3px solid #2b303a;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 0 0 2px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.1);
          }
          .tablet-fit {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top center;
          }

          /* Phone */
          .phone-container {
            display: flex;
            align-items: center;
            justify-content: center;
            transform: rotateX(10deg) rotateY(-15deg) rotateZ(3deg);
          }
          .phone-frame {
            width: 380px;
            height: 640px;
            background: #1a1d24;
            border: 4px solid #2d3340;
            border-radius: 44px;
            overflow: hidden;
            position: relative;
            box-shadow: 0 35px 70px -10px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255,255,255,0.1);
          }
          .notch {
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 110px;
            height: 22px;
            background: #000;
            border-radius: 12px;
            z-index: 10;
          }
          .phone-fit {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        </style>
      </head>
      <body>
        <div class="glow"></div>
        ${screenContent}
      </body>
    </html>
  `;

  await page.setContent(html);
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.resolve(outFile) });
  await browser.close();
  console.log(`Rendered mockup -> ${outFile}`);
}

async function run() {
  await renderMockup('photos/needil/website/1.png', 'Needil', 'https://needil.com', 'test_mockup_needil.png', 'display');
  await renderMockup('photos/needil/app/1.jpeg', 'Needil App', 'Needil Mobile', 'test_mockup_app.png', 'phone');
}

run();

