import { HDHub4uClient, ClientUtils } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function testHDHub4u() {
  const hdhub = new HDHub4uClient();
  const queries = ['From', 'From Season 1', 'From Hindi', 'Dune', 'Kalki', 'Leo'];
  for (const q of queries) {
    console.log(`\nSearching HDHub4u for "${q}"...`);
    const results = await hdhub.search(q);
    console.log(`Results (${results.length}):`);
    for (const r of results.slice(0, 3)) {
      console.log(` - ${r.title} -> ${r.url}`);
    }
    if (results.length > 0) {
      const top = results[0];
      const html = await ClientUtils.httpGet(top.url);
      console.log(`Top result page HTML length: ${html.length}`);
    }
  }
}

testHDHub4u();
