import { ClientUtils, parseMediaBridges } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function debug4KHDHub() {
  const url = 'https://4khdhub.one/from---mgmp-series-2122/';
  console.log('Fetching HTML for:', url);
  const html = await ClientUtils.httpGet(url);
  console.log('HTML length:', html.length);
  const { episodeMap, movieBridges } = parseMediaBridges(html, 'FROM - MGMP');
  console.log('Movie bridges:', movieBridges.length);
  console.log('Episode map keys:', Array.from(episodeMap.keys()));
  for (const [k, v] of episodeMap.entries()) {
    console.log(`Key ${k}: ${v.length} bridges -> first URL: ${v[0]?.url}, label: ${v[0]?.label}`);
  }
}

debug4KHDHub();
