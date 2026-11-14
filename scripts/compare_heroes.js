import puppeteer from 'puppeteer-core';
import path from 'path';

async function testVideoScale(videoSrc, scaleClass, styleObj, outFile) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1920, height: 1080 }
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  // Update video src and styles dynamically in the page
  await page.evaluate(({ src, style }) => {
    const v = document.querySelector('section#top video');
    if (v) {
      v.src = src;
      Object.assign(v.style, style);
      v.play();
    }
  }, { src: videoSrc, style: styleObj });
  
  await new Promise(r => setTimeout(r, 2200));
  await page.screenshot({ path: path.resolve(outFile) });
  await browser.close();
  console.log(`Saved ${outFile}`);
}

async function run() {
  await testVideoScale(
    './hero-programming-dark.mp4',
    '',
    { transform: 'scale(1.35)', transformOrigin: '90% 45%' },
    'comp_prog_shifted.png'
  );
  await testVideoScale(
    './hero-video-agency.mp4',
    '',
    { transform: 'scale(1.0)', transformOrigin: 'center' },
    'comp_agency_matrix.png'
  );
}

run();

