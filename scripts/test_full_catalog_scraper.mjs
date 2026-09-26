import axios from 'axios';

async function fetchArivumaniCategory(catUrl, channelName, channelCode) {
  try {
    const res = await axios.get(catUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
      },
      timeout: 10000
    });

    const postRegex = /<article[^>]*class=["'][^"']*(?:video|post)[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
    let m;
    const items = [];
    while ((m = postRegex.exec(res.data)) !== null) {
      const postBody = m[1];
      const linkMatch = postBody.match(/<a\s+[^>]*href=["'](https?:\/\/[^"']*arivumani\.net\/[^"']+)["'][^>]*>/i);
      const titleMatch = postBody.match(/<h[1-6][^>]*class=["'][^"']*post-title[^"']*["'][^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/i);
      const imgMatch = postBody.match(/src=["'](https?:\/\/[^"']+\.(?:jpg|png|webp|jpeg))["']/i);
      const timeMatch = postBody.match(/<time[^>]*>([\s\S]*?)<\/time>/i);

      if (linkMatch && titleMatch) {
        const rawTitle = titleMatch[1].replace(/<[^>]+>/g, '').trim();
        items.push({
          rawTitle,
          link: linkMatch[1],
          image: imgMatch ? imgMatch[1] : null,
          time: timeMatch ? timeMatch[1].replace(/<[^>]+>/g, '').trim() : null,
          channel: channelName,
          channelCode
        });
      }
    }
    return items;
  } catch (err) {
    console.error(`Error fetching ${catUrl}:`, err.message);
    return [];
  }
}

async function run() {
  console.log('Fetching Sun TV from Arivumani...');
  const sunTv = await fetchArivumaniCategory('https://arivumani.net/categories/sun-tv/', 'Sun TV', 'sun');
  console.log(`Sun TV items: ${sunTv.length}`);
  console.log(sunTv.slice(0, 5));

  console.log('\nFetching Vijay TV from Arivumani...');
  const vijayTv = await fetchArivumaniCategory('https://arivumani.net/categories/vijay-tv/', 'Star Vijay', 'vijay');
  console.log(`Vijay TV items: ${vijayTv.length}`);
  console.log(vijayTv.slice(0, 5));

  console.log('\nFetching Zee Tamil from Arivumani...');
  const zeeTamil = await fetchArivumaniCategory('https://arivumani.net/categories/zee-tamil/', 'Zee Tamil', 'zee');
  console.log(`Zee Tamil items: ${zeeTamil.length}`);
  console.log(zeeTamil.slice(0, 5));
}

run();
