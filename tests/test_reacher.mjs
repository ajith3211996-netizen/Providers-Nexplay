import { ExtensionManager } from '../src/utils/ExtensionManager.js';
import { FourKHDHub, HDHub4u } from '../src/utils/ScraperEngine.js';

async function testReacher() {
  console.log('====================================================');
  console.log('Testing Reacher on 4KHDHub and HDHub4u (Greenmotors/Homelander bypass)');
  console.log('====================================================');

  const media = {
    id: 108978,
    name: 'Reacher',
    title: 'Reacher',
    first_air_date: '2022-02-03',
    media_type: 'tv'
  };

  console.log('\n--- Resolving 4KHDHub (Server 2): Season 1 Episode 1 ---');
  try {
    const stream = await ExtensionManager.resolveMediaStream(media, 2, 1, 1);
    console.log('Result S2 (4KHDHub):', stream ? {
      title: stream.title,
      quality: stream.quality,
      server: stream.server,
      streamUrl: stream.streamUrl?.substring(0, 80) + '...',
      mimeType: stream.mimeType
    } : 'FAILED - NULL');
  } catch (err) {
    console.error('S2 Error:', err.message);
  }

  console.log('\n--- Resolving HDHub4u (Server 1): Season 1 Episode 1 ---');
  try {
    const stream = await ExtensionManager.resolveMediaStream(media, 1, 1, 1);
    console.log('Result S1 (HDHub4u):', stream ? {
      title: stream.title,
      quality: stream.quality,
      server: stream.server,
      streamUrl: stream.streamUrl?.substring(0, 80) + '...',
      mimeType: stream.mimeType
    } : 'FAILED - NULL');
  } catch (err) {
    console.error('S1 Error:', err.message);
  }
}

testReacher().catch(console.error);
