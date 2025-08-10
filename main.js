document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Toggle hamburger animation
        const lines = this.querySelectorAll('.line');
        if (this.classList.contains('active')) {
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            const lines = hamburger.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.transform = '';
                line.style.opacity = '';
            });
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Video controls for reels and impact video
    const allVideos = document.querySelectorAll('video');
    
    // Ensure only one video plays at a time
allVideos.forEach(video => {
    video.addEventListener('play', function() {
        pauseOtherVideos(this);
    });
});

function pauseOtherVideos(currentVideo) {
    allVideos.forEach(video => {
        if (video !== currentVideo && !video.paused) {
            video.pause();
        }
    });
}
    
    // Auto-pause videos when they're not visible
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && !entry.target.paused) {
            entry.target.pause();
        }
    });
}, {threshold: 0.5});

allVideos.forEach(video => {
    videoObserver.observe(video);
});
    
    // Handle the impact video
    const impactVideo = document.querySelector('.impact-video-section video');
    if (impactVideo) {
        impactVideo.addEventListener('play', function() {
            pauseOtherVideos(this);
        });
    }
    
    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace(/,/g, '');
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment).toLocaleString();
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target.toLocaleString();
            }
        });
    }
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
    // Initialize animations for elements with reveal classes
    gsap.utils.toArray('.reveal-img').forEach(img => {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });
    
    // Section header animations
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
    
    // Intro section animation
    gsap.from('.intro-text h1', {
        scrollTrigger: {
            trigger: '.intro-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.intro-text p', {
        scrollTrigger: {
            trigger: '.intro-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.3,
        ease: 'power2.out'
    });
    
    gsap.from('.intro-media', {
        scrollTrigger: {
            trigger: '.intro-media',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Stats counter animation
    gsap.utils.toArray('.stat-item').forEach((item, index) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                toggleActions: 'play none none none',
                onEnter: animateCounters
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power2.out'
        });
    });
    
    // Split screen animation
    gsap.from('.without-education', {
        scrollTrigger: {
            trigger: '.without-education',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.with-education', {
        scrollTrigger: {
            trigger: '.with-education',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    gsap.from('.transition-line', {
        scrollTrigger: {
            trigger: '.transition-line',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        scaleY: 0,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
    });
    
    // Donation section animation
    gsap.from('.donation-cta', {
        scrollTrigger: {
            trigger: '.donation-cta',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});