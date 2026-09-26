/**
 * Providers-Nexplay
 * Complete Scraper Engine, Stream Resolvers, and Provider Services
 */

// Modular Provider Catalog & Registry
export {
  PROVIDERS,
  getProviderById,
  getAllProviders
} from './src/providers/index.js';

// Core Extension Manager, Strict Provider Routing & Dynamic OTA Updates
export { ExtensionManager, ProviderUpdateManager } from './src/utils/ExtensionManager.js';
export { ProviderUpdateManager as UpdateManager } from './src/utils/ProviderUpdateManager.js';

// Individual Scraper Engines & Helpers
export { 
  HDHub4u, 
  FourKHDHub, 
  UniversalScraper, 
  ClientUtils,
  calculateTitleMatchScore,
  findBestMatch,
  cleanTitleKeywords,
  normalizeString
} from './src/utils/ScraperEngine.js';

// Server 3: Movies4u Provider & JS Unpacker
export { 
  Movies4u, 
  Movies4uClient, 
  unpack 
} from './src/providers/movies4u/index.js';

// Server 4: TamilDhool Provider & Bunny CDN Extractor
export {
  TamilDhool,
  TamilDhoolClient,
  parseMediaRequest,
  buildProviderUrl,
  extractStreamsFromHtml
} from './src/providers/tamildhool/index.js';

// Server 5: TamilGun / Arivumani Provider & PlayAllu Decryptor
export {
  TamilGun,
  TamilGunClient,
  REQUIRED_PLAYALLU_HEADERS,
  REQUIRED_BUNNY_HEADERS
} from './src/providers/tamilgun/index.js';

// Shared Serial Date Parser
export { parseDateInput } from './src/providers/common/index.js';

// DNS-over-HTTPS & ISP Bypass Engine
export { 
  resolveDomain, 
  resolveUrlWithDoh, 
  DNS_PROVIDERS 
} from './src/utils/DnsResolver.js';

// Provider Bundles & WebView Scripts
export { 
  ScraperClientBundle, 
  ProviderBundles 
} from './src/utils/ProviderBundles.js';

// Audio Track Selector & Player Settings Controller
export { 
  selectOptimalDefaultAudioTrack,
  getTrackDisplayLabel,
  stripWebsitesAndJunk,
  extractCleanLanguage,
  INDIAN_LANGUAGES,
  LANGUAGE_NAMES
} from './src/utils/AudioTrackSelector.js';
export { PlayerSettingsController } from './src/utils/PlayerSettingsController.js';

// TMDB Metadata & Search API
export { 
  fetchMediaDetails, 
  fetchTvSeasonEpisodes, 
  searchMulti 
} from './src/utils/api.js';
