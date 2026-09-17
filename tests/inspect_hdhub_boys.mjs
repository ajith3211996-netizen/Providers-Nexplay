import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectHDHubHtml() {
  const url = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const html = await ClientUtils.httpGet(url);
  
  // Find all links to hubdrive/hubcloud/greenmount/greenmotors/homelander/hubcdn/etc.
  const aRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']*(?:hubdrive|hubcloud|greenmount|greenmotors|homelander|hubcdn|gamerxyt|gadgets|fastdrive|drive)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  let count = 0;
  while ((m = aRegex.exec(html)) !== null) {
    count++;
    const linkUrl = m[1];
    const linkText = m[2].replace(/<[^>]+>/g, '').trim();
    const pos = m.index;
    const preceding = html.substring(Math.max(0, pos - 300), pos).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    console.log(`[#${count}] Text: "${linkText}" | Preceding: "${preceding}" | URL: ${linkUrl}`);
  }
}

inspectHDHubHtml().catch(console.error);
