/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 3.5 - "Living Ship" AI with Visual Holograms
 */

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalAnimationStyles();
    initGlobalShortcuts();
    injectSharedComponents();
    
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initStarfield(animContainer);
        initSpaceshipAI(animContainer);
    }

    trackPageEngagement();
});

function injectGlobalAnimationStyles() {
    if (document.getElementById('ecosystem-styles')) return;
    const style = document.createElement('style');
    style.id = 'ecosystem-styles';
    style.innerHTML = `
        #animation-container { background: #000; }
        .ship-sprite {
            position: absolute;
            width: 70px; height: 70px;
            pointer-events: auto;
            cursor: pointer;
            will-change: transform;
            z-index: 5;
        }
        .ship-status {
            position: absolute;
            top: -55px; left: 50%;
            transform: translateX(-50%);
            font-size: 9px;
            color: #6366f1;
            font-family: 'Inter', monospace;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            background: rgba(0,0,0,0.85);
            padding: 2px 10px;
            border-radius: 4px;
            border: 1px solid rgba(99, 102, 241, 0.5);
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
        }
        .hologram-screen {
            position: absolute;
            top: -80px; left: 50%;
            width: 60px; height: 40px;
            background: rgba(99, 102, 241, 0.1);
            border: 1px solid rgba(99, 102, 241, 0.5);
            transform: translateX(-50%);
            pointer-events: none;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
            border-radius: 4px;
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
        }
        .hologram-line {
            width: 100%; height: 2px;
            background: rgba(255, 255, 255, 0.2);
            position: absolute;
            animation: scan 2s linear infinite;
        }
        @keyframes scan { from { top: -10%; } to { top: 110%; } }
    `;
    document.head.appendChild(style);
}

function initStarfield(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let stars = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            speed: Math.random() * 0.05 + 0.02
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height) s.y = -5;
            ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Enhanced Spaceship AI with Visual Behaviors
 */
