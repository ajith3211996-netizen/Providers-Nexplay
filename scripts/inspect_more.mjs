import axios from 'axios';

async function fetchMorePages(category) {
  for (let page = 1; page <= 3; page++) {
    try {
      const url = page === 1 ? `https://arivumani.net/categories/${category}/` : `https://arivumani.net/categories/${category}/page/${page}/`;
      const res = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 8000
      });
      const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
      let m;
      console.log(`\n--- ${category} page ${page} ---`);
      while ((m = imgRegex.exec(res.data)) !== null) {
        if (m[1].includes('uploads') && !m[1].includes('Arivumani2')) {
          console.log(`${m[2]} => ${m[1]}`);
        }
      }
    } catch (e) {
      console.log(`${category} page ${page} err:`, e.message);
    }
  }
}

async function run() {
  await fetchMorePages('sun-tv');
  await fetchMorePages('vijay-tv');
  await fetchMorePages('zee-tamil');
}

run();
