# PowerShell script to generate remaining day template files
$locations = @("Tokyo", "Tokyo", "Tokyo", "Tokyo", "Nikko", "Tokyo", "Kyoto", "Kyoto", "Kyoto", "Nara", "Osaka", "Osaka", "Hiroshima", "Miyajima", "Tokyo", "Tokyo")
$dates = @(
    "Tuesday, November 26, 2025",
    "Wednesday, November 27, 2025", 
    "Thursday, November 28, 2025",
    "Friday, November 29, 2025",
    "Saturday, November 30, 2025",
    "Sunday, December 1, 2025",
    "Monday, December 2, 2025",
    "Tuesday, December 3, 2025",
    "Wednesday, December 4, 2025",
    "Thursday, December 5, 2025",
    "Friday, December 6, 2025",
    "Saturday, December 7, 2025",
    "Sunday, December 8, 2025",
    "Monday, December 9, 2025",
    "Tuesday, December 10, 2025",
    "Wednesday, December 11, 2025"
)

# Days that don't exist yet: 5, 6, 8, 9, 10, 11, 12, 13, 14, 15
$missingDays = @(5, 6, 8, 9, 10, 11, 12, 13, 14, 15)

foreach ($day in $missingDays) {
    $paddedDay = $day.ToString("00")
    $location = $locations[$day - 1]
    $date = $dates[$day - 1]
    
    $jsonContent = @"
{
    "day": $day,
    "date": "$date",
    "location": "$location",
    "weather": "Check forecast closer to date",
    "description": "Day $day in $location. Plan your activities and experiences here.",
    "activities": [
        {
            "time": "09:00",
            "description": "Morning activity - add your plans here"
        },
        {
            "time": "12:00",
            "description": "Lunch and midday exploration"
        },
        {
            "time": "15:00",
            "description": "Afternoon activity"
        },
        {
            "time": "18:00",
            "description": "Evening activity and dinner"
        }
    ],
    "transportation": "Add transportation details",
    "accommodation": "Add accommodation details", 
    "meals": "Plan your meals here",
    "budget": "Estimate daily budget",
    "notes": "Add any special notes, reservations, or reminders for this day"
}
"@

    $filePath = "data\day-$paddedDay.json"
    $jsonContent | Out-File -FilePath $filePath -Encoding UTF8
    Write-Host "✅ Created $filePath" -ForegroundColor Green
}

Write-Host "`n🎉 All template files created!" -ForegroundColor Yellow
Write-Host "📝 You can now edit each day's JSON file to customize your itinerary." -ForegroundColor Cyan
