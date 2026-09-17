import { ExtensionManager } from '../src/utils/ExtensionManager.js';
import { ClientUtils, HDHub4u, FourKHDHub } from '../src/utils/ScraperEngine.js';

const TEST_MEDIA = [
  { title: 'Deadpool & Wolverine', year: 2024, isTV: false, season: 1, ep: 1 },
  { title: 'Dune: Part Two', year: 2024, isTV: false, season: 1, ep: 1 },
  { title: 'Stree 2', year: 2024, isTV: false, season: 1, ep: 1 },
  { title: 'The Boys', year: 2019, isTV: true, season: 4, ep: 1 },
  { title: 'House of the Dragon', year: 2022, isTV: true, season: 2, ep: 1 },
  { title: 'Stranger Things', year: 2016, isTV: true, season: 4, ep: 1 },
  { title: 'Mirzapur', year: 2018, isTV: true, season: 3, ep: 1 },
  { title: 'From', year: 2022, isTV: true, season: 1, ep: 1 },
  { title: 'From', year: 2022, isTV: true, season: 2, ep: 1 },
  { title: 'From', year: 2022, isTV: true, season: 3, ep: 1 }
];

async function checkUrlLive(url, headers = {}) {
  try {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1024',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        ...headers
      },
      signal: controller.signal
    });
    clearTimeout(t);
    return {
      status: res.status,
      contentType: res.headers.get('content-type'),
      contentLength: res.headers.get('content-length'),
      contentRange: res.headers.get('content-range'),
      ok: res.status === 200 || res.status === 206
    };
  } catch (e) {
    return { status: 0, error: e.message || String(e), ok: false };
  }
}

async function runDiagnostics() {
  console.log('===============================================================');
  console.log('RUNNING DEEP DIAGNOSTICS FOR SERVER 1 (HDHub4u) & SERVER 2 (4KHDHub)');
  console.log('===============================================================');

  for (const item of TEST_MEDIA) {
    console.log(`\n-----------------------------------------------------------`);
    console.log(`Testing: "${item.title}" (${item.year}, ${item.isTV ? `Series S${item.season}E${item.ep}` : 'Movie'})`);
    console.log(`-----------------------------------------------------------`);

    // --- SERVER 1 (HDHub4u) ---
    console.log(`[Server 1 - HDHub4u]:`);
    try {
      const res1 = await ExtensionManager.findAndResolvePlayableStream({
        provider: 'hdhub4u',
        targetTitle: item.title,
        targetYear: item.year,
        isTVShow: item.isTV,
        seasonNumber: item.season,
        episodeNumber: item.ep
      });
      console.log(`  -> Match: "${res1.title}"`);
      console.log(`  -> Stream URL: ${res1.streamUrl}`);
      console.log(`  -> Qualities:`, Object.keys(res1.qualities));
      const liveCheck = await checkUrlLive(res1.streamUrl, res1.headers);
      console.log(`  -> Stream Live Probe: HTTP ${liveCheck.status}, Type: ${liveCheck.contentType}, OK: ${liveCheck.ok}`);
      if (!liveCheck.ok) {
        console.warn(`  ⚠️ STREAM CANNOT BE PLAYED (Probe failed):`, liveCheck);
      }
    } catch (e1) {
      console.error(`  ❌ Server 1 Error:`, e1.message || e1);
    }

    // --- SERVER 2 (4KHDHub) ---
    console.log(`[Server 2 - 4KHDHub]:`);
    try {
      const res2 = await ExtensionManager.findAndResolvePlayableStream({
        provider: '4khdhub',
        targetTitle: item.title,
        targetYear: item.year,
        isTVShow: item.isTV,
        seasonNumber: item.season,
        episodeNumber: item.ep
      });
      console.log(`  -> Match: "${res2.title}"`);
      console.log(`  -> Stream URL: ${res2.streamUrl}`);
      console.log(`  -> Qualities:`, Object.keys(res2.qualities));
      const liveCheck = await checkUrlLive(res2.streamUrl, res2.headers);
      console.log(`  -> Stream Live Probe: HTTP ${liveCheck.status}, Type: ${liveCheck.contentType}, OK: ${liveCheck.ok}`);
      if (!liveCheck.ok) {
        console.warn(`  ⚠️ STREAM CANNOT BE PLAYED (Probe failed):`, liveCheck);
      }
    } catch (e2) {
      console.error(`  ❌ Server 2 Error:`, e2.message || e2);
    }
  }
}

runDiagnostics();
