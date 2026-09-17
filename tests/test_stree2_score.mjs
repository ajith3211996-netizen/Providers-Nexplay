import { calculateTitleMatchScore } from '../src/utils/ScraperEngine.js';

const targetTitle = 'Stree 2';
const targetYear = 2024;
const candidateTitle = 'Stree 2: Sarkate Ka Aatank (2024) DS4K WEB-DL [Hindi DD5.1] 4K 1080p 720p & 480p [x264/10Bit-HEVC] | Full Movie';
const candidateUrl = 'https://new5.hdhub4u.cl/stree-2-sarkate-ka-aatank-2024-hindi-webrip-full-movie/';

const score = calculateTitleMatchScore(targetTitle, targetYear, 'movie', candidateTitle, '2024', 'movie', null, candidateUrl);
console.log(`Score for Stree 2: ${score}`);
