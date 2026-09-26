import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false
});

async function fetchTamildhool() {
  try {
    const res = await axios.get('https://www.tamildhool.net/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      },
      httpsAgent: agent,
      timeout: 10000
    });
    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
    let m;
    const items = [];
    while ((m = imgRegex.exec(res.data)) !== null) {
      if (m[1].includes('uploads') || m[1].includes('tamildhool')) {
        items.push({ img: m[1], title: m[2] });
      }
    }
    console.log(`Tamildhool items found: ${items.length}`);
    items.slice(0, 35).forEach(x => console.log(`${x.title} => ${x.img}`));
  } catch (e) {
    console.error('Tamildhool error:', e.message);
  }
}

fetchTamildhool();
