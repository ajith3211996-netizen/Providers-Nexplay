# TamilDhool Provider for Stitch-Nexplay

High-performance provider and direct stream extractor for **`tamildhool.tech`**, designed specifically for seamless drop-in integration with the **`Stitch-nexplay`** Android / React Native app.

---

## Architecture & Compatibility

This provider implements the exact same provider contract used by `HDHub4u` and `FourKHDHub` in `Stitch-nexplay`:

| Method | Return Type / Purpose | Stitch-Nexplay Caller |
| :--- | :--- | :--- |
| `search(query, customHttpGet?)` | `TamilDhoolSearchResult[]` | `ExtensionManager.getSearchPosts()` |
| `extractDetails(link, season?, customHttpGet?)` | `TamilDhoolDetails` | `ExtensionManager.getMeta()` |
| `getPlayableStream(link, isTV?, ep?, season?, customHttpGet?)` | `TamilDhoolPlayableStream` | `ExtensionManager.getPlayableStream()` & `MovieDetailScreen.js` |
| `resolveLink(rawUrl)` | `TamilDhoolStreamLink[]` | `UniversalScraper.resolveLink()` |

### Playback Compatibility (Media3 ExoPlayer / Expo Video)
Returns direct HLS streams (`.m3u8`) with the pre-configured headers required by Bunny CDN:
```json
{
  "Referer": "https://futuregentrends.com/",
  "Origin": "https://futuregentrends.com",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
}
```
In `MovieDetailScreen.js`, these headers are automatically passed to `player.replaceAsync({ uri, headers, contentType: 'hls' })`.

---

## Integration into Stitch-Nexplay

### Step 1: Copy Provider File
Copy [`dist/TamilDhoolProvider.js`](file:///c:/Users/Ajo/Desktop/Android%20Projects/Tamildhool%20provider/dist/TamilDhoolProvider.js) into your `Stitch-nexplay` project:
```powershell
Copy-Item "C:\Users\Ajo\Desktop\Android Projects\Tamildhool provider\dist\TamilDhoolProvider.js" "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils\"
```

### Step 2: Register in `ScraperEngine.js`
In `Stitch-nexplay/src/utils/ScraperEngine.js`, import and export `TamilDhool`:
```js
import { TamilDhool, TamilDhoolClient } from './TamilDhoolProvider.js';

export {
  HDHub4u,
  FourKHDHub,
  TamilDhool,        // <-- Add here
  TamilDhoolClient,  // <-- Add here
  UniversalScraper
};
```

### Step 3: Register in `ExtensionManager.js`
In `Stitch-nexplay/src/utils/ExtensionManager.js`:

1. **Import `TamilDhool`**:
   ```js
   import { HDHub4u, FourKHDHub, TamilDhool, UniversalScraper } from './ScraperEngine.js';
   ```

2. **Update `getSearchPosts`**:
   ```js
   const engine = provider === 'tamildhool' 
     ? TamilDhool 
     : (provider === 'hdhub4u' ? HDHub4u : FourKHDHub);
   ```

3. **Update `getPlayableStream`**:
   ```js
   const engine = link.includes('tamildhool') 
     ? TamilDhool 
     : (link.includes('4khdhub') ? FourKHDHub : HDHub4u);
   ```

4. **In `MovieDetailScreen.js` Server Selection**:
   Add **TamilDhool (Serials & Shows)** to your server list:
   ```js
   const SERVERS = [
     { id: 'hdhub4u', name: 'Server 1 (HDHub4u)', short: 'HDHub4u' },
     { id: '4khdhub', name: 'Server 2 (4KHDHub)', short: '4KHDHub' },
     { id: 'tamildhool', name: 'Server 3 (TamilDhool)', short: 'TamilDhool' }
   ];
   ```

---

## Standalone Usage & Exact Date / Serial Matching

### Search and Play Serial Episode by Name & Date:

```ts
import { TamilGun, TamilDhool } from './dist/index.js';

// 1. Direct match by Name + Date + Channel
const episodeStream = await TamilGun.findEpisodeByDate(
  "Siragadikka Aasai", 
  "15-09-2026", 
  "Vijay TV"
);

console.log("Matched Title:", episodeStream.matchedTitle);
console.log("Direct M3U8:", episodeStream.streamUrl);
console.log("Headers for Media3:", episodeStream.headers);
// Output:
// Stream URL: https://m3u8-play-151024.playallu.xyz/m3u8/tp1-tsv1/...
// Headers: { Referer: 'https://play.playallu.xyz/', Origin: 'https://play.playallu.xyz', ... }

// 2. Bigg Boss yesterday or specific day episode:
const bbStream = await TamilGun.findEpisodeByDate("Bigg Boss", "yesterday");
console.log("Bigg Boss Yesterday Stream:", bbStream.streamUrl);

// 3. Supported Date Formats:
// - "15-09-2026", "15-09-26", "15/09/2026"
// - "15th Sep", "15 Sep 2026"
// - "yesterday", "today"
```
