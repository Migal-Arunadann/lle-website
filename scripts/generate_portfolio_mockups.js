import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

function toBase64(filePath) {
  const buf = fs.readFileSync(path.resolve(filePath));
  const ext = filePath.endsWith('.png') ? 'png' : 'jpeg';
  return `data:image/${ext};base64,${buf.toString('base64')}`;
}

async function renderMockup({ html, outFile, width = 1400, height = 875 }) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width, height, deviceScaleFactor: 2 }
  });
  const page = await browser.newPage();
  await page.setContent(html);
  await new Promise(r => setTimeout(r, 600));
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  await page.screenshot({ path: path.resolve(outFile), type: 'png' });
  await browser.close();
  console.log(`Rendered: ${outFile}`);
}

async function run() {
  const needilWeb = toBase64('photos/needil/website/1.png');
  const edcWeb = toBase64('photos/edc/website/1 (2).png');
  const edcBlog = toBase64('photos/edc/blogs/1.png');
  const sfwBlog = toBase64('photos/sfw/blog/1.png');
  const needilApp1 = toBase64('photos/needil/app/1.jpeg');
  const needilApp2 = toBase64('photos/needil/app/3.jpeg');

  // Common CSS for dark studio
  const baseCss = `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1400px;
      height: 875px;
      background: radial-gradient(circle at 50% 45%, #181b22 0%, #0d0e12 65%, #070809 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      perspective: 1500px;
    }
    .grid-lines {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }
    .glow {
      position: absolute;
      width: 800px;
      height: 500px;
      border-radius: 50%;
      filter: blur(80px);
      pointer-events: none;
    }
  `;

  // 1. Needil Website Mockup (Display)
  await renderMockup({
    outFile: 'public/photos/portfolio/needil-web-mockup.png',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${baseCss}
            .glow {
              background: radial-gradient(circle, rgba(255, 77, 46, 0.12) 0%, rgba(62, 230, 193, 0.06) 50%, transparent 70%);
              top: 15%;
              left: 20%;
            }
            .display-wrap {
              transform: rotateX(8deg) rotateY(-13deg) rotateZ(2deg);
              box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.9), 0 20px 40px -10px rgba(0, 0, 0, 0.7);
              border-radius: 14px;
            }
            .display-frame {
              width: 1080px;
              height: 640px;
              background: #14161c;
              border: 1px solid rgba(255, 255, 255, 0.14);
              border-radius: 14px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .browser-header {
              height: 40px;
              background: #1a1d24;
              display: flex;
              align-items: center;
              padding: 0 16px;
              gap: 8px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            }
            .dot { width: 10px; height: 10px; border-radius: 50%; }
            .dot.red { background: #ff5f56; }
            .dot.yellow { background: #ffbd2e; }
            .dot.green { background: #27c93f; }
            .url-bar {
              margin-left: 14px;
              background: #0f1013;
              color: #9ba1ac;
              font-size: 11px;
              font-family: monospace;
              padding: 4px 14px;
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.06);
            }
            .viewport {
              flex: 1;
              background: #fff;
              overflow: hidden;
            }
            .viewport img {
              width: 100%;
              height: auto;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="grid-lines"></div>
          <div class="glow"></div>
          <div class="display-wrap">
            <div class="display-frame">
              <div class="browser-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="url-bar">https://needil.com — Clinical Healthcare Platform</span>
              </div>
              <div class="viewport">
                <img src="${needilWeb}" />
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  });

  // 2. Expert Dental Care Website Mockup
  await renderMockup({
    outFile: 'public/photos/portfolio/edc-web-mockup.png',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${baseCss}
            .glow {
              background: radial-gradient(circle, rgba(62, 230, 193, 0.12) 0%, rgba(30, 100, 150, 0.06) 50%, transparent 70%);
              top: 20%;
              left: 25%;
            }
            .display-wrap {
              transform: rotateX(9deg) rotateY(12deg) rotateZ(-2deg);
              box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.9), 0 20px 40px -10px rgba(0, 0, 0, 0.7);
              border-radius: 14px;
            }
            .display-frame {
              width: 1080px;
              height: 640px;
              background: #14161c;
              border: 1px solid rgba(255, 255, 255, 0.14);
              border-radius: 14px;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .browser-header {
              height: 40px;
              background: #1a1d24;
              display: flex;
              align-items: center;
              padding: 0 16px;
              gap: 8px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.07);
            }
            .dot { width: 10px; height: 10px; border-radius: 50%; }
            .dot.red { background: #ff5f56; }
            .dot.yellow { background: #ffbd2e; }
            .dot.green { background: #27c93f; }
            .url-bar {
              margin-left: 14px;
              background: #0f1013;
              color: #9ba1ac;
              font-size: 11px;
              font-family: monospace;
              padding: 4px 14px;
              border-radius: 6px;
              border: 1px solid rgba(255, 255, 255, 0.06);
            }
            .viewport {
              flex: 1;
              background: #fff;
              overflow: hidden;
            }
            .viewport img {
              width: 100%;
              height: auto;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="grid-lines"></div>
          <div class="glow"></div>
          <div class="display-wrap">
            <div class="display-frame">
              <div class="browser-header">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <span class="url-bar">https://expertdentalcare.in — Clinic Portal</span>
              </div>
              <div class="viewport">
                <img src="${edcWeb}" />
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  });

  // 3. Expert Dental Care Medical Content Mockup (Tablet / Editorial)
  await renderMockup({
    outFile: 'public/photos/portfolio/edc-content-mockup.png',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${baseCss}
            .glow {
              background: radial-gradient(circle, rgba(255, 182, 60, 0.11) 0%, rgba(255, 77, 46, 0.06) 50%, transparent 70%);
              top: 20%;
              left: 20%;
            }
            .tablet-wrap {
              transform: rotateX(16deg) rotateY(-11deg) rotateZ(2deg);
              box-shadow: 0 40px 85px -15px rgba(0, 0, 0, 0.92);
              border-radius: 26px;
            }
            .tablet-frame {
              width: 980px;
              height: 630px;
              background: #171920;
              border: 3px solid #282d38;
              border-radius: 26px;
              overflow: hidden;
              box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
            }
            .tablet-frame img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: top center;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="grid-lines"></div>
          <div class="glow"></div>
          <div class="tablet-wrap">
            <div class="tablet-frame">
              <img src="${edcBlog}" />
            </div>
          </div>
        </body>
      </html>
    `
  });

  // 4. Springfield Wellness Centre Medical Content (Tablet / Case Study)
  await renderMockup({
    outFile: 'public/photos/portfolio/sfw-content-mockup.png',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            ${baseCss}
            .glow {
              background: radial-gradient(circle, rgba(62, 230, 193, 0.15) 0%, rgba(40, 150, 180, 0.06) 50%, transparent 70%);
              top: 15%;
              left: 25%;
            }
            .tablet-wrap {
              transform: rotateX(15deg) rotateY(12deg) rotateZ(-2deg);
              box-shadow: 0 40px 85px -15px rgba(0, 0, 0, 0.92);
              border-radius: 26px;
            }
            .tablet-frame {
              width: 1000px;
              height: 640px;
              background: #171920;
              border: 3px solid #272d38;
              border-radius: 26px;
              overflow: hidden;
              box-shadow: 0 0 30px rgba(62, 230, 193, 0.12), inset 0 0 0 1px rgba(255,255,255,0.08);
            }
            .tablet-frame img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              object-position: top center;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="grid-lines"></div>
          <div class="glow"></div>
          <div class="tablet-wrap">
            <div class="tablet-frame">
              <img src="${sfwBlog}" />
            </div>
          </div>
        </body>
      </html>
    `
  });

  // 5. Needil App Mockup (Dual Floating Smartphones in 3D studio, matching temp_thumb_app.png!)
  await renderMockup({
    outFile: 'public/photos/portfolio/needil-app-mockup.png',
    width: 1500,
    height: 900,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body {
              width: 1500px;
              height: 900px;
              background: radial-gradient(circle at 50% 45%, #181c24 0%, #0c0e12 65%, #060708 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              perspective: 1600px;
            }
            .grid-lines {
              position: absolute;
              inset: 0;
              background-image:
                linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
              background-size: 60px 60px;
              pointer-events: none;
            }
            .glow {
              position: absolute;
              width: 900px;
              height: 550px;
              border-radius: 50%;
              background: radial-gradient(circle, rgba(62, 230, 193, 0.14) 0%, rgba(255, 77, 46, 0.08) 50%, transparent 70%);
              filter: blur(90px);
              top: 20%;
              left: 20%;
              pointer-events: none;
            }
            .phones-stage {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 70px;
              position: relative;
            }
            .phone-card {
              position: relative;
              box-shadow: 0 45px 90px -15px rgba(0, 0, 0, 0.95), 0 0 35px rgba(62, 230, 193, 0.12);
              border-radius: 46px;
            }
            .phone-card.left {
              transform: rotateX(12deg) rotateY(-18deg) rotateZ(3deg) translateY(-20px);
            }
            .phone-card.right {
              transform: rotateX(12deg) rotateY(-8deg) rotateZ(-3deg) translateY(20px);
            }
            .phone-frame {
              width: 380px;
              height: 690px;
              background: #14171d;
              border: 5px solid #282f3c;
              border-radius: 46px;
              overflow: hidden;
              position: relative;
              box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12);
            }
            .notch {
              position: absolute;
              top: 12px;
              left: 50%;
              transform: translateX(-50%);
              width: 110px;
              height: 24px;
              background: #000;
              border-radius: 12px;
              z-index: 20;
            }
            .phone-frame img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              display: block;
            }
          </style>
        </head>
        <body>
          <div class="grid-lines"></div>
          <div class="glow"></div>
          <div class="phones-stage">
            <div class="phone-card left">
              <div class="phone-frame">
                <div class="notch"></div>
                <img src="${needilApp1}" />
              </div>
            </div>
            <div class="phone-card right">
              <div class="phone-frame">
                <div class="notch"></div>
                <img src="${needilApp2}" />
              </div>
            </div>
          </div>
        </body>
      </html>
    `
  });
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});

