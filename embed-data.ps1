# Generate embedded data file
$outputFile = "js\data-embedded.js"
$jsContent = "const itineraryData = {`n"

# Read all JSON files
for ($i = 0; $i -le 17; $i++) {
    $paddedDay = $i.ToString().PadLeft(2, '0')
    $filePath = "data\day-$paddedDay.json"
      if (Test-Path $filePath) {
        $jsonContent = Get-Content $filePath -Raw
        try {
            # Try to parse JSON to validate it
            $jsonObject = $jsonContent | ConvertFrom-Json
            $jsContent += "`"day$paddedDay`": $jsonContent,`n"
        }
        catch {
            Write-Error "Invalid JSON in $filePath`: $($_.Exception.Message)"
        }
    }
}

$jsContent += "};`n`n"
$jsContent += "if (typeof module !== 'undefined' && module.exports) {`n    module.exports = itineraryData;`n}`n"

Set-Content $outputFile $jsContent
Write-Host "Generated $outputFile with embedded data"
