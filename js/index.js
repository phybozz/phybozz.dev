const sbuttons = document.querySelectorAll('.socialbuttons');

let tabOpened = false;
let currentUrl = null;

sbuttons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        if (tabOpened) return;

        const url = button.getAttribute('href');

        if (!url || url.trim() === '') {
            console.error('error');
            return;
        }

        currentUrl = url;

        const box = document.getElementById('loader');
        if (box) {
            box.classList.remove('animate-start', 'animate-end');
            void box.offsetWidth;
            box.classList.add('animate-start');
        }

        window.open(url, '_blank');
        tabOpened = true;

        window.onfocus = function() {
            if (!currentUrl) return;

            const box = document.getElementById('loader');
            if (box) {
                box.classList.remove('animate-start');
                box.classList.add('animate-end');
            }
            location.reload()
        };
    });
});

function hideShow(url) {
    const box = document.getElementById('loader');

    box.classList.remove('animate-start', 'animate-end');
    void box.offsetWidth;

    box.classList.add('animate-start');
}

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

const layers = document.querySelectorAll('.parallax-layer1, .parallax-layer2');
const happy = document.getElementById('happy');
const welcome = document.getElementById('welcome');

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

    happy.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    welcome.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
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

    happy.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
    welcome.style.transform = `translate(-50%, -50%) translate(${moveX}px, ${moveY}px)`;
});

if (localStorage.getItem('hubtheme') === 'dark') {
    document.body.classList.add('inverted');
    document.getElementById("hubInvertBtn").textContent = '☀️';  
}

document.getElementById("hubInvertBtn").addEventListener('click', () => {
    document.body.classList.toggle('inverted');
    btn = document.getElementById("hubInvertBtn")

    if (document.body.classList.contains('inverted')) {
        localStorage.setItem('hubtheme', 'dark');
        btn.textContent = '☀️';  
    } else {
        localStorage.setItem('hubtheme', 'white');
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

window.ondataload = () => { }
        fetch("https://api.lanyard.rest/v1/users/923151955654738011").then((a) => a.json().then((a) => {
            landyard = a.data
            status = landyard['discord_status']
            
            for (i in landyard.activities) {
                if (landyard.activities[i].id != "spotify:1") {
                    if (landyard.activities[i].id != "custom") {
                        status += " | "+landyard.activities[i].name
                    } else {
                        status += " | "+landyard.activities[i].state
                    }
                }
            }

            document.getElementsByClassName("statusText")[0].innerHTML = status
            

            spotify = landyard['spotify']
            if (landyard['listening_to_spotify'] == true || landyard['listening_to_spotify'] == "true") {
                document.getElementsByClassName("statusText")[0].innerHTML = "<button class='spotifybtn' onclick='currentlyPlaying()'><i class='fab fa-spotify'></i></button> " + status
            }
                        
        }))
function currentlyPlaying() {
    fetch("https://api.lanyard.rest/v1/users/923151955654738011").then((a) =>
        a.json().then((a) => {
            landyard = a.data;

            spotify = landyard['spotify'];
            music = "</i><i>" + landyard.spotify['song'] + " — " + landyard.spotify['artist'].replaceAll(";", ",");
            document.getElementsByClassName("statusTextspot")[0].classList.add("spotifyanim");
            document.getElementsByClassName("statusTextspot")[0].innerHTML = music;

            setTimeout(function () {
                document.getElementsByClassName("statusTextspot")[0].classList.remove("spotifyanim");
                document.getElementsByClassName("statusTextspot")[0].innerHTML = "";
            }, 5500);
        })
    );
}