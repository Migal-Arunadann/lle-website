import puppeteer from 'puppeteer-core';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testLinks() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle2' });
  const links = await page.$$eval('#work article', (articles) => {
    return articles.map((art) => {
      const anchor = art.closest('a');
      const h3 = art.querySelector('h3');
      return {
        title: h3 ? h3.innerText.trim() : null,
        href: anchor ? anchor.href : null,
        target: anchor ? anchor.target : null,
      };
    });
  });
  console.log('Work cards clickable verification:', JSON.stringify(links, null, 2));
  await browser.close();
}

testLinks().catch(console.error);

