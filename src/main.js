/* =============================================
   MEGH MODI - PORTFOLIO WEBSITE
   Optimized, High-Performance Animation System
   Built with GSAP, ScrollTrigger, and Lenis
   ============================================= */

// =============================================
// INITIALIZATION & GLOBAL VARIABLES
// =============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global state object
const state = {
    lenis: null,
    cursor: { x: 0, y: 0, targetX: 0, targetY: 0 },
    isMenuOpen: false,
    isLoaded: false,
    isMobile: window.innerWidth < 1024,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    ctx: null
};

// Debounce utility
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

// =============================================
// SMOOTH SCROLLING WITH LENIS
// =============================================

function initLenis() {
    if (state.prefersReducedMotion) return;

    state.lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        infinite: false,
    });

    // Optimized RAF loop
    function raf(time) {
        state.lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync with ScrollTrigger
    state.lenis.on('scroll', ScrollTrigger.update);

    // Handle anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                state.lenis.scrollTo(target, { offset: 0, duration: 1.2 });
                if (state.isMenuOpen) closeMobileMenu();
            }
        });
    });
}

// =============================================
// CUSTOM CURSOR (Optimized with RAF + Lerp)
// =============================================

function initCursor() {
    if (state.isMobile || state.prefersReducedMotion) return;

    const cursorEl = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorEl || !cursorDot || !cursorOutline) return;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        state.cursor.targetX = e.clientX;
        state.cursor.targetY = e.clientY;
    }, { passive: true });

    // Lerp for smooth interpolation
    const lerp = (start, end, factor) => start + (end - start) * factor;

    // Single RAF loop for cursor
    let rafId;
    function updateCursor() {
        state.cursor.x = lerp(state.cursor.x, state.cursor.targetX, 0.15);
        state.cursor.y = lerp(state.cursor.y, state.cursor.targetY, 0.15);

        // Direct style updates (no GSAP overhead)
        cursorDot.style.transform = `translate(${state.cursor.targetX}px, ${state.cursor.targetY}px) translate(-50%, -50%)`;
        cursorOutline.style.transform = `translate(${state.cursor.x}px, ${state.cursor.y}px) translate(-50%, -50%)`;

        rafId = requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover states
    const interactiveSelectors = 'a, button, [role="button"], input, textarea, .magnetic-btn';
    document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor-hover'), { passive: true });
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor-hover', 'cursor-view'), { passive: true });
    });

    // View cursor for project cards
    document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseenter', () => cursorEl.classList.add('cursor-view'), { passive: true });
        el.addEventListener('mouseleave', () => cursorEl.classList.remove('cursor-view'), { passive: true });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => cursorEl.style.opacity = '0', { passive: true });
    document.addEventListener('mouseenter', () => cursorEl.style.opacity = '1', { passive: true });

    return () => cancelAnimationFrame(rafId);
}

// =============================================
// MAGNETIC BUTTONS (Optimized)
// =============================================

