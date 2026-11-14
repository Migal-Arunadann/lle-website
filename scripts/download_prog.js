import fs from 'fs';

async function downloadPexels(id, filename) {
  try {
    const url = `https://www.pexels.com/download/video/${id}/`;
    console.log(`Downloading ${id}...`);
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      redirect: 'follow'
    });
    console.log(`Status for ${id}:`, res.status, res.headers.get('content-type'));
    const buf = await res.arrayBuffer();
    fs.writeFileSync(`public/${filename}`, Buffer.from(buf));
    console.log(`Saved public/${filename}, size:`, buf.byteLength);
  } catch (e) {
    console.error(`Failed ${id}:`, e.message);
  }
}

async function run() {
  await downloadPexels('5495845', 'hero-programming-dark.mp4');
  await downloadPexels('6346228', 'hero-woman-coding.mp4');
}

run();

