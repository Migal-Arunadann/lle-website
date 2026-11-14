async function checkSignifica() {
  const res = await fetch('https://api.github.com/repos/significa/significa.co/git/trees/main?recursive=1', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const data = await res.json();
  if (data.tree) {
    const videos = data.tree.filter(f => f.path.endsWith('.mp4') || f.path.endsWith('.webm'));
    console.log('significa videos:', videos.map(v => ({ path: v.path, size: v.size })));
  } else {
    console.log('no tree');
  }
}
checkSignifica();

