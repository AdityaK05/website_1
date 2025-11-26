/**
 * Portfolio Website - JavaScript
 * Handles navigation, animations, and interactivity
 */

// ===================================
// DOCUMENT READY
// ===================================

$(document).ready(function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize hover effects
    initHoverEffects();
    
    // Set active navigation link
    updateActiveNavLink();
});

// ===================================
// MOBILE MENU FUNCTIONALITY
// ===================================

/**
 * Initializes mobile hamburger menu
 */
function initMobileMenu() {
    const hamburger = $('.hamburger');
    const navMenu = $('.nav-menu');
    const navLinks = $('.nav-link');

    // Toggle menu on hamburger click
    hamburger.on('click', function() {
        navMenu.toggleClass('active');
        hamburger.toggleClass('active');
    });

    // Close menu when a link is clicked
    navLinks.on('click', function() {
        navMenu.removeClass('active');
        hamburger.removeClass('active');
    });

    // Close menu when clicking outside
    $(document).on('click', function(event) {
        if (!$(event.target).closest('.nav-container').length) {
            navMenu.removeClass('active');
            hamburger.removeClass('active');
        }
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

/**
 * Initializes animations that trigger on scroll
 */
function initScrollAnimations() {
    // Listen for scroll events
    $(window).on('scroll', function() {
        animateOnScroll();
    });

    // Trigger animations on initial load
    animateOnScroll();
}

/**
 * Animates elements that come into view during scroll
 */
function animateOnScroll() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();

    $('.fade-in-on-scroll').each(function() {
        const elementTop = $(this).offset().top;
        const elementBottom = elementTop + $(this).height();

        // Check if element is in viewport
        if (scrollTop + windowHeight > elementTop + 100 && scrollTop < elementBottom) {
            $(this).addClass('in-view');
        }
    });
}

// ===================================
// HOVER EFFECTS
// ===================================

/**
 * Initializes hover effects on various elements
 */
function initHoverEffects() {
    // Skill cards hover effect
    $('.skill-card').on('mouseenter', function() {
        $(this).css({
            'box-shadow': '0 12px 24px rgba(91, 109, 217, 0.25)',
            'transform': 'translateY(-10px)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'box-shadow': 'none',
            'transform': 'translateY(0)'
        });
    });

    // Resume items hover effect
    $('.resume-item').on('mouseenter', function() {
        $(this).css({
            'background-color': '#f5f7fa',
            'padding': '1rem',
            'border-radius': '5px'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'background-color': 'transparent',
            'padding': '0',
            'border-radius': '0'
        });
    });

    // Bio-data table rows hover effect
    $('.biodata-table tbody tr').on('mouseenter', function() {
        $(this).css({
            'background-color': '#e8f0fe',
            'transition': 'background-color 0.3s ease'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'background-color': '#ffffff'
        });
    });

    // Button hover effects
    $('.btn').on('mouseenter', function() {
        $(this).css({
            'transform': 'translateY(-2px)',
            'box-shadow': '0 8px 24px rgba(91, 109, 217, 0.3)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            'transform': 'translateY(0)',
            'box-shadow': 'none'
        });
    });
}

// ===================================
// NAVIGATION LINK ACTIVE STATE
// ===================================

/**
 * Updates the active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    $('.nav-link').each(function() {
        const href = $(this).attr('href');
        
        // Compare the last part of the href with current page
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}

// ===================================
// SMOOTH SCROLL TO ANCHOR LINKS
// ===================================

/**
 * Smooth scroll to section when clicking anchor links
 */
$(document).on('click', 'a[href^="#"]', function(e) {
    e.preventDefault();
    
    const target = $(this.getAttribute('href'));
    if (target.length) {
        $('html, body').stop().animate({
            scrollTop: target.offset().top - 80
        }, 1000);
    }
});

// ===================================
// PAGE-SPECIFIC FUNCTIONALITY
// ===================================

/**
 * Home Page - Animate elements on page load
 */
function animateHomePageElements() {
    $('.fade-in').each(function(index) {
        $(this).delay(index * 200).fadeIn(800);
    });
}

/**
 * Resume Page - Enhance skill tags
 */
function enhanceSkillTags() {
    $('.skill-tag').on('click', function() {
        const skill = $(this).text();
        console.log('Selected skill:', skill);
        // Could add more functionality here
    });
}

/**
 * Bio-data Page - Add print functionality feedback
 */
function initPrintFunctionality() {
    const printBtn = $('.print-section .btn:first-child');
    
    if (printBtn.length) {
        printBtn.on('click', function() {
            // Provide visual feedback
            $(this).css('opacity', '0.7');
            setTimeout(() => {
                $(this).css('opacity', '1');
            }, 300);
        });
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Debounce function to prevent excessive function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===================================
// WINDOW RESIZE HANDLER
// ===================================

/**
 * Handle window resize events
 */
$(window).on('resize', debounce(function() {
    // Close mobile menu on resize to desktop
    if ($(window).width() > 768) {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    }
}, 250));

// ===================================
// ACCESSIBILITY
// ===================================

/**
 * Enable keyboard navigation
 */
$(document).on('keydown', function(e) {
    // Close menu on Escape key
    if (e.key === 'Escape') {
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
    }
});

// ===================================
// INITIALIZATION ON PAGE LOAD
// ===================================

// Call page-specific initialization based on current page
$(window).on('load', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'index.html' || currentPage === '') {
        animateHomePageElements();
    } else if (currentPage === 'resume.html') {
        enhanceSkillTags();
    } else if (currentPage === 'biodata.html') {
        initPrintFunctionality();
    }
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

/**
 * Lazy load images (optional, for future enhancement)
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-lazy]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.lazy;
                    img.removeAttribute('data-lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ===================================
// CONSOLE STYLING (Optional Easter Egg)
// ===================================

console.log(
    '%cWelcome to My Portfolio! 🎉',
    'font-size: 20px; color: #5b6dd9; font-weight: bold;'
);
console.log(
    '%cCheck out the source code at GitHub',
    'font-size: 14px; color: #7f8c8d;'
);
