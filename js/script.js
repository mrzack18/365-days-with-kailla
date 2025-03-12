// Countdown Timer
const countDownDate = new Date("March 12, 2025 17:10:00").getTime();

const countdownInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toString().padStart(3, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("days").innerHTML = "000";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        showFireworks();
    }
}, 1000);

let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});


// Add this function at the end of your script.js
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('hidden');
}

// Add this to your existing script.js
// Auto play music when page loads
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bgMusic');
    audio.volume = 0.4; // Set volume to 40%
    
    // Try to play audio
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            // Auto-play was prevented
            console.log("Auto-play was prevented by the browser");
        });
    }
});

// Existing toggle music function
function toggleMusic() {
    const audio = document.getElementById('bgMusic');
    const icon = document.getElementById('musicIcon');
    
    if (audio.paused) {
        audio.play();
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />`;
    } else {
        audio.pause();
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />`;
    }
}

const carousel = document.querySelector('.carousel-slides');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;
const slideCount = dots.length;

// Set initial width for slides container
carousel.style.width = `${slideCount * 100}%`;

// Update dots
function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('bg-white');
            dot.classList.remove('bg-white/50');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-white/50');
        }
    });
}

// Slide to next
function nextSlide() {
    currentSlide = (currentSlide + 1) % slideCount;
    carousel.style.transform = `translateX(-${(100 / slideCount) * currentSlide}%)`;
    updateDots();
}

// Add click events to dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        carousel.style.transform = `translateX(-${(100 / slideCount) * currentSlide}%)`;
        updateDots();
    });
});

// Auto slide every 3 seconds
setInterval(nextSlide, 3000);

// Set initial state
updateDots();


// Hero Slideshow
function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    let currentSlide = 0;

    // Show first slide
    slides[0].classList.add('active');

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Couple Gallery Slider
let coupleSlideIndex = 0;
const coupleSlides = document.querySelector('.couple-slides');
const coupleDots = document.querySelectorAll('.couple-dot');

function moveSlide(direction) {
    const totalSlides = document.querySelectorAll('.couple-slides > div').length;
    coupleSlideIndex = (coupleSlideIndex + direction + totalSlides) % totalSlides;
    updateSlidePosition();
}

function updateSlidePosition() {
    coupleSlides.style.transform = `translateX(-${coupleSlideIndex * 100}%)`;
    
    // Update dots
    coupleDots.forEach((dot, index) => {
        dot.classList.toggle('bg-white', index === coupleSlideIndex);
        dot.classList.toggle('bg-white/50', index !== coupleSlideIndex);
    });
}

// Add click events to dots
coupleDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        coupleSlideIndex = index;
        updateSlidePosition();
    });
});

// Auto slide every 5 seconds
setInterval(() => moveSlide(1), 5000);

function showFireworks() {
    const fireworksPopup = document.getElementById('fireworksPopup');
    if (fireworksPopup) {
        fireworksPopup.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Play fireworks sound
        const fireworksSound = new Audio('./assets/sounds/Fireworks with Sound Effects.mp3');
        fireworksSound.volume = 0.7; // Increase volume to 70%
        
        // Make sure audio is loaded before playing
        fireworksSound.addEventListener('canplaythrough', () => {
            const playPromise = fireworksSound.play();
            
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Audio playback failed:", error);
                });
            }
        });
    }
}

function closeFireworks() {
    const fireworksPopup = document.getElementById('fireworksPopup');
    if (fireworksPopup) {
        fireworksPopup.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// ... existing code ...

function sendToWhatsApp(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    // Create new wish element
    const wishesContainer = document.getElementById('wishesContainer');
    const newWish = document.createElement('div');
    newWish.className = 'bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-transform';
    newWish.innerHTML = `
        <p class="text-gray-600 mb-2 italic">"${message}"</p>
        <p class="text-primary font-semibold">- ${name}</p>
    `;
    
    // Add new wish to the container
    wishesContainer.insertBefore(newWish, wishesContainer.firstChild);
    
    // Reset form
    document.getElementById('wishesForm').reset();
}

// Random Moments Data
const moments = [
    {
        image: './assets/images/random/random (1).jpg',
        description: 'Side by side, their smiles outshine the sun—simple yet full of love. ❤️'
    },
    {
        image: './assets/images/random/random (2).jpg',
        description: 'Dressed in fun, their laughter speaks louder than words. ✨'
    },
    {
        image: './assets/images/random/random (3).jpg',
        description: 'Joker smiles, playful hearts—love in every stroke. 💕'
    },
    {
        image: './assets/images/random/random (4).jpg',
        description: 'By the pond, lost in love—nature watches in awe 🌟'
    },
];

function showRandomMoment() {
    const randomIndex = Math.floor(Math.random() * moments.length);
    const moment = moments[randomIndex];
    
    const image = document.getElementById('randomImage');
    const description = document.getElementById('momentDescription');
    
    // Add fade-out effect
    image.style.opacity = '0';
    description.style.opacity = '0';
    
    setTimeout(() => {
        image.src = moment.image;
        description.textContent = moment.description;
        
        // Add fade-in effect
        image.style.opacity = '1';
        description.style.opacity = '1';
    }, 300);
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    initHeroSlideshow();
    showRandomMoment(); // Show initial random moment
});