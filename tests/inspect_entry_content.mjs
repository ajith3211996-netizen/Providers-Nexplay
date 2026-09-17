import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectEntryContent() {
  const url = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const html = await ClientUtils.httpGet(url);
  
  // Extract .entry-content or main article
  const contentMatch = html.match(/<div[^>]*class=["'][^"']*entry-content[^"']*["'][^>]*>([\s\S]*?)<\/div>/i) ||
                       html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  const content = contentMatch ? contentMatch[1] : html;
  
  // Strip tags and print
  console.log(content.replace(/<p/gi, '\n<p').replace(/<h[1-6]/gi, '\n<h').replace(/<[^>]+>/g, ' ').replace(/[ \t]+/g, ' '));
}

inspectEntryContent().catch(console.error);
