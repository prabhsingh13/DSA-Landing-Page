// Sticky Navbar with Smart Hide/Show
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar-custom');
let scrollThreshold = 100;

window.addEventListener('scroll', function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > scrollThreshold) {
        navbar.classList.add('navbar-scrolled');

        if (scrollTop > lastScrollTop) {
            // Scrolling down - hide navbar
            navbar.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show navbar
            navbar.classList.remove('navbar-hidden');
        }
    } else {
        // At top of page
        navbar.classList.remove('navbar-scrolled');
        navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = scrollTop;
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Subscribe Form Handler
const subscribeForm = document.querySelector('.subscribe-form');

if (subscribeForm) {
    subscribeForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = this.querySelector('.subscribe-input');
        const email = emailInput.value;

        if (email) {
            alert('Thank you for subscribing! We will keep you updated.');
            emailInput.value = '';
        }
    });
}

// Testimonials Data
const testimonials = [
    {
        name: "Purvi Gadia",
        title: "It is a great experience!",
        text: "Sandip Sir has been an inspiring individual since I have known him. He, from the very first day, always encouraged me to do everything with dedication and determination. The course structure is excellent and the practical approach helped me land my dream job.",
        rating: 5
    },
    {
        name: "Rahul Sharma",
        title: "Best Digital Marketing Course!",
        text: "I joined DSA as a fresher with no prior knowledge of digital marketing. The trainers are highly experienced and the hands-on projects gave me real-world experience. Within 3 months of completing the course, I got placed in a top agency with a great package.",
        rating: 5
    },
    {
        name: "Priya Patel",
        title: "Transformed my career completely",
        text: "After working in a traditional marketing role for 5 years, I decided to upskill in digital marketing. DSA's comprehensive curriculum covering SEO, SEM, Social Media, and Analytics helped me transition smoothly. The placement support was outstanding!",
        rating: 4.5
    },
    {
        name: "Amit Desai",
        title: "Perfect for entrepreneurs",
        text: "As a business owner, I wanted to understand digital marketing to grow my startup. The agency-styled training at DSA gave me practical insights that I could immediately apply to my business. My online sales have increased by 300% after implementing what I learned here.",
        rating: 5
    }
];

// Testimonial Switcher
function initTestimonials() {
    const testimonialUsers = document.querySelectorAll('.testimonial-user');
    const testimonialTitle = document.getElementById('testimonial-title');
    const testimonialText = document.getElementById('testimonial-text');
    const testimonialRating = document.getElementById('testimonial-rating');

    if (!testimonialUsers.length) return;

    // Function to update testimonial content
    function updateTestimonial(index) {
        const testimonial = testimonials[index];

        // Add fade out effect
        const testimonialBody = document.querySelector('.testimonial-body');
        testimonialBody.style.opacity = '0';

        setTimeout(() => {
            // Update content
            testimonialTitle.textContent = testimonial.title;
            testimonialText.textContent = testimonial.text;

            // Update rating stars
            const fullStars = Math.floor(testimonial.rating);
            const hasHalfStar = testimonial.rating % 1 !== 0;
            let starsHTML = '';

            for (let i = 0; i < fullStars; i++) {
                starsHTML += '<i class="fas fa-star"></i>';
            }
            if (hasHalfStar) {
                starsHTML += '<i class="fas fa-star-half-alt"></i>';
            }
            for (let i = Math.ceil(testimonial.rating); i < 5; i++) {
                starsHTML += '<i class="far fa-star"></i>';
            }

            testimonialRating.innerHTML = starsHTML;

            // Fade in
            testimonialBody.style.opacity = '1';
        }, 300);
    }

    // Add click event to each user
    testimonialUsers.forEach((user, index) => {
        user.addEventListener('click', function () {
            // Remove active class from all users
            testimonialUsers.forEach(u => u.classList.remove('active'));

            // Add active class to clicked user
            this.classList.add('active');

            // Update testimonial content
            updateTestimonial(index);
        });
    });

    // Auto-rotate testimonials every 5 seconds
    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;

        // Remove active class from all
        testimonialUsers.forEach(u => u.classList.remove('active'));

        // Add active to current
        testimonialUsers[currentIndex].classList.add('active');

        // Update content
        updateTestimonial(currentIndex);
    }, 5000);
}

// Initialize testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);

// Result Carousel Indicators
function initResultCarousel() {
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const profilesContainer = document.querySelector('.result-profiles');
    const slides = document.querySelectorAll('.profile-slide');

    if (!indicators.length || !profilesContainer || !slides.length) return;

    let currentSlide = 0;
    const totalSlides = indicators.length;
    let isTransitioning = false;

    // Clone first and last slides for infinite effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);

    profilesContainer.appendChild(firstSlideClone);
    profilesContainer.insertBefore(lastSlideClone, slides[0]);

    // Set initial position (offset by 1 because of the cloned last slide at the beginning)
    profilesContainer.style.transform = 'translateX(-100%)';

    // Function to go to specific slide
    function goToSlide(slideIndex, smooth = true) {
        if (isTransitioning) return;

        isTransitioning = true;
        currentSlide = slideIndex;

        // Actual position includes the cloned slide offset
        const actualPosition = slideIndex + 1;
        const translateX = -actualPosition * 100;

        if (smooth) {
            profilesContainer.style.transition = 'transform 0.5s ease-in-out';
        } else {
            profilesContainer.style.transition = 'none';
        }

        profilesContainer.style.transform = `translateX(${translateX}%)`;

        // Update indicators
        indicators.forEach((ind, index) => {
            ind.classList.toggle('active', index === slideIndex);
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    }

    // Handle transition end for infinite loop
    profilesContainer.addEventListener('transitionend', () => {
        if (currentSlide === -1) {
            // We're at the cloned last slide, jump to real last slide
            currentSlide = totalSlides - 1;
            goToSlide(currentSlide, false);
        } else if (currentSlide === totalSlides) {
            // We're at the cloned first slide, jump to real first slide
            currentSlide = 0;
            goToSlide(currentSlide, false);
        }
    });

    // Add click event to each indicator
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function () {
            if (!isTransitioning) {
                goToSlide(index);
            }
        });
    });

    // Auto-rotate carousel every 4 seconds
    setInterval(() => {
        if (!isTransitioning) {
            currentSlide++;
            goToSlide(currentSlide);
        }
    }, 4000);
}

// Initialize result carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', initResultCarousel);
