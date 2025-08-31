// Main JavaScript functionality for the Japan Trip Itinerary

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the itinerary loader
    const loader = new ItineraryLoader();
    
    // Show loading state
    loader.renderLoading();
    
    // Load all days
    loader.loadAllDays();
    
    // Add smooth scrolling for any internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all day cards for animations (with a delay to ensure they're loaded)
    setTimeout(() => {
        document.querySelectorAll('.day-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 500);
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'Home':
                case 'h':
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    break;
                case 'End':
                case 'e':
                    e.preventDefault();
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    break;
            }
        }
    });
    
    // Add print styles optimization
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });
});

// Utility functions
function formatCurrency(amount, currency = 'JPY') {
    return new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

function formatTime(timeString) {
    try {
        const time = new Date(`2000-01-01 ${timeString}`);
        return time.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    } catch {
        return timeString;
    }
}

// Export utilities for use in other files
window.utils = {
    formatCurrency,
    formatTime
};
