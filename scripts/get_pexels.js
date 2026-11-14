import puppeteer from 'puppeteer-core';
import fs from 'fs';

async function getPexelsVideo() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 }
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  console.log('Navigating to pexels...');
  await page.goto('https://www.pexels.com/search/videos/web%20developer%20office/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  
  await new Promise(r => setTimeout(r, 4000));
  
  const videoLinks = await page.evaluate(() => {
    const vids = Array.from(document.querySelectorAll('video source, video'));
    return vids.map(v => v.src).filter(Boolean);
  });
  
  console.log('Found video elements:', videoLinks);
  
  // Also look for articles/links to videos
  const cardLinks = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/video/"]'));
    return links.map(a => a.href).slice(0, 5);
  });
  console.log('Card links:', cardLinks);
  
  if (cardLinks.length > 0) {
    console.log('Visiting first card link:', cardLinks[0]);
    await page.goto(cardLinks[0], { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    
    const singleVids = await page.evaluate(() => {
      const vids = Array.from(document.querySelectorAll('video source, video, a[href*="download"]'));
      return vids.map(v => v.src || v.href).filter(Boolean);
    });
    console.log('Single video sources:', singleVids);
  }
  
  await browser.close();
}

getPexelsVideo().catch(e => console.error(e));

