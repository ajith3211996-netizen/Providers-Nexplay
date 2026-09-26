import axios from 'axios';

async function fetchCategory(slug) {
  try {
    const res = await axios.get(`https://arivumani.net/categories/${slug}/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });
    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
    let m;
    const items = [];
    while ((m = imgRegex.exec(res.data)) !== null) {
      if (m[1].includes('uploads')) {
        items.push({ img: m[1], title: m[2] });
      }
    }
    console.log(`\n=== Category: ${slug} (${items.length} items) ===`);
    items.forEach(x => console.log(`${x.title} => ${x.img}`));
  } catch (e) {
    console.error(slug, e.message);
  }
}

async function run() {
  await fetchCategory('sun-tv');
  await fetchCategory('vijay-tv');
  await fetchCategory('zee-tamil');
}

run();
