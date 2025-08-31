# Generate embedded data file
$outputFile = "js\data-embedded.js"
$jsContent = "// Auto-generated embedded data`nconst ITINERARY_DATA = {`n"

# Read all JSON files
for ($i = 0; $i -le 16; $i++) {
    $paddedDay = $i.ToString().PadLeft(2, '0')
    $filePath = "data\day-$paddedDay.json"
    
    if (Test-Path $filePath) {
        $jsonContent = Get-Content $filePath -Raw
        try {
            # Try to parse JSON to validate it
            $jsonObject = $jsonContent | ConvertFrom-Json
            $jsContent += "  $i`: $jsonContent,`n"
        }
        catch {
            Write-Error "Invalid JSON in $filePath`: $($_.Exception.Message)"
        }
    }
}

$jsContent += "};`n"

Set-Content $outputFile $jsContent
Write-Host "Generated $outputFile with embedded data"
