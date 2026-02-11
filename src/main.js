/* =============================================
   MEGH MODI - PORTFOLIO WEBSITE
   Optimized, High-Performance Animation System
   Built with GSAP, ScrollTrigger, and Lenis
   ============================================= */

// =============================================
// PROJECT DATA MODEL
// =============================================

const projectsData = [
    {
        id: 'kairo-ai',
        title: 'KairoAI',
        subtitle: 'ISL Learning Platform',
        description: 'An Indian Sign Language (ISL) learning application built using Flutter and a custom-trained machine learning model developed in Python using Kaggle\'s ISL dataset. Focuses on interactive gesture-based learning and AI-assisted recognition for real-time feedback.',
        tags: ['Flutter', 'Python', 'TensorFlow', 'ML', 'Kaggle Dataset'],
        github: 'https://github.com/meghmodi2810/KairoAI/',
        featured: true,
        inProgress: true,
        icon: 'hand' // For sign language
    },
    {
        id: 'smart-face-proctor',
        title: 'Smart Face Proctor',
        subtitle: 'AI Exam Surveillance',
        description: 'An AI-powered exam proctoring system built with Django and MediaPipe that detects face absence and distraction in real time. Includes configurable violation thresholds and automatic exam freeze & recovery mechanisms.',
        tags: ['Python', 'Django', 'MediaPipe', 'Computer Vision', 'APIs'],
        github: 'https://github.com/meghmodi2810/SmartFaceProctor',
        featured: false,
        inProgress: false,
        icon: 'eye'
    },
    {
        id: 'dailynest',
        title: 'DailyNest',
        subtitle: 'Autism Support System',
        description: 'An autism-support intelligent life assistant designed for structured routines and emotion-aware interaction. Integrates a CNN-based facial emotion recognition model (~71% accuracy) to adapt responses dynamically.',
        tags: ['Python', 'Django', 'CNN', 'NLP', 'AI'],
        github: 'https://github.com/meghmodi2810/DailyNest',
        featured: false,
        inProgress: false,
        icon: 'heart'
    },
    {
        id: 'pancake-music',
        title: 'Pancake Music',
        subtitle: 'Music Streaming App',
        description: 'A Flutter-based aesthetic music streaming application integrated with JioSaavn API. Focused on smooth UI animations and modern music browsing experience.',
        tags: ['Flutter', 'Dart', 'REST API', 'UI/UX'],
        github: 'https://github.com/meghmodi2810/MusicApp',
        featured: false,
        inProgress: false,
        icon: 'music'
    },
    {
        id: 'face-attendance',
        title: 'Face Attendance System',
        subtitle: 'Computer Vision Project',
        description: 'A computer vision-based attendance system developed to experiment with face recognition and structured data storage. Built using MediaPipe, DeepFace, and PyQt5 for GUI.',
        tags: ['Python', 'MediaPipe', 'DeepFace', 'PyQt5'],
        github: 'https://github.com/meghmodi2810/Face-Detection-System',
        featured: false,
        inProgress: false,
        icon: 'face'
    },
    {
        id: 'ml-projects',
        title: 'ML Research & Experiments',
        subtitle: 'Data Analysis Collection',
        description: 'A collection of structured machine learning and data analysis projects demonstrating regression, classification, preprocessing, and model evaluation techniques using real-world datasets.',
        tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'ML'],
        github: 'https://github.com/meghmodi2810/Machine-Learning-Projects',
        featured: false,
        inProgress: false,
        icon: 'chart'
    }
];

