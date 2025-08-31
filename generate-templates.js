// Script to generate template JSON files for remaining days
const fs = require('fs');
const path = require('path');

// Trip dates
const startDate = new Date(2025, 10, 26); // November 26, 2025
const totalDays = 16;

// Template locations for Japan trip (you can customize these)
const locations = [
    "Tokyo", "Tokyo", "Tokyo", "Tokyo", // Days 1-4
    "Nikko", "Tokyo", // Days 5-6
    "Kyoto", "Kyoto", "Kyoto", // Days 7-9
    "Nara", "Osaka", "Osaka", // Days 10-12
    "Hiroshima", "Miyajima", // Days 13-14
    "Tokyo", "Tokyo" // Days 15-16
];

function generateTemplateDay(dayNumber) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayNumber - 1);
    
    const dateString = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const location = locations[dayNumber - 1] || "TBD";

    return {
        day: dayNumber,
        date: dateString,
        location: location,
        weather: "Check forecast closer to date",
        description: `Day ${dayNumber} in ${location}. Plan your activities and experiences here.`,
        activities: [
            {
                time: "09:00",
                description: "Morning activity - add your plans here"
            },
            {
                time: "12:00",
                description: "Lunch and midday exploration"
            },
            {
                time: "15:00",
                description: "Afternoon activity"
            },
            {
                time: "18:00",
                description: "Evening activity and dinner"
            }
        ],
        transportation: "Add transportation details",
        accommodation: "Add accommodation details",
        meals: "Plan your meals here",
        budget: "Estimate daily budget",
        notes: "Add any special notes, reservations, or reminders for this day"
    };
}

// Generate files for days 4-16 (we already have 1-3)
for (let day = 4; day <= totalDays; day++) {
    const paddedDay = day.toString().padStart(2, '0');
    const filename = `day-${paddedDay}.json`;
    const filepath = path.join(__dirname, '..', 'data', filename);
    
    const dayData = generateTemplateDay(day);
    
    try {
        fs.writeFileSync(filepath, JSON.stringify(dayData, null, 4));
        console.log(`✅ Created ${filename}`);
    } catch (error) {
        console.error(`❌ Error creating ${filename}:`, error.message);
    }
}

console.log('\n🎉 Template files generated! You can now customize each day\'s itinerary.');
console.log('📝 Edit the JSON files in the data/ folder to add your specific plans.');
