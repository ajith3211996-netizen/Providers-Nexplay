import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function inspectDownloadSection() {
  const url = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const html = await ClientUtils.httpGet(url);
  const startIdx = html.indexOf('DOWNLOAD LINKS');
  if (startIdx !== -1) {
    console.log(html.substring(startIdx, startIdx + 4000));
  }
}

inspectDownloadSection().catch(console.error);
