import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectM4uBody() {
  const url = 'https://m4ulinks.site/number/3881';
  const html = await ClientUtils.httpGet(url, 'https://new6.movies4u.clinic/');
  
  // Find all a tags
  const aMatches = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  console.log(`Found ${aMatches.length} links:`);
  for (const [_, href, text] of aMatches) {
    if (href.includes('hubcloud') || href.includes('gdflix') || href.includes('drive') || href.includes('m4u') || href.includes('download')) {
      console.log(`- [${text.replace(/<[^>]+>/g, '').trim()}] -> ${href}`);
    }
  }

  // Also look for episode headers in the html
  const hMatches = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)];
  for (const [_, hText] of hMatches) {
    console.log(`HEADER: ${hText.replace(/<[^>]+>/g, '').trim()}`);
  }
}

inspectM4uBody().catch(console.error);
