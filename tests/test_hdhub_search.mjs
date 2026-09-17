import { HDHub4u } from '../src/utils/ScraperEngine.js';

async function testHdhubSearch() {
  const queries = ['Stree 2', 'Stree', 'Stree (2024)', 'Dune', 'Dune Part 2', 'Dune 2', 'Deadpool', 'Deadpool & Wolverine'];
  for (const q of queries) {
    const res = await HDHub4u.search(q);
    console.log(`\nHDHub4u search("${q}") -> returned ${res.length} results:`);
    for (const r of res.slice(0, 5)) {
      console.log(`  - "${r.title}" -> ${r.url}`);
    }
  }
}

testHdhubSearch();
