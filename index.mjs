/**
 * Providers-Nexplay
 * Complete Scraper Engine, Stream Resolvers, and Provider Services
 */

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

// Movies4u Provider & JS Unpacker
export { 
  Movies4u, 
  Movies4uClient, 
  unpack 
} from './src/utils/Movies4uProvider.js';

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

