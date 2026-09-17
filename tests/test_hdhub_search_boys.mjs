import { HDHub4u } from '../src/utils/ScraperEngine.js';

async function searchHDHubBoys() {
  const results = await HDHub4u.search('The Boys');
  console.log(`Found ${results.length} results on HDHub4u:`);
  for (const r of results) {
    console.log(`- [${r.year || 'N/A'}] [${r.type}] ${r.title} -> ${r.url}`);
  }
}

searchHDHubBoys().catch(console.error);
