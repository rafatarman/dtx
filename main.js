/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * This file handles global animations, shared components, and navigation shortcuts.
 * VERSION: 3.0 - Deep Space "Ship-Cat" AI Edition
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
        initStarfield(animContainer); // Distant drifting stars
        initSpaceshipAnimation(animContainer); // The "Space Cat" AI Ship
    }

    console.log('%c Deep Space Ecosystem Hub: Active ', 'background: #000; color: #6366f1; font-weight: bold; padding: 5px; border: 1px solid #6366f1;');
});

/**
 * Injects required CSS for the Space UI directly into the document.
 */
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
            pointer-events: none;
            will-change: transform;
            filter: drop-shadow(0 0 10px rgba(99, 102, 241, 0.5));
            z-index: 5;
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
        }
    `;
    document.head.appendChild(style);
}

function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
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
                <div class="mt-4 flex justify-center gap-8 text-[9px] font-black text-gray-500 tracking-[0.2em] uppercase">
                    <a href="index.html" class="hover:text-white transition">Hub</a>
                    <a href="about.html" class="hover:text-white transition">Contact</a>
                    <a href="portfolio.html" class="hover:text-white transition">Projects</a>
                </div>
            </footer>
        `;
    }
}

/**
 * Distant Starfield Logic
 */
function initStarfield(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let stars = [];
    const starCount = 150;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.2;
            this.opacity = Math.random();
            this.speed = Math.random() * 0.05 + 0.01;
        }
        update() {
            this.y += this.speed;
            if (this.y > canvas.height) {
                this.y = -5;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (stars.length === 0) for(let i=0; i<starCount; i++) stars.push(new Star());
        stars.forEach(s => { s.update(); s.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Advanced Behavioral Ship-Cat AI
 */
function initSpaceshipAnimation(container) {
    const ship = document.createElement('div');
    ship.className = 'ship-sprite';
    
    const statusBox = document.createElement('div');
    statusBox.className = 'ship-status';
    ship.appendChild(statusBox);

    // Thruster visual
    const thruster = document.createElement('div');
    thruster.className = 'ship-thruster';
    ship.appendChild(thruster);

    // Space Shuttle / Ship SVG
    ship.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 5L85 85H15L50 5Z" stroke="#6366f1" stroke-width="4" fill="black" />
            <path d="M50 20L75 80H25L50 20Z" fill="#6366f1" opacity="0.4" />
            <circle cx="50" cy="55" r="8" fill="white" opacity="0.8">
                 <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
        </svg>
    `);

    container.appendChild(ship);

    let posX = Math.random() * window.innerWidth, posY = Math.random() * window.innerHeight;
    let velX = 0, velY = 0, angle = 0;
    const mouse = { x: -1000, y: -1000 };
    const trackingRadius = 300; // Radius for "Mouse Awareness"

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const behaviors = ['wandering', 'drifting', 'cleaning', 'curious'];
    let currentBehavior = 'wandering';
    let behaviorTimer = 0;

    function setStatus(text) {
        statusBox.innerText = text;
        statusBox.style.opacity = '1';
        setTimeout(() => { if(statusBox.innerText === text) statusBox.style.opacity = '0.3'; }, 2000);
    }

    function changeBehavior() {
        // AI State Decision
        const dx = mouse.x - posX;
        const dy = mouse.y - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < trackingRadius) {
            currentBehavior = 'curious';
            setStatus('TRACKING_USER');
        } else {
            currentBehavior = behaviors[Math.floor(Math.random() * 3)]; // Pick non-curious behavior
            behaviorTimer = Math.random() * 300 + 200;
            if (currentBehavior === 'wandering') setStatus('AUTO_ROAM');
            if (currentBehavior === 'drifting') setStatus('Z-GRAVITY_DRIFT');
            if (currentBehavior === 'cleaning') setStatus('SYSTEM_PURGE');
        }
    }

    function update() {
        const dx = mouse.x - posX;
        const dy = mouse.y - posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        // State Override: Becomes curious if mouse enters radius
        if (dist < trackingRadius && currentBehavior !== 'curious') {
            changeBehavior();
        } else if (dist > trackingRadius && currentBehavior === 'curious') {
            changeBehavior();
        }

        if (--behaviorTimer <= 0 && currentBehavior !== 'curious') changeBehavior();

        // Gravity/Physics Logic
        const gravity = 0.02; // Downward space pull
        velY += gravity * 0.1;

        if (currentBehavior === 'curious') {
            // Track mouse with high agility
            velX += (dx * 0.0005);
            velY += (dy * 0.0005);
            thruster.style.height = `${20 + Math.random() * 20}px`;
        } 
        else if (currentBehavior === 'wandering') {
            // Roam like a cat (random sprints and turns)
            if (Math.random() < 0.01) {
                velX += (Math.random() - 0.5) * 5;
                velY += (Math.random() - 0.5) * 5;
            }
            thruster.style.height = '10px';
        }
        else if (currentBehavior === 'drifting') {
            // Slow idle float
            velX *= 0.99;
            velY *= 0.99;
            thruster.style.height = '5px';
        }
        else if (currentBehavior === 'cleaning') {
            // Spin in place (grooming)
            angle += 15;
            velX *= 0.9;
            velY *= 0.9;
            thruster.style.height = '0px';
        }

        // Apply Speed Dampening
        velX *= 0.98;
        velY *= 0.98;

        posX += velX;
        posY += velY;

        // Rotation: Point towards velocity or rotate if cleaning
        if (currentBehavior !== 'cleaning') {
            const travelAngle = Math.atan2(velY, velX) * 180 / Math.PI;
            angle += (travelAngle + 90 - angle) * 0.1;
        }

        ship.style.left = `${posX}px`;
        ship.style.top = `${posY}px`;
        ship.style.transform = `rotate(${angle}deg)`;

        // Screen Wrap
        if (posX < -100) posX = window.innerWidth + 50;
        if (posX > window.innerWidth + 100) posX = -50;
        if (posY < -100) posY = window.innerHeight + 50;
        if (posY > window.innerHeight + 100) posY = -100;

        requestAnimationFrame(update);
    }

    changeBehavior();
    requestAnimationFrame(update);
}
