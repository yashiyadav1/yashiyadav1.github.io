// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Particle.js setup
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: ["#00ffaa", "#00c3ff", "#ffd700"] },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 3, random: true, anim: { enable: true, speed: 4, size_min: 0.3, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#00ffaa", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.section');
sections.forEach((section, index) => {
    const heading = section.querySelector('h2');
    const content = section.querySelectorAll('.skill-item, .project-item');
    
    gsap.set(section, { opacity: 0, y: 100 });
    gsap.set(heading, { opacity: 0, y: 50 });
    gsap.set(content, { opacity: 0, y: 50, stagger: 0.2 });

    ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(section, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
            gsap.to(heading, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: 'power3.out' });
            gsap.to(content, { opacity: 1, y: 0, duration: 1, stagger: 0.1, delay: 0.4, ease: 'power3.out' });
        },
        once: true
    });
});

// Skill progress bars animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item) => {
    const progress = item.querySelector('.progress');
    const width = progress.style.width;
    progress.style.width = '0%';
    
    ScrollTrigger.create({
        trigger: item,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(progress, {
                width: width,
                duration: 1.5,
                ease: 'power2.out'
            });
        },
        once: true
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// LEGO scene
const legoScene = new THREE.Scene();
const legoCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const legoRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
legoRenderer.setSize(window.innerWidth, window.innerHeight / 2);
document.getElementById('lego-container').appendChild(legoRenderer.domElement);

const legoGeometries = [
    new THREE.BoxGeometry(1, 0.5, 0.5),
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.ConeGeometry(0.5, 1, 32)
];

const legoMaterials = [
    new THREE.MeshPhongMaterial({ color: 0x00ffaa }),
    new THREE.MeshPhongMaterial({ color: 0x00c3ff }),
    new THREE.MeshPhongMaterial({ color: 0xffd700 })
];

const legoGroup = new THREE.Group();

for (let i = 0; i < 100; i++) {
    const geometry = legoGeometries[Math.floor(Math.random() * legoGeometries.length)];
    const material = legoMaterials[Math.floor(Math.random() * legoMaterials.length)];
    const lego = new THREE.Mesh(geometry, material);
    lego.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
    );
    lego.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    legoGroup.add(lego);
}

const legoLight = new THREE.PointLight(0xffffff, 1, 100);
legoLight.position.set(0, 0, 10);
legoScene.add(legoLight);

legoScene.add(legoGroup);
legoCamera.position.z = 5;

function animateLego() {
    requestAnimationFrame(animateLego);
    legoGroup.rotation.x += 0.001;
    legoGroup.rotation.y += 0.002;
    legoGroup.children.forEach(lego => {
        lego.rotation.x += 0.01;
        lego.rotation.y += 0.01;
    });
    legoRenderer.render(legoScene, legoCamera);
}
animateLego();

// Contact form handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(form);
    const xhr = new XMLHttpRequest();
    
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        
        if (xhr.status === 200) {
            form.reset();
            formStatus.innerHTML = 'Thanks for your message! I\'ll get back to you soon.';
        } else {
            formStatus.innerHTML = 'Oops! There was a problem sending your message. Please try again.';
        }
    };
    
    xhr.send(formData);
});

// Cookie consent
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookies = document.getElementById('accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    cookieBanner.classList.remove('hidden');
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.classList.add('hidden');
});

// Resize handler
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    legoCamera.aspect = window.innerWidth / window.innerHeight;
    legoCamera.updateProjectionMatrix();
    legoRenderer.setSize(window.innerWidth, window.innerHeight / 2);
}