import { ClientUtils } from '../src/utils/ScraperEngine.js';

async function checkBatchLinks() {
  const batchLinks = [
    { q: '480p', label: '480p x264 [1.4GB]', url: 'https://greenmotors.club/?id=V3RVTCt0MzNrVnRHQWFRdXI2RUd2VW4xQ2t0VEt2c2QzQnc1UE9MelVZMkR3L1V4T2g1a1cwUmg2aTZwRit4aHJFMU9QQldCNlRoQUtJellMSWx4RkRBTzVENjFIMmJvMHRkc1YvTW5GcGs9' },
    { q: '720p HEVC', label: '720p 10Bit HEVC [2.4GB]', url: 'https://hubdrive.pics/file/2923566880' },
    { q: '720p', label: '720p x264 [3.5GB]', url: 'https://greenmotors.club/?id=V3RVTCt0MzNrVnRHQWFRdXI2RUd2VW4xQ2t0VEt2c2QzQnc1UE9MelVZMkR3L1V4T2g1a1cwUmg2aTZwRit4aEk3L2ZzUVp2VFFYSTdTU3d0OFZDbTR4UXd5WHdadllualdNSU44SVBoTW89' },
    { q: '1080p HEVC', label: '1080p 10Bit HEVC [5.1GB]', url: 'https://hubdrive.pics/file/4055066168' },
    { q: '1080p', label: '1080p x264 [7.6GB]', url: 'https://greenmotors.club/?id=V3RVTCt0MzNrVnRHQWFRdXI2RUd2VW4xQ2t0VEt2c2QzQnc1UE9MelVZMkR3L1V4T2g1a1cwUmg2aTZwRit4aGEreDRtVFA4VVIzQUNsK3kyM0ZvSnpLSmgzR041NHB5Ky9OQ0ZuME12Mjg9' }
  ];

  for (const b of batchLinks) {
    console.log(`\nChecking batch: [${b.q}] ${b.label}`);
    try {
      let destUrl = b.url;
      if (destUrl.includes('greenmotors.') || destUrl.includes('greenmount.')) {
        const gHtml = await ClientUtils.httpGet(destUrl);
        const tokenMatch = gHtml.match(/s\(['"]o['"],\s*['"]([^'"]+)['"]/i);
        if (tokenMatch && tokenMatch[1]) {
          const d = Buffer.from(tokenMatch[1], 'base64').toString('utf8');
          console.log(`  Decoded Greenmotors -> ${d}`);
          destUrl = d;
        }
      }
      console.log(`  Fetching landing page: ${destUrl}`);
      const pageHtml = await ClientUtils.httpGet(destUrl);
      console.log(`  Page length: ${pageHtml.length}`);
      // Find anchors for Episode 2
      const aMatches = [...pageHtml.matchAll(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)];
      console.log(`  Total anchors in page: ${aMatches.length}`);
      const ep2 = aMatches.filter(m => /E(?:P)?[-.\s]?0?2\b|Episode[-.\s]?0?2\b/i.test(m[2]) || /E(?:P)?0?2\b/i.test(m[1]));
      console.log(`  Ep 2 anchors: ${ep2.length}`);
      ep2.forEach(m => console.log(`    "${m[2].replace(/<[^>]+>/g, '').trim()}" -> ${m[1]}`));

      // If no explicit ep2 text, print first 10 anchors
      if (ep2.length === 0) {
        aMatches.slice(0, 10).forEach(m => console.log(`    anchor: "${m[2].replace(/<[^>]+>/g, '').trim()}" -> ${m[1]}`));
      }
    } catch (e) {
      console.log(`  Error: ${e.message}`);
    }
  }
}
checkBatchLinks();
