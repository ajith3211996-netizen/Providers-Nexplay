import ExtensionManager from '../src/utils/ExtensionManager.js';

async function testUrlAccessibility(url, headers = {}) {
  if (!url) return { ok: false, error: 'No URL' };
  try {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 10000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Range': 'bytes=0-1024',
        ...headers
      },
      signal: ctrl.signal
    });
    clearTimeout(timeout);
    return {
      status: res.status,
      contentType: res.headers.get('content-type'),
      contentLength: res.headers.get('content-length'),
      acceptRanges: res.headers.get('accept-ranges')
    };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function run() {
  console.log('====================================================');
  console.log('      BENCHMARK & STREAM ACCESSIBILITY TEST         ');
  console.log('====================================================');

  const serverMap = {
    1: { id: 'hdhub4u', name: 'Server 1 (HDHub4u)' },
    2: { id: '4khdhub', name: 'Server 2 (4KHDHub)' },
    3: { id: 'movies4u', name: 'Server 3 (Movies4u)' }
  };

  console.log('\n🎬 1. TESTING MOVIE: "Obsession" (2026)');
  for (const s of [1, 2, 3]) {
    const sInfo = serverMap[s];
    console.log(`\n--- [${sInfo.name}] ---`);
    const t0 = Date.now();
    try {
      const res = await ExtensionManager.findAndResolvePlayableStream({
        provider: sInfo.id,
        targetTitle: 'Obsession',
        targetYear: 2026,
        isTVShow: false,
        allowCrossProviderFallback: false
      });
      const elapsed = Date.now() - t0;
      console.log(`⏱️ Resolve Time: ${elapsed}ms (${(elapsed/1000).toFixed(2)}s)`);
      if (res && res.streamUrl) {
        console.log(`✅ Stream URL: ${res.streamUrl}`);
        console.log(`   Quality: ${res.quality}`);
        console.log(`   Available Qualities:`, Object.keys(res.qualities || {}));
        console.log(`   Headers:`, res.headers);
        
        console.log('   Testing HTTP stream accessibility...');
        const streamCheck = await testUrlAccessibility(res.streamUrl, res.headers);
        console.log('   Stream HTTP Status:', streamCheck);
      } else {
        console.log(`❌ No stream link resolved for ${sInfo.name}`);
      }
    } catch (e) {
      console.log(`❌ ${sInfo.name} error in ${Date.now() - t0}ms:`, e.message);
    }
  }

  console.log('\n\n📺 2. TESTING SERIES: "Reacher" Season 4 Episode 2');
  for (const s of [1, 2, 3]) {
    const sInfo = serverMap[s];
    console.log(`\n--- [${sInfo.name}] ---`);
    const t0 = Date.now();
    try {
      const res = await ExtensionManager.findAndResolvePlayableStream({
        provider: sInfo.id,
        targetTitle: 'Reacher',
        isTVShow: true,
        seasonNumber: 4,
        episodeNumber: 2,
        allowCrossProviderFallback: false
      });
      const elapsed = Date.now() - t0;
      console.log(`⏱️ Resolve Time: ${elapsed}ms (${(elapsed/1000).toFixed(2)}s)`);
      if (res && res.streamUrl) {
        console.log(`✅ Stream URL: ${res.streamUrl}`);
        console.log(`   Quality: ${res.quality}`);
        console.log(`   Available Qualities:`, Object.keys(res.qualities || {}));
        console.log(`   Headers:`, res.headers);
        
        console.log('   Testing HTTP stream accessibility...');
        const streamCheck = await testUrlAccessibility(res.streamUrl, res.headers);
        console.log('   Stream HTTP Status:', streamCheck);
      } else {
        console.log(`❌ No stream link resolved for ${sInfo.name}`);
      }
    } catch (e) {
      console.log(`❌ ${sInfo.name} error in ${Date.now() - t0}ms:`, e.message);
    }
  }
}

run();
