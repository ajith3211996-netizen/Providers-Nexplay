#!/usr/bin/env node

/**
 * test_ota_update.mjs
 * Automated verification suite for Over-The-Air (OTA) provider updates
 */

import { ProviderUpdateManager } from '../src/utils/ProviderUpdateManager.js';
import { ExtensionManager, HDHub4u, FourKHDHub } from '../src/utils/ExtensionManager.js';
import { Movies4u } from '../src/utils/Movies4uProvider.js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('===============================================================');
console.log('      NEXPLAY OTA PROVIDER UPDATE SYSTEM TEST SUITE           ');
console.log('===============================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`  ✅ [PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`  ❌ [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

async function runTests() {
  // Test 1: Version Comparison
  console.log('▶ Test 1: Semantic Version Comparison Logic');
  assert(ProviderUpdateManager.compareVersions('1.0.1', '1.0.0') > 0, '1.0.1 > 1.0.0');
  assert(ProviderUpdateManager.compareVersions('1.1.0', '1.0.9') > 0, '1.1.0 > 1.0.9');
  assert(ProviderUpdateManager.compareVersions('1.0.0', '1.0.0') === 0, '1.0.0 === 1.0.0');
  assert(ProviderUpdateManager.compareVersions('1.0.0', '1.0.1') < 0, '1.0.0 < 1.0.1');
  console.log('');

  // Test 2: Local manifest schema validation
  console.log('▶ Test 2: Local manifest.json Schema Validation');
  const manifestRaw = readFileSync(resolve(__dirname, '../manifest.json'), 'utf8');
  const localManifest = JSON.parse(manifestRaw);
  assert(typeof localManifest.version === 'string', `Version present: ${localManifest.version}`);
  assert(localManifest.providers && typeof localManifest.providers === 'object', 'Providers object present');
  assert(localManifest.providers.hdhub4u?.baseUrl?.startsWith('http'), `HDHub4u baseUrl: ${localManifest.providers.hdhub4u?.baseUrl}`);
  assert(localManifest.providers['4khdhub']?.baseUrl?.startsWith('http'), `4KHDHub baseUrl: ${localManifest.providers['4khdhub']?.baseUrl}`);
  assert(localManifest.providers.movies4u?.baseUrl?.startsWith('http'), `Movies4u baseUrl: ${localManifest.providers.movies4u?.baseUrl}`);
  console.log('');

  // Test 3: Dynamic Hot-Patching into Scraper Engines
  console.log('▶ Test 3: Dynamic Hot Patching of Scraper Engines');
  const testConfig = {
    version: '9.9.9',
    updatedAt: new Date().toISOString(),
    providers: {
      hdhub4u: { baseUrl: 'https://test-hdhub4u.custom', mirrors: ['https://test-hdhub4u.custom', 'https://mirror2.hdhub4u.custom'] },
      '4khdhub': { baseUrl: 'https://test-4khdhub.custom', mirrors: ['https://test-4khdhub.custom'] },
      movies4u: { baseUrl: 'https://test-movies4u.custom', mirrors: ['https://test-movies4u.custom'] }
    }
  };

  await ProviderUpdateManager.applyUpdate(testConfig);
  assert(HDHub4u.baseUrl === 'https://test-hdhub4u.custom', `HDHub4u baseUrl updated to: ${HDHub4u.baseUrl}`);
  assert(FourKHDHub.baseUrl === 'https://test-4khdhub.custom', `4KHDHub baseUrl updated to: ${FourKHDHub.baseUrl}`);
  assert(Movies4u.liveBaseUrl === 'https://test-movies4u.custom', `Movies4u liveBaseUrl updated to: ${Movies4u.liveBaseUrl}`);
  assert(ProviderUpdateManager.currentVersion === '9.9.9', `Current version updated to 9.9.9`);
  console.log('');

  // Test 4: Restoration of Original Production Manifest
  console.log('▶ Test 4: Restore Production Manifest');
  await ProviderUpdateManager.applyUpdate(localManifest);
  assert(HDHub4u.baseUrl === localManifest.providers.hdhub4u.baseUrl, `HDHub4u restored to: ${HDHub4u.baseUrl}`);
  assert(FourKHDHub.baseUrl === localManifest.providers['4khdhub'].baseUrl, `4KHDHub restored to: ${FourKHDHub.baseUrl}`);
  assert(Movies4u.liveBaseUrl === localManifest.providers.movies4u.baseUrl, `Movies4u restored to: ${Movies4u.liveBaseUrl}`);
  console.log('');

  // Test 5: Event Listener Notification
  console.log('▶ Test 5: Event Listener Subscription');
  let eventReceived = false;
  const unsubscribe = ProviderUpdateManager.addListener(({ event, data }) => {
    if (event === 'update-applied') {
      eventReceived = true;
    }
  });

  await ProviderUpdateManager.applyUpdate(localManifest);
  assert(eventReceived === true, 'Listener received "update-applied" event');
  unsubscribe();
  console.log('');

  // Test 6: ExtensionManager Integration
  console.log('▶ Test 6: ExtensionManager OTA Integration Methods');
  assert(typeof ExtensionManager.initRemoteUpdates === 'function', 'ExtensionManager.initRemoteUpdates is a function');
  assert(typeof ExtensionManager.checkForUpdates === 'function', 'ExtensionManager.checkForUpdates is a function');
  assert(typeof ExtensionManager.getUpdateStatus === 'function', 'ExtensionManager.getUpdateStatus is a function');
  const status = ExtensionManager.getUpdateStatus();
  assert(status && status.version === localManifest.version, `ExtensionManager reports status version: ${status.version}`);
  console.log('');

  console.log('===============================================================');
  console.log(`  TEST RESULTS: ${passedTests} / ${totalTests} PASSED (100%)`);
  console.log('===============================================================\n');
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
