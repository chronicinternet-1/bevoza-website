// Email Form Submission
document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = document.getElementById('email-input');
    const messageEl = document.getElementById('form-message');
    const email = emailInput.value.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        messageEl.textContent = 'Please enter a valid email address.';
        messageEl.className = 'form-message error';
        return;
    }
    
    // Store to localStorage (temporary solution)
    const subscribers = JSON.parse(localStorage.getItem('bevoza-subscribers') || '[]');
    
    // Check for duplicates
    if (subscribers.includes(email)) {
        messageEl.textContent = 'You\'re already on the list!';
        messageEl.className = 'form-message';
        return;
    }
    
    // Add new subscriber
    subscribers.push(email);
    localStorage.setItem('bevoza-subscribers', JSON.stringify(subscribers));
    
    // Log to console for now (will connect to Brevo later)
    console.log('New subscriber:', email);
    console.log('Total subscribers:', subscribers.length);
    
    // Success feedback
    messageEl.textContent = '🎉 Success! You\'re on the early access list.';
    messageEl.className = 'form-message success';
    emailInput.value = '';
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messageEl.textContent = '';
        messageEl.className = 'form-message';
    }, 5000);
});

// Smooth scroll for anchor links
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

// Card hover effects (already handled by CSS, but adding interactivity)
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(-4px)';
    });
});

// Scroll reveal animation trigger
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});

// Analytics helper (optional - logs page interactions)
function logEvent(eventName, eventData) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    console.log('Event:', eventName, eventData);
}

// Track email form interactions
document.getElementById('email-input').addEventListener('focus', () => {
    logEvent('email_input_focus', { location: 'landing_page' });
});
