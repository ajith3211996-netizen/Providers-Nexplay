# NexPlay Scraper Engine & Providers Service

Standalone, high-speed multi-provider scraping and direct stream resolution engine for **NexPlay**.

---

## 🚀 Providers Included

| Provider | Identifier | Domain | Focus & Content | Resolution Speed |
| :--- | :--- | :--- | :--- | :--- |
| **Server 1** | `hdhub4u` | `https://new5.hdhub4u.cl` | Indian Regional, Bollywood, Dual-Audio, 4K & 1080p Movies & Series | ~1.2s - 2.5s |
| **Server 2** | `4khdhub` | `https://4khdhub.one` | Hollywood, 4K HDR, Multi-Season TV Series, KDramas | ~0.8s - 2.0s |
| **Server 3** | `movies4u` | `https://movies4u.co` | Global Movies, TV Series, Fast Direct Mirrors | ~1.0s - 2.2s |

---

## 📁 Directory Structure

```
Providers-Nexplay/
├── package.json               # Package manifests & test/sync scripts
├── index.mjs                  # Primary ES Module exports
├── runner.mjs                 # Interactive CLI stream probe & resolution tool
├── sync_to_app.ps1            # Auto-sync updated scrapers back to Stitch-nexplay
├── README.md                  # Complete documentation
├── src/
│   ├── utils/
│   │   ├── ScraperEngine.js       # Core scraper (HDHub4u, 4KHDHub, HubCloud, GDFlix, DDrive, FastDL)
│   │   ├── Movies4uProvider.js    # Movies4u Provider & P.A.C.K.E.R. JS Unpacker
│   │   ├── ExtensionManager.js    # Strict server routing & media match orchestrator
│   │   ├── DnsResolver.js         # DNS-over-HTTPS (DoH) engine to bypass ISP blocks
│   │   ├── ProviderBundles.js     # Standalone scraper bundles for WebView execution
│   │   ├── api.js                 # TMDB Metadata API client
│   │   ├── permissions.js         # Permission helpers
│   │   └── responsive.js          # Layout calculation utilities
│   └── config/
│       └── tmdb.js                # TMDB API keys and endpoint configuration
└── tests/
    ├── test_deep_diagnostics.mjs  # Automated test suite across movies & multi-season series
    ├── test_servers.mjs           # Quick verification across Server 1, 2, and 3
    ├── test_s1_s2.mjs             # Server 1 & Server 2 comparison tests
    ├── test_m4u.mjs               # Server 3 Movies4u stream tests
    ├── test_strict_servers.mjs    # Strict server isolation & zero-fallback verification
    └── ... (individual diagnostic test scripts)
```

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Comprehensive Diagnostics Test
```bash
npm test
```

### 3. Resolve Streams via CLI
```bash
# Resolve a Movie across all servers:
node runner.mjs "Deadpool & Wolverine" --year 2024

# Resolve a specific TV Episode:
node runner.mjs "The Boys" --year 2019 --tv --season 4 --episode 1

# Query a specific server (1 = HDHub4u, 2 = 4KHDHub, 3 = Movies4u):
node runner.mjs "Stree 2" --year 2024 --server 1
```

### 4. Sync Updates Back to Main App (`Stitch-nexplay`)
Once you test and refine any scrapers here, sync them directly back into `Stitch-nexplay` with:
```bash
npm run sync
```

---

## 💻 Programmatic Usage

```javascript
import { ExtensionManager } from './index.mjs';

// Media object (from TMDB or manual)
const media = {
  id: 533535,
  title: 'Deadpool & Wolverine',
  release_date: '2024-07-24',
  media_type: 'movie'
};

// Resolve stream from Server 1 (HDHub4u)
const streamS1 = await ExtensionManager.resolveMediaStream(media, 1);
console.log('Server 1 Stream:', streamS1.streamUrl);

// Resolve TV Show Episode from Server 2 (4KHDHub)
const tvShow = {
  id: 76479,
  name: 'The Boys',
  first_air_date: '2019-07-26',
  media_type: 'tv'
};
const streamS2 = await ExtensionManager.resolveMediaStream(tvShow, 2, 4, 1); // Season 4, Episode 1
console.log('Server 2 Stream:', streamS2.streamUrl);
```
