import { ExtensionManager } from '../src/utils/ExtensionManager.js';

async function testAllThreeServers() {
  console.log('====================================================');
  console.log('TEST 1: Server 2 (4KHDHub) -> Series: "From" (2022) S1E1');
  console.log('====================================================');
  try {
    const res2 = await ExtensionManager.findAndResolvePlayableStream({
      provider: '4khdhub',
      targetTitle: 'From',
      targetYear: '2022',
      isTVShow: true,
      seasonNumber: 1,
      episodeNumber: 1
    });
    console.log('✅ Server 2 (4KHDHub) SUCCESS:');
    console.log(`   Title: ${res2.title}`);
    console.log(`   Stream: ${res2.streamUrl}`);
    console.log(`   Qualities:`, Object.keys(res2.qualities));
    console.log(`   Server: ${res2.server}`);
  } catch (e) {
    console.error('❌ Server 2 (4KHDHub) FAILED:', e.message || e);
  }

  console.log('\n====================================================');
  console.log('TEST 2: Server 3 (Movies4u) -> Series: "From" (2022) S1E1');
  console.log('====================================================');
  try {
    const res3 = await ExtensionManager.findAndResolvePlayableStream({
      provider: 'movies4u',
      targetTitle: 'From',
      targetYear: '2022',
      isTVShow: true,
      seasonNumber: 1,
      episodeNumber: 1
    });
    console.log('✅ Server 3 (Movies4u) SUCCESS:');
    console.log(`   Title: ${res3.title}`);
    console.log(`   Stream: ${res3.streamUrl}`);
    console.log(`   Server: ${res3.server}`);
  } catch (e) {
    console.error('❌ Server 3 (Movies4u) FAILED:', e.message || e);
  }

  console.log('\n====================================================');
  console.log('TEST 3: Server 1 (HDHub4u) -> Movie: "Jawan" (2023)');
  console.log('====================================================');
  try {
    const res1 = await ExtensionManager.findAndResolvePlayableStream({
      provider: 'hdhub4u',
      targetTitle: 'Jawan',
      targetYear: '2023',
      isTVShow: false,
      seasonNumber: 1,
      episodeNumber: 1
    });
    console.log('✅ Server 1 (HDHub4u) SUCCESS:');
    console.log(`   Title: ${res1.title}`);
    console.log(`   Stream: ${res1.streamUrl}`);
    console.log(`   Qualities:`, Object.keys(res1.qualities));
    console.log(`   Server: ${res1.server}`);
  } catch (e) {
    console.error('❌ Server 1 (HDHub4u) FAILED:', e.message || e);
  }
}

testAllThreeServers();
