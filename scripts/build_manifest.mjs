#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const manifestPath = resolve(rootDir, 'manifest.json');
const packagePath = resolve(rootDir, 'package.json');

try {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'));
  let manifest = {};
  
  try {
    manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  } catch {
    manifest = { schemaVersion: 1 };
  }

  let commitSha = 'main';
  try {
    commitSha = execSync('git rev-parse --short HEAD', { cwd: rootDir }).toString().trim();
  } catch (e) {
    console.warn('[BuildManifest] Could not read git commit SHA, using "main".');
  }

  const args = process.argv.slice(2);
  let newVersion = pkg.version || '1.0.0';

  if (args.includes('--bump-patch')) {
    const parts = newVersion.split('.').map(Number);
    parts[2] = (parts[2] || 0) + 1;
    newVersion = parts.join('.');
  } else if (args.includes('--bump-minor')) {
    const parts = newVersion.split('.').map(Number);
    parts[1] = (parts[1] || 0) + 1;
    parts[2] = 0;
    newVersion = parts.join('.');
  }

  pkg.version = newVersion;
  writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');

  manifest.schemaVersion = 1;
  manifest.version = newVersion;
  manifest.updatedAt = new Date().toISOString();
  manifest.commitSha = commitSha;

  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
  console.log(`✅ manifest.json successfully built! Version: ${newVersion}, Commit: ${commitSha}, UpdatedAt: ${manifest.updatedAt}`);
} catch (err) {
  console.error('❌ Failed to build manifest.json:', err);
  process.exit(1);
}
