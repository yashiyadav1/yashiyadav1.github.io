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
        color: { value: "#00ff00" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#00ff00", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

// GSAP animations
gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.section');
sections.forEach((section) => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleClass: 'show',
            once: true,
        }
    });
});

// Skill progress bars animation
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item) => {
    const progress = item.querySelector('.progress');
    const width = progress.style.width;
    progress.style.width = '0%';
    gsap.to(progress, {
        width: width,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
        }
    });
});

// Project carousel
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentIndex = 0;

function showProject(index) {
    const projects = carousel.querySelectorAll('.project-item');
    projects.forEach((project, i) => {
        project.style.transform = `translateX(${100 * (i - index)}%)`;
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + 3) % 3;
    showProject(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % 3;
    showProject(currentIndex);
});

showProject(currentIndex);

// LEGO scene
const legoScene = new THREE.Scene();
const legoCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const legoRenderer = new THREE.WebGLRenderer({ alpha: true });
legoRenderer.setSize(window.innerWidth, window.innerHeight / 2);
document.getElementById('lego-container').appendChild(legoRenderer.domElement);

const legoGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
const legoMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const legoGroup = new THREE.Group();

for (let i = 0; i < 50; i++) {
    const lego = new THREE.Mesh(legoGeometry, legoMaterial);
    lego.position.set(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
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
    legoGroup.rotation.x += 0.005;
    legoGroup.rotation.y += 0.005;
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