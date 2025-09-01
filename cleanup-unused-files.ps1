# Japan Trip - Cleanup Unused Files
# This script removes development artifacts and unused files

Write-Host "🧹 Cleaning up unused files in Japan Trip project..." -ForegroundColor Green

# Files to keep (essential for the website)
$keepFiles = @(
    "index.html",
    "README.md",
    "embed-data.ps1",
    ".git",
    "data",
    "js",
    "styles",
    "assets"
)

# Documentation/completion files to remove
$docFiles = @(
    "AIRBNB_INTEGRATION_COMPLETE.md",
    "ANA_BOOKING_LINKS_COMPLETE.md", 
    "ANA_FLIGHT_UPDATE_COMPLETE.md",
    "COLOR_PALETTE_UPDATE.md",
    "CORS_FIX_COMPLETE.md",
    "CORS_FIX_INSTRUCTIONS.md",
    "CRITICAL_TRANSPORT_ENHANCED.md",
    "DARK_THEME_PALETTE.md",
    "DAY_2_SHRINE_HOPPING_COMPLETE.md",
    "DEPARTURE_TIME_FIX_COMPLETE.md",
    "ENHANCED_MAPS_COMPLETE.md",
    "ENHANCED_MAPS_TEST.md",
    "GOOGLE_MAPS_INTEGRATION.md",
    "MAPS_INTEGRATION_COMPLETE.md",
    "NAVIGATE_LINKS_COMPLETE.md",
    "ROUTINE_TRANSPORT_EXCLUSION_COMPLETE.md",
    "SETUP_COMPLETE.md",
    "SHINKANSEN_CRITICAL_INFO.md",
    "TRAVEL_ROUTES_COMPLETE.md",
    "TRAVEL_VERIFICATION_REPORT.md",
    "VISUAL_FEATURES_GUIDE.md"
)

# Unused development files
$devFiles = @(
    "create-templates.ps1",
    "embed-data.js",
    "generate-templates.js",
    "server.ps1",
    "simple-server.ps1",
    "test-json.html",
    "Reservation Details_ ANA.html",
    "Reservation Details_ ANA.pdf"
)

# Remove documentation files
Write-Host "`n📚 Removing documentation files..." -ForegroundColor Yellow
foreach ($file in $docFiles) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        Remove-Item $filePath -Force
        Write-Host "  ✅ Removed: $file" -ForegroundColor Green
    }
}

# Remove development files
Write-Host "`n🔧 Removing development files..." -ForegroundColor Yellow
foreach ($file in $devFiles) {
    $filePath = Join-Path $PSScriptRoot $file
    if (Test-Path $filePath) {
        Remove-Item $filePath -Force
        Write-Host "  ✅ Removed: $file" -ForegroundColor Green
    }
}

Write-Host "`n✨ Cleanup complete!" -ForegroundColor Green
Write-Host "`n📁 Remaining essential files:" -ForegroundColor Cyan
Write-Host "  • index.html (main website)"
Write-Host "  • README.md (project documentation)"
Write-Host "  • embed-data.ps1 (data regeneration script)"
Write-Host "  • data/ (itinerary JSON files)"
Write-Host "  • js/ (JavaScript functionality)"
Write-Host "  • styles/ (CSS styling)"
Write-Host "  • assets/ (images and resources)"
Write-Host "  • .git/ (version control)"

Write-Host "`n🌸 Your Japan Trip website is now clean and ready!" -ForegroundColor Magenta
