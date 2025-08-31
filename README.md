# 🌸 Japan Trip Itinerary Website

A beautiful, responsive one-page website for your 16-day Japan adventure from November 26 - December 11, 2025.

## 🗂️ Project Structure

```
C:\JapanTrip/
├── index.html              # Main itinerary page
├── styles/
│   ├── main.css            # Main stylesheet with variables and layout
│   └── components.css      # Component-specific styles
├── js/
│   ├── main.js             # Main JavaScript functionality
│   └── itinerary.js        # Itinerary loading and rendering
├── data/
│   ├── day-01.json         # November 26th
│   ├── day-02.json         # November 27th
│   ├── day-03.json         # November 28th
│   └── ... (day-16.json)   # December 11th
├── assets/
│   └── images/             # For photos you want to add
└── README.md               # This file
```

## 📝 How to Update Your Itinerary

### Adding/Editing Days

Each day has its own JSON file in the `data/` folder. The files are named `day-01.json` through `day-16.json`.

**Day JSON Structure:**
```json
{
    "day": 1,
    "date": "Tuesday, November 26, 2025",
    "location": "Tokyo",
    "weather": "Partly Cloudy, 15°C",
    "description": "Brief description of the day",
    "activities": [
        {
            "time": "09:00",
            "description": "Activity description"
        }
    ],
    "transportation": "How you're getting around",
    "accommodation": "Where you're staying",
    "meals": "Notable meals planned",
    "budget": "Estimated daily budget",
    "notes": "Any special notes or reminders"
}
```

### Quick Edits

1. **Change activities**: Edit the `activities` array in the day's JSON file
2. **Update location**: Change the `location` field
3. **Add notes**: Update the `notes` field
4. **Budget tracking**: Modify the `budget` field

## 🚀 How to View Your Itinerary

1. Open `index.html` in any modern web browser
2. The website will automatically load all your day files
3. If a day file doesn't exist, it will show template data

## ✨ Features

- **Responsive Design**: Looks great on desktop, tablet, and mobile
- **Japanese-inspired Theme**: Beautiful dark color scheme with sophisticated aesthetics
- **Timeline Layout**: Easy-to-follow chronological layout
- **Interactive Elements**: Hover effects and smooth animations
- **Google Maps Integration**: 🗺️ One-click navigation for all travel activities
- **Smart Activity Detection**: Automatic categorization and location clustering
- **Optional Activity Highlighting**: Visual differentiation for flexible plans
- **Statistics**: Automatic counting of cities and activities
- **Print-friendly**: Optimized for printing
- **Offline Capable**: Works without internet once loaded

## 🎨 Customization

### Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #e91e63;    /* Pink/cherry blossom */
    --secondary-color: #ff9800;   /* Orange */
    --accent-color: #2196f3;     /* Blue */
}
```

### Fonts
The website uses Google Fonts (Inter + Noto Sans JP). You can change them in `index.html`.

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Touch-friendly interface
- Optimized layouts for small screens
- Readable text sizes
- Easy navigation

## 🎯 Your Trip Overview

- **Duration**: 16 days (November 26 - December 11, 2025)
- **Season**: Late autumn/early winter
- **Weather**: Cool temperatures, possible snow in some areas
- **Key Experiences**: Traditional culture, modern cities, food, temples, nature

## 📋 To-Do

Create JSON files for remaining days:
- [ ] day-04.json through day-16.json
- [ ] Add photos to assets/images/
- [ ] Update weather forecasts as dates approach
- [ ] Add specific restaurant reservations
- [ ] Include train times and reservation numbers

## 🎉 Enjoy Your Trip!

Have an amazing time in Japan! Remember to:
- Keep this itinerary handy on your phone
- Take lots of photos
- Try local foods
- Be respectful of local customs
- Make wonderful memories!

---

*Generated with ❤️ for an unforgettable Japan adventure*
