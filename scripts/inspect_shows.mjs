import axios from 'axios';

async function fetchVijayTvShows() {
  try {
    const res = await axios.get('https://arivumani.net/categories/vijay-tv-shows/', {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      timeout: 10000
    });
    const imgRegex = /<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/gi;
    let m;
    while ((m = imgRegex.exec(res.data)) !== null) {
      if (m[1].includes('uploads') && !m[1].includes('Arivumani2')) {
        console.log(`${m[2]} => ${m[1]}`);
      }
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

fetchVijayTvShows();
