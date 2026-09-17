const metaTokens = new Set([
  'season', 'series', 'complete', 'all', 'episodes', 'episode', 'pack', 'dual', 'audio', 'hindi', 'english',
  'tamil', 'telugu', 'malayalam', 'kannada', 'korean', 'japanese', 'chinese', 'french', 'spanish', 'german',
  'org', 'web', 'dl', 'bluray', 'hdrip', 'webrip', 'webdl', 'full', 'movie', 'amzn', 'netflix', 'hbo', 'hotstar',
  'prime', 'video', 'amazon', 'disney', 'sonyliv', 'zee5', 'jio', 'hulu', 'apple', 'appletv', 'paramount',
  'peacock', 'max', 'mgm', 'mgmp', 'original', 'with', 'subtitles', 'subtitle', 'esub', 'esubs', 'uncut',
  'extended', 'directors', 'cut', 'edition', 'proper', 'repack', 'hevc', 'x264', 'x265', '1080p', '720p',
  '480p', '2160p', '4k', 'remux', 'hdr', 'dv', 'atmos', 'dts', 'ddp5', 'dd5'
]);

import { calculateTitleMatchScore } from '../src/utils/ScraperEngine.js';

console.log('Testing with expanded metaTokens:');
const candidateTitle = "From (Season 1–4) Dual Audio [Hindi ORG. + English] Complete Amazon Prime Video WEB Series 480p | 720p | 1080p WEB-DL";
console.log('Current score:', calculateTitleMatchScore('From', 2022, 'tv', candidateTitle, '', 'tv', 1, 'https://new6.movies4u.clinic/from-season-1-4-dual-audio-hindi-org-english-complete-amazon-prime-video-web-series-web-dl/'));
