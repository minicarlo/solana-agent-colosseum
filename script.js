// Smooth scrolling for anchor links
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

// Add scroll reveal animation
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

// Observe all feature cards and tech items
document.querySelectorAll('.feature-card, .tech-item, .hackathon-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-visual');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animate stats on scroll
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-value');
    stats.forEach(stat => {
        const text = stat.textContent;
        // Keep original text for non-numeric values
        if (!/\d/.test(text)) return;
        
        const hasNumber = text.match(/\d+/);
        if (hasNumber) {
            const number = parseInt(hasNumber[0]);
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = text;
                    clearInterval(timer);
                } else {
                    stat.textContent = text.replace(/\d+/, Math.floor(current));
                }
            }, 30);
        }
    });
};

// Trigger stat animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateStats();
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

const hackathonSection = document.querySelector('.hackathon-stats');
if (hackathonSection) {
    statsObserver.observe(hackathonSection);
}

// Add floating animation variance to hero cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    card.style.animationDuration = `${3 + index * 0.5}s`;
});

// Add gradient animation to title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let hue = 0;
    setInterval(() => {
        hue = (hue + 1) % 360;
        heroTitle.style.filter = `hue-rotate(${hue}deg)`;
    }, 50);
}

// Log page load
console.log('🚀 Solana Agent - Colosseum Hackathon 2026');
console.log('Built with ❤️ for the future of DeFi');
