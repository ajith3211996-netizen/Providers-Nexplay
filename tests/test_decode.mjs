import { decodeGreenmountToken, ClientUtils } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

const token = 'Y214WE0xWjNZbXRhVUdwMmIxQldObFo2ZFRCeFZVOXRRbmxxYVV0UU9XRndla2w1YjNveGFYRlVPV3h3YkRWM1RERnFhVzVVT1dkTlNtdDFiM3BGZVhCNWFtbFdkbXAyYjJ4V05sWjZVMVpJZDA5M1JsSXdNa2RWZURWdk1rVkxSbnBqZGtWdGVHdEtlRm94Y0ZSYWJVaExUVzVHVW1OcVRWUXhTWEY0TlV0S2QwMTRSVk5qWjBwNk5VRmFTbE5TUlVkUFFVVlRWbXhXWVRBOQ==';

const decoded = decodeGreenmountToken(token);
console.log('Decoded Token URL:', decoded);

if (decoded) {
  ClientUtils.resolveDeepHubCloudChain(decoded, '1080p').then(res => {
    console.log('Resolved Streams from HubCloud Chain:', res);
  });
}
