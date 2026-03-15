/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * This file handles global animations, shared components, and navigation shortcuts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Global Navigation Shortcuts
    initGlobalShortcuts();

    // 2. Setup Shared Footer Injection
    injectSharedComponents();
    
    // 3. Initialize Animations
    if (document.getElementById('animation-container')) {
        initNeuralBackground(); // New interactive particle web
        initSentinelAnimation(); // Advanced behavioral bot
    }

    console.log('%c Neural Ecosystem Hub: Active ', 'background: #6366f1; color: #fff; font-weight: bold; padding: 5px;');
});

/**
 * Global Keyboard Interactions
 */
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Pressing ESC always returns the user to the main hub
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
}

/**
 * Central UI Component Management
 */
function injectSharedComponents() {
    const footerTarget = document.getElementById('global-footer');
    if (footerTarget) {
        const currentYear = new Date().getFullYear();
        footerTarget.innerHTML = `
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20">
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
 * Background Animation: Neural Particles
 * Creates a subtle web of connecting nodes that react to mouse movement.
 */
function initNeuralBackground() {
    const container = document.getElementById('animation-container');
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-2';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;
    const connectionDist = 150;
    const mouse = { x: null, y: null, radius: 150 };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.velX = (Math.random() - 0.5) * 0.5;
            this.velY = (Math.random() - 0.5) * 0.5;
        }

        update() {
            this.x += this.velX;
            this.y += this.velY;

            if (this.x > canvas.width || this.x < 0) this.velX *= -1;
            if (this.y > canvas.height || this.y < 0) this.velY *= -1;

            // Mouse Interaction: Subtle repel
            if (mouse.x != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius;
                    const directionX = dx / distance;
                    const directionY = dy / distance;
                    this.x -= directionX * force * 1.5;
                    this.y -= directionY * force * 1.5;
                }
            }
        }

        draw() {
            ctx.fillStyle = 'rgba(99, 102, 241, 0.3)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDist) {
                    ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - (distance / connectionDist))})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();
}

/**
 * Background Animation: Neural Sentinel (Expressive Behavioral Bot)
 */
function initSentinelAnimation() {
    const container = document.getElementById('animation-container');
    if (!container) return;

    // Create the Sentinel Sprite
    const sentinel = document.createElement('div');
    sentinel.className = 'sentinel-sprite';
    sentinel.style.width = '80px';
    sentinel.style.height = '80px';
    sentinel.style.position = 'absolute';
    sentinel.style.filter = 'drop-shadow(0 0 15px rgba(99, 102, 241, 0.7))';
    sentinel.style.zIndex = '5';
    
    // Create status hologram
    const statusBox = document.createElement('div');
    statusBox.style.position = 'absolute';
    statusBox.style.top = '-40px';
    statusBox.style.left = '50%';
    statusBox.style.transform = 'translateX(-50%)';
    statusBox.style.fontSize = '12px';
    statusBox.style.color = '#6366f1';
    statusBox.style.fontFamily = 'monospace';
    statusBox.style.opacity = '0';
    statusBox.style.transition = 'opacity 0.5s';
    statusBox.style.whiteSpace = 'nowrap';
    sentinel.appendChild(statusBox);

    sentinel.innerHTML += `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="outer-frame" d="M50 10L90 50L50 90L10 50L50 10Z" stroke="#6366f1" stroke-width="2" />
            <circle id="inner-eye" cx="50" cy="50" r="10" fill="#6366f1">
                <animate id="eye-pulse" attributeName="r" values="8;12;8" dur="3s" repeatCount="indefinite" />
            </circle>
            <path id="sub-frame" d="M50 25L75 50L50 75L25 50L50 25Z" stroke="white" stroke-width="1" opacity="0.4" />
        </svg>
    `;

    const glow = document.createElement('div');
    glow.className = 'sentinel-glow';
    glow.style.position = 'absolute';
    glow.style.width = '200px';
    glow.style.height = '200px';
    glow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.zIndex = '1';

    container.appendChild(glow);
    container.appendChild(sentinel);

    // Initial Physics State
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    let velX = 0, velY = 0;
    let targetX = posX, targetY = posY;
    let angle = 0;
    
    // Behavioral State Machine
    const behaviors = ['wandering', 'grooming', 'watchingTV', 'playing', 'swinging'];
    let currentBehavior = 'wandering';
    let behaviorTimer = 0;

    function setStatus(text) {
        statusBox.innerText = `[${text}]`;
        statusBox.style.opacity = '1';
        setTimeout(() => { if(statusBox.innerText.includes(text)) statusBox.style.opacity = '0.5'; }, 2000);
    }

    function changeBehavior() {
        currentBehavior = behaviors[Math.floor(Math.random() * behaviors.length)];
        behaviorTimer = Math.random() * 400 + 200; // Duration of behavior
        
        const eye = sentinel.querySelector('#inner-eye');
        const frame = sentinel.querySelector('#outer-frame');

        if (currentBehavior === 'wandering') {
            setStatus('SEARCHING...');
            targetX = Math.random() * window.innerWidth;
            targetY = Math.random() * window.innerHeight;
            eye.setAttribute('fill', '#6366f1');
        } else if (currentBehavior === 'grooming') {
            setStatus('CALIBRATING...');
            eye.setAttribute('fill', '#ffffff');
        } else if (currentBehavior === 'watchingTV') {
            setStatus('MONITORING...');
            eye.setAttribute('fill', '#10b981'); // Green for monitoring
        } else if (currentBehavior === 'playing') {
            setStatus('IDLE_PLAY');
            eye.setAttribute('fill', '#f59e0b'); // Amber for fun
        } else if (currentBehavior === 'swinging') {
            setStatus('GRAVITY_SIM');
            eye.setAttribute('fill', '#8b5cf6');
        }
    }

    function update() {
        behaviorTimer--;
        if (behaviorTimer <= 0) changeBehavior();

        const eye = sentinel.querySelector('#inner-eye');
        const frame = sentinel.querySelector('#outer-frame');

        if (currentBehavior === 'wandering') {
            const dx = targetX - posX;
            const dy = targetY - posY;
            velX += dx * 0.0001;
            velY += dy * 0.0001;
            
            const speed = Math.sqrt(velX * velX + velY * velY);
            if (speed > 1.2) {
                velX = (velX / speed) * 1.2;
                velY = (velY / speed) * 1.2;
            }
            posX += velX;
            posY += velY;
            angle += (Math.atan2(velY, velX) * 180 / Math.PI - angle) * 0.05;
        } 
        else if (currentBehavior === 'grooming') {
            // Stay still but rotate outer frame quickly
            velX *= 0.95; velY *= 0.95;
            posX += velX; posY += velY;
            angle += 5; 
        } 
        else if (currentBehavior === 'watchingTV') {
            // Jitter in place like it's processing data
            velX = (Math.random() - 0.5) * 0.5;
            velY = (Math.random() - 0.5) * 0.5;
            posX += velX; posY += velY;
            angle += Math.sin(Date.now() * 0.01) * 2;
        } 
        else if (currentBehavior === 'playing') {
            // Move in rapid spirals
            const t = Date.now() * 0.005;
            velX = Math.cos(t) * 3;
            velY = Math.sin(t) * 3;
            posX += velX; posY += velY;
            angle += 10;
        }
        else if (currentBehavior === 'swinging') {
            // Pendulum swing
            const t = Date.now() * 0.002;
            posX += Math.sin(t) * 2;
            posY += Math.cos(t * 0.5) * 0.5;
            angle = Math.sin(t) * 20;
        }

        // Apply visual updates
        sentinel.style.left = `${posX}px`;
        sentinel.style.top = `${posY}px`;
        sentinel.style.transform = `rotate(${angle}deg)`;
        glow.style.left = `${posX - 60}px`;
        glow.style.top = `${posY - 60}px`;

        // Screen wrap
        if (posX < -100) posX = window.innerWidth + 50;
        if (posX > window.innerWidth + 100) posX = -50;
        if (posY < -100) posY = window.innerHeight + 50;
        if (posY > window.innerHeight + 100) posY = -50;

        requestAnimationFrame(update);
    }

    changeBehavior();
    requestAnimationFrame(update);
}
