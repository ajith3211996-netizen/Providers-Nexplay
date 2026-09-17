import { Movies4uClient } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/Movies4uProvider.js';

async function testMovies4u() {
  console.log('=== TESTING SERVER 3: Movies4u ===');
  const m4u = new Movies4uClient();
  try {
    const liveDomain = await m4u.resolveLiveDomain();
    console.log('Movies4u Live Domain:', liveDomain);

    const searchResults = await m4u.search('From');
    console.log(`Movies4u "From" results: ${searchResults.length}`);
    for (const r of searchResults.slice(0, 3)) {
      console.log(` - ${r.title} (${r.year || 'N/A'}): ${r.url}`);
    }

    if (searchResults.length > 0) {
      const top = searchResults[0];
      console.log(`\nResolving stream for: ${top.title}`);
      const stream = await m4u.getPlayableStream(top.url, true, 1, 1);
      console.log('Playable Stream:', stream);
    }
  } catch (e) {
    console.error('Movies4u test error:', e);
  }
}

testMovies4u();
