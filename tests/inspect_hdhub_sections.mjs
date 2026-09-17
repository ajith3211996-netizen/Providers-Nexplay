import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectHtmlSections() {
  const url = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const html = await ClientUtils.httpGet(url);
  
  // Print all headings / paragraph blocks and their text
  const blocks = html.match(/<(?:h[1-6]|p|div)[^>]*>([\s\S]*?)<\/(?:h[1-6]|p|div)>/gi) || [];
  for (const block of blocks) {
    const text = block.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (text.includes('4K') || text.includes('1080p') || text.includes('720p') || text.includes('EPiSODE') || text.includes('DOWNLOAD LINKS')) {
      console.log('BLOCK:', text.substring(0, 150));
    }
  }
}

inspectHtmlSections().catch(console.error);
