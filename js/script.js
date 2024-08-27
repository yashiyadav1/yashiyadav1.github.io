// Initialize GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth scrolling
const scroller = new LocomotiveScroll({
    el: document.querySelector('#smooth-content'),
    smooth: true
});

scroller.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('#smooth-content', {
    scrollTop(value) {
        return arguments.length ? scroller.scrollTo(value, 0, 0) : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
    }
});

// Navbar scroll effect
ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    toggleClass: {className: 'scrolled', targets: 'nav'}
});

// Vanta.js background
VANTA.NET({
    el: "#hero-canvas",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3b28cc,
    backgroundColor: 0x0c0c0c,
    points: 20.00,
    maxDistance: 30.00,
    spacing: 15.00
});

// Hero section animations
gsap.from('.hero-title', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.hero-subtitle', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.7
});

gsap.from('.cta-button', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.9
});

// Skill bar animations
gsap.utils.toArray('.skill').forEach(skill => {
    const fill = skill.querySelector('.skill-fill');
    const percent = skill.querySelector('.skill-percent');
    const targetWidth = Math.floor(Math.random() * 50) + 50; // Random width between 50% and 100%

    gsap.to(fill, {
        width: `${targetWidth}%`,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        }
    });

    gsap.to(percent, {
        innerHTML: targetWidth,
        duration: 2,
        snap: { innerHTML: 1 },
        scrollTrigger: {
            trigger: skill,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1
        }
    });
});

// Project card animations
gsap.utils.toArray('.project-card').forEach((card, index) => {
    gsap.from(card, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: card,
            start: 'top 80%'
        },
        delay: index * 0.2
    });
});

// Form animations
gsap.utils.toArray('.form-group').forEach((group, index) => {
    gsap.from(group, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: group,
            start: 'top 80%'
        },
        delay: index * 0.1
    });
});

// Form submission
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            form.reset();
            alert('Message sent successfully!');
        } else {
            alert('Oops! There was a problem sending your message.');
        }
    }).catch(error => {
        alert('Oops! There was a problem sending your message.');
    });
});

// Custom cursor
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor.classList.remove('clicking'));

// Magnetic effect on buttons
gsap.utils.toArray('.cta-button, .project-link').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(button, {
            duration: 0.3,
            x: (x - rect.width / 2) / rect.width * 50,
            y: (y - rect.height / 2) / rect.height * 50,
            ease: 'power2.out'
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            duration: 0.3,
            x: 0,
            y: 0,
            ease: 'power2.out'
        });
    });
});