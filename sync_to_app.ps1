# Sync scrapers and provider utilities FROM Providers-Nexplay INTO Stitch-nexplay
$dest = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils"
$configDest = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay"

Write-Host "Syncing updated scrapers FROM Providers-Nexplay into Stitch-nexplay..." -ForegroundColor Cyan

if (-not (Test-Path $dest)) {
    Write-Host "⚠️ Destination directory $dest not found!" -ForegroundColor Red
    exit 1
}

$files = @(
    "ScraperEngine.js",
    "Movies4uProvider.js",
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

if (Test-Path "manifest.json") {
    Copy-Item -Path "manifest.json" -Destination "$configDest\manifest.json" -Force
    Write-Host " -> Synced manifest.json" -ForegroundColor Green
}

Write-Host "✅ Successfully synced files from Providers-Nexplay into Stitch-nexplay!" -ForegroundColor Green
