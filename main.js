/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * This file handles global animations, shared components, and navigation shortcuts.
 * VERSION: 2.1 - Self-Styling & Behavioral AI Edition
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Global Styles for Animations (Ensures zero-config for new pages)
    injectGlobalAnimationStyles();

    // 2. Initialize Global Navigation Shortcuts
    initGlobalShortcuts();

    // 3. Setup Shared Footer Injection
    injectSharedComponents();
    
    // 4. Initialize Animations
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initNeuralBackground(animContainer); // Interactive particle web
        initSentinelAnimation(animContainer); // Advanced behavioral bot
    }

    console.log('%c Neural Ecosystem Hub: Active ', 'background: #6366f1; color: #fff; font-weight: bold; padding: 5px;');
});

/**
 * Injects required CSS for the bot and background directly into the document.
 * This prevents the need for manual CSS copying across all Canvas pages.
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
            background: #000;
        }
        .sentinel-sprite {
            position: absolute;
            width: 80px; height: 80px;
            pointer-events: none;
            will-change: transform;
            filter: drop-shadow(0 0 15px rgba(99, 102, 241, 0.7));
            z-index: 5;
        }
        .sentinel-glow {
            position: absolute;
            width: 250px; height: 250px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            will-change: left, top;
            z-index: 1;
        }
        .sentinel-status {
            position: absolute;
            top: -45px; left: 50%;
            transform: translateX(-50%);
            font-size: 11px;
            color: #6366f1;
            font-family: 'Inter', monospace;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            background: rgba(0,0,0,0.8);
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid rgba(99, 102, 241, 0.3);
            white-space: nowrap;
            pointer-events: none;
            transition: opacity 0.5s;
        }
    `;
    document.head.appendChild(style);
}

function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ESC key: Global shortcut to return to the landing hub
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
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20 bg-black/50 backdrop-blur-sm">
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
 * Interactive Particle Web Logic
 */
function initNeuralBackground(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;
    const connectionDist = 160;
    const mouse = { x: null, y: null, radius: 180 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.5;
            this.velX = (Math.random() - 0.5) * 0.4;
            this.velY = (Math.random() - 0.5) * 0.4;
        }
        update() {
            this.x += this.velX;
            this.y += this.velY;
            if (this.x > canvas.width || this.x < 0) this.velX *= -1;
            if (this.y > canvas.height || this.y < 0) this.velY *= -1;
            
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= (dx / distance) * force * 2;
                    this.y -= (dy / distance) * force * 2;
                }
            }
        }
        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length === 0) {
            for(let i=0; i<particleCount; i++) particles.push(new Particle());
        }
        
        particles.forEach((p, i) => {
            p.update();
            p.draw();
            for (let j = i; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < connectionDist) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 * (1 - (dist / connectionDist))})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath(); 
                    ctx.moveTo(p.x, p.y); 
                    ctx.lineTo(particles[j].x, particles[j].y); 
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Advanced Behavioral Bot Logic
 */
function initSentinelAnimation(container) {
    const sentinel = document.createElement('div');
    sentinel.className = 'sentinel-sprite';
    
    const statusBox = document.createElement('div');
    statusBox.className = 'sentinel-status';
    statusBox.style.opacity = '0';
    sentinel.appendChild(statusBox);

    sentinel.insertAdjacentHTML('beforeend', `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="outer-frame" d="M50 10L90 50L50 90L10 50L50 10Z" stroke="#6366f1" stroke-width="2" />
            <circle id="inner-eye" cx="50" cy="50" r="10" fill="#6366f1" />
            <path id="sub-frame" d="M50 25L75 50L50 75L25 50L50 25Z" stroke="white" stroke-width="1" opacity="0.4" />
        </svg>
    `);

    const glow = document.createElement('div');
    glow.className = 'sentinel-glow';
    container.appendChild(glow);
    container.appendChild(sentinel);

    let posX = Math.random() * window.innerWidth, posY = Math.random() * window.innerHeight;
    let velX = 0, velY = 0, targetX = posX, targetY = posY, angle = 0;
    
    const behaviors = ['wandering', 'grooming', 'watchingTV', 'playing', 'swinging'];
    let currentBehavior = 'wandering', behaviorTimer = 0;

    function setStatus(text) {
        statusBox.innerText = text;
        statusBox.style.opacity = '1';
        setTimeout(() => { if(statusBox.innerText === text) statusBox.style.opacity = '0.3'; }, 2000);
    }

    function changeBehavior() {
        currentBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        behaviorTimer = Math.random() * 400 + 200;
        const eye = sentinel.querySelector('#inner-eye');

        if (currentBehavior === 'wandering') {
            setStatus('SEARCHING');
            targetX = Math.random() * window.innerWidth;
            targetY = Math.random() * window.innerHeight;
            eye.setAttribute('fill', '#6366f1');
        } else if (currentBehavior === 'grooming') {
            setStatus('CALIBRATING');
            eye.setAttribute('fill', '#ffffff');
        } else if (currentBehavior === 'watchingTV') {
            setStatus('MONITORING');
            eye.setAttribute('fill', '#10b981');
        } else if (currentBehavior === 'playing') {
            setStatus('IDLE_PLAY');
            eye.setAttribute('fill', '#f59e0b');
        } else if (currentBehavior === 'swinging') {
            setStatus('GRAVITY_SIM');
            eye.setAttribute('fill', '#8b5cf6');
        }
    }

    function update() {
        if (--behaviorTimer <= 0) changeBehavior();

        if (currentBehavior === 'wandering') {
            velX += (targetX - posX) * 0.0001;
            velY += (targetY - posY) * 0.0001;
            const s = Math.sqrt(velX*velX + velY*velY);
            if (s > 1.2) { velX = (velX/s)*1.2; velY = (velY/s)*1.2; }
            angle += (Math.atan2(velY, velX) * 180 / Math.PI - angle) * 0.05;
        } else if (currentBehavior === 'grooming') {
            velX *= 0.95; velY *= 0.95; angle += 6; 
        } else if (currentBehavior === 'watchingTV') {
            velX = (Math.random()-0.5)*0.6; velY = (Math.random()-0.5)*0.6;
            angle += Math.sin(Date.now()*0.01)*3;
        } else if (currentBehavior === 'playing') {
            const t = Date.now()*0.006; velX = Math.cos(t)*3; velY = Math.sin(t)*3; angle += 12;
        } else if (currentBehavior === 'swinging') {
            const t = Date.now()*0.003; posX += Math.sin(t)*2; angle = Math.sin(t)*25;
        }

        posX += velX; posY += velY;
        sentinel.style.left = `${posX}px`; sentinel.style.top = `${posY}px`;
        sentinel.style.transform = `rotate(${angle}deg)`;
        glow.style.left = `${posX + 40}px`; glow.style.top = `${posY + 40}px`;

        // Teleport screen wrap
        if (posX < -120) posX = window.innerWidth + 100;
        if (posX > window.innerWidth + 120) posX = -100;
        if (posY < -120) posY = window.innerHeight + 100;
        if (posY > window.innerHeight + 120) posY = -100;

        requestAnimationFrame(update);
    }

    changeBehavior();
    requestAnimationFrame(update);
}
