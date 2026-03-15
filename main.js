/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 3.1 - Interactive "Ship-Cat" AI with Neural Memory
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Global Styles for Space Animations
    injectGlobalAnimationStyles();

    // 2. Initialize Global Navigation Shortcuts
    initGlobalShortcuts();

    // 3. Setup Shared Footer Injection
    injectSharedComponents();
    
    // 4. Initialize Space Animations
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initStarfield(animContainer);
        initSpaceshipAnimation(animContainer);
    }

    // 5. Track most viewed pages (Neural Memory)
    trackPageEngagement();

    console.log('%c Deep Space Ecosystem Hub: v3.1 Active ', 'background: #000; color: #6366f1; font-weight: bold; padding: 5px; border: 1px solid #6366f1;');
});

/**
 * Tracks link clicks to determine "Most Viewed" pages for the AI to orbit
 */
function trackPageEngagement() {
    const links = document.querySelectorAll('.service-item');
    links.forEach(link => {
        link.addEventListener('click', () => {
            const page = link.getAttribute('href');
            let stats = JSON.parse(localStorage.getItem('ecosystem_stats') || '{}');
            stats[page] = (stats[page] || 0) + 1;
            localStorage.setItem('ecosystem_stats', JSON.stringify(stats));
        });
    });
}

function injectGlobalAnimationStyles() {
    if (document.getElementById('ecosystem-styles')) return;
    const style = document.createElement('style');
    style.id = 'ecosystem-styles';
    style.innerHTML = `
        #animation-container {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
            background: radial-gradient(circle at center, #050505 0%, #000 100%);
        }
        .ship-sprite {
            position: absolute;
            width: 60px; height: 60px;
            pointer-events: auto; /* Enable tapping/clicking */
            cursor: pointer;
            will-change: transform;
            filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
            z-index: 50;
        }
        .ship-thruster {
            position: absolute;
            bottom: -5px; left: 50%;
            width: 10px; height: 20px;
            background: linear-gradient(to top, transparent, #6366f1);
            transform: translateX(-50%);
            border-radius: 50%;
            opacity: 0.8;
            filter: blur(2px);
            transition: height 0.1s;
        }
        .ship-status {
            position: absolute;
            top: -50px; left: 50%;
            transform: translateX(-50%);
            font-size: 10px;
            color: #6366f1;
            font-family: 'Inter', monospace;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            background: rgba(0,0,0,0.9);
            padding: 2px 10px;
            border: 1px solid rgba(99, 102, 241, 0.4);
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.5s;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);
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
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20 bg-black/80 backdrop-blur-xl">
                <p class="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-medium">
                    &copy; ${currentYear} Md. Rafat Uddin Arman • Principal Engineering Hub
                </p>
            </footer>
        `;
    }
}

function initStarfield(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
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
            speed: Math.random() * 0.05 + 0.01
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height) s.y = -5;
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initSpaceshipAnimation(container) {
    const ship = document.createElement('div');
    ship.className = 'ship-sprite';
    
    const statusBox = document.createElement('div');
    statusBox.className = 'ship-status';
    ship.appendChild(statusBox);

    const thruster = document.createElement('div');
    thruster.className = 'ship-thruster';
    ship.appendChild(thruster);

    ship.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L85 85H15L50 5Z" stroke="#6366f1" stroke-width="4" fill="black" />
            <path d="M50 20L75 80H25L50 20Z" fill="#6366f1" opacity="0.4" />
            <circle cx="50" cy="55" r="8" fill="white" opacity="0.8" />
        </svg>
    `);

    container.appendChild(ship);

    let posX = Math.random() * window.innerWidth, posY = Math.random() * window.innerHeight;
    let velX = 0, velY = 0, angle = 0;
    const mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    let currentBehavior = 'wandering';
    let behaviorTimer = 0;

    function setStatus(text) {
        statusBox.innerText = text;
        statusBox.style.opacity = '1';
        setTimeout(() => { if(statusBox.innerText === text) statusBox.style.opacity = '0'; }, 3000);
    }

    // Interaction: Clicking the ship causes a boost (like a cat getting the zoomies)
    ship.addEventListener('mousedown', () => {
        velX += (Math.random() - 0.5) * 50;
        velY += (Math.random() - 0.5) * 50;
        setStatus('HYPER_DRIVE_PURR');
    });

    function getMostVisitedElement() {
        const stats = JSON.parse(localStorage.getItem('ecosystem_stats') || '{}');
        let mostVisited = null;
        let maxClicks = 0;
        for (const [page, clicks] of Object.entries(stats)) {
            if (clicks > maxClicks) {
                maxClicks = clicks;
                mostVisited = page;
            }
        }
        if (!mostVisited) return null;
        return document.querySelector(`a[href="${mostVisited}"]`);
    }

    function changeBehavior() {
        const dx = mouse.x - posX;
        const dy = mouse.y - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 300) {
            currentBehavior = 'curious';
            setStatus('USER_AWARENESS');
        } else {
            // Chance to orbit the most viewed link
            const popularEl = getMostVisitedElement();
            if (popularEl && Math.random() < 0.3) {
                currentBehavior = 'recon';
                setStatus('FAVORITE_SECTOR_RECON');
                const rect = popularEl.getBoundingClientRect();
                targetX = rect.left + rect.width / 2;
                targetY = rect.top + rect.height / 2;
            } else {
                currentBehavior = Math.random() < 0.5 ? 'wandering' : 'drifting';
                setStatus(currentBehavior === 'wandering' ? 'DEEP_SPACE_ROAM' : 'ENERGY_SAVER_DRIFT');
                targetX = Math.random() * window.innerWidth;
                targetY = Math.random() * window.innerHeight;
            }
            behaviorTimer = Math.random() * 300 + 200;
        }
    }

    let targetX = posX, targetY = posY;

    function update() {
        if (--behaviorTimer <= 0 && currentBehavior !== 'curious') changeBehavior();

        const dx = (currentBehavior === 'curious' ? mouse.x : targetX) - posX;
        const dy = (currentBehavior === 'curious' ? mouse.y : targetY) - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 300 && currentBehavior !== 'curious') changeBehavior();
        if (dist > 400 && currentBehavior === 'curious') changeBehavior();

        // Physics
        let accel = currentBehavior === 'curious' ? 0.001 : 0.0001;
        velX += dx * accel;
        velY += dy * accel;
        
        // Orbital logic for 'recon'
        if (currentBehavior === 'recon' && dist < 150) {
            velX += Math.cos(Date.now() * 0.002) * 0.5;
            velY += Math.sin(Date.now() * 0.002) * 0.5;
        }

        velX *= 0.98; velY *= 0.98;
        posX += velX; posY += velY;

        const travelAngle = Math.atan2(velY, velX) * 180 / Math.PI;
        angle += (travelAngle + 90 - angle) * 0.1;

        ship.style.left = `${posX}px`;
        ship.style.top = `${posY}px`;
        ship.style.transform = `rotate(${angle}deg)`;
        thruster.style.height = `${5 + Math.abs(velX + velY) * 5}px`;

        if (posX < -100) posX = window.innerWidth + 50;
        if (posX > window.innerWidth + 100) posX = -50;
        if (posY < -100) posY = window.innerHeight + 50;
        if (posY > window.innerHeight + 100) posY = -50;

        requestAnimationFrame(update);
    }

    changeBehavior();
    update();
}
