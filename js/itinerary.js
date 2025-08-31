// Itinerary loading and rendering functionality

class ItineraryLoader {
    constructor() {
        this.days = [];
        this.totalCities = new Set();
        this.totalActivities = 0;
    }

    async loadAllDays() {
        const startDate = new Date(2025, 10, 26); // November 26, 2025
        const endDate = new Date(2025, 11, 11);   // December 11, 2025
        const dayCount = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

        const loadPromises = [];
        for (let i = 1; i <= dayCount; i++) {
            loadPromises.push(this.loadDay(i));
        }

        try {
            this.days = await Promise.all(loadPromises);
            this.calculateStats();
            this.renderItinerary();
            this.updateStats();
        } catch (error) {
            console.error('Error loading itinerary:', error);
            this.renderError();
        }
    }

    async loadDay(dayNumber) {
        try {
            const paddedDay = dayNumber.toString().padStart(2, '0');
            const response = await fetch(`data/day-${paddedDay}.json`);
            
            if (!response.ok) {
                // Return template data if file doesn't exist
                return this.getTemplateDayData(dayNumber);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error loading day ${dayNumber}:`, error);
            return this.getTemplateDayData(dayNumber);
        }
    }

    getTemplateDayData(dayNumber) {
        const startDate = new Date(2025, 10, 26);
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayNumber - 1);
        
        const dateString = currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        return {
            day: dayNumber,
            date: dateString,
            location: "TBD",
            weather: "Check forecast",
            description: "Planning in progress...",
            activities: [
                {
                    time: "TBD",
                    description: "Add your activities here"
                }
            ],
            transportation: "TBD",
            accommodation: "TBD",
            meals: "TBD",
            budget: "TBD",
            notes: "Add any special notes or reminders for this day"
        };
    }

    calculateStats() {
        this.totalActivities = 0;
        this.totalCities.clear();

        this.days.forEach(day => {
            if (day.location && day.location !== "TBD") {
                this.totalCities.add(day.location);
            }
            if (day.activities) {
                this.totalActivities += day.activities.length;
            }
        });
    }

    updateStats() {
        const citiesElement = document.getElementById('cities-count');
        const activitiesElement = document.getElementById('activities-count');
        
        if (citiesElement) {
            citiesElement.textContent = this.totalCities.size;
        }
        if (activitiesElement) {
            activitiesElement.textContent = this.totalActivities;
        }
    }

    renderItinerary() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = '';

        this.days.forEach((day, index) => {
            const dayCard = this.createDayCard(day, index + 1);
            timeline.appendChild(dayCard);
        });
    }

    createDayCard(day, dayNumber) {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.setAttribute('data-day', dayNumber);

        card.innerHTML = `
            <div class="day-header">
                <div>
                    <h2 class="day-title">Day ${dayNumber}</h2>
                    <p class="day-date">${day.date}</p>
                </div>
                <div class="day-weather">${day.weather}</div>
            </div>
            
            <div class="day-location">${day.location}</div>
            
            <div class="day-description">${day.description}</div>
            
            <div class="activities">
                <h3 class="activities-title">Activities</h3>
                <ul class="activity-list">
                    ${day.activities.map(activity => `
                        <li class="activity-item">
                            <span class="activity-time">${activity.time}</span>
                            <span class="activity-description">${activity.description}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <div class="day-info">
                <div class="info-section transportation">
                    <div class="info-title">Transportation</div>
                    <div class="info-content">${day.transportation}</div>
                </div>
                <div class="info-section accommodation">
                    <div class="info-title">Accommodation</div>
                    <div class="info-content">${day.accommodation}</div>
                </div>
                <div class="info-section meals">
                    <div class="info-title">Meals</div>
                    <div class="info-content">${day.meals}</div>
                </div>
                <div class="info-section budget">
                    <div class="info-title">Budget</div>
                    <div class="info-content">${day.budget}</div>
                </div>
            </div>
            
            ${day.notes ? `
                <div class="day-notes">
                    <div class="notes-title">Notes</div>
                    <div class="notes-content">${day.notes}</div>
                </div>
            ` : ''}
        `;

        return card;
    }

    renderError() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = `
            <div class="error">
                <h3>Unable to load itinerary data</h3>
                <p>Please check that your day files are properly formatted and accessible.</p>
            </div>
        `;
    }

    renderLoading() {
        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        timeline.innerHTML = `
            <div class="loading">
                Loading your amazing Japan itinerary...
            </div>
        `;
    }
}

// Export for use in main.js
window.ItineraryLoader = ItineraryLoader;
