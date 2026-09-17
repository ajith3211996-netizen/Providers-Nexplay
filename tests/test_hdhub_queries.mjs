import { HDHub4u } from '../src/utils/ScraperEngine.js';

async function testHDHub4uQueries() {
  const queries = ['Leo', 'Leo (2023)', 'Leo 2023', 'Leo movie'];
  for (const q of queries) {
    const res = await HDHub4u.search(q);
    const found = res.find(r => r.title.toLowerCase().includes('leo'));
    console.log(`Query "${q}" -> total ${res.length}, found Leo? ${found ? found.title : 'NO'}`);
  }
}

testHDHub4uQueries();
