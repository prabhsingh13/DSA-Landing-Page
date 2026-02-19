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
