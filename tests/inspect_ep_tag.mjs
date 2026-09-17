import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectEpTag() {
  const url = 'https://m4ulinks.site/number/3881';
  const html = await ClientUtils.httpGet(url, 'https://new6.movies4u.clinic/');
  
  const m = html.match(/<[^>]*>-:\s*Episodes?[\s\S]*?<\/[^>]*>/gi);
  console.log('Episode headings:', m);
}

inspectEpTag().catch(console.error);
