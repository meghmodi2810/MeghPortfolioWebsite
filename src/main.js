/* =============================================
   MEGH MODI - PORTFOLIO WEBSITE
   Ultra-Modern, Cinematic Animation System
   Built with GSAP, ScrollTrigger, and Lenis
   ============================================= */

// =============================================
// INITIALIZATION & GLOBAL VARIABLES
// =============================================

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CustomEase);

// Create custom easing curves for premium animations
CustomEase.create("smooth", "M0,0 C0.25,0.1 0.25,1 1,1");
CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("elastic", "M0,0 C0.68,-0.55 0.265,1.55 1,1");

// Global variables
let lenis;
let cursor = { x: 0, y: 0 };
let cursorTarget = { x: 0, y: 0 };
let isMenuOpen = false;
let isLoaded = false;

// =============================================
// SMOOTH SCROLLING WITH LENIS
// =============================================

function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links with smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                lenis.scrollTo(target, {
                    offset: 0,
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });

                // Close mobile menu if open
                if (isMenuOpen) {
                    closeMobileMenu();
                }
            }
        });
    });
}

// =============================================
// CUSTOM CURSOR
// =============================================

function initCursor() {
    const cursorEl = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const cursorText = document.querySelector('.cursor-text');

    if (!cursorEl || window.innerWidth < 1024) return;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        cursorTarget.x = e.clientX;
        cursorTarget.y = e.clientY;
    });

    // Animate cursor with smooth follow
    function updateCursor() {
        cursor.x += (cursorTarget.x - cursor.x) * 0.15;
        cursor.y += (cursorTarget.y - cursor.y) * 0.15;

        gsap.set(cursorDot, { x: cursorTarget.x, y: cursorTarget.y });
        gsap.set(cursorOutline, { x: cursor.x, y: cursor.y });
        gsap.set(cursorText, { x: cursor.x, y: cursor.y });

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Cursor hover states
    const hoverElements = document.querySelectorAll('a, button, .magnetic-btn, [data-cursor]');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorEl.classList.add('cursor-hover');
            
            if (el.dataset.cursor === 'view') {
                cursorEl.classList.add('cursor-view');
                cursorText.textContent = 'View';
            }
        });

        el.addEventListener('mouseleave', () => {
            cursorEl.classList.remove('cursor-hover', 'cursor-view');
        });
    });

    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        gsap.to(cursorEl, { opacity: 0, duration: 0.3 });
    });

    document.addEventListener('mouseenter', () => {
        gsap.to(cursorEl, { opacity: 1, duration: 0.3 });
    });
}

// =============================================
// MAGNETIC BUTTONS
// =============================================

function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        const strength = parseInt(btn.dataset.strength) || 20;

        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * (strength / 100),
                y: y * (strength / 100),
                duration: 0.4,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.3)"
            });
        });
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

    if (!preloader) return;

    const tl = gsap.timeline({
        onComplete: () => {
            isLoaded = true;
            initHeroAnimation();
        }
    });

    // Animate letters in
    tl.to(letters, {
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "expo"
    });

    // Counter animation
    tl.to({ value: 0 }, {
        value: 100,
        duration: 2,
        ease: "power1.inOut",
        onUpdate: function() {
            counter.textContent = Math.round(this.targets()[0].value);
        }
    }, "-=0.5");

    // Progress bar
    tl.to(progress, {
        width: "100%",
        duration: 2,
        ease: "power1.inOut"
    }, "<");

    // Animate out
    tl.to(letters, {
        y: -120,
        duration: 0.6,
        stagger: 0.05,
        ease: "expo.in"
    }, "+=0.3");

    tl.to(preloader, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut"
    }, "-=0.3");
}

// =============================================
// HERO SECTION ANIMATION
// =============================================

function initHeroAnimation() {
    const heroLabel = document.querySelector('.hero-label');
    const heroWords = document.querySelectorAll('.hero-title-word, .hero-title-accent');
    const heroInfo = document.querySelector('.hero-info');
    const heroScroll = document.querySelector('.hero-scroll');

    const tl = gsap.timeline({ delay: 0.2 });

    // Label animation
    tl.to(heroLabel, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo"
    });

    // Title words stagger animation
    tl.to(heroWords, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.08,
        ease: "expo"
    }, "-=0.6");

    // Info section
    tl.to(heroInfo, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "expo"
    }, "-=0.8");

    // Scroll indicator
    tl.to(heroScroll, {
        opacity: 1,
        duration: 1,
        ease: "power2.out"
    }, "-=0.5");
}

// =============================================
// HEADER SCROLL BEHAVIOR
// =============================================

function initHeader() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
            const scroll = self.scroll();
            
            // Add scrolled class
            if (scroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide/show on scroll direction
            if (scroll > lastScroll && scroll > 200) {
                gsap.to(header, {
                    yPercent: -100,
                    duration: 0.4,
                    ease: "power2.out"
                });
            } else {
                gsap.to(header, {
                    yPercent: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }

            lastScroll = scroll;
        }
    });
}

