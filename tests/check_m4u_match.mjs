import { Movies4u } from '../src/utils/Movies4uProvider.js';
import { calculateTitleMatchScore, findBestMatch } from '../src/utils/ScraperEngine.js';

async function checkM4uMatch() {
  const results = await Movies4u.search('From');
  console.log('Results count:', results.length);
  for (const r of results) {
    const score = calculateTitleMatchScore('From', 2022, 'tv', r.title, r.year, r.type || 'tv', 1, r.url);
    console.log(`Title: "${r.title}", year: "${r.year}", type: "${r.type}", url: "${r.url}" -> score: ${score}`);
  }
}

checkM4uMatch();
