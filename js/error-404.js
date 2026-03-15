// var var var var var bradar
const maxWidth = screen.width * window.devicePixelRatio;
const maxHeight = screen.height * window.devicePixelRatio;

document.documentElement.style.setProperty('--width', `${maxWidth}px`);
document.documentElement.style.setProperty('--height', `${maxHeight}px`);

// Variables
const layers = document.querySelectorAll('.parallax-layer3, .parallax-layer4');
const sad = document.getElementById('sad');
const sadwrap = document.getElementById('sadwrap');
const pageerror = document.getElementById('pageerror');
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('a, button, .mode-toggle');

// Custom cursor
let mouseX = -10, mouseY = -10;
let currentX = 0, currentY = 0;
const speed = 0.1;
const mouseSpeedFactor = 0.1;

// Cursor animation
function animateCursor() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;
    cursor.style.top = `${currentY}px`;
    cursor.style.left = `${currentX}px`;
    requestAnimationFrame(animateCursor);
}
animateCursor();

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
    animateCursor(); 
});

// Hover targets
hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
});

// Parallax effect
function handleParallaxMovement(e) {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    const moveX = x * mouseSpeedFactor * 25;
    const moveY = y * mouseSpeedFactor * 25;

    sadwrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
    pageerror.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

window.addEventListener('mousemove', handleParallaxMovement);
window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    handleParallaxMovement(touch);
});

// Theme loader and switch
const themeButton = document.getElementById("hubInvertBtn");
const savedTheme = localStorage.getItem('hubtheme');
if (savedTheme === 'dark') {
    document.body.classList.add('inverted');
    themeButton.textContent = '☀️';  
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle('inverted');
    themeButton.disabled = true;

    if (document.body.classList.contains('inverted')) {
        localStorage.setItem('hubtheme', 'dark');
        themeButton.textContent = '☀️';
    } else {
        localStorage.setItem('hubtheme', 'white');
        themeButton.textContent = '🌙';
    }

    setTimeout(() => {
        themeButton.disabled = false;
    }, 250);
});
