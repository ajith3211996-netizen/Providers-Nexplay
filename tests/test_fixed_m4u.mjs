import { Movies4u } from '../src/utils/Movies4uProvider.js';

async function testFixedM4u() {
  const bridgeUrl = 'https://m4ulinks.site/number/3881';
  const episodes = await Movies4u.extractEpisodesFromBridge(bridgeUrl, '2160p 4K SDR', Movies4u.defaultHttpGet.bind(Movies4u));
  console.log(`Found ${episodes.length} episodes:`);
  const ep7 = episodes.find(e => e.episodeNumber === 7);
  console.log('Ep 7:', JSON.stringify(ep7, null, 2));

  if (ep7 && ep7.links.length > 0) {
    for (const l of ep7.links) {
      console.log(`Resolving from ${l.url} (${l.server})...`);
      const res = await Movies4u.resolveStream(l.url, '4K SDR', Movies4u.defaultHttpGet.bind(Movies4u));
      console.log('Resolved 4K direct stream:', JSON.stringify(res, null, 2));
    }
  }
}

testFixedM4u().catch(console.error);
