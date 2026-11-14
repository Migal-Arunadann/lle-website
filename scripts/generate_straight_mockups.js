import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function toBase64(relPath) {
  const full = path.resolve(process.cwd(), relPath);
  const data = fs.readFileSync(full).toString('base64');
  const mime = relPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
  return `data:${mime};base64,${data}`;
}

async function generate() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1600, height: 1000, deviceScaleFactor: 1 });

  const outDir = path.resolve(process.cwd(), 'public/photos/portfolio');
  fs.mkdirSync(outDir, { recursive: true });

  const webStyles = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1600px;
      height: 1000px;
      background-color: #0b0c10;
      background-image: 
        radial-gradient(circle at 50% 40%, rgba(35, 42, 55, 0.95) 0%, rgba(13, 14, 18, 0.98) 75%),
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 100% 100%, 48px 48px, 48px 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      overflow: hidden;
    }
    .browser-window {
      width: 1520px;
      height: 755px;
      background: #14151a;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 
        0 35px 85px -15px rgba(0, 0, 0, 0.9),
        0 0 0 1px rgba(255, 255, 255, 0.08);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .browser-header {
      height: 45px;
      background: #1a1b22;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      padding: 0 18px;
      gap: 16px;
    }
    .traffic-lights {
      display: flex;
      gap: 8px;
    }
    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
    }
    .dot-red { background: #ff5f56; }
    .dot-yellow { background: #ffbd2e; }
    .dot-green { background: #27c93f; }
    .url-bar {
      flex: 1;
      max-width: 520px;
      margin: 0 auto;
      height: 28px;
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #9aa0a6;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 13px;
      letter-spacing: 0.02em;
    }
    .lock-icon {
      width: 12px;
      height: 12px;
      opacity: 0.65;
    }
    .browser-body {
      flex: 1;
      background: #000;
      overflow: hidden;
      position: relative;
    }
    .screenshot {
      width: 100%;
      height: 100%;
      object-fit: fill;
      display: block;
    }
  `;

  // 1. Needil Website
  console.log('Generating perfected needil-web-mockup.png ...');
  const needilWebImg = toBase64('photos/needil/website/1.png');
  await page.setContent(`
    <!DOCTYPE html><html><head><style>${webStyles}</style></head>
    <body>
      <div class="browser-window">
        <div class="browser-header">
          <div class="traffic-lights">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
          </div>
          <div class="url-bar">
            <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            needil.com
          </div>
          <div style="width: 48px;"></div>
        </div>
        <div class="browser-body">
          <img class="screenshot" src="${needilWebImg}" />
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'needil-web-mockup.png') });

  // 2. Expert Dental Care
  console.log('Generating perfected edc-web-mockup.png ...');
  const edcWebImg = toBase64('photos/edc/website/1 (2).png');
  await page.setContent(`
    <!DOCTYPE html><html><head><style>${webStyles}</style></head>
    <body>
      <div class="browser-window">
        <div class="browser-header">
          <div class="traffic-lights">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
          </div>
          <div class="url-bar">
            <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            expertdental.in
          </div>
          <div style="width: 48px;"></div>
        </div>
        <div class="browser-body" style="background: #fff;">
          <img class="screenshot" src="${edcWebImg}" />
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'edc-web-mockup.png') });

  // 3. Springfield Wellness Centre
  console.log('Generating perfected sfw-content-mockup.png ...');
  const sfwImg = toBase64('photos/sfw/blog/1.png');
  await page.setContent(`
    <!DOCTYPE html><html><head><style>${webStyles}</style></head>
    <body>
      <div class="browser-window">
        <div class="browser-header">
          <div class="traffic-lights">
            <div class="dot dot-red"></div>
            <div class="dot dot-yellow"></div>
            <div class="dot dot-green"></div>
          </div>
          <div class="url-bar">
            <svg class="lock-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            springfieldwellnesscentre.com
          </div>
          <div style="width: 48px;"></div>
        </div>
        <div class="browser-body" style="background: #fff;">
          <img class="screenshot" src="${sfwImg}" />
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'sfw-content-mockup.png') });

  // 4. Needil Application - Two Straight Phones side by side
  console.log('Generating perfected needil-app-mockup.png ...');
  const app1Img = toBase64('photos/needil/app/1.jpeg');
  const app3Img = toBase64('photos/needil/app/3.jpeg');
  await page.setContent(`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          width: 1600px;
          height: 1000px;
          background-color: #0b0c10;
          background-image: 
            radial-gradient(circle at 50% 40%, rgba(35, 42, 55, 0.95) 0%, rgba(13, 14, 18, 0.98) 75%),
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 100% 100%, 48px 48px, 48px 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
        }
        .phones-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 64px;
          width: 100%;
          height: 100%;
        }
        .phone-frame {
          width: 380px;
          height: 830px;
          background: #111216;
          border-radius: 44px;
          border: 4px solid #30333f;
          box-shadow: 
            0 35px 85px -15px rgba(0, 0, 0, 0.9),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            inset 0 0 0 3px #000;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }
        .island {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 108px;
          height: 26px;
          background: #000;
          border-radius: 20px;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
        }
        .camera-lens {
          width: 10px;
          height: 10px;
          background: #0f172a;
          border-radius: 50%;
          border: 1px solid #1e293b;
        }
        .phone-screen {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
      </style>
    </head>
    <body>
      <div class="phones-container">
        <div class="phone-frame">
          <div class="island">
            <div class="camera-lens"></div>
            <div style="width: 8px; height: 8px; background: #052e16; border-radius: 50%; opacity: 0.6;"></div>
          </div>
          <img class="phone-screen" src="${app1Img}" />
        </div>
        <div class="phone-frame">
          <div class="island">
            <div class="camera-lens"></div>
            <div style="width: 8px; height: 8px; background: #052e16; border-radius: 50%; opacity: 0.6;"></div>
          </div>
          <img class="phone-screen" src="${app3Img}" />
        </div>
      </div>
    </body>
    </html>
  `);
  await page.screenshot({ path: path.join(outDir, 'needil-app-mockup.png') });

  // Mirror to photos/portfolio as well
  const rootDir = path.resolve(process.cwd(), 'photos/portfolio');
  fs.mkdirSync(rootDir, { recursive: true });
  for (const f of ['needil-web-mockup.png', 'edc-web-mockup.png', 'sfw-content-mockup.png', 'needil-app-mockup.png']) {
    fs.copyFileSync(path.join(outDir, f), path.join(rootDir, f));
  }
  console.log('All 4 straight mockups regenerated and mirrored!');
  await browser.close();
}

generate().catch(console.error);
