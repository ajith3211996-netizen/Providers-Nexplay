# Sync scrapers and provider utilities FROM Providers-Nexplay INTO Stitch-nexplay
$dest = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils"
$providersDest = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\providers"
$configDest = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay"

Write-Host "Syncing updated scrapers and modular providers FROM Providers-Nexplay into Stitch-nexplay..." -ForegroundColor Cyan

if (-not (Test-Path $dest)) {
    Write-Host "⚠️ Destination directory $dest not found!" -ForegroundColor Red
    exit 1
}

# 1. Sync modular src/providers hierarchy
if (Test-Path "src\providers") {
    if (-not (Test-Path $providersDest)) {
        New-Item -ItemType Directory -Path $providersDest -Force | Out-Null
    }
    Copy-Item -Path "src\providers\*" -Destination $providersDest -Recurse -Force
    Write-Host " -> Synced modular src\providers\ hierarchy" -ForegroundColor Green
}

# 2. Sync src/utils and backward compatibility shims
$files = @(
    "ScraperEngine.js",
    "Movies4uProvider.js",
    "TamilDhoolProvider.js",
    "TamilGunProvider.js",
    "extractor.js",
    "ExtensionManager.js",
    "ProviderBundles.js",
    "ProviderUpdateManager.js",
    "DnsResolver.js"
)

foreach ($f in $files) {
    if (Test-Path "src\utils\$f") {
        Copy-Item -Path "src\utils\$f" -Destination "$dest\$f" -Force
        Write-Host " -> Synced src\utils\$f" -ForegroundColor Green
    }
}

# 3. Sync manifest.json
if (Test-Path "manifest.json") {
    Copy-Item -Path "manifest.json" -Destination "$configDest\manifest.json" -Force
    Write-Host " -> Synced manifest.json" -ForegroundColor Green
}

Write-Host "✅ Successfully synced files from Providers-Nexplay into Stitch-nexplay!" -ForegroundColor Green
