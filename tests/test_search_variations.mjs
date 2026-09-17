import { Movies4u } from '../src/utils/Movies4uProvider.js';
import { HDHub4u } from '../src/utils/ScraperEngine.js';

async function testSearchVariations() {
  console.log('--- Movies4u: "FROM" queries ---');
  for (const q of ['FROM Season 1', 'FROM S01', 'FROM MGM', 'FROM (Season', 'FROM']) {
    const res = await Movies4u.search(q);
    console.log(`Query "${q}" -> ${res.length} results:`);
    for (const r of res.slice(0, 3)) {
      console.log(`  - ${r.title} -> ${r.url}`);
    }
  }

  console.log('\n--- HDHub4u: "Leo" queries ---');
  for (const q of ['Leo', 'Leo 2023', 'Leo (2023)']) {
    const res = await HDHub4u.search(q);
    console.log(`Query "${q}" -> ${res.length} results:`);
    for (const r of res.slice(0, 3)) {
      console.log(`  - ${r.title} -> ${r.url}`);
    }
  }
}

testSearchVariations();
