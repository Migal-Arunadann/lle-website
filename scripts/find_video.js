import fs from 'fs';

async function test() {
  const urls = [
    'https://coverr.co/videos/coding-on-a-laptop--2',
    'https://coverr.co/videos/coding-technology',
    'https://coverr.co/videos/colleagues-working-together-in-the-office',
    'https://coverr.co/videos/graphic-designers-workplace'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      const html = await res.text();
      const matches = html.match(/https:\/\/[^"'<>\s]+\.mp4/g);
      console.log(u, 'matches:', matches ? matches.slice(0, 3) : 'none');
    } catch (e) {
      console.log(u, 'err:', e.message);
    }
  }
}
test();

