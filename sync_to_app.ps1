# Sync updated scraper engine and providers back to Stitch-nexplay
$destination = "C:\Users\Ajo\Desktop\Android Projects\Stitch-nexplay\src\utils"

Write-Host "Syncing updated scrapers to $destination..." -ForegroundColor Cyan

Copy-Item -Path "src\utils\ScraperEngine.js" -Destination "$destination\ScraperEngine.js" -Force
Copy-Item -Path "src\utils\Movies4uProvider.js" -Destination "$destination\Movies4uProvider.js" -Force
Copy-Item -Path "src\utils\ExtensionManager.js" -Destination "$destination\ExtensionManager.js" -Force
Copy-Item -Path "src\utils\DnsResolver.js" -Destination "$destination\DnsResolver.js" -Force
Copy-Item -Path "src\utils\ProviderBundles.js" -Destination "$destination\ProviderBundles.js" -Force

Write-Host "✅ Scrapers successfully synced back to Stitch-nexplay!" -ForegroundColor Green
