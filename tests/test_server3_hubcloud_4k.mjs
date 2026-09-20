import { Movies4u } from '../src/utils/Movies4uProvider.js';

async function runTests() {
    console.log('========================================================================');
    console.log('TESTING SERVER 3 (MOVIES4U) - HUBCLOUD ONLY - 4K, 1080P, 720P');
    console.log('========================================================================\n');

    // Test 1: Movie Deadpool (2016)
    console.log('[Test 1] Movie: Deadpool (2016)');
    const t0 = Date.now();
    const movieHits = await Movies4u.search('Deadpool 2016');
    if (movieHits[0]) {
        const stream = await Movies4u.getPlayableStream(movieHits[0].url, false);
        const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
        console.log(` -> Resolved in: ${elapsed}s`);
        console.log(` -> Default Quality: ${stream.quality}`);
        console.log(` -> Server: ${stream.server}`);
        console.log(` -> Qualities Present:`, Object.keys(stream.qualities));
        for (const [q, url] of Object.entries(stream.qualities)) {
            console.log(`    - [${q}]: ${url.slice(0, 90)}...`);
        }
    }

    // Test 2: Movie Obsession (2026)
    console.log('\n[Test 2] Movie: Obsession (2026)');
    const t1 = Date.now();
    const obsHits = await Movies4u.search('Obsession 2026');
    if (obsHits[0]) {
        const stream = await Movies4u.getPlayableStream(obsHits[0].url, false);
        const elapsed = ((Date.now() - t1) / 1000).toFixed(2);
        console.log(` -> Resolved in: ${elapsed}s`);
        console.log(` -> Default Quality: ${stream.quality}`);
        console.log(` -> Server: ${stream.server}`);
        console.log(` -> Qualities Present:`, Object.keys(stream.qualities));
        for (const [q, url] of Object.entries(stream.qualities)) {
            console.log(`    - [${q}]: ${url.slice(0, 90)}...`);
        }
    }

    // Test 3: Series Reacher S01E02 (Has 4K, 1080p, 720p)
    console.log('\n[Test 3] Series: Reacher S01E02');
    const t2 = Date.now();
    const reacherHits = await Movies4u.search('Reacher');
    if (reacherHits[0]) {
        const stream = await Movies4u.getPlayableStream(reacherHits[0].url, true, 2, 1);
        const elapsed = ((Date.now() - t2) / 1000).toFixed(2);
        console.log(` -> Resolved in: ${elapsed}s`);
        console.log(` -> Default Quality: ${stream.quality}`);
        console.log(` -> Server: ${stream.server}`);
        console.log(` -> Qualities Present:`, Object.keys(stream.qualities));
        for (const [q, url] of Object.entries(stream.qualities)) {
            console.log(`    - [${q}]: ${url.slice(0, 90)}...`);
        }
    }

    // Test 4: Series Reacher S04E02
    console.log('\n[Test 4] Series: Reacher S04E02');
    const t3 = Date.now();
    if (reacherHits[0]) {
        const stream = await Movies4u.getPlayableStream(reacherHits[0].url, true, 2, 4);
        const elapsed = ((Date.now() - t3) / 1000).toFixed(2);
        console.log(` -> Resolved in: ${elapsed}s`);
        console.log(` -> Default Quality: ${stream?.quality}`);
        console.log(` -> Server: ${stream?.server}`);
        console.log(` -> Qualities Present:`, Object.keys(stream?.qualities || {}));
        for (const [q, url] of Object.entries(stream?.qualities || {})) {
            console.log(`    - [${q}]: ${url.slice(0, 90)}...`);
        }
    }
}

runTests().catch(console.error);
