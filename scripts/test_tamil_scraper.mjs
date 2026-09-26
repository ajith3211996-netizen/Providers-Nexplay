import axios from 'axios';

async function testScrape() {
  console.log('Testing Tamildhool...');
  try {
    const res = await axios.get('https://www.tamildhool.tech/sun-tv/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    });
    console.log('Tamildhool Sun TV Status:', res.status, 'HTML length:', res.data.length);
    
    // Look for serial links / menu links / articles
    const articleRegex = /<article[^>]*id="post-(\d+)"[^>]*>([\s\S]*?)<\/article>/gi;
    let m;
    const articles = [];
    while ((m = articleRegex.exec(res.data)) !== null && articles.length < 10) {
      const titleMatch = m[2].match(/<h[1-6][^>]*class=["'][^"']*entry-title[^"']*["'][^>]*>\s*<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
      const imgMatch = m[2].match(/src=["'](https?:\/\/[^"']+\.(?:jpg|png|webp))["']/i);
      if (titleMatch) {
        articles.push({
          title: titleMatch[2].replace(/<[^>]+>/g, '').trim(),
          url: titleMatch[1],
          image: imgMatch ? imgMatch[1] : null
        });
      }
    }
    console.log('Tamildhool articles:', articles);

    // Look for subcategory / serial menu items
    const subCatRegex = /<li[^>]*class=["'][^"']*menu-item[^"']*["'][^>]*>\s*<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let catM;
    const menuItems = [];
    while ((catM = subCatRegex.exec(res.data)) !== null) {
      const text = catM[2].replace(/<[^>]+>/g, '').trim();
      if (text && !text.includes('Home') && !menuItems.some(x => x.text === text)) {
        menuItems.push({ text, url: catM[1] });
      }
    }
    console.log('Tamildhool Menu Items count:', menuItems.length);
    console.log('Sample menu items:', menuItems.slice(0, 20));
  } catch (err) {
    console.error('Tamildhool fetch error:', err.message);
  }

  console.log('\nTesting Tamilgun / Arivumani...');
  try {
    const res = await axios.get('https://arivumani.net/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    });
    console.log('Arivumani Status:', res.status, 'HTML length:', res.data.length);

    const postRegex = /<article[^>]*class=["'][^"']*(?:video|post)[^"']*["'][^>]*>([\s\S]*?)<\/article>/gi;
    let pm;
    const arivumaniPosts = [];
    while ((pm = postRegex.exec(res.data)) !== null && arivumaniPosts.length < 10) {
      const titleMatch = pm[1].match(/<h[1-6][^>]*class=["'][^"']*post-title[^"']*["'][^>]*>\s*<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
      const imgMatch = pm[1].match(/src=["'](https?:\/\/[^"']+\.(?:jpg|png|webp))["']/i);
      if (titleMatch) {
        arivumaniPosts.push({
          title: titleMatch[2].replace(/<[^>]+>/g, '').trim(),
          url: titleMatch[1],
          image: imgMatch ? imgMatch[1] : null
        });
      }
    }
    console.log('Arivumani posts:', arivumaniPosts);
  } catch (err) {
    console.error('Arivumani fetch error:', err.message);
  }
}

testScrape();
