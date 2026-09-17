import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectM4uBridge() {
  const url = 'https://m4ulinks.site/number/3881';
  const html = await ClientUtils.httpGet(url, 'https://new6.movies4u.clinic/');
  console.log('HTML Length:', html.length);
  console.log('Snippet:\n', html.substring(0, 2500));
}

inspectM4uBridge().catch(console.error);
