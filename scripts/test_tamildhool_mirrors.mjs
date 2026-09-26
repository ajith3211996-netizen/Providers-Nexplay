import axios from 'axios';
import { resolveUrlWithDoh } from '../src/utils/DnsResolver.js';

const domains = [
  'https://www.tamildhool.tech',
  'https://tamildhool.tech',
  'https://www.tamildhool.net',
  'https://tamildhool.net',
  'https://www.tamildhool.tv'
];

async function checkDomains() {
  for (const d of domains) {
    try {
      console.log(`Checking ${d}...`);
      const res = await axios.get(d, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 5000
      });
      console.log(`SUCCESS: ${d} returned status ${res.status}`);
    } catch (e) {
      console.log(`FAILED: ${d} - ${e.message}`);
    }
  }

  // Also test DoH
  try {
    console.log('Testing DoH with www.tamildhool.tech...');
    const dohUrl = await resolveUrlWithDoh('https://www.tamildhool.tech/');
    console.log('DoH resolved URL:', dohUrl);
    const res = await axios.get(dohUrl.url, {
      headers: { ...dohUrl.headers, 'User-Agent': 'Mozilla/5.0' },
      timeout: 6000
    });
    console.log('DoH fetch SUCCESS! Status:', res.status);
  } catch (e) {
    console.log('DoH fetch FAILED:', e.message);
  }
}

checkDomains();
