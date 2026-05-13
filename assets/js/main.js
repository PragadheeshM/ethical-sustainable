/**
 * EcoMarket - Ethical & Sustainable Marketplace
 * Main JavaScript File
 */

// ========================================
// DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    initializeNavbar();
    initializeActiveNavLinks();
    initializeDarkMode();
    initializeRTLToggle();
    initializeMobileMenu();
    initializeMobileAccordion();
    initializeDropdowns();
    initializeCounters();
    initializeAccordions();
    initializeModals();
    initializeForms();
});

// ========================================
// Navbar Scroll Effect
// ========================================
function initializeNavbar() {
    const navbar = document.querySelector('.main-navbar');
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// ========================================
// Active Navigation Link
// ========================================
function initializeActiveNavLinks() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.main-navbar a[href$=".html"]');

    navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href) return;

        if (href === currentPage) {
            // Only add active class to actual nav links, not the brand logo
            if (link.classList.contains('nav-link') || link.closest('.dropdown-menu')) {
                link.classList.add('active-nav-link');
                link.classList.add('font-semibold');
            }
        }
    });
}

// ========================================
// Dark Mode Toggle
// ========================================
function initializeDarkMode() {
    const darkModeToggles = [
        document.getElementById('darkModeToggle'),
        document.getElementById('darkModeToggleMobile')
    ].filter(Boolean);
    const html = document.documentElement;
    
    // Check for saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        html.classList.add('dark');
    }
    
    updateDarkModeIcon(html.classList.contains('dark'));

    if (darkModeToggles.length > 0) {
        darkModeToggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('darkMode', isDark);
            
            // Update icon
            updateDarkModeIcon(isDark);
        });
        });
    }
}

function updateDarkModeIcon(isDark) {
    const icons = document.querySelectorAll('#darkModeToggle i, #darkModeToggleMobile i');
    icons.forEach((icon) => {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    });
}

// ========================================
// RTL Toggle
// ========================================
function initializeRTLToggle() {
    const rtlToggles = [
        document.getElementById('rtlToggle'),
        document.getElementById('rtlToggleMobile')
    ].filter(Boolean);
    const html = document.documentElement;
    
    // Function to update button text
    const updateBtnText = (isRTL) => {
        rtlToggles.forEach(btn => {
            const span = btn.querySelector('span');
            if (span) {
                span.textContent = isRTL ? 'LTR' : 'RTL';
            } else {
                btn.textContent = isRTL ? 'LTR' : 'RTL';
            }
        });
    };

    // Check for saved preference
    const savedRTL = localStorage.getItem('rtl');
    if (savedRTL === 'true') {
        html.setAttribute('dir', 'rtl');
        updateBtnText(true);
    } else {
        updateBtnText(false);
    }
    
    if (rtlToggles.length > 0) {
        rtlToggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const currentDir = html.getAttribute('dir');
                const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                html.setAttribute('dir', newDir);
                localStorage.setItem('rtl', newDir === 'rtl');
                updateBtnText(newDir === 'rtl');
            });
        });
    }
}

// ========================================
// Mobile Menu
// ========================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    }
}

// ========================================
// Mobile Accordion Dropdowns
// ========================================
function initializeMobileAccordion() {
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.mobile-accordion-trigger');
        if (!trigger) return;

        const targetId = trigger.getAttribute('data-target');
        const body = document.getElementById(targetId);
        if (!body) return;

        const isOpen = body.classList.contains('open');

        // Close all other open accordions
        document.querySelectorAll('.mobile-accordion-body.open').forEach(b => {
            if (b !== body) {
                b.classList.remove('open');
                const t = document.querySelector(`.mobile-accordion-trigger[data-target="${b.id}"]`);
                if (t) t.classList.remove('open');
            }
        });

        // Toggle current
        body.classList.toggle('open', !isOpen);
        trigger.classList.toggle('open', !isOpen);
    });
}

// ========================================
// Dropdown Menus
// ========================================
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (trigger && menu) {
            // Desktop hover
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 768) {
                    menu.classList.add('active');
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 768) {
                    menu.classList.remove('active');
                }
            });
            
            // Mobile click
            trigger.addEventListener('click', (e) => {
                if (window.innerWidth < 768) {
                    e.preventDefault();
                    menu.classList.toggle('active');
                }
            });
        }
    });
}

// ========================================
// Animated Counters
// ========================================
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// ========================================
// Accordions
// ========================================
function initializeAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.accordion-item');
            if (!item) return;
            
            const content = item.querySelector('.accordion-content');
            const isActive = item.classList.contains('active');
            
            // Close all other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) otherContent.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                if (content) content.classList.remove('active');
            } else {
                item.classList.add('active');
                if (content) content.classList.add('active');
            }
        });
    });
}

// ========================================
// Modals
// ========================================
function initializeModals() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal on close button or overlay click
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-overlay')) {
            const modal = e.target.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    });
}

// ========================================
// Form Validation
// ========================================
function initializeForms() {
    const forms = document.querySelectorAll('form[data-validate]');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    let isValid = true;
    let errorMessage = '';
    
    // Required check
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Password validation
    if (type === 'password' && value) {
        if (value.length < 6) {
            isValid = false;
            errorMessage = 'Password must be at least 6 characters';
        }
    }
    
    // Show/hide error
    if (!isValid) {
        showError(field, errorMessage);
    } else {
        clearError(field);
    }
    
    return isValid;
}

function showError(field, message) {
    const errorElement = field.parentElement.querySelector('.error-message') || createErrorElement(field);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.classList.add('border-red-500');
}

function clearError(field) {
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    field.classList.remove('border-red-500');
}

function createErrorElement(field) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    field.parentElement.appendChild(errorDiv);
    return errorDiv;
}

// ========================================
// Utility Functions
// ========================================

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Active navigation link highlighting
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Call on page load
highlightActiveNav();

// Image lazy loading
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} fixed bottom-4 right-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in-up`;
    toast.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle text-green-500' : 'fa-exclamation-circle text-red-500'} mr-3"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Export functions for global use
window.showToast = showToast;
