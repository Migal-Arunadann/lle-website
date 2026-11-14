async function searchRepos() {
  const topics = ['agency-website', 'creative-agency', 'web-agency', 'digital-agency', 'portfolio-website'];
  for (const t of topics) {
    const res = await fetch(`https://api.github.com/search/repositories?q=topic:${t}+has:pages&sort=stars`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    const data = await res.json();
    if (data.items) {
      for (const r of data.items.slice(0, 3)) {
        console.log(t, '->', r.full_name, r.html_url);
      }
    }
  }
}
searchRepos();

