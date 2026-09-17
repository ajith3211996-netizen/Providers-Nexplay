function rot13(str) {
  return (str + '').replace(/[a-zA-Z]/g, function (c) {
    return String.fromCharCode(
      (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
    );
  });
}

function decodeGreenmountToken(token) {
  if (!token) return null;
  try {
    let d1 = Buffer.from(token, 'base64').toString('utf8');
    let d2 = Buffer.from(d1, 'base64').toString('utf8');
    let d3 = rot13(d2);
    let d4 = Buffer.from(d3, 'base64').toString('utf8');
    const json = JSON.parse(d4);
    if (json && json.o) {
      return Buffer.from(json.o, 'base64').toString('utf8');
    }
  } catch(e) {}
  return null;
}

import { ClientUtils, FourKHDHubClient } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function test4KFixed() {
  const url = 'https://4khdhub.one/from---mgmp-series-2122/';
  const html = await ClientUtils.httpGet(url);

  // Pattern with greenmotors added
  const aRegex = /<a\s+[^>]*href=["'](https?:\/\/[^"']*(?:hubdrive|hubcloud|greenmount|greenmotors|homelander|hubcdn|gamerxyt|gadgets|fastdrive|drive)[^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const bridges = [];
  while ((m = aRegex.exec(html)) !== null) {
    bridges.push({ url: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() });
  }
  console.log(`Found ${bridges.length} bridges with greenmotors regex!`);
  for (const b of bridges.slice(0, 5)) {
    console.log(` - [${b.text}] -> ${b.url}`);
    const gHtml = await ClientUtils.httpGet(b.url, url);
    const tokenMatch = gHtml.match(/s\(['"]o['"],\s*['"]([^'"]+)['"]/i);
    if (tokenMatch && tokenMatch[1]) {
      const destUrl = decodeGreenmountToken(tokenMatch[1]);
      console.log(`   -> Decoded HubCloud URL: ${destUrl}`);
    }
  }
}

test4KFixed();
