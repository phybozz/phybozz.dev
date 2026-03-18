// var var var var var bradar
const maxWidth = screen.width * window.devicePixelRatio;
const maxHeight = screen.height * window.devicePixelRatio;

document.documentElement.style.setProperty('--width', `${maxWidth}px`);
document.documentElement.style.setProperty('--height', `${maxHeight}px`);

// variables
const sbuttons = document.querySelectorAll('.socialbuttons');
const layers = document.querySelectorAll('.parallax-layer1, .parallax-layer2');
const happy = document.getElementById('happy');
const happywrap = document.getElementById('happywrap')
const welcome = document.getElementById('welcome');
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('a, button, .mode-toggle');
const scontainer = document.querySelectorAll('.socialbuttonscontainer')

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



// theme loader and switch
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


// discord fetch
let data2 = null;
let lastStatus = "";

const ws = new WebSocket("wss://api.lanyard.rest/socket");

ws.addEventListener("open", () => {
    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: "923151955654738011" } }));
});

ws.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (!message.d) return;

    const lanyard = message.d;

    let status = lanyard.discord_status || "";

    if (Array.isArray(lanyard.activities)) {
        lanyard.activities.forEach(activity => {
            if (activity.id !== "spotify:1" && activity.id !== "custom") {
                status += ` | ${activity.name}`;
            } else if (activity.id === "custom" && activity.state) {
                status += ` | ${activity.state}`;
            }
        });
    }

    if (
        status !== lastStatus ||
        data2?.listening_to_spotify !== lanyard.listening_to_spotify ||
        data2?.spotify?.track_id !== lanyard.spotify?.track_id
    ) {
        lastStatus = status;
        data2 = lanyard;
        updateStatus(lanyard, status);
    }
});

function updateStatus(lanyard, status) {
    const statusTextElement = document.getElementById("statusText");
    statusTextElement.innerHTML = ''; // clear old content

    if (lanyard.listening_to_spotify) {
        const spotifyButton = document.createElement('button');
        spotifyButton.classList.add('spotifybtn');
        spotifyButton.innerHTML = '<img src="svg/spotify.svg" alt="Spotify" />';
        spotifyButton.addEventListener('click', currentlyPlaying);

        statusTextElement.appendChild(spotifyButton);
    }

    const statusSpan = document.createElement('span');
    statusSpan.textContent = status;
    statusTextElement.appendChild(statusSpan);
}
function currentlyPlaying() {
    if (!data2 || !data2.listening_to_spotify) return;

    const lanyard = data2;
    const songInfo = `${lanyard.spotify.song} — ${lanyard.spotify.artist.replaceAll(";", ",")}`;
    const statusTextSpot = document.getElementById("statusTextSpot");

    statusTextSpot.innerHTML = `<i>${songInfo}</i>`;
    statusTextSpot.classList.add("spotifyanim");

    setTimeout(() => {
        statusTextSpot.classList.remove("spotifyanim");
        statusTextSpot.innerHTML = "";
    }, 5500);
}
