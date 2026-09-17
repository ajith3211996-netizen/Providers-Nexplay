import { HDHub4u, FourKHDHub, ClientUtils } from '../src/utils/ScraperEngine.js';
import { Movies4u } from '../src/utils/Movies4uProvider.js';

async function inspectTheBoys() {
  console.log('=== 1. HDHub4u Inspection ===');
  const hUrl = 'https://new5.hdhub4u.cl/the-boys-season-4-hindi-uncensored-webrip-all-episodes/';
  const hHtml = await ClientUtils.httpGet(hUrl);
  const hDetails = await HDHub4u.extractDetails(hUrl, 4);
  console.log('HDHub4u Details Ep 7 bridges:');
  const ep7_h = hDetails.episodes?.find(e => e.episodeNumber === 7);
  console.log(JSON.stringify(ep7_h?.bridges, null, 2));

  console.log('\n=== 2. 4KHDHub Inspection ===');
  const fUrl = 'https://4khdhub.one/the-boys-series-605/';
  const fDetails = await FourKHDHub.extractDetails(fUrl, 4);
  console.log('4KHDHub Details Ep 7 bridges:');
  const ep7_f = fDetails.episodes?.find(e => e.episodeNumber === 7);
  console.log(JSON.stringify(ep7_f?.bridges, null, 2));

  console.log('\n=== 3. Movies4u Inspection ===');
  const mUrl = 'https://new6.movies4u.clinic/the-boys-season-1-5-multi-audio-amazon-prime-video-web-series-web-dl/';
  const mDetails = await Movies4u.extractDetails(mUrl, 4);
  console.log('Movies4u Season 4 Bridges:');
  const s4 = mDetails.seasons?.find(s => s.seasonNumber === 4);
  console.log(JSON.stringify(s4?.qualityBridges, null, 2));
}

inspectTheBoys().catch(console.error);
