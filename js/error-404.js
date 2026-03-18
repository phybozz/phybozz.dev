// var var var var var bradar
const maxWidth = screen.width * window.devicePixelRatio;
const maxHeight = screen.height * window.devicePixelRatio;

document.documentElement.style.setProperty('--width', `${maxWidth}px`);
document.documentElement.style.setProperty('--height', `${maxHeight}px`);

// variables
const layers = document.querySelectorAll('.parallax-layer3, .parallax-layer4');
const sad = document.getElementById('sad');
const sadwrap = document.getElementById('sadwrap');
const pageerror = document.getElementById('pageerror');
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('a, button, .mode-toggle');

//cursor (mostly vibecoded btw)
const mouseSpeedFactor = 0.1;
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (isTouchDevice) {
    cursor.style.display = 'none';
} else {
    let mouseX = -50, mouseY = -50;
    let currentX = 0, currentY = 0;

    const speed = 0.3;

    let lastTime = performance.now();

    function animateCursor(now) {
        const deltaTime = (now - lastTime) / 1000; 
        lastTime = now;

        const factor = 1 - Math.pow(1 - speed, deltaTime * 60);

        currentX += (mouseX - currentX) * factor;
        currentY += (mouseY - currentY) * factor;

        cursor.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }

    requestAnimationFrame(animateCursor);

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.width = `37.5px`;
            cursor.style.height = `37.5px`;
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.width = `30px`;
            cursor.style.height = `30px`;
        });
    });
}

// parallax effect
function handleParallaxMovement(e) {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    const moveX = x * mouseSpeedFactor * 50;
    const moveY = y * mouseSpeedFactor * 50;

    happywrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
    welcome.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
}

window.addEventListener('load', () => {
    window.addEventListener('mousemove', handleParallaxMovement);
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        handleParallaxMovement(touch);
    });
});

// parallax effect
function handleParallaxMovement(e) {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    const moveX = x * mouseSpeedFactor * 50;
    const moveY = y * mouseSpeedFactor * 50;

    happywrap.style.transform = `translate(${moveX}px, ${moveY}px)`;
    welcome.style.transform = `translateY(-50%) translate(${moveX}px, ${moveY}px)`;
}

window.addEventListener('load', () => {
    window.addEventListener('mousemove', handleParallaxMovement);
    window.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        handleParallaxMovement(touch);
    });
});


// theme loader switcher
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