function initMagneticButtons() {
    if (state.isMobile || state.prefersReducedMotion) return;

    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        const strength = parseInt(btn.dataset.strength) || 15;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * (strength / 100)}px, ${y * (strength / 100)}px)`;
        }, { passive: true });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        }, { passive: true });
    });
}

// =============================================
// PRELOADER ANIMATION
// =============================================

function initPreloader() {
    const preloader = document.querySelector('.preloader');
    const letters = document.querySelectorAll('.preloader-letter');
    const counter = document.querySelector('.counter-number');
    const progress = document.querySelector('.preloader-progress');

    if (!preloader) {
        state.isLoaded = true;
        initHeroAnimation();
        return;
    }

    const tl = gsap.timeline({
        onComplete: () => {
            state.isLoaded = true;
            setTimeout(() => preloader.remove(), 100);
            initHeroAnimation();
        }
    });

    tl.to(letters, {
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out"
    });

    tl.to({ value: 0 }, {
        value: 100,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: function() {
            if (counter) counter.textContent = Math.round(this.targets()[0].value);
        }
    }, "-=0.3");

    tl.to(progress, {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut"
    }, "<");

    tl.to(letters, {
        y: -100,
        duration: 0.4,
        stagger: 0.03,
        ease: "power3.in"
    }, "+=0.2");

    tl.to(preloader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut"
    }, "-=0.2");
}

// =============================================
// HERO SECTION ANIMATION
// =============================================

function initHeroAnimation() {
    if (state.prefersReducedMotion) {
        gsap.set('.hero-label, .hero-title-word, .hero-title-accent, .hero-info, .hero-scroll', {
            opacity: 1, y: 0
        });
        return;
    }

    const tl = gsap.timeline({ delay: 0.1 });

    tl.to('.hero-label', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    tl.to('.hero-title-word, .hero-title-accent', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.06,
        ease: "power3.out"
    }, "-=0.5");

    tl.to('.hero-info', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    tl.to('.hero-scroll', {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");
}

// =============================================
// HEADER SCROLL BEHAVIOR
// =============================================

function initHeader() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const scroll = self.scroll();
                header.classList.toggle('scrolled', scroll > 80);

                if (scroll > lastScroll && scroll > 150) {
                    header.style.transform = 'translateY(-100%)';
                } else {
                    header.style.transform = 'translateY(0)';
                }

                lastScroll = scroll;
                ticking = false;
            });
        }
    });
}

// =============================================
// MOBILE MENU
// =============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        state.isMenuOpen ? closeMobileMenu() : openMobileMenu();
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
}

function openMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    state.isMenuOpen = true;
    menuToggle.classList.add('active');
    mobileMenu.classList.add('active');
    if (state.lenis) state.lenis.stop();

    gsap.to(mobileLinks, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.08,
        delay: 0.4,
        ease: "power3.out"
    });
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    state.isMenuOpen = false;
    menuToggle.classList.remove('active');

    gsap.to(mobileLinks, {
        opacity: 0,
        x: -20,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.in",
        onComplete: () => {
            mobileMenu.classList.remove('active');
            if (state.lenis) state.lenis.start();
        }
    });
}

// =============================================
// SCROLL ANIMATIONS (Optimized with batching)
// =============================================

function initScrollAnimations() {
    if (state.prefersReducedMotion) {
        gsap.set('.reveal-text, .section-title-word, .skill-category, .timeline-item, .achievement-stat', {
            opacity: 1, y: 0, x: 0
        });
        return;
    }

    state.ctx = gsap.context(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
            initDesktopAnimations();
        });

        mm.add("(max-width: 767px)", () => {
            initMobileAnimations();
        });

        initCommonAnimations();
    });
}

function initCommonAnimations() {
    gsap.utils.toArray('.section-title-word').forEach(word => {
        gsap.to(word, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: word,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    ScrollTrigger.batch('.reveal-text', {
        onEnter: (elements) => {
            gsap.to(elements, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        },
        start: "top 85%",
        once: true
    });

    ScrollTrigger.batch('.section-number', {
        onEnter: (elements) => {
            gsap.from(elements, {
                scale: 0,
                opacity: 0,
                duration: 0.5,
                ease: "back.out(1.5)",
                stagger: 0.1
            });
        },
        start: "top 85%",
        once: true
    });
}

function initDesktopAnimations() {
    initAboutAnimations();
    initProjectsAnimations();
    initSkillsAnimations();
    initAwardsAnimations();
    initContactAnimations();
}

function initMobileAnimations() {
    ScrollTrigger.batch('.project-card, .skill-category, .timeline-item', {
        onEnter: (elements) => {
            gsap.to(elements, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        },
        start: "top 90%",
        once: true
    });
}

// =============================================
// ABOUT SECTION ANIMATIONS
// =============================================

function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    const imageWrapper = document.querySelector('.about-image-wrapper');
    if (imageWrapper) {
        gsap.from(imageWrapper, {
            opacity: 0,
            scale: 0.95,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: imageWrapper,
                start: "top 80%",
                once: true
            }
        });
    }

    document.querySelectorAll('.about-stat-number').forEach(stat => {
        const value = parseFloat(stat.dataset.value);
        const isDecimal = value % 1 !== 0;

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: value,
                    duration: 1.5,
                    ease: "power2.out",
                    onUpdate: function() {
                        stat.textContent = isDecimal 
                            ? this.targets()[0].val.toFixed(1)
                            : Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });
}

// =============================================
// PROJECTS SECTION ANIMATIONS
// =============================================

function initProjectsAnimations() {
    document.querySelectorAll('.project-card').forEach((card) => {
        gsap.from(card, {
            y: 60,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                once: true
            }
        });

        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.01)';
        }, { passive: true });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        }, { passive: true });
    });
}

// =============================================
// SKILLS SECTION ANIMATIONS
// =============================================

function initSkillsAnimations() {
    ScrollTrigger.batch('.skill-category', {
        onEnter: (elements) => {
            gsap.to(elements, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out"
            });
        },
        start: "top 85%",
        once: true
    });

    document.querySelectorAll('.skill-category').forEach(category => {
        const pills = category.querySelectorAll('.skill-pill');
        
        ScrollTrigger.create({
            trigger: category,
            start: "top 80%",
            once: true,
            onEnter: () => {
                gsap.from(pills, {
                    scale: 0.8,
                    opacity: 0,
                    duration: 0.4,
                    stagger: 0.03,
                    ease: "back.out(1.2)"
                });
            }
        });
    });
}

// =============================================
// AWARDS SECTION ANIMATIONS
// =============================================

function initAwardsAnimations() {
    const timelineProgress = document.querySelector('.timeline-progress');
    
    if (timelineProgress) {
        gsap.to(timelineProgress, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: '.awards-timeline',
                start: "top 70%",
                end: "bottom 40%",
                scrub: 0.5
            }
        });
    }

    ScrollTrigger.batch('.timeline-item', {
        onEnter: (elements) => {
            elements.forEach((el, i) => {
                gsap.to(el, {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "power3.out",
                    onComplete: () => el.classList.add('active')
                });
            });
        },
        start: "top 80%",
        once: true
    });

    document.querySelectorAll('.achievement-stat').forEach((stat, index) => {
        const number = stat.querySelector('.achievement-stat-number');
        if (!number) return;
        
        const value = parseFloat(number.dataset.value);
        const isDecimal = value % 1 !== 0;

        ScrollTrigger.create({
            trigger: '.achievement-stats',
            start: "top 85%",
            once: true,
            onEnter: () => {
                gsap.to(stat, {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: "power3.out"
                });

                gsap.to({ val: 0 }, {
                    val: value,
                    duration: 1.5,
                    delay: index * 0.08,
                    ease: "power2.out",
                    onUpdate: function() {
                        number.textContent = isDecimal 
                            ? this.targets()[0].val.toFixed(1)
                            : Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    });
}

// =============================================
// CONTACT SECTION ANIMATIONS
// =============================================

function initContactAnimations() {
    ScrollTrigger.create({
        trigger: '.contact-title',
        start: "top 80%",
        once: true,
        onEnter: () => {
            gsap.from('.contact-title-line', {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.contact-form',
        start: "top 80%",
        once: true,
        onEnter: () => {
            gsap.from('.form-group', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out"
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.contact-info',
        start: "top 85%",
        once: true,
        onEnter: () => {
            gsap.from('.contact-info-item', {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.08,
                ease: "power3.out"
            });
        }
    });

    ScrollTrigger.create({
        trigger: '.contact-socials',
        start: "top 90%",
        once: true,
        onEnter: () => {
            gsap.from('.social-link', {
                scale: 0,
                opacity: 0,
                duration: 0.4,
                stagger: 0.08,
                ease: "back.out(1.5)"
            });
        }
    });
}

// =============================================
// CONTACT FORM HANDLING
// =============================================

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.form-submit');
        
        submitBtn.disabled = true;
        submitBtn.style.transform = 'scale(0.98)';

        setTimeout(() => {
            submitBtn.classList.add('success');
            submitBtn.style.transform = 'scale(1)';

            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.disabled = false;
                form.reset();
            }, 2500);
        }, 1200);
    });
}

// =============================================
// MARQUEE INITIALIZATION
// =============================================

function initMarquee() {
    const marqueeTrack = document.querySelector('.hero-marquee-track');
    if (!marqueeTrack) return;
    const content = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = content + content;
}

// =============================================
// RESIZE HANDLER (Debounced)
// =============================================

function initResizeHandler() {
    const handleResize = debounce(() => {
        state.isMobile = window.innerWidth < 1024;
        ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize, { passive: true });
}

// =============================================
// REDUCED MOTION HANDLER
// =============================================

function handleReducedMotion() {
    if (state.prefersReducedMotion) {
        gsap.globalTimeline.clear();
        
        gsap.set([
            '.reveal-text',
            '.section-title-word',
            '.hero-title-word',
            '.hero-title-accent',
            '.hero-label',
            '.hero-info',
            '.hero-scroll',
            '.skill-category',
            '.timeline-item',
            '.achievement-stat'
        ].join(', '), {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            item.classList.add('active');
        });
    }
}

// =============================================
// CLEANUP FUNCTION
// =============================================

function cleanup() {
    if (state.ctx) state.ctx.revert();
    if (state.lenis) state.lenis.destroy();
    ScrollTrigger.killAll();
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    handleReducedMotion();
    initLenis();
    initCursor();
    initMagneticButtons();
    initMarquee();
    initPreloader();
    initHeader();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initResizeHandler();

    console.log('✨ Portfolio initialized');
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden && state.lenis) {
        state.lenis.stop();
    } else if (state.lenis) {
        state.lenis.start();
    }
});

// Final refresh after load
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

// Cleanup on unload
window.addEventListener('beforeunload', cleanup);