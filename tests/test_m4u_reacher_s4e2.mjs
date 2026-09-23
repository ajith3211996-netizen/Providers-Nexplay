import { Movies4u, Movies4uClient } from '../src/utils/Movies4uProvider.js';

async function testMovies4uReacherS4E2() {
  console.log('========================================================================');
  console.log('TESTING SERVER 3 (MOVIES4U) - REACHER SEASON 4 EPISODE 2');
  console.log('========================================================================\n');

  console.log('[Step 1] Searching Movies4u for "Reacher"...');
  const searchResults = await Movies4u.search('Reacher');
  console.log(`Found ${searchResults.length} search results:`);
  searchResults.forEach((r, i) => {
    console.log(`  ${i + 1}. [${r.provider}] ${r.title} -> ${r.url}`);
  });

  // Find Season 4 or the series entry
  const s4Item = searchResults.find(r => /season\s*4|s0?4/i.test(r.title)) ||
                 searchResults.find(r => /reacher/i.test(r.title));

  if (!s4Item) {
    console.error('❌ Could not find Reacher series entry in search results!');
    return;
  }

  console.log(`\n[Step 2] Selected Entry for Season 4: "${s4Item.title}"`);
  console.log(`Page URL: ${s4Item.url}`);

  console.log('\n[Step 3] Calling Movies4u.getPlayableStream(url, isTVShow=true, episodeNumber=2, seasonNumber=4)...');
  const t0 = Date.now();
  const playable = await Movies4u.getPlayableStream(s4Item.url, true, 2, 4);
  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);

  console.log(`\n[Step 4] Stream Resolution Complete in ${elapsed}s:`);
  if (!playable) {
    console.error('❌ No playable stream returned!');
    return;
  }

  console.log(`Title:         ${playable.title}`);
  console.log(`Episode:       ${playable.episodeNumber}`);
  console.log(`Initial Stream: ${playable.streamUrl}`);
  console.log(`Initial Quality: ${playable.quality}`);
  console.log(`Server:        ${playable.server}`);
  console.log(`MimeType:      ${playable.mimeType}`);
  console.log(`Supports 206:  ${playable.supports206}`);
  console.log('Headers:', playable.headers);

  console.log('\nAll Available Qualities in Playable Object:');
  if (playable.qualities) {
    for (const [q, url] of Object.entries(playable.qualities)) {
      console.log(`  - [${q}]: ${url}`);
    }
  } else {
    console.log('  None');
  }

  console.log('\n[Step 5] Pre-flight Probing Stream for HTTP 206 Partial Content & Byte-Range Seeking...');
  const testUrls = [];
  if (playable.streamUrl) testUrls.push({ q: playable.quality || 'default', url: playable.streamUrl, server: playable.server });
  if (playable.qualities) {
    for (const [q, u] of Object.entries(playable.qualities)) {
      if (u !== playable.streamUrl && !testUrls.some(t => t.url === u)) {
        testUrls.push({ q, url: u, server: 'Quality Stream' });
      }
    }
  }

  for (const t of testUrls) {
    console.log(`\nProbing [${t.q}] stream: ${t.url.substring(0, 100)}...`);
    try {
      const probeRes = await fetch(t.url, {
        method: 'GET',
        headers: {
          ...(playable.headers || {}),
          'Range': 'bytes=0-1048575'
        }
      });
      console.log(`  -> HTTP Status:       ${probeRes.status} (${probeRes.status === 206 ? '206 PARTIAL CONTENT - SEEKABLE' : probeRes.status})`);
      console.log(`  -> Content-Range:     ${probeRes.headers.get('content-range') || 'NONE'}`);
      console.log(`  -> Content-Length:    ${probeRes.headers.get('content-length') || 'NONE'}`);
      console.log(`  -> Content-Type:      ${probeRes.headers.get('content-type') || 'NONE'}`);
      console.log(`  -> Accept-Ranges:     ${probeRes.headers.get('accept-ranges') || 'NONE'}`);

      // Also test a seek jump to 20MB deep into the stream
      const seekProbe = await fetch(t.url, {
        method: 'GET',
        headers: {
          ...(playable.headers || {}),
          'Range': 'bytes=20971520-21000000'
        }
      });
      console.log(`  -> Seek Test (20MB Range): HTTP ${seekProbe.status} (${seekProbe.status === 206 ? 'INSTANT SEEK OK' : 'FAILED'})`);
      console.log(`  -> Seek Content-Range:    ${seekProbe.headers.get('content-range') || 'NONE'}`);
    } catch (err) {
      console.error(`  -> Probe Error: ${err.message}`);
    }
  }

  console.log('\n========================================================================');
  console.log('TEST COMPLETE');
  console.log('========================================================================');
}

testMovies4uReacherS4E2();
