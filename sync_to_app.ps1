# Sync updated scraper engine and providers back to Stitch-nexplay
$destination = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils"
$configDestination = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay"

Write-Host "Syncing updated scrapers and OTA Update Manager to $destination..." -ForegroundColor Cyan

if (-not (Test-Path $destination)) {
    New-Item -ItemType Directory -Force -Path $destination | Out-Null
}

Copy-Item -Path "src\utils\ScraperEngine.js" -Destination "$destination\ScraperEngine.js" -Force
Copy-Item -Path "src\utils\Movies4uProvider.js" -Destination "$destination\Movies4uProvider.js" -Force
Copy-Item -Path "src\utils\ExtensionManager.js" -Destination "$destination\ExtensionManager.js" -Force
Copy-Item -Path "src\utils\DnsResolver.js" -Destination "$destination\DnsResolver.js" -Force
Copy-Item -Path "src\utils\ProviderBundles.js" -Destination "$destination\ProviderBundles.js" -Force
Copy-Item -Path "src\utils\ProviderUpdateManager.js" -Destination "$destination\ProviderUpdateManager.js" -Force
Copy-Item -Path "manifest.json" -Destination "$configDestination\manifest.json" -Force

Write-Host "✅ Scrapers and OTA Update Manager successfully synced back to Stitch-nexplay!" -ForegroundColor Green
