async function searchWikimedia() {
  const query = 'coding computer';
  const url = `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query + ' filetype:video')}&srnamespace=6&format=json&origin=*`;
  const res = await fetch(url);
  const data = await res.json();
  console.log('Results:', data.query.search.length);
  for (const item of data.query.search.slice(0, 8)) {
    console.log(item.title);
  }
}
searchWikimedia();

