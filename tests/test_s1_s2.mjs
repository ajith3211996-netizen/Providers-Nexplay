// Standalone test for HDHub4u and 4KHDHub
import { HDHub4uClient, FourKHDHubClient, findBestMatch } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function testS1AndS2() {
  console.log('\n=== TESTING SERVER 1: HDHub4u ===');
  const hdhub = new HDHub4uClient();
  try {
    const results = await hdhub.search('From');
    console.log(`HDHub4u "From" results: ${results.length}`);
    for (const r of results.slice(0, 3)) {
      console.log(` - ${r.title}: ${r.url}`);
    }
    const match = findBestMatch('From', '2022', 'tv', results, 0.55, 1);
    console.log('HDHub4u Match:', match ? `${match.title} -> ${match.url}` : 'No match');
    if (match) {
      console.log('Resolving stream on HDHub4u...');
      const stream = await hdhub.getPlayableStream(match.url, true, 1, 1);
      console.log('HDHub4u Playable Stream:', stream);
    }
  } catch (e) {
    console.error('HDHub4u error:', e);
  }

  console.log('\n=== TESTING SERVER 2: 4KHDHub ===');
  const fourk = new FourKHDHubClient();
  try {
    const results = await fourk.search('From');
    console.log(`4KHDHub "From" results: ${results.length}`);
    for (const r of results.slice(0, 3)) {
      console.log(` - ${r.title}: ${r.url}`);
    }
    const match = findBestMatch('From', '2022', 'tv', results, 0.55, 1);
    console.log('4KHDHub Match:', match ? `${match.title} -> ${match.url}` : 'No match');
    if (match) {
      console.log('Resolving stream on 4KHDHub...');
      const stream = await fourk.getPlayableStream(match.url, true, 1, 1);
      console.log('4KHDHub Playable Stream:', stream);
    }
  } catch (e) {
    console.error('4KHDHub error:', e);
  }
}

testS1AndS2();
