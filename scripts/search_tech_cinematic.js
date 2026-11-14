import puppeteer from 'puppeteer-core';

async function searchPexels(query) {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 800 }
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  
  const url = `https://www.pexels.com/search/videos/${encodeURIComponent(query)}/`;
  console.log('Searching Pexels:', query);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3500));
  
  const videoIds = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a[href*="/video/"]'));
    const ids = [];
    for (const a of links) {
      const m = a.href.match(/\/video\/.*?-(\d+)\/?/);
      if (m && !ids.find(x => x.id === m[1])) {
        ids.push({ id: m[1], title: a.innerText || a.getAttribute('aria-label') || m[0] });
      }
    }
    return ids.slice(0, 5);
  });
  
  console.log(`Results for "${query}":`, videoIds);
  await browser.close();
  return videoIds;
}

async function run() {
  await searchPexels('programmer typing dark');
  await searchPexels('digital design mockup screen');
  await searchPexels('server room data center lights');
}

run();

