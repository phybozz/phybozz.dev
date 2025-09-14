function hideShow(url) {
    const box = document.getElementById('loader');

    box.classList.remove('animate-start', 'animate-end');
    void box.offsetWidth;

    box.classList.add('animate-start');

    setTimeout(() => {
        box.classList.remove('animate-start');
        void box.offsetWidth;
        box.classList.add('animate-end');

        setTimeout(() => {
            window.location.href = url;
        }, 500);

    }, 5000);
}

const buttons = document.querySelectorAll('.okBtn');

buttons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault(); 

        button.classList.remove('animate');
        void button.offsetWidth; 
        button.classList.add('animate');


        setTimeout(() => {
            window.location.href = button.href;
        }, 250); 
    });
});

const cursor = document.getElementById('cursor');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.1;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener('touchmove', e => {
    const touch = e.touches[0]; 
    mouseX = touch.clientX;
    mouseY = touch.clientY;
});

function animate() {
    currentX += (mouseX - currentX) * speed;
    currentY += (mouseY - currentY) * speed;

    cursor.style.top = currentY + 'px';
    cursor.style.left = currentX + 'px';

    requestAnimationFrame(animate);
}

animate();

const hoverTargets = document.querySelectorAll('a, button, .mode-toggle');

hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor--hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor--hover');
    });
});

const layers = document.querySelectorAll('.parallax-layer3, .parallax-layer4');
const sad = document.getElementById('sad');
const placeholder = document.getElementById('placeholder');

const mouseSpeedFactor = 0.1;  

window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        const moveX = x * speed * 5;
        const moveY = y * speed * 5;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    const moveX = x * mouseSpeedFactor * 100; 
    const moveY = y * mouseSpeedFactor * 100;

    sad.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    placeholder.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});

window.addEventListener('touchmove', e => {
    const touch = e.touches[0]; 
    const x = (touch.clientX / window.innerWidth - 0.5);
    const y = (touch.clientY / window.innerHeight - 0.5);

    layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        const moveX = x * speed * 5;
        const moveY = y * speed * 5;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    const moveX = x * mouseSpeedFactor * 100; 
    const moveY = y * mouseSpeedFactor * 100;

    sad.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    placeholder.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});

const btn = document.getElementById('invertBtn');

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('inverted');
    btn.textContent = '☀️';  
}

btn.addEventListener('click', () => {
    document.body.classList.toggle('inverted');

    if (document.body.classList.contains('inverted')) {
        localStorage.setItem('darkMode', 'true');
        btn.textContent = '☀️';  
    } else {
        localStorage.setItem('darkMode', 'false');
        btn.textContent = '🌙';  
    }

    btn.classList.remove('animate');
    void btn.offsetWidth;
    btn.classList.add('animate');

    btn.disabled = true;
    setTimeout(() => {
        btn.disabled = false;
    }, 250);
});