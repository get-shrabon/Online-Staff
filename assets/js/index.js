// ========================= Header JS =========================
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuButton = event.target.closest('.dropdown-end');

    if (!menuButton && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// Add shadow to header on scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 10) {
        header.classList.add('header-sticky');
    } else {
        header.classList.remove('header-sticky');
    }
});
// ========================= Header JS =========================


// ========================= Pricing Cards JS =========================
document.addEventListener('DOMContentLoaded', () => {
    const monthlyBtn = document.getElementById('monthlyBtn'),
        yearlyBtn = document.getElementById('yearlyBtn');
    let isYearly = false;

    const monthlyPlans = {
        basic: { price: '$299', period: '/month' },
        pro: { price: '$599', period: '/month' },
        enterprise: { price: '$999', period: '/month' }
    };

    const yearlyPlans = {
        basic: { price: '$2,390', period: '/year', originalPrice: '$3,588', savings: 'Save $1,198' },
        pro: { price: '$5,750', period: '/year', originalPrice: '$7,188', savings: 'Save $1,438' },
        enterprise: { price: '$9,590', period: '/year', originalPrice: '$11,988', savings: 'Save $2,398' }
    };

    const updatePricing = () => {
        const plans = isYearly ? yearlyPlans : monthlyPlans,
            planKeys = ['basic', 'pro', 'enterprise'];

        planKeys.forEach((key, i) => {
            document.querySelector(`.plan-card:nth-child(${i + 1}) .text-5xl`).textContent = plans[key].price;
            document.querySelector(`.plan-card:nth-child(${i + 1}) .text-gray-600`).textContent = plans[key].period;

            const pricingDiv = document.querySelectorAll('.plan-card .mb-6')[i],
                existingSavings = pricingDiv.querySelector('.savings-info');
            if (existingSavings) existingSavings.remove();

            if (isYearly && plans[key].savings) {
                pricingDiv.insertAdjacentHTML('beforeend', `
                    <div class="savings-info text-sm text-green-600 font-semibold mt-2">
                        <div class="line-through text-gray-400">${plans[key].originalPrice}</div>
                        <div>${plans[key].savings}</div>
                    </div>
                `);
            }
        });
    };

    const toggleButtons = () => {
        [[monthlyBtn, !isYearly], [yearlyBtn, isYearly]].forEach(([btn, active]) => {
            btn.style.backgroundColor = active ? '#1fa2ff' : 'transparent';
            btn.style.color = active ? 'white' : '#6b7280';
            btn.classList.toggle('toggle-btn-active', active);
            btn.classList.toggle('toggle-btn-inactive', !active);
        });
    };

    monthlyBtn.addEventListener('click', () => { if (isYearly) { isYearly = false; updatePricing(); toggleButtons(); } });
    yearlyBtn.addEventListener('click', () => { if (!isYearly) { isYearly = true; updatePricing(); toggleButtons(); } });

    toggleButtons();
});

// ========================= Pricing Cards JS =========================


// ========================= Portfolio JS =========================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.classList.add('bg-gray-100', 'text-primary-color');
            btn.classList.remove('bg-accent-color', 'text-white');
        });

        // Add active class to clicked button
        button.classList.add('active');
        button.classList.remove('bg-gray-100', 'text-primary-color');
        button.classList.add('bg-accent-color', 'text-white');

        // Get filter value
        const filterValue = button.getAttribute('data-filter');

        // Filter projects
        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');

            if (filterValue === 'all' || cardCategory === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal functionality
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.showModal();
}

// Initialize portfolio cards with animation
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 100);
});
// ========================= Portfolio JS =========================


// ========================= Testimonial JS =========================
var swiper = new Swiper('.testimonialSwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    grabCursor: true,
    centeredSlides: false,
    direction: 'horizontal',

    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
        },
        1280: {
            slidesPerView: 3,
            spaceBetween: 50,
        }
    },
    effect: 'slide',
    speed: 800,
    slidesPerGroup: 1,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
});

// Pause autoplay on hover
document.querySelector('.testimonialSwiper').addEventListener('mouseenter', function () {
    swiper.autoplay.stop();
});

document.querySelector('.testimonialSwiper').addEventListener('mouseleave', function () {
    swiper.autoplay.start();
});
// ========================= Testimonial JS =========================



// ========================= Home Banner 2 JS ============================
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form elements
    const formData = new FormData(e.target);
    const formElements = e.target.elements;

    // Simple validation
    let isValid = true;
    const requiredFields = ['name', 'email', 'phone', 'website', 'project', 'duration', 'requirements'];

    // Check if all required fields are filled
    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];
        if (element.hasAttribute('required') && !element.value.trim()) {
            element.style.borderColor = '#ff6b6b';
            isValid = false;
        } else {
            element.style.borderColor = '';
        }
    }

    if (isValid) {
        // Show success message
        const button = e.target.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="flex items-center justify-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Sending...</span>';
        button.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            button.innerHTML = '<span class="flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Request Sent!</span>';
            button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.style.background = '';
                e.target.reset();
            }, 3000);
        }, 2000);
    } else {
        // Show error message
        alert('Please fill in all required fields.');
    }
});

// Add required attributes to form elements
document.addEventListener('DOMContentLoaded', function () {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
        if (index < 7) { // First 7 elements are required based on the original form
            input.setAttribute('required', '');
        }
    });
});
// ========================= Home Banner 2 JS ============================


