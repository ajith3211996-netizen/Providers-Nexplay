import axios from 'axios';

async function inspectArivumani() {
  try {
    const res = await axios.get('https://arivumani.net/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    });

    // Find all menu links or categories
    const menuRegex = /<a[^>]*href=["'](https?:\/\/arivumani\.net\/[^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m;
    const links = new Map();
    while ((m = menuRegex.exec(res.data)) !== null) {
      const text = m[2].replace(/<[^>]+>/g, '').trim();
      const url = m[1];
      if (text && text.length > 2 && text.length < 50 && !links.has(url)) {
        links.set(url, text);
      }
    }
    console.log('Categories / Nav Links on Arivumani:');
    for (const [url, text] of links.entries()) {
      if (url.includes('category') || url.includes('channel') || url.includes('shows') || url.includes('serials') || url.includes('sun-tv') || url.includes('vijay-tv') || url.includes('zee-tamil') || url.includes('tv')) {
        console.log(`- ${text}: ${url}`);
      }
    }

    // Let's also check posts across categories
    console.log('\nTotal links found:', links.size);
  } catch (e) {
    console.error('Error:', e.message);
  }
}

inspectArivumani();
