#!/usr/bin/env node

/**
 * Providers-Nexplay Interactive CLI Stream Resolver
 * 
 * Usage:
 *   node runner.mjs "Deadpool & Wolverine" --year 2024
 *   node runner.mjs "The Boys" --year 2019 --tv --season 4 --episode 1
 *   node runner.mjs "Stree 2" --server 1
 */

import { ExtensionManager } from './src/utils/ExtensionManager.js';
import { HDHub4u, FourKHDHub, ClientUtils } from './src/utils/ScraperEngine.js';
import { Movies4u } from './src/utils/Movies4uProvider.js';

const args = process.argv.slice(2);

function parseArgs() {
  const options = {
    query: '',
    year: null,
    isTV: false,
    season: 1,
    episode: 1,
    server: 'all'
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--year' || arg === '-y') {
      options.year = parseInt(args[++i], 10);
    } else if (arg === '--tv' || arg === '-t') {
      options.isTV = true;
    } else if (arg === '--season' || arg === '-s') {
      options.season = parseInt(args[++i], 10);
    } else if (arg === '--episode' || arg === '-e' || arg === '--ep') {
      options.episode = parseInt(args[++i], 10);
    } else if (arg === '--server') {
      options.server = args[++i];
    } else if (!arg.startsWith('-') && !options.query) {
      options.query = arg;
    }
  }

  return options;
}

async function probeUrl(url, headers = {}) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Range': 'bytes=0-1024',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        ...headers
      },
      signal: controller.signal
    });
    clearTimeout(timeout);
    return { ok: res.ok || res.status === 206, status: res.status, mime: res.headers.get('content-type') };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

async function main() {
  const options = parseArgs();

  console.log('===============================================================');
  console.log('       NEXPLAY PROVIDERS & STREAM RESOLUTION ENGINE            ');
  console.log('===============================================================\n');

  if (!options.query) {
    console.log('No title specified. Running demonstration across sample media...\n');
    const demoItems = [
      { title: 'Deadpool & Wolverine', year: 2024, isTV: false, season: 1, ep: 1 },
      { title: 'The Boys', year: 2019, isTV: true, season: 4, ep: 1 },
      { title: 'Stree 2', year: 2024, isTV: false, season: 1, ep: 1 }
    ];

    for (const item of demoItems) {
      await resolveTitle(item.title, item.year, item.isTV, item.season, item.ep, 'all');
      console.log('---------------------------------------------------------------\n');
    }
    return;
  }

  await resolveTitle(options.query, options.year, options.isTV, options.season, options.episode, options.server);
}

async function resolveTitle(title, year, isTV, season, episode, serverChoice) {
  const mediaObj = {
    id: 1001,
    title: !isTV ? title : undefined,
    name: isTV ? title : undefined,
    release_date: !isTV && year ? `${year}-01-01` : undefined,
    first_air_date: isTV && year ? `${year}-01-01` : undefined,
    media_type: isTV ? 'tv' : 'movie'
  };

  console.log(`🎬 Target: "${title}" [Year: ${year || 'N/A'}] [Type: ${isTV ? `TV Series S${season}E${episode}` : 'Movie'}]`);

  const serversToTest = serverChoice === 'all' 
    ? [1, 2, 3] 
    : [parseInt(serverChoice, 10)];

  for (const s of serversToTest) {
    const sName = s === 1 ? 'Server 1 (HDHub4u)' : s === 2 ? 'Server 2 (4KHDHub)' : 'Server 3 (Movies4u)';
    console.log(`\n  📡 Probing ${sName}...`);
    const startTime = Date.now();

    try {
      const stream = await ExtensionManager.resolveMediaStream(
        mediaObj, 
        s, 
        isTV ? season : 1, 
        isTV ? episode : 1
      );

      const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

      if (stream && stream.streamUrl) {
        console.log(`  ✅ [${elapsed}s] Resolved Direct Stream:`);
        console.log(`     - Quality: ${stream.quality || '4K'}`);
        console.log(`     - Server:  ${stream.server || 'Direct'}`);
        console.log(`     - Stream:  ${stream.streamUrl}`);
        if (stream.qualities && Object.keys(stream.qualities).length > 0) {
          console.log(`     - Qualities Available: ${Object.keys(stream.qualities).join(', ')}`);
        }

        const probe = await probeUrl(stream.streamUrl, stream.headers);
        console.log(`     - Probe:   ${probe.ok ? `HTTP ${probe.status} (PLAYABLE)` : `Probe failed (${probe.error || probe.status})`}`);
      } else {
        console.log(`  🔒 [${elapsed}s] Title unavailable on this provider (Strict Server Isolation).`);
      }
    } catch (err) {
      console.log(`  🔒 [${((Date.now() - startTime) / 1000).toFixed(2)}s] ${err.message}`);
    }
  }
}

main().catch(console.error);
