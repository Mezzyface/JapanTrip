// Itinerary loading and rendering functionality

class ItineraryLoader {
    constructor() {
        this.days = [];
        this.totalCities = new Set();
        this.totalActivities = 0;
    }    async loadAllDays() {        
        const loadPromises = [];
        // Load day 0 through day 17 (18 days total)
        for (let i = 0; i <= 17; i++) {
            loadPromises.push(this.loadDay(i));
        }

        try {
            this.days = await Promise.all(loadPromises);
            // Filter out any null/undefined days
            this.days = this.days.filter(day => day !== null && day !== undefined);
            this.calculateStats();
            this.renderItinerary();
            this.updateStats();
        } catch (error) {
            console.error('Error loading itinerary:', error);
            this.renderError();
        }
    }    async loadDay(dayNumber) {
        // First check if we have embedded data (for file:// protocol)
        const dayKey = `day${dayNumber.toString().padStart(2, '0')}`;
        if (typeof itineraryData !== 'undefined' && itineraryData[dayKey]) {
            return itineraryData[dayKey];
        }
        
        try {
            const paddedDay = dayNumber.toString().padStart(2, '0');
            const timestamp = new Date().getTime();
            const response = await fetch(`data/day-${paddedDay}.json?t=${timestamp}`);
            
            if (!response.ok) {
                return this.getFallbackData(dayNumber);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            // Silently fall back to embedded data on CORS or other errors
            return this.getFallbackData(dayNumber);
        }
    }

    // Fallback method for file:// protocol or CORS issues
    getFallbackData(dayNumber) {
        const startDate = new Date(2025, 10, 25); // November 25, 2025 (Day 0)
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayNumber);
        
        const dateString = currentDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });        // Return real data for the days we know about
        const fallbackData = {
            0: {
                day: 0,
                date: "Tuesday, November 25, 2025",
                location: "Travel Day (USA → Japan)",
                weather: "In transit",
                description: "Travel day from Austin to Tokyo via San Francisco. Long journey across the Pacific - get ready for the adventure!",
                activities: [
                    { time: "06:00", description: "Depart Austin-Bergstrom International Airport (AUS)" },
                    { time: "08:03", description: "Arrive at San Francisco International Airport (SFO) - PST" },
                    { time: "08:03", description: "Layover at SFO (2 hours 12 minutes)" },
                    { time: "10:15", description: "Depart San Francisco International Airport (SFO)" },
                    { time: "In-flight", description: "Long-haul flight to Tokyo - sleep, movies, prepare for Japan!" },
                    { time: "14:50+1", description: "Arrive at Tokyo International (Haneda) Airport (HND) - Wednesday Nov 26" }
                ],
                transportation: "ANA/NH 7333 (AUS→SFO), ANA/NH 7011 (SFO→HND) - operated by United",
                accommodation: "Airplane seat",
                meals: "In-flight meals",
                budget: "Flight already paid",
                notes: "Set watch to Japan time. Try to sleep on the plane. Download offline maps and translation apps. Bring entertainment for long flight!"
            },            1: {
                day: 1,
                date: "Wednesday, November 26, 2025",
                location: "Tokyo - Shibuya",
                weather: "Check forecast closer to date",
                description: "Arrival day in Tokyo! Landing at Haneda Airport, traveling to Shibuya, starting your cultural journey with your first goshuin at Ebisu Shrine, and experiencing the famous Shibuya crossing.",
                activities: [
                    { time: "14:50", description: "Arrive at Tokyo International (Haneda) Airport (HND)" },
                    { time: "15:00", description: "Clear immigration, collect luggage, and go through customs" },
                    { time: "16:30", description: "Travel to Shibuya: Keikyu Line to Shinagawa → JR Yamanote Line to Ebisu" },
                    { time: "17:15", description: "Optional cultural stop: Visit Ebisu Shrine (恵比寿神社) to purchase Goshuincho (stamp book) and receive first goshuin" },
                    { time: "17:30", description: "Check into HJ PLACE SHIBUYA Airbnb and settle in" },
                    { time: "18:30", description: "Walk to Shibuya area (15-20 minute walk from Airbnb)" },
                    { time: "19:00", description: "Experience Shibuya Scramble Crossing - visit Starbucks on 2nd floor of Tsutaya for aerial view" },
                    { time: "20:00", description: "Visit Pokémon Center Shibuya (6th floor of PARCO building)" },
                    { time: "21:00", description: "Dinner in Shibuya - explore side streets for ramen, sushi, or department store food halls" },
                    { time: "22:30", description: "Walk back to Airbnb" }
                ],
                transportation: "Keikyu Airport Line to Shinagawa, then JR Yamanote Line to Ebisu. Total cost: ~¥510, Time: 45-55 minutes",
                accommodation: "HJ PLACE SHIBUYA Airbnb - 3 Chome-20-10 Higashi, Shibuya City, Tokyo 〒150-0011",
                meals: "Dinner: Shibuya restaurants (ramen, sushi, or department store food hall)",
                budget: "¥4,500 - ¥8,000 (includes transport ¥510, Goshuincho ¥1,500, goshuin ¥300, meals & activities)",
                notes: "Pick up Suica/Pasmo card at airport for easy train travel. CULTURAL HIGHLIGHT: Visit Ebisu Shrine for your first goshuin - a beautiful way to start your Japan journey! Goshuincho (stamp book) typically costs ¥1,000-2,000, goshuin stamps ¥300-500 each. Shibuya is busiest in evening - perfect timing!"
            },
            2: {
                day: 2,
                date: "Thursday, November 27, 2025",
                location: "Tokyo - Asakusa & Shibuya",
                weather: "Sunny, 17°C",
                description: "First full day exploring Tokyo! Starting with traditional Asakusa in the morning, then experiencing the modern energy of Shibuya in the evening.",
                activities: [
                    { time: "08:00", description: "Traditional Japanese breakfast at hotel" },
                    { time: "09:30", description: "Visit Senso-ji Temple in Asakusa" },
                    { time: "11:00", description: "Explore Nakamise Shopping Street" },
                    { time: "13:00", description: "Lunch: Tempura at Daikokuya (established 1887)" },
                    { time: "15:00", description: "Tokyo Skytree observation deck" },
                    { time: "17:30", description: "Travel to Shibuya" },
                    { time: "18:00", description: "Experience Shibuya Crossing" },
                    { time: "19:30", description: "Dinner and drinks in Shibuya" }
                ],
                transportation: "JR Lines and Tokyo Metro - use day pass",
                accommodation: "Same hotel",
                meals: "Breakfast: Hotel, Lunch: Daikokuya Tempura, Dinner: Shibuya izakaya",
                budget: "¥12,000 - ¥18,000",
                notes: "Senso-ji opens at 6 AM - go early to avoid crowds. Shibuya Crossing is busiest around 6-8 PM. Try to catch sunset from Skytree!"
            }
        };

        return fallbackData[dayNumber] || this.getTemplateDayData(dayNumber);
    }

    getTemplateDayData(dayNumber) {
        const startDate = new Date(2025, 10, 25); // November 25, 2025 (Day 0)
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + dayNumber);
        
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
    }    createDayCard(day, dayNumber) {
        const card = document.createElement('div');
        card.className = 'day-card';
        card.setAttribute('data-day', dayNumber);

        // Group activities by location and detect optional ones
        const groupedActivities = this.groupActivitiesByLocation(day.activities);

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
                <div class="activity-list">
                    ${groupedActivities}
                </div>
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

    // Convert Markdown-style links to HTML links
    processMarkdownLinks(text) {
        // Regex to match [text](url) pattern
        return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="shrine-link">$1</a>');
    }

    groupActivitiesByLocation(activities) {
        let currentLocation = null;
        let html = '';
        
        activities.forEach((activity, index) => {
            // Detect activity type and location
            const activityInfo = this.analyzeActivity(activity);
            
            // Add location group header if location changes
            if (activityInfo.location && activityInfo.location !== currentLocation) {
                if (currentLocation !== null) {
                    html += '</div>'; // Close previous location group
                }
                html += `
                    <div class="location-group">
                        <span class="location-name">${activityInfo.location}</span>
                        ${activityInfo.travelTime ? `<span class="travel-time">${activityInfo.travelTime}</span>` : ''}
                    </div>
                    <div class="location-activities">
                `;
                currentLocation = activityInfo.location;            } else if (currentLocation === null) {
                html += '<div class="location-activities">';
            }
            
            // Create activity item with appropriate classes
            const classes = ['activity-item'];
            if (activityInfo.isOptional) classes.push('optional');
            if (activityInfo.cluster) classes.push(`cluster-${activityInfo.cluster}`);
            if (currentLocation) classes.push('location-cluster');
            
            // Add Google Maps link for travel activities
            let mapsLink = '';
            if (activityInfo.isTravel && activityInfo.destination) {
                const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activityInfo.destination)}&travelmode=transit`;
                mapsLink = ` <a href="${mapsUrl}" target="_blank" class="maps-link" title="Get directions to ${activityInfo.destination}">🗺️</a>`;
            }
              html += `
                <div class="${classes.join(' ')}">
                    <span class="activity-time">${activity.time}</span>
                    <span class="activity-description">${this.processMarkdownLinks(activity.description)}${mapsLink}</span>
                </div>
            `;
        });
        
        if (currentLocation !== null) {
            html += '</div>'; // Close final location group
        }
        
        return html;
    }    analyzeActivity(activity) {
        const description = activity.description.toLowerCase();
        const result = {
            location: null,
            isOptional: false,
            cluster: null,
            travelTime: null,
            destination: null,
            isTravel: false
        };        // Critical "MUST CATCH" train detection - check first before other logic
        if (description.includes('must catch') || description.includes('critical')) {
            result.cluster = 'critical-train';
            result.isTravel = true;
        }
          // Enhanced travel activity detection with broader patterns
        if (description.includes('travel to') || description.includes('go to') || 
            description.includes('head to') || description.includes('depart to') ||
            description.includes('arrive at') || description.includes('take train to') ||
            description.includes('walk to') || description.includes('return to') ||
            description.includes('yamanote line') || description.includes('jr line') ||
            description.includes('metro to') || description.includes('keikyu line') ||
            description.includes('shinkansen') || description.includes('bullet train') ||
            description.includes('hikari') || description.includes('nozomi')) {
            result.isTravel = true;
            result.cluster = 'transport';            // Special Shinkansen detection
            if (description.includes('shinkansen') || description.includes('bullet train') ||
                description.includes('hikari') || description.includes('nozomi')) {
                result.cluster = 'shinkansen';
            }
              // Special Limited Express detection (for Mount Fuji route)
            if (description.includes('limited express') || description.includes('kaiji') || 
                description.includes('fujisan view express') || description.includes('🚄')) {
                result.cluster = 'shinkansen';
            }
              // Enhanced destination mapping with specific train stations and addresses
            
            // Tokyo Districts & Stations
            if (description.includes('shibuya') && !description.includes('ebisu')) {
                result.destination = 'Shibuya Station, Tokyo, Japan';
            } else if (description.includes('ebisu')) {
                result.destination = 'Ebisu Station, Tokyo, Japan';
            } else if (description.includes('harajuku')) {
                result.destination = 'Harajuku Station, Tokyo, Japan';
            } else if (description.includes('asakusa')) {
                result.destination = 'Asakusa Station, Tokyo, Japan';
            } else if (description.includes('ginza')) {
                result.destination = 'Ginza Station, Tokyo, Japan';
            } else if (description.includes('shimbashi')) {
                result.destination = 'Shimbashi Station, Tokyo, Japan';
            } else if (description.includes('shinagawa')) {
                result.destination = 'Shinagawa Station, Tokyo, Japan';
            } else if (description.includes('shinjuku')) {
                result.destination = 'Shinjuku Station, Tokyo, Japan';
            } else if (description.includes('omotesando')) {
                result.destination = 'Omotesando Station, Tokyo, Japan';
            } else if (description.includes('ueno')) {
                result.destination = 'Ueno Station, Tokyo, Japan';
            } else if (description.includes('ikebukuro')) {
                result.destination = 'Ikebukuro Station, Tokyo, Japan';
            } else if (description.includes('akihabara')) {
                result.destination = 'Akihabara Station, Tokyo, Japan';
            } else if (description.includes('roppongi')) {
                result.destination = 'Roppongi Station, Tokyo, Japan';
            } else if (description.includes('odaiba')) {
                result.destination = 'Odaiba Marine Park Station, Tokyo, Japan';
            }
            
            // Airports with specific terminals
            else if (description.includes('haneda airport') || (description.includes('haneda') && description.includes('airport'))) {
                result.destination = 'Tokyo International Airport (Haneda), Terminal 1, Tokyo, Japan';
            } else if (description.includes('narita airport') || (description.includes('narita') && description.includes('airport'))) {
                result.destination = 'Narita International Airport, Terminal 1, Chiba, Japan';
            }
            
            // Day Trip Destinations with specific stations
            else if (description.includes('nikko')) {
                result.destination = 'Tobu-Nikko Station, Nikko, Tochigi, Japan';
            } else if (description.includes('kamakura')) {
                result.destination = 'Kamakura Station, Kamakura, Kanagawa, Japan';
            } else if (description.includes('hakone')) {
                result.destination = 'Hakone-Yumoto Station, Hakone, Kanagawa, Japan';            } else if (description.includes('mount fuji') || description.includes('mt fuji') || description.includes('kawaguchi')) {
                result.destination = 'Kawaguchiko Station, Fujikawaguchiko, Yamanashi, Japan';
            } else if (description.includes('shimoyoshida')) {
                result.destination = 'Shimoyoshida Station, Fujiyoshida, Yamanashi, Japan';
            } else if (description.includes('kawaguchiko station')) {
                result.destination = 'Kawaguchiko Station, Fujikawaguchiko, Yamanashi, Japan';
            }
            
            // Other Major Cities with main stations
            else if (description.includes('kyoto')) {
                result.destination = 'Kyoto Station, Kyoto, Japan';
            } else if (description.includes('osaka')) {
                result.destination = 'Osaka Station, Osaka, Japan';
            } else if (description.includes('hiroshima')) {
                result.destination = 'Hiroshima Station, Hiroshima, Japan';
            } else if (description.includes('nara')) {
                result.destination = 'Nara Station, Nara, Japan';
            } else if (description.includes('takayama')) {
                result.destination = 'Takayama Station, Takayama, Gifu, Japan';
            } else if (description.includes('kanazawa')) {
                result.destination = 'Kanazawa Station, Kanazawa, Ishikawa, Japan';
            }
            
            // Return journeys and general Tokyo
            else if (description.includes('travel back to tokyo') || description.includes('return train to tokyo') || 
                     description.includes('back to tokyo') || description.includes('return to tokyo')) {
                result.destination = 'Tokyo Station, Tokyo, Japan';
            }
              // Specific locations with exact addresses
            else if (description.includes('tsukiji') || description.includes('fish market')) {
                result.destination = 'Tsukiji Outer Market, 4 Chome Tsukiji, Chuo City, Tokyo, Japan';
            } else if (description.includes('senso-ji') || description.includes('sensoji')) {
                result.destination = 'Senso-ji Temple, 2 Chome-3-1 Asakusa, Taito City, Tokyo, Japan';
            } else if (description.includes('meiji shrine') || description.includes('meiji jingu')) {
                result.destination = 'Meiji Shrine, 1-1 Kamizono-cho, Shibuya City, Tokyo, Japan';
            } else if (description.includes('togo-jinja') || description.includes('togo shrine')) {
                result.destination = 'Togo Shrine, 1 Chome-5-3 Jingumae, Shibuya City, Tokyo, Japan';
            } else if (description.includes('onden shrine') || description.includes('onden jinja')) {
                result.destination = 'Onden Shrine, 5-26-6 Jingumae, Shibuya City, Tokyo, Japan';
            } else if (description.includes('kitaya inari') || description.includes('kitaya shrine')) {
                result.destination = 'Kitaya Inari Shrine, 1-4-1 Jinnan, Shibuya City, Tokyo, Japan';
            } else if (description.includes('miyamasumitake') || description.includes('miyamasumitake shrine')) {
                result.destination = 'Miyamasumitake Shrine, 1-12-16 Shibuya, Shibuya City, Tokyo, Japan';
            } else if (description.includes('ebisu shrine')) {
                result.destination = 'Ebisu Shrine, 1-11-1 Ebisu, Shibuya City, Tokyo, Japan';
            } else if (description.includes('tokyo skytree')) {
                result.destination = 'Tokyo Skytree, 1 Chome-1-2 Oshiage, Sumida City, Tokyo, Japan';
            } else if (description.includes('imperial palace')) {
                result.destination = 'Tokyo Imperial Palace, 1-1 Chiyoda, Chiyoda City, Tokyo, Japan';
            } else if (description.includes('golden gai')) {
                result.destination = 'Golden Gai, 1 Chome Kabukicho, Shinjuku City, Tokyo, Japan';
            } else if (description.includes('aoiso ryokan') || (description.includes('ryokan') && description.includes('kawaguchi'))) {
                result.destination = 'Aoiso Ryokan, 1297-1 Kodachi, Fujikawaguchiko, Minamitsuru District, Yamanashi, Japan';
            }}
        
        // Detect optional activities
        result.isOptional = description.includes('optional') || 
                           description.includes('if time permits') ||
                           description.includes('consider') ||
                           description.includes('cultural stop');
          // Detect location clusters with more specificity
        if (description.includes('temple') || description.includes('shrine') || 
            description.includes('goshuin') || description.includes('goshuincho') ||
            description.includes('senso-ji') || description.includes('ebisu shrine') ||
            description.includes('meiji jingu') || description.includes('meiji shrine') ||
            description.includes('togo-jinja') || description.includes('togo shrine') ||
            description.includes('onden shrine') || description.includes('onden jinja') ||
            description.includes('kitaya inari') || description.includes('miyamasumitake')) {
            result.cluster = 'temple';
        } else if (description.includes('shopping') || description.includes('store') || 
                  description.includes('center') || description.includes('pokemon center') ||
                  description.includes('nakamise') || description.includes('parco')) {
            result.cluster = 'shopping';
        } else if (description.includes('lunch') || description.includes('dinner') || 
                  description.includes('breakfast') || description.includes('food') ||
                  description.includes('tempura') || description.includes('daikokuya')) {
            result.cluster = 'food';
        } else if (description.includes('train') || description.includes('travel') || 
                  description.includes('transport') || description.includes('airport') ||
                  description.includes('keikyu') || description.includes('yamanote') ||
                  description.includes('immigration') || description.includes('customs')) {
            result.cluster = 'transport';
        }
          // Extract locations from descriptions with more detail
        if (description.includes('shibuya') && !description.includes('ebisu')) {
            result.location = 'Shibuya District';
        } else if (description.includes('ebisu')) {
            result.location = 'Ebisu Area';
        } else if (description.includes('harajuku')) {
            result.location = 'Harajuku Area';
        } else if (description.includes('shinjuku')) {
            result.location = 'Shinjuku Station';        } else if (description.includes('asakusa')) {
            result.location = 'Asakusa District';
        } else if (description.includes('ueno')) {
            result.location = 'Ueno Area';
        } else if (description.includes('tokyo station') || (description.includes('tokyo') && description.includes('shinkansen'))) {
            result.location = 'Tokyo Station';
        } else if (description.includes('kyoto station') || (description.includes('kyoto') && description.includes('arrive'))) {
            result.location = 'Kyoto Station';        } else if (description.includes('pontocho') || description.includes('gion')) {
            result.location = 'Pontocho & Gion District';
        } else if (description.includes('fushimi inari') || description.includes('inari station')) {
            result.location = 'Fushimi Inari Area';
        } else if (description.includes('higashiyama') || description.includes('yasaka shrine')) {
            result.location = 'Higashiyama District';
        } else if (description.includes('kodai-ji') || description.includes('entoku-in') || description.includes('illuminations')) {
            result.location = 'Kodai-ji Temple Complex';
        } else if (description.includes('chion-in') || description.includes('shoren-in') || description.includes('awata shrine')) {
            result.location = 'Northern Higashiyama';        } else if (description.includes('maruyama park')) {
            result.location = 'Maruyama Park';
        } else if (description.includes('saiho-ji') || description.includes('koke-dera') || description.includes('moss temple')) {
            result.location = 'Saiho-ji (Moss Temple)';
        } else if (description.includes('arashiyama') && !description.includes('travel')) {
            result.location = 'Arashiyama District';
        } else if (description.includes('tenryu-ji') || description.includes('bamboo forest')) {
            result.location = 'Tenryu-ji & Bamboo Grove';
        } else if (description.includes('nonomiya') || description.includes('jojakko-ji') || description.includes('rakushisha')) {
            result.location = 'Northern Arashiyama';
        } else if (description.includes('nison-in') || description.includes('shoan-in') || description.includes('gion-ji')) {
            result.location = 'Saga Area Temples';
        } else if (description.includes('daikaku-ji')) {
            result.location = 'Daikaku-ji Temple';        } else if (description.includes('kitano tenmangu') || description.includes('momiji-en') || description.includes('maple')) {
            result.location = 'Kitano Tenmangu Area';
        } else if (description.includes('nara') && description.includes('station')) {
            result.location = 'Nara Station';
        } else if (description.includes('nara park') || description.includes('deer')) {
            result.location = 'Nara Park';
        } else if (description.includes('kofuku-ji') || description.includes('five-story') || description.includes('pagoda')) {
            result.location = 'Kofuku-ji Temple';
        } else if (description.includes('todai-ji') || description.includes('great buddha') || description.includes('daibutsuden')) {
            result.location = 'Todai-ji Temple';
        } else if (description.includes('nigatsu-do') || description.includes('sangatsu-do')) {
            result.location = 'Nigatsu-do Area';
        } else if (description.includes('kasuga taisha') || description.includes('stone lanterns')) {
            result.location = 'Kasuga Taisha Shrine';
        } else if (description.includes('osaka') && (description.includes('namba') || description.includes('airbnb'))) {
            result.location = 'Osaka Namba District';
        } else if (description.includes('kamogawa river') || description.includes('riverside')) {
            result.location = 'Kamogawa River Area';
        } else if (description.includes('kawaguchiko') || description.includes('mount fuji') || description.includes('ryokan')) {
            result.location = 'Mount Fuji Area';
        } else if (description.includes('haneda') || (description.includes('airport') && !description.includes('depart from'))) {
            result.location = 'Haneda Airport';
        } else if (description.includes('airbnb') || description.includes('accommodation') || 
                  description.includes('check into') || description.includes('hj place') || description.includes('aoiso')) {
            result.location = 'Accommodation';
        } else if (description.includes('austin') || description.includes('san francisco')) {
            result.location = 'USA Airports';
        } else if (description.includes('skytree')) {
            result.location = 'Tokyo Skytree Area';
        } else if (description.includes('scramble crossing') || description.includes('starbucks')) {
            result.location = 'Shibuya Crossing';        } else if (description.includes('meiji shrine') || description.includes('meiji jingu')) {
            result.location = 'Meiji Shrine';
        } else if (description.includes('nikko') && !description.includes('travel')) {
            result.location = 'Nikko Area';
        } else if (description.includes('toshogu')) {
            result.location = 'Toshogu Shrine Complex';
        } else if (description.includes('kegon falls') || description.includes('national park')) {
            result.location = 'Nikko National Park';
        } else if (description.includes('shrine') && description.includes('visit')) {
            result.location = 'Shrine Visits';
        } else if (description.includes('luggage') || description.includes('locker')) {
            result.location = 'Logistics';
        }
          // Extract travel time hints
        if (description.includes('walk') && description.includes('minute')) {
            const match = description.match(/(\d+)[-\s]*minute/);
            if (match) result.travelTime = `${match[1]} min walk`;
        } else if (description.includes('layover')) {
            const match = description.match(/(\d+)\s*hours?\s*(\d+)?\s*minutes?/);
            if (match) {
                const hours = match[1];
                const minutes = match[2] || '0';
                result.travelTime = `${hours}h ${minutes}m layover`;
            }
        }
          // Final check: Critical "MUST CATCH" train detection - override any other cluster
        if (description.includes('must catch') || description.includes('critical') || description.includes('must not miss')) {
            result.cluster = 'critical-train';
            result.isTravel = true;
        }
        
        return result;
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
