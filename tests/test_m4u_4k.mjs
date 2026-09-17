import { Movies4u } from '../src/utils/Movies4uProvider.js';

async function testM4u4k() {
  const bridgeUrl = 'https://m4ulinks.site/number/3881';
  console.log('Extracting episodes from 4K bridge:', bridgeUrl);
  const episodes = await Movies4u.extractEpisodesFromBridge(bridgeUrl, '2160p');
  console.log(`Found ${episodes.length} episodes:`);
  const ep7 = episodes.find(e => e.episodeNumber === 7);
  console.log('Ep 7:', JSON.stringify(ep7, null, 2));

  if (ep7 && ep7.links.length > 0) {
    for (const l of ep7.links) {
      console.log(`Resolving stream from ${l.url} (${l.server})...`);
      const stream = await Movies4u.resolveStream(l.url, '4K');
      console.log('Resolved stream:', JSON.stringify(stream, null, 2));
    }
  }
}

testM4u4k().catch(console.error);
