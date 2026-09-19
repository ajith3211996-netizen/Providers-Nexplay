import { ExtensionManager } from '../src/utils/ExtensionManager.js';
import { HDHub4u, ClientUtils } from '../src/utils/ScraperEngine.js';

async function run() {
  console.log('Searching HDHub4u for Reacher...');
  const searchResults = await HDHub4u.search('Reacher');
  console.log(`Found ${searchResults.length} search results on HDHub4u:`);
  for (const r of searchResults) {
    console.log(`- ${r.title} | URL: ${r.url}`);
  }

  console.log('\n--- Testing Reacher on Server 1 (HDHub4u) for Season 4 Episode 2 ---');
  try {
    const res = await ExtensionManager.resolveMediaStream({
      name: 'Reacher',
      media_type: 'tv',
      first_air_date: '2022-02-04'
    }, 1, 4, 2);
    console.log('\n--- Resolution Result for S4E2 ---');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.log('Resolve error for S4E2:', e.message);
  }

  // Also check what seasons actually exist on HDHub4u posts for Reacher
  const reacherPosts = searchResults.filter(r => r.title.toLowerCase().includes('reacher'));
  for (const post of reacherPosts) {
    console.log(`\nInspecting post details: ${post.title} (${post.url})`);
    try {
      const details = await HDHub4u.extractDetails(post.url);
      console.log(`Title: ${details.title}`);
      if (details.episodes && details.episodes.length > 0) {
        console.log(`Episodes found: ${details.episodes.length}`);
        const sample = details.episodes.slice(0, 5);
        sample.forEach(ep => console.log(`  S${ep.seasonNumber}E${ep.episodeNumber}: ${ep.title} (${ep.bridges?.length || 0} bridges)`));
        // Also check if any episode matches season 4 or season 2
        const s4 = details.episodes.filter(e => e.seasonNumber === 4);
        console.log(`  Season 4 episodes in this post: ${s4.length}`);
      } else {
        console.log('  No episode array found on details.');
      }
    } catch (err) {
      console.log('  Error extracting details:', err.message);
    }
  }
}

run();
