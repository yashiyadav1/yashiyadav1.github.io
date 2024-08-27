// GSAP and ScrollTrigger
gsap.register

// GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {duration: 0.1, x: e.clientX, y: e.clientY});
    gsap.to(follower, {duration: 0.3, x: e.clientX, y: e.clientY});
});

// Navbar animation
gsap.from('nav', {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
});

// Hero section animations
gsap.from('.glitch', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.subtitle', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.7,
    ease: 'power3.out'
});

gsap.from('.cta-button', {
    y: 100,
    opacity: 0,
    duration: 1,
    delay: 0.9,
    ease: 'power3.out'
});

// Scroll animations
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        }
    });
});

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {scale: 1.05, duration: 0.3});
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {scale: 1, duration: 0.3});
    });
});

// Form animations
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input.nextElementSibling, {y: -20, scale: 0.8, duration: 0.3});
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            gsap.to(input.nextElementSibling, {y: 0, scale: 1, duration: 0.3});
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        
        gsap.to(window, {
            duration: 1,
            scrollTo: {y: target, offsetY: 50},
            ease: 'power3.inOut'
        });
    });
});

// Parallax effect
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.to(card, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: card,
            scrub: true
        }
    });
});

// Text scramble effect for section titles
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Apply text scramble effect to section titles
document.querySelectorAll('.section-title').forEach(title => {
    const fx = new TextScramble(title);
    fx.setText(title.textContent);

    ScrollTrigger.create({
        trigger: title,
        start: 'top 80%',
        onEnter: () => fx.setText(title.textContent)
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