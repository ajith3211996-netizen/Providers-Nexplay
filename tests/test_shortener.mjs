import { ClientUtils } from '../src/utils/ScraperEngine.js';

function decodeGreenmotorsToken(token) {
  try {
    function rot13(str) {
      return str.replace(/[a-zA-Z]/g, function(c) {
        const code = c.charCodeAt(0);
        if (c <= 'Z') {
          return String.fromCharCode(((code - 65 + 13) % 26) + 65);
        } else {
          return String.fromCharCode(((code - 97 + 13) % 26) + 97);
        }
      });
    }
    function atob(s) { return Buffer.from(s, 'base64').toString('utf8'); }

    let d = atob(token);
    d = atob(d);
    let r = rot13(d);
    let finalDecoded = atob(r);
    const obj = JSON.parse(finalDecoded);
    if (obj.o) {
      const targetUrl = atob(obj.o);
      if (targetUrl.startsWith('http')) {
        return targetUrl;
      }
    }
  } catch (e) {
    console.warn('[decodeGreenmotorsToken] error:', e.message);
  }
  return null;
}

async function run() {
  const shortenerUrl = 'https://greenmotors.club/?id=Q1dxTzFnbjhrQm5kMG5lL01tQzcvdEhwZ0JtZVdjNUEvbXdPRHcyWGVHVXpBWmRwdDUrUTdWR2lUKzhZNUI1MmFOM05tQUhOQnVtcmxkWENLUFZ3R2c9PQ==';
  console.log('1. Fetching shortener landing page:', shortenerUrl);
  const html = await ClientUtils.httpGet(shortenerUrl);
  const tokenMatch = html.match(/s\(['"]o['"],\s*['"]([^'"]+)['"]/i);
  if (!tokenMatch || !tokenMatch[1]) {
    console.error('Failed to find token in shortener HTML');
    return;
  }
  console.log('Token found:', tokenMatch[1].substring(0, 40) + '...');
  const directHubCloudUrl = decodeGreenmotorsToken(tokenMatch[1]);
  console.log('Decoded Direct HubCloud URL:', directHubCloudUrl);

  console.log('\n2. Resolving HubCloud Deep Chain:');
  const streams = await ClientUtils.resolveDeepHubCloudChain(directHubCloudUrl, '4k');
  console.log('Streams resolved:', streams.length);
  streams.forEach((s, idx) => {
    console.log(`Stream #${idx + 1}: [${s.quality}] ${s.server} -> ${s.url.substring(0, 80)}...`);
  });
}

run().catch(console.error);
