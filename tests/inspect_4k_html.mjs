import { ClientUtils } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function inspectHtml() {
  const url = 'https://4khdhub.one/from---mgmp-series-2122/';
  const html = await ClientUtils.httpGet(url);

  const aRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  const links = [];
  let m;
  while ((m = aRegex.exec(html)) !== null) {
    const href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (href.startsWith('http') && !href.includes('4khdhub.one') && !href.includes('wp-content')) {
      links.push({ href, text });
    }
  }

  console.log(`Found ${links.length} external links on 4KHDHub:`);
  for (const l of links.slice(0, 30)) {
    console.log(` - [${l.text}] -> ${l.href}`);
  }
}

inspectHtml();
