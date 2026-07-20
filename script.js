// Countdown Timer
const weddingDate = new Date("September 17, 2026 03:30:00").getTime();

const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        "<span style='display: inline-block; margin: 0 10px;'>" + days + "<br><small>Days</small></span>" +
        "<span style='display: inline-block; margin: 0 10px;'>" + hours + "<br><small>Hours</small></span>" +
        "<span style='display: inline-block; margin: 0 10px;'>" + minutes + "<br><small>Minutes</small></span>" +
        "<span style='display: inline-block; margin: 0 10px;'>" + seconds + "<br><small>Seconds</small></span>";

    if (distance < 0) {
        clearInterval(timer);
        document.getElementById("timer").innerHTML = "💍 Today is our Wedding Day! 💍";
        document.getElementById("timer").style.fontSize = "36px";
    }
}, 1000);

// Scroll Animation - Fade in elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-on-scroll elements
document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
    observer.observe(element);
});

// Smooth scroll for navigation links
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

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.scrollY;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Navbar background on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 4px 25px rgba(255, 215, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.9)';
        nav.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.2)';
    }
});

// Gallery hover effect with lightbox
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('click', function () {
        const img = this.querySelector('img');
        if (img) {
            openLightbox(img.src, img.alt);
        }
    });
});

function openLightbox(imageSrc, imageAlt) {
    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 10px;
        box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
        animation: slideUp 0.3s ease;
    `;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        background: #FFD700;
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    
    closeBtn.addEventListener('mouseover', function () {
        this.style.background = '#FFA500';
        this.style.transform = 'scale(1.1)';
    });
    
    closeBtn.addEventListener('mouseout', function () {
        this.style.background = '#FFD700';
        this.style.transform = 'scale(1)';
    });
    
    closeBtn.addEventListener('click', function () {
        lightbox.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => lightbox.remove(), 300);
    });
    
    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    
    lightbox.addEventListener('click', function (e) {
        if (e.target === this) {
            this.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => this.remove(), 300);
        }
    });
    
    document.body.appendChild(lightbox);
}

// Add fade-in-scroll animation to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    if (!card.classList.contains('fade-in-on-scroll')) {
        card.classList.add('fade-in-on-scroll');
        observer.observe(card);
    }
});

// Add fade-in-scroll animation to gallery items
const galleryItems2 = document.querySelectorAll('.gallery-item');
galleryItems2.forEach(item => {
    if (!item.classList.contains('fade-in-on-scroll')) {
        item.classList.add('fade-in-on-scroll');
        observer.observe(item);
    }
});

// Add animations to keyframes if not present
if (!document.querySelector('style[data-animations]')) {
    const style = document.createElement('style');
    style.setAttribute('data-animations', 'true');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}