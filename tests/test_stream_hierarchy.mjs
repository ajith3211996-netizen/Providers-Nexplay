import { selectBestStreamCandidate, getStreamPriority } from '../src/utils/Movies4uProvider.js';
import { ClientUtils } from '../src/utils/ScraperEngine.js';

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  } else {
    console.log(`✅ PASSED: ${message}`);
  }
}

console.log('========================================================================');
console.log('TESTING STREAM PRIORITY & FALLBACK HIERARCHY');
console.log('========================================================================\n');

// Mock candidate items
const fslStream = {
  server: 'Download [FSL Server] (10Gbps Cloudflare R2 Direct)',
  url: 'https://r2.cloudflarestorage.com/hub/video1.mkv',
  quality: '1080p',
  priority: 1,
  supports206: true
};

const fslStreamNo206 = {
  server: 'Download [FSL Server] (10Gbps Cloudflare R2 Direct)',
  url: 'https://r2.cloudflarestorage.com/hub/video_broken.mkv',
  quality: '1080p',
  priority: 1,
  supports206: false
};

const fslV2Stream = {
  server: 'Download [FSL v2 server] (Fast CDN Direct Stream)',
  url: 'https://fastdl.bunker.monster/hub/video2.mkv',
  quality: '1080p',
  priority: 2,
  supports206: true
};

const pixelDrainStream = {
  server: 'Download [PixelServer Direct] (Instant Range Seeking)',
  url: 'https://pixeldrain.com/api/file/abc12345',
  quality: '1080p',
  priority: 3,
  supports206: true
};

const googleCdnStream = {
  server: 'Download [Server : 10Gbps] (Google CDN Stream)',
  url: 'https://video-downloads.googleusercontent.com/stream123',
  quality: '1080p',
  priority: 10,
  supports206: false
};

console.log('[Test 1] Priority Calculation');
assert(getStreamPriority(fslStream.url, fslStream.server) === 1, 'FSL stream gets priority 1');
assert(getStreamPriority(fslV2Stream.url, fslV2Stream.server) === 2, 'FSL v2 stream gets priority 2');
assert(getStreamPriority(pixelDrainStream.url, pixelDrainStream.server) === 3, 'Pixeldrain stream gets priority 3');
assert(getStreamPriority(googleCdnStream.url, googleCdnStream.server) === 10, 'Google CDN stream gets priority 10');
assert(ClientUtils.getStreamPriority(fslStream.url, fslStream.server) === 1, 'ScraperEngine FSL priority 1');
assert(ClientUtils.getStreamPriority(fslV2Stream.url, fslV2Stream.server) === 2, 'ScraperEngine FSL v2 priority 2');
assert(ClientUtils.getStreamPriority(pixelDrainStream.url, pixelDrainStream.server) === 3, 'ScraperEngine Pixeldrain priority 3');
assert(ClientUtils.getStreamPriority(googleCdnStream.url, googleCdnStream.server) === 10, 'ScraperEngine Google CDN priority 10');

console.log('\n[Test 2] All 4 available -> FSL (Priority 1) MUST be selected');
let selected = selectBestStreamCandidate([googleCdnStream, pixelDrainStream, fslV2Stream, fslStream]);
assert(selected.url === fslStream.url, 'Selected FSL when all 4 are present');
let scSelected = ClientUtils.selectBestStreamCandidate([googleCdnStream, pixelDrainStream, fslV2Stream, fslStream]);
assert(scSelected.url === fslStream.url, 'ScraperEngine selected FSL when all 4 are present');

console.log('\n[Test 3] FSL missing or broken (no 206) -> FSL v2 (Priority 2) MUST be selected');
selected = selectBestStreamCandidate([googleCdnStream, pixelDrainStream, fslV2Stream, fslStreamNo206]);
assert(selected.url === fslV2Stream.url, 'Selected FSL v2 when FSL does not support 206');
scSelected = ClientUtils.selectBestStreamCandidate([googleCdnStream, pixelDrainStream, fslV2Stream, fslStreamNo206]);
assert(scSelected.url === fslV2Stream.url, 'ScraperEngine selected FSL v2 when FSL does not support 206');

console.log('\n[Test 4] FSL and FSL v2 missing -> Pixeldrain (Priority 3) MUST be selected');
selected = selectBestStreamCandidate([googleCdnStream, pixelDrainStream]);
assert(selected.url === pixelDrainStream.url, 'Selected Pixeldrain when FSL & FSLv2 missing');
scSelected = ClientUtils.selectBestStreamCandidate([googleCdnStream, pixelDrainStream]);
assert(scSelected.url === pixelDrainStream.url, 'ScraperEngine selected Pixeldrain when FSL & FSLv2 missing');

console.log('\n[Test 5] FSL, FSL v2, and Pixeldrain all missing or no 206 -> Fallback to [server:10gbps] Google CDN');
selected = selectBestStreamCandidate([googleCdnStream]);
assert(selected.url === googleCdnStream.url, 'Fallback to Google CDN when top 3 not available');
scSelected = ClientUtils.selectBestStreamCandidate([googleCdnStream]);
assert(scSelected.url === googleCdnStream.url, 'ScraperEngine fallback to Google CDN when top 3 not available');

console.log('\n========================================================================');
console.log('ALL HIERARCHY TESTS PASSED SUCCESSFULLY!');
console.log('========================================================================\n');
