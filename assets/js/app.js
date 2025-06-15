
// mouse cursor

const cursor = document.getElementById('cursor');

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.1; 

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
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


// parallax

const layers = document.querySelectorAll('.parallax-layer3, .parallax-layer4');

window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    layers.forEach(layer => {
        const speed = parseFloat(layer.getAttribute('data-speed'));
        const moveX = x * speed * 5;
        const moveY = y * speed * 5;

        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
});

// light & dark mode

const btn = document.getElementById('invertBtn');

    btn.addEventListener('click', () => {
        document.body.classList.toggle('inverted');

    if (document.body.classList.contains('inverted')) {
        btn.textContent = '☀️';
    } else {
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