function initSpaceshipAI(container) {
    const ship = document.createElement('div');
    ship.className = 'ship-sprite';
    
    // Status Text
    const statusBox = document.createElement('div');
    statusBox.className = 'ship-status';
    ship.appendChild(statusBox);

    // Visual Hologram Holder
    const hologram = document.createElement('div');
    hologram.className = 'hologram-screen';
    hologram.style.display = 'none';
    hologram.innerHTML = '<div class="hologram-line"></div><div class="text-[6px] text-blue-300">DATA_STREAM</div>';
    ship.appendChild(hologram);

    // Tractor Beam (for swinging)
    const beam = document.createElement('div');
    beam.style.position = 'absolute';
    beam.style.width = '1px';
    beam.style.background = 'linear-gradient(to top, #6366f1, transparent)';
    beam.style.display = 'none';
    beam.style.transformOrigin = 'bottom center';
    container.appendChild(beam);

    // Sci-fi Ship SVG
    ship.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 10L85 85H15L50 10Z" stroke="#6366f1" stroke-width="4" fill="black" />
            <path d="M50 25L75 80H25L50 25Z" fill="#6366f1" opacity="0.3" />
            <rect x="45" y="85" width="10" height="10" fill="#6366f1">
                <animate id="thrust" attributeName="opacity" values="0.2;1;0.2" dur="0.2s" repeatCount="indefinite" />
            </rect>
            <circle cx="50" cy="50" r="5" fill="white" />
        </svg>
    `);

    container.appendChild(ship);

    let posX = Math.random() * window.innerWidth, posY = Math.random() * window.innerHeight;
    let velX = 0, velY = 0, angle = 0;
    const mouse = { x: -2000, y: -2000 };
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    let currentBehavior = 'wandering';
    let behaviorTimer = 0;
    let targetX = posX, targetY = posY;

    function setStatus(text) {
        statusBox.innerText = text;
        statusBox.style.opacity = '1';
        setTimeout(() => { if(statusBox.innerText === text) statusBox.style.opacity = '0'; }, 3000);
    }

    // Interaction: Clicking triggers Zoomies
    ship.addEventListener('mousedown', () => {
        velX += (Math.random() - 0.5) * 80;
        velY += (Math.random() - 0.5) * 80;
        setStatus('HYPER_DRIVE_ACTIVATED');
    });

    function changeBehavior() {
        const dx = mouse.x - posX;
        const dy = mouse.y - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        hologram.style.display = 'none';
        beam.style.display = 'none';

        if (dist < 300) {
            currentBehavior = 'curious';
            setStatus('USER_OBSERVATION');
        } else {
            const roll = Math.random();
            if (roll < 0.2) {
                currentBehavior = 'watchingTV';
                setStatus('MONITORING_REELS');
                hologram.style.display = 'flex';
            } else if (roll < 0.4) {
                currentBehavior = 'grooming';
                setStatus('AUTO_CALIBRATION');
            } else if (roll < 0.6) {
                currentBehavior = 'swinging';
                setStatus('GRAVITY_SWING');
                beam.style.display = 'block';
            } else {
                currentBehavior = 'wandering';
                setStatus('ROAMING_SPACE');
                targetX = Math.random() * window.innerWidth;
                targetY = Math.random() * window.innerHeight;
            }
            behaviorTimer = Math.random() * 300 + 200;
        }
    }

    function update() {
        if (--behaviorTimer <= 0 && currentBehavior !== 'curious') changeBehavior();

        const dx = (currentBehavior === 'curious' ? mouse.x : targetX) - posX;
        const dy = (currentBehavior === 'curious' ? mouse.y : targetY) - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 200 && currentBehavior === 'wandering') changeBehavior();

        // PHYSICS ENGINE
        if (currentBehavior === 'curious') {
            velX += dx * 0.002;
            velY += dy * 0.002;
        } else if (currentBehavior === 'watchingTV' || currentBehavior === 'grooming') {
            velX *= 0.9; velY *= 0.9;
            if (currentBehavior === 'grooming') angle += 10;
        } else if (currentBehavior === 'swinging') {
            const time = Date.now() * 0.002;
            velX = Math.sin(time) * 2;
            velY = Math.cos(time) * 0.5;
            beam.style.height = `${posY}px`;
            beam.style.left = `${posX + 35}px`;
            beam.style.top = `0px`;
        } else {
            velX += dx * 0.0001;
            velY += dy * 0.0001;
        }

        velX *= 0.98; velY *= 0.98;
        posX += velX; posY += velY;

        if (currentBehavior !== 'grooming') {
            const travelAngle = Math.atan2(velY, velX) * 180 / Math.PI;
            angle += (travelAngle + 90 - angle) * 0.1;
        }

        ship.style.left = `${posX}px`;
        ship.style.top = `${posY}px`;
        ship.style.transform = `rotate(${angle}deg)`;

        // Screen Wrap
        if (posX < -150) posX = window.innerWidth + 50;
        if (posX > window.innerWidth + 150) posX = -100;
        if (posY < -150) posY = window.innerHeight + 50;
        if (posY > window.innerHeight + 150) posY = -100;

        requestAnimationFrame(update);
    }

    changeBehavior();
    update();
}

function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') window.location.href = 'index.html';
    });
}

function injectSharedComponents() {
    const footerTarget = document.getElementById('global-footer');
    if (footerTarget) {
        const currentYear = new Date().getFullYear();
        footerTarget.innerHTML = `
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20">
                <p class="text-[10px] text-gray-400 uppercase tracking-[0.4em] font-medium">
                    &copy; ${currentYear} Md. Rafat Uddin Arman • Principal Engineering Hub
                </p>
            </footer>
        `;
    }
}

function trackPageEngagement() {
    const links = document.querySelectorAll('.service-item');
    links.forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('href');
            if (!page) return;
            let stats = JSON.parse(localStorage.getItem('ecosystem_stats') || '{}');
            stats[page] = (stats[page] || 0) + 1;
            localStorage.setItem('ecosystem_stats', JSON.stringify(stats));
        });
    });
}
