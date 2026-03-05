// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        const menuLinks = navLinks.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ==========================================
    // HERO CAROUSEL FUNCTIONALITY
    // ==========================================
    const heroCarousel = document.querySelector('.hero-carousel');
    if (heroCarousel) {
        const slides = heroCarousel.querySelectorAll('.hero-slide');
        const indicators = heroCarousel.querySelectorAll('.indicator');
        const prevBtn = heroCarousel.querySelector('.carousel-control.prev');
        const nextBtn = heroCarousel.querySelector('.carousel-control.next');
        let currentSlide = 0;
        let autoSlideInterval;
        const autoSlideDelay = 5000;

        function showSlide(index) {
            if (index >= slides.length) index = 0;
            if (index < 0) index = slides.length - 1;
            
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, autoSlideDelay);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                nextSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                prevSlide();
                startAutoSlide();
            });
        }

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });

        heroCarousel.addEventListener('mouseenter', stopAutoSlide);
        heroCarousel.addEventListener('mouseleave', startAutoSlide);

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        heroCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroCarousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                stopAutoSlide();
                if (diff > 0) nextSlide();
                else prevSlide();
                startAutoSlide();
            }
        });

        startAutoSlide();
    }

    // ==========================================
    // ANIMATED COUNTING NUMBERS
    // ==========================================
    function animateNumber(element, start, end, duration, suffix = '') {
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            
            let current = start + (end - start) * easeOutQuart;
            current = Math.floor(current);
            
            const formattedNumber = Number(current).toLocaleString();
            element.textContent = formattedNumber + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.classList.add('counting');
                setTimeout(() => element.classList.remove('counting'), 500);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    function parseStatNumber(text) {
        const hasPlus = text.includes('+');
        const hasPercent = text.includes('%');
        
        let suffix = '';
        if (hasPercent) suffix = '%';
        if (hasPlus) suffix += '+';
        if (!hasPercent && hasPlus) suffix = '+';
        
        const numericValue = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        return { value: numericValue, suffix: suffix };
    }

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.hasAttribute('data-animated')) {
                    const originalText = statNumber.textContent;
                    const { value, suffix } = parseStatNumber(originalText);
                    
                    if (!isNaN(value)) {
                        statNumber.setAttribute('data-animated', 'true');
                        statNumber.textContent = '0' + suffix;
                        animateNumber(statNumber, 0, value, 2000, suffix);
                    }
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));

    // Animate crop stats too
    document.querySelectorAll('.crop-stat').forEach(stat => {
        const cropObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    const originalText = entry.target.textContent;
                    const { value, suffix } = parseStatNumber(originalText);
                    
                    if (!isNaN(value)) {
                        entry.target.setAttribute('data-animated', 'true');
                        entry.target.textContent = '0' + suffix;
                        animateNumber(entry.target, 0, value, 1500, suffix);
                    }
                    cropObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        cropObserver.observe(stat);
    });

    // ==========================================
    // CONTACT FORM WITH SUCCESS POPUP & EMAIL
    // ==========================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        // Set the redirect URL to current page with success parameter
        const nextUrl = document.getElementById('formNextUrl');
        if (nextUrl) {
            nextUrl.value = window.location.href.split('?')[0] + '?submitted=true';
        }

        contactForm.addEventListener('submit', function(e) {
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const message = document.getElementById('contactMessage').value;

            if (!name || !email || !message) {
                e.preventDefault();
                showErrorMessage('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                showErrorMessage('Please enter a valid email address.');
                return;
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }

    function showErrorMessage(message) {
        const toast = document.createElement('div');
        toast.innerHTML = `<span>⚠️</span><span>${message}</span>`;
        toast.style.cssText = `
            position: fixed; top: 20px; right: 20px; background: #ff4444; color: white;
            padding: 1rem 1.5rem; border-radius: 8px; display: flex; align-items: center;
            gap: 10px; z-index: 3000; animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(255, 68, 68, 0.3);
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ==========================================
    // SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // FADE-IN ANIMATIONS
    // ==========================================
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section:not(.hero-carousel)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(section);
    });

    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.style.boxShadow = window.pageYOffset > 100 
            ? '0 4px 20px rgba(0,0,0,0.15)' 
            : '0 2px 10px rgba(0,0,0,0.1)';
    });

    // ==========================================
    // MODAL SYSTEM
    // ==========================================
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (typeof modal === 'string') modal = document.getElementById(modal);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Open modal via data-modal attribute
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    // Close modal via close button
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) closeModal(this);
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m));
        }
    });

    // ==========================================
    // FORM SUBMISSIONS (ALL FORMS)
    // ==========================================
    const formConfigs = {
        farmerForm: {
            nextUrlId: 'farmerFormNextUrl',
            successTitle: 'Welcome to MavunoSasa! 🌾',
            successMessage: 'Welcome to the MavunoSasa family! Our team will contact you within 3 working days via your phone number.'
        },
        agentForm: {
            nextUrlId: 'agentFormNextUrl',
            successTitle: 'Application Received! 🤝',
            successMessage: 'Thank you for applying! Our operations team will review your application and respond within 5 working days.'
        },
        investorForm: {
            nextUrlId: 'investorFormNextUrl',
            successTitle: 'Inquiry Received! 💼',
            successMessage: 'Thank you for your interest in MavunoSasa. Our CEO, Kelvin Joseph, will personally review your inquiry and respond within 48 hours.'
        },
        collaborateForm: {
            nextUrlId: 'collabFormNextUrl',
            successTitle: 'Inquiry Received! 🤝',
            successMessage: 'Thank you for reaching out! Our partnerships team will respond within 48 hours.'
        },
        supportForm: {
            nextUrlId: 'supportFormNextUrl',
            successTitle: 'Thank You for Your Support! ❤️',
            successMessage: 'We appreciate your willingness to support MavunoSasa! Our team will review your submission and follow up with next steps within 3 working days.'
        }
    };

    Object.entries(formConfigs).forEach(([formId, config]) => {
        const form = document.getElementById(formId);
        if (!form) return;

        // Set redirect URL
        const nextUrl = document.getElementById(config.nextUrlId);
        if (nextUrl) {
            const param = `form_submitted=${formId}`;
            nextUrl.value = window.location.href.split('?')[0] + '?' + param;
        }

        form.addEventListener('submit', function(e) {
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
            }
            // Form submits natively to FormSubmit.co
        });
    });

    // Check if redirected back after any form submission
    const urlParams = new URLSearchParams(window.location.search);
    const submittedForm = urlParams.get('form_submitted');
    if (submittedForm && formConfigs[submittedForm]) {
        const config = formConfigs[submittedForm];
        document.getElementById('successTitle').textContent = config.successTitle;
        document.getElementById('successMessage').textContent = config.successMessage;
        showSuccessPopup();
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (window.location.search.includes('submitted=true')) {
        showSuccessPopup();
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    // ==========================================
    // BUTTON CLICK HANDLERS
    // ==========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Skip if it's a submit button, has a modal trigger, or is a link
            if (this.type === 'submit' || this.hasAttribute('data-modal') || this.hasAttribute('href')) return;

            const text = this.textContent.toLowerCase();
            
            if (text.includes('learn more') || text.includes('about')) {
                e.preventDefault();
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('see our regions') || text.includes('regions')) {
                e.preventDefault();
                document.querySelector('.where-we-work')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('view our crops') || text.includes('crops') || text.includes('impact')) {
                e.preventDefault();
                document.querySelector('#impact')?.scrollIntoView({ behavior: 'smooth' });
            } else if (text.includes('get involved')) {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // ACTIVE NAV HIGHLIGHTING
    // ==========================================
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinksArray.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    console.log('%cMavunoSasa', 'color: #2d5f3f; font-size: 24px; font-weight: bold;');
    console.log('%cEmpowering farmers across Tanzania', 'color: #6c757d; font-size: 14px;');
});

// ==========================================
// GLOBAL POPUP FUNCTIONS
// ==========================================
function showSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSuccessPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function(e) {
    const popup = document.getElementById('successPopup');
    if (popup && e.target === popup) closeSuccessPopup();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSuccessPopup();
});

// Add CSS for active nav links
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: var(--primary-green);
        font-weight: 600;
        position: relative;
    }
    .nav-links a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        width: 100%;
        height: 2px;
        background: var(--primary-green);
    }
`;
document.head.appendChild(style);
