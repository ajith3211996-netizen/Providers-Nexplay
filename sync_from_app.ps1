# Sync scrapers and provider utilities FROM Stitch-nexplay INTO Providers-Nexplay
$source = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils"
$configSource = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay"

Write-Host "Syncing updated scrapers FROM Stitch-nexplay into Providers-Nexplay..." -ForegroundColor Cyan

if (-not (Test-Path $source)) {
    Write-Host "⚠️ Source directory $source not found!" -ForegroundColor Red
    exit 1
}

# Ensure destination directory exists
if (-not (Test-Path "src\utils")) {
    New-Item -ItemType Directory -Force -Path "src\utils" | Out-Null
}

if (Test-Path "$source\ScraperEngine.js") {
    Copy-Item -Path "$source\ScraperEngine.js" -Destination "src\utils\ScraperEngine.js" -Force
}
if (Test-Path "$source\Movies4uProvider.js") {
    Copy-Item -Path "$source\Movies4uProvider.js" -Destination "src\utils\Movies4uProvider.js" -Force
}
if (Test-Path "$source\ExtensionManager.js") {
    Copy-Item -Path "$source\ExtensionManager.js" -Destination "src\utils\ExtensionManager.js" -Force
}
if (Test-Path "$source\DnsResolver.js") {
    Copy-Item -Path "$source\DnsResolver.js" -Destination "src\utils\DnsResolver.js" -Force
}
if (Test-Path "$source\ProviderBundles.js") {
    Copy-Item -Path "$source\ProviderBundles.js" -Destination "src\utils\ProviderBundles.js" -Force
}
if (Test-Path "$source\ProviderUpdateManager.js") {
    Copy-Item -Path "$source\ProviderUpdateManager.js" -Destination "src\utils\ProviderUpdateManager.js" -Force
}
if (Test-Path "$source\AudioTrackSelector.js") {
    Copy-Item -Path "$source\AudioTrackSelector.js" -Destination "src\utils\AudioTrackSelector.js" -Force
}
if (Test-Path "$source\PlayerSettingsController.js") {
    Copy-Item -Path "$source\PlayerSettingsController.js" -Destination "src\utils\PlayerSettingsController.js" -Force
}
if (Test-Path "$configSource\manifest.json") {
    Copy-Item -Path "$configSource\manifest.json" -Destination "manifest.json" -Force
}
if (Test-Path "$configSource\version.json") {
    Copy-Item -Path "$configSource\version.json" -Destination "version.json" -Force
}

Write-Host "✅ Successfully synced files from Stitch-nexplay into Providers-Nexplay!" -ForegroundColor Green