// SVG Icons for projects
const projectIcons = {
    hand: `<svg viewBox="0 0 120 120" fill="none">
        <path d="M60 20 L60 50" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
        <path d="M45 25 L45 55" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M75 25 L75 55" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
        <path d="M32 35 L32 60" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M88 35 L88 60" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        <path d="M25 60 Q25 95 60 100 Q95 95 95 60" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
        <circle cx="60" cy="75" r="8" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
    </svg>`,
    eye: `<svg viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="45" stroke="currentColor" stroke-width="1.5" opacity="0.2"/>
        <circle cx="60" cy="60" r="30" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>
        <circle cx="60" cy="60" r="15" stroke="currentColor" stroke-width="1.5" opacity="0.6"/>
        <circle cx="60" cy="60" r="6" fill="currentColor" opacity="0.8"/>
        <path d="M20 60 Q60 25 100 60 Q60 95 20 60" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
    </svg>`,
    heart: `<svg viewBox="0 0 120 120" fill="none">
        <path d="M60 100 C20 65 20 35 40 25 C55 18 60 35 60 35 C60 35 65 18 80 25 C100 35 100 65 60 100Z" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
        <circle cx="45" cy="45" r="4" fill="currentColor" opacity="0.6"/>
        <circle cx="75" cy="45" r="4" fill="currentColor" opacity="0.6"/>
        <circle cx="60" cy="60" r="5" fill="currentColor" opacity="0.8"/>
        <line x1="45" y1="45" x2="60" y2="60" stroke="currentColor" stroke-width="1" opacity="0.3"/>
        <line x1="75" y1="45" x2="60" y2="60" stroke="currentColor" stroke-width="1" opacity="0.3"/>
    </svg>`,
    music: `<svg viewBox="0 0 120 120" fill="none">
        <circle cx="35" cy="85" r="15" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
        <circle cx="85" cy="75" r="15" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
        <line x1="50" y1="85" x2="50" y2="30" stroke="currentColor" stroke-width="3" opacity="0.7"/>
        <line x1="100" y1="75" x2="100" y2="20" stroke="currentColor" stroke-width="3" opacity="0.7"/>
        <path d="M50 30 Q75 20 100 20" stroke="currentColor" stroke-width="3" fill="none" opacity="0.6"/>
    </svg>`,
    face: `<svg viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="40" stroke="currentColor" stroke-width="2" fill="none" opacity="0.4"/>
        <circle cx="45" cy="50" r="5" fill="currentColor" opacity="0.6"/>
        <circle cx="75" cy="50" r="5" fill="currentColor" opacity="0.6"/>
        <path d="M45 75 Q60 85 75 75" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
        <rect x="35" y="40" width="25" height="25" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="3"/>
        <rect x="60" y="40" width="25" height="25" stroke="currentColor" stroke-width="1" fill="none" opacity="0.3" stroke-dasharray="3"/>
    </svg>`,
    chart: `<svg viewBox="0 0 120 120" fill="none">
        <line x1="20" y1="100" x2="100" y2="100" stroke="currentColor" stroke-width="2" opacity="0.4"/>
        <line x1="20" y1="100" x2="20" y2="20" stroke="currentColor" stroke-width="2" opacity="0.4"/>
        <rect x="30" y="60" width="12" height="40" fill="currentColor" opacity="0.5"/>
        <rect x="50" y="40" width="12" height="60" fill="currentColor" opacity="0.6"/>
        <rect x="70" y="50" width="12" height="50" fill="currentColor" opacity="0.7"/>
        <rect x="90" y="30" width="12" height="70" fill="currentColor" opacity="0.8"/>
        <path d="M30 55 L55 35 L75 45 L95 25" stroke="currentColor" stroke-width="2" fill="none" opacity="0.6"/>
        <circle cx="30" cy="55" r="3" fill="currentColor" opacity="0.8"/>
        <circle cx="55" cy="35" r="3" fill="currentColor" opacity="0.8"/>
        <circle cx="75" cy="45" r="3" fill="currentColor" opacity="0.8"/>
        <circle cx="95" cy="25" r="3" fill="currentColor" opacity="0.8"/>
    </svg>`
};

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
// PROJECT CARDS RENDERER
// =============================================

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    // If projects are already in HTML, just init animations
    if (container.children.length > 0) {
        initProjectCardAnimations();
        return;
    }

    container.innerHTML = projectsData.map((project, index) => `
        <article class="project-card ${project.featured ? 'project-card-featured' : ''}" data-cursor="view">
            <div class="project-card-inner">
                ${project.featured ? `
                    <div class="project-badges">
                        <span class="project-badge project-badge-featured">Featured</span>
                        ${project.inProgress ? '<span class="project-badge project-badge-progress">In Progress</span>' : ''}
                    </div>
                ` : ''}
                
                <div class="project-card-header">
                    <span class="project-number">${String(index + 1).padStart(2, '0')}</span>
                </div>

                <div class="project-card-icon">
                    ${projectIcons[project.icon] || projectIcons.chart}
                </div>

                <h3 class="project-title">${project.title}</h3>
                <span class="project-subtitle">${project.subtitle}</span>
                
                <p class="project-description">${project.description}</p>

                <div class="project-tech-stack">
                    ${project.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>

                <div class="project-actions">
                    <a href="${project.github}" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="project-link"
                       aria-label="View ${project.title} on GitHub">
                        <svg viewBox="0 0 24 24" fill="currentColor" class="github-icon">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>View Code</span>
                    </a>
                </div>
            </div>
        </article>
    `).join('');

    // Re-initialize animations for new cards
    initProjectCardAnimations();
}

function initProjectCardAnimations() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card) => {
        gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true
            }
        });
    });
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
        // Set cards visible by default, then create scroll-triggered enhancement
        gsap.set(card, { opacity: 1, y: 0 });
        
        // Create a subtle entrance animation when scrolling into view
        ScrollTrigger.create({
            trigger: card,
            start: "top 90%",
            once: true,
            onEnter: () => {
                gsap.from(card, {
                    y: 20,
                    opacity: 0.5,
                    duration: 0.5,
                    ease: "power2.out",
                    clearProps: "all" // Reset inline styles after animation
                });
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

// Add js-enabled class immediately for CSS to use
document.documentElement.classList.add('js-enabled');

document.addEventListener('DOMContentLoaded', () => {
    handleReducedMotion();
    renderProjects(); // Render project cards from data
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