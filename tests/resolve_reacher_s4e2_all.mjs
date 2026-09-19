import { ClientUtils, parseMediaBridges } from '../src/utils/ScraperEngine.js';

async function run() {
  const pageUrl = 'https://new6.hdhub4u.cl/reacher-season-4-hindi-webrip-all-episodes/';
  console.log(`Fetching page: ${pageUrl}`);
  const html = await ClientUtils.httpGet(pageUrl);

  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Reacher (Season 4)';
  console.log(`Title: ${title}`);

  const { episodeMap } = parseMediaBridges(html, title);
  console.log('Available episode keys in post:');
  console.log(Array.from(episodeMap.keys()).join(', '));

  // Find all bridges for Episode 2 (e.g. key '4-2' or any key ending in '-2')
  const ep2Bridges = episodeMap.get('4-2') || episodeMap.get('1-2') || [];
  console.log(`\nFound ${ep2Bridges.length} bridge(s) for Episode 2:`);
  for (const b of ep2Bridges) {
    console.log(`- Quality: ${b.quality} | Size: ${b.sizeMB} MB | Label: "${b.label}" | URL: ${b.url}`);
  }

  // Also check if there are other episode 2 bridges from HTML anchors directly
  const anchors = [...html.matchAll(/<a\s+[^>]*href=["'](https?:\/\/[^"']*(?:hubcloud|hubdrive|greenmount|gamerxyt|hubcdn)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi)];
  console.log(`\nScanning all ${anchors.length} anchors in post for Episode 2...`);

  const manualBridges = [];
  for (const a of anchors) {
    const url = a[1];
    const text = a[2].replace(/<[^>]+>/g, '').trim();
    if (/E(?:P)?[-.\s]?0?2\b|Episode[-.\s]?0?2\b/i.test(text)) {
      let q = '1080p';
      if (/4k|2160/i.test(text)) q = '4K';
      else if (/720/i.test(text)) q = '720p';
      else if (/480/i.test(text)) q = '480p';
      manualBridges.push({ quality: q, label: text, url });
    }
  }

  const allBridgesToTest = ep2Bridges.length > 0 ? ep2Bridges : manualBridges;

  console.log(`\nResolving direct streams for all Episode 2 bridges (${allBridgesToTest.length} total)...`);
  const resultsByQuality = {};

  for (const b of allBridgesToTest) {
    console.log(`\n>>> Resolving Bridge: [${b.quality}] ${b.label} -> ${b.url}`);
    try {
      const resolved = await ClientUtils.resolveDeepHubCloudChain(b.url, b.quality);
      console.log(`    Resolved ${resolved.length} candidate stream(s):`);
      for (const item of resolved) {
        const isLive = await ClientUtils.verifyMediaStream(item.url, item.headers || {}, 4000);
        console.log(`    - [Priority ${item.priority}] ${item.server}`);
        console.log(`      Quality: ${item.quality}`);
        console.log(`      Stream:  ${item.url}`);
        console.log(`      Probe:   ${isLive ? 'HTTP 206 (PLAYABLE)' : 'HTTP Failed / Offline'}`);

        if (!resultsByQuality[item.quality]) {
          resultsByQuality[item.quality] = [];
        }
        resultsByQuality[item.quality].push({
          server: item.server,
          priority: item.priority,
          url: item.url,
          live: isLive,
          headers: item.headers
        });
      }
    } catch (err) {
      console.log(`    Error resolving bridge: ${err.message}`);
    }
  }

  console.log('\n===============================================================');
  console.log('SUMMARY OF ALL QUALITY DIRECT LINKS FOR REACHER S4E2:');
  console.log('===============================================================');
  console.log(JSON.stringify(resultsByQuality, null, 2));
}

run();
