async function searchMp4s() {
  const repos = [
    'Manaslad/Final_Project',
    'engoncode/html-video-creative-agency',
    'mertaygn/signature-showreel',
    'Aastha-Bhatia/k72',
    'codewithsadee/hoolix',
    'mikemaz-dev/Embrace-Agency',
    'kostastepetes/creative-web-agency-website',
    'abuzar-alvi/Webia-Solutionz-Modern-Digital-Agency-Website'
  ];
  for (const r of repos) {
    for (const b of ['main', 'master']) {
      try {
        const res = await fetch(`https://api.github.com/repos/${r}/git/trees/${b}?recursive=1`, {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const d = await res.json();
        if (d.tree) {
          const mp4s = d.tree.filter(x => x.path.endsWith('.mp4'));
          if (mp4s.length) {
            console.log(r, b, mp4s.map(m => ({ path: m.path, size: m.size })));
          }
          break;
        }
      } catch(e) {}
    }
  }
}
searchMp4s();

