import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function test() {
  const html = await ClientUtils.httpGet('https://4khdhub.one/from---mgmp-series-2122/');
  const s2 = html.match(/S02E\d+[^\n<]*/gi) || [];
  const s3 = html.match(/S03E\d+[^\n<]*/gi) || [];
  console.log('S02 matches count:', s2.length);
  console.log('S02 samples:', s2.slice(0, 5));
  console.log('S03 matches count:', s3.length);
  console.log('S03 samples:', s3.slice(0, 5));
}
test();
