import { HDHub4u, FourKHDHub, Movies4u } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function testAll() {
  console.log('--- Testing Server 1: HDHub4u ---');
  try {
    const s1Search = await HDHub4u.search('Dune');
    console.log(`HDHub4u search results: ${s1Search.length}`);
    if (s1Search.length > 0) {
      console.log('HDHub4u top item:', s1Search[0].title, s1Search[0].url);
      const s1Stream = await HDHub4u.getPlayableStream(s1Search[0].url, false);
      console.log('HDHub4u stream:', s1Stream);
    }
  } catch (e) {
    console.error('HDHub4u error:', e.message);
  }

  console.log('\n--- Testing Server 2: 4KHDHub ---');
  try {
    const s2Search = await FourKHDHub.search('Dune');
    console.log(`4KHDHub search results: ${s2Search.length}`);
    if (s2Search.length > 0) {
      console.log('4KHDHub top item:', s2Search[0].title, s2Search[0].url);
      const s2Stream = await FourKHDHub.getPlayableStream(s2Search[0].url, false);
      console.log('4KHDHub stream:', s2Stream);
    }
  } catch (e) {
    console.error('4KHDHub error:', e.message);
  }

  console.log('\n--- Testing Server 3: Movies4u ---');
  try {
    const s3Search = await Movies4u.search('Dune');
    console.log(`Movies4u search results: ${s3Search.length}`);
    if (s3Search.length > 0) {
      console.log('Movies4u top item:', s3Search[0].title, s3Search[0].url);
      const s3Stream = await Movies4u.getPlayableStream(s3Search[0].url, false);
      console.log('Movies4u stream:', s3Stream);
    }
  } catch (e) {
    console.error('Movies4u error:', e.message);
  }
}

testAll();