// =============================================
// MOBILE MENU
// =============================================

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', () => {
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
}

function openMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    isMenuOpen = true;
    menuToggle.classList.add('active');
    mobileMenu.classList.add('active');
    lenis.stop();

    gsap.to(mobileLinks, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.5,
        ease: "expo"
    });
}

function closeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    isMenuOpen = false;
    menuToggle.classList.remove('active');

    gsap.to(mobileLinks, {
        opacity: 0,
        x: -30,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.in",
        onComplete: () => {
            mobileMenu.classList.remove('active');
            lenis.start();
        }
    });
}

// =============================================
// SECTION ANIMATIONS
// =============================================

function initSectionAnimations() {
    // Section titles
    document.querySelectorAll('.section-title-word').forEach(word => {
        gsap.to(word, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo",
            scrollTrigger: {
                trigger: word,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Reveal text elements
    document.querySelectorAll('.reveal-text').forEach(el => {
        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Section numbers
    document.querySelectorAll('.section-number').forEach(num => {
        gsap.from(num, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: num,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// =============================================
// ABOUT SECTION ANIMATIONS
// =============================================

function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;

    // Image wrapper animation
    const imageWrapper = document.querySelector('.about-image-wrapper');
    gsap.from(imageWrapper, {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "expo",
        scrollTrigger: {
            trigger: imageWrapper,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.about-stat-number');
    statNumbers.forEach(stat => {
        const value = parseFloat(stat.dataset.value);
        const isDecimal = value % 1 !== 0;

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: value,
                    duration: 2,
                    ease: "power2.out",
                    onUpdate: function() {
                        stat.textContent = isDecimal 
                            ? this.targets()[0].val.toFixed(1)
                            : Math.round(this.targets()[0].val);
                    }
                });
            },
            once: true
        });
    });

    // Parallax text
    const parallaxText = document.querySelector('.about-parallax-text .parallax-text-item');
    if (parallaxText) {
        gsap.to(parallaxText, {
            x: "10%",
            ease: "none",
            scrollTrigger: {
                trigger: aboutSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

// =============================================
// PROJECTS SECTION ANIMATIONS
// =============================================

function initProjectsAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach((card, index) => {
        const inner = card.querySelector('.project-card-inner');
        const content = card.querySelector('.project-card-content');
        const visual = card.querySelector('.project-card-visual');
        const title = card.querySelector('.project-title');
        const features = card.querySelectorAll('.project-feature');

        // Card entrance animation
        gsap.from(card, {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.2,
            ease: "expo",
            scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Title animation
        gsap.from(title, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "expo",
            scrollTrigger: {
                trigger: card,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        // Features stagger
        gsap.from(features, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "expo",
            scrollTrigger: {
                trigger: card,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });

        // Visual parallax effect
        if (visual) {
            gsap.to(visual, {
                y: -30,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        }

        // Hover interactions
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    });

    // Projects parallax text
    const projectsParallax = document.querySelector('.projects-parallax-text .parallax-text-item');
    if (projectsParallax) {
        gsap.to(projectsParallax, {
            y: "-20%",
            ease: "none",
            scrollTrigger: {
                trigger: '.projects',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    }
}

// =============================================
// SKILLS SECTION ANIMATIONS
// =============================================

function initSkillsAnimations() {
    const skillCategories = document.querySelectorAll('.skill-category');

    skillCategories.forEach((category, index) => {
        const pills = category.querySelectorAll('.skill-pill');

        // Category entrance
        gsap.to(category, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo",
            scrollTrigger: {
                trigger: category,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        // Pills stagger animation
        gsap.from(pills, {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
                trigger: category,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Orbit animation enhancement
    const orbits = document.querySelectorAll('.orbit-ring');
    orbits.forEach((orbit, index) => {
        gsap.from(orbit, {
            scale: 0,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: "expo",
            scrollTrigger: {
                trigger: '.skills-orbit',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });
}

// =============================================
// AWARDS SECTION ANIMATIONS
// =============================================

function initAwardsAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');

    // Timeline progress animation
    if (timelineProgress) {
        gsap.to(timelineProgress, {
            height: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: '.awards-timeline',
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1
            }
        });
    }

    // Timeline items
    timelineItems.forEach((item, index) => {
        gsap.to(item, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "expo",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play none none reverse",
                onEnter: () => item.classList.add('active'),
                onLeaveBack: () => item.classList.remove('active')
            }
        });
    });

    // Achievement stats
    const achievementStats = document.querySelectorAll('.achievement-stat');
    achievementStats.forEach((stat, index) => {
        const number = stat.querySelector('.achievement-stat-number');
        const value = parseFloat(number.dataset.value);
        const isDecimal = value % 1 !== 0;

        gsap.to(stat, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: "expo",
            scrollTrigger: {
                trigger: '.achievement-stats',
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        ScrollTrigger.create({
            trigger: stat,
            start: "top 85%",
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: value,
                    duration: 2,
                    delay: index * 0.1,
                    ease: "power2.out",
                    onUpdate: function() {
                        number.textContent = isDecimal 
                            ? this.targets()[0].val.toFixed(1)
                            : Math.round(this.targets()[0].val);
                    }
                });
            },
            once: true
        });
    });
}

// =============================================
// CONTACT SECTION ANIMATIONS
// =============================================

function initContactAnimations() {
    const contactSection = document.querySelector('.contact');
    if (!contactSection) return;

    // Title lines animation
    const titleLines = document.querySelectorAll('.contact-title-line');
    titleLines.forEach((line, index) => {
        gsap.from(line, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: index * 0.15,
            ease: "expo",
            scrollTrigger: {
                trigger: '.contact-title',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Form inputs animation
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach((group, index) => {
        gsap.from(group, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "expo",
            scrollTrigger: {
                trigger: '.contact-form',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Contact info animation
    const infoItems = document.querySelectorAll('.contact-info-item');
    infoItems.forEach((item, index) => {
        gsap.from(item, {
            x: -30,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: "expo",
            scrollTrigger: {
                trigger: '.contact-info',
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Social links
    const socialLinks = document.querySelectorAll('.social-link');
    gsap.from(socialLinks, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
            trigger: '.contact-socials',
            start: "top 90%",
            toggleActions: "play none none reverse"
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
        
        // Animate button to loading state
        gsap.to(submitBtn, {
            scale: 0.95,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
                // Simulate form submission
                setTimeout(() => {
                    submitBtn.classList.add('success');
                    
                    gsap.to(submitBtn, {
                        scale: 1,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)"
                    });

                    // Reset after 3 seconds
                    setTimeout(() => {
                        submitBtn.classList.remove('success');
                        form.reset();
                    }, 3000);
                }, 1500);
            }
        });
    });

    // Input focus animations
    const inputs = form.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.parentElement, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        input.addEventListener('blur', () => {
            gsap.to(input.parentElement, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// =============================================
// FOOTER ANIMATION
// =============================================

function initFooterAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;

    gsap.from(footer.children, {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "expo",
        scrollTrigger: {
            trigger: footer,
            start: "top 90%",
            toggleActions: "play none none reverse"
        }
    });
}

// =============================================
// PARALLAX EFFECTS
// =============================================

function initParallaxEffects() {
    // Hero orbs parallax
    const heroOrbs = document.querySelectorAll('.hero-orb');
    heroOrbs.forEach((orb, index) => {
        gsap.to(orb, {
            y: (index + 1) * -100,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // Background text parallax
    document.querySelectorAll('.bg-text-item').forEach(text => {
        gsap.to(text, {
            x: "-10%",
            ease: "none",
            scrollTrigger: {
                trigger: text.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// =============================================
// TEXT SPLITTING (for letter animations)
// =============================================

function initTextSplitting() {
    document.querySelectorAll('[data-splitting]').forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--char-index', index);
            el.appendChild(span);
        });
    });
}

// =============================================
// MARQUEE ANIMATION
// =============================================

function initMarquee() {
    const marqueeTrack = document.querySelector('.hero-marquee-track');
    if (!marqueeTrack) return;

    // Clone content for seamless loop
    const content = marqueeTrack.innerHTML;
    marqueeTrack.innerHTML = content + content;
}

// =============================================
// PERFORMANCE OPTIMIZATIONS
// =============================================

function initPerformanceOptimizations() {
    // Throttle scroll events
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Handle scroll-based updates here
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        // Disable complex animations
        gsap.globalTimeline.timeScale(0);
        
        // Show all content immediately
        gsap.set('.reveal-text, .section-title-word, .hero-title-word, .hero-title-accent', {
            opacity: 1,
            y: 0,
            x: 0
        });
    }

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// =============================================
// RESIZE HANDLER
// =============================================

function initResizeHandler() {
    let resizeTimer;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
}

// =============================================
// INITIALIZATION
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    initLenis();
    initCursor();
    initMagneticButtons();
    initTextSplitting();
    initMarquee();
    initPreloader();
    initHeader();
    initMobileMenu();
    initSectionAnimations();
    initAboutAnimations();
    initProjectsAnimations();
    initSkillsAnimations();
    initAwardsAnimations();
    initContactAnimations();
    initContactForm();
    initFooterAnimation();
    initParallaxEffects();
    initPerformanceOptimizations();
    initResizeHandler();

    console.log('🚀 Portfolio initialized successfully!');
});

// =============================================
// WINDOW LOAD EVENT
// =============================================

window.addEventListener('load', () => {
    // Final ScrollTrigger refresh after all assets loaded
    ScrollTrigger.refresh();
});
