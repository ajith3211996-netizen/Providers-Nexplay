/**
 * Providers-Nexplay
 * Complete Scraper Engine, Stream Resolvers, and Provider Services
 */

// Core Extension Manager & Strict Provider Routing
export { ExtensionManager } from './src/utils/ExtensionManager.js';

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

// TMDB Metadata & Search API
export { 
  getMovieDetails, 
  getTVShowDetails, 
  getSeasonDetails, 
  searchMulti 
} from './src/utils/api.js';
