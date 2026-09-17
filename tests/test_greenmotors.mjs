import { ClientUtils } from 'file:///C:/Users/Ajo/Desktop/Android Projects/Stitch-nexplay/src/utils/ScraperEngine.js';

async function testGreenMotors() {
  const url = 'https://greenmotors.cc/?id=Q1dxTzFnbjhrQm5kMG5lL01tQzcvdEhwZ0JtZVdjNUEvbXdPRHcyWGVHVTlNK3BQUkNObFB5Z0kxTTdlaEM1Qzc5Zm81UzdIVHVoRmc5cm5NTDU2dlE9PQ==';
  console.log('Testing greenmotors URL:', url);
  const html = await ClientUtils.httpGet(url, 'https://4khdhub.one/');
  console.log('HTML length:', html.length);
  console.log('First 1000 chars of HTML:\n', html.substring(0, 1000));

  const aRegex = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = aRegex.exec(html)) !== null) {
    console.log(`Anchor: [${m[2].trim()}] -> ${m[1]}`);
  }

  // Look for script redirects or tokens
  const scriptRegex = /<script[\s\S]*?>([\s\S]*?)<\/script>/gi;
  while ((m = scriptRegex.exec(html)) !== null) {
    console.log('Script snippet:\n', m[1].trim());
  }
}

testGreenMotors();
