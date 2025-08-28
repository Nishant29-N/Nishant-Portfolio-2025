document.addEventListener('DOMContentLoaded', function () {
    /** ------------------------------
     * Fade-in for Hero + Sections
     ------------------------------- */
    const fadeEls = document.querySelectorAll('.fade-in');

    // Add initial hero fade-in with slight delay
    const heroText = document.querySelector('.fade-in');
    if (heroText) {
        setTimeout(() => {
            heroText.classList.add('show');
        }, 300);
    }

    // Intersection Observer for other fade-ins on scroll
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                obs.unobserve(entry.target); // run once
            }
        });
    }, { threshold: 0.2 });

    fadeEls.forEach(el => {
        observer.observe(el);
    });

    /** ------------------------------
     * Navbar Toggle with Animations
     ------------------------------- */
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-default');

    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function () {
            if (navbarMenu.classList.contains('hidden')) {
                // Opening
                navbarMenu.classList.remove('hidden');
                navbarMenu.classList.add('animate-fade-in-down');
            } else {
                // Closing with animation
                navbarMenu.classList.add('animate-fade-out-up');
                navbarMenu.addEventListener('animationend', function handler() {
                    navbarMenu.classList.add('hidden');
                    navbarMenu.classList.remove('animate-fade-out-up');
                    navbarMenu.removeEventListener('animationend', handler);
                });
            }
        });

        // Hide menu when a link is clicked (better mobile UX)
        const navLinks = navbarMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    navbarMenu.classList.add('animate-fade-out-up');
                    navbarMenu.addEventListener('animationend', function handler() {
                        navbarMenu.classList.add('hidden');
                        navbarMenu.classList.remove('animate-fade-out-up');
                        navbarMenu.removeEventListener('animationend', handler);
                    });
                }
            });
        });
    }

    /** ------------------------------
     * Smooth Scrolling for Anchor Links
     ------------------------------- */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});



