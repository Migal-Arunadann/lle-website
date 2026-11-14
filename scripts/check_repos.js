async function checkRepo(repo) {
  for (const branch of ['main', 'master']) {
    try {
      const res = await fetch(`https://api.github.com/repos/${repo}/git/trees/${branch}?recursive=1`, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      });
      const data = await res.json();
      if (data.tree) {
        const videos = data.tree.filter(f => f.path.endsWith('.mp4') || f.path.endsWith('.webm'));
        console.log(repo, `(${branch})`, 'videos:', videos.map(v => ({ path: v.path, size: v.size })));
        return;
      }
    } catch (e) {
      console.log(repo, 'err:', e.message);
    }
  }
}
async function run() {
  await checkRepo('Itssanthoshhere/k72');
  await checkRepo('Aastha-Bhatia/k72');
  await checkRepo('adruich-ali/Reactjs-Static-Website');
}
run();

