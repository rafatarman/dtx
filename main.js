/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * This file handles global animations, shared components, and navigation shortcuts.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Global Navigation Shortcuts
    initGlobalShortcuts();

    // 2. Setup Shared Footer Injection
    injectSharedComponents();
    
    // 3. Initialize Sci-Fi Background Animation
    if (document.getElementById('animation-container')) {
        initSentinelAnimation();
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
 * Background Animation: Neural Sentinel
 * A wandering sci-fi entity with random drift physics and a trailing glow.
 */
function initSentinelAnimation() {
    const container = document.getElementById('animation-container');
    if (!container) return;

    // Create the Sentinel Sprite (Sci-fi Geometric Drone)
    const sentinel = document.createElement('div');
    sentinel.className = 'sentinel-sprite';
    sentinel.innerHTML = `
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Outer Core -->
            <path d="M50 10L90 50L50 90L10 50L50 10Z" stroke="#6366f1" stroke-width="2" />
            <!-- Pulsing Center -->
            <circle cx="50" cy="50" r="10" fill="#6366f1">
                <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.4;1;0.4" dur="3s" repeatCount="indefinite" />
            </circle>
            <!-- Accents -->
            <path d="M50 25L75 50L50 75L25 50L50 25Z" stroke="white" stroke-width="1" opacity="0.3" />
            <line x1="50" y1="10" x2="50" y2="90" stroke="#6366f1" stroke-width="1" opacity="0.2" />
            <line x1="10" y1="50" x2="90" y2="50" stroke="#6366f1" stroke-width="1" opacity="0.2" />
        </svg>
    `;

    // Create the ambient glow following the sentinel
    const glow = document.createElement('div');
    glow.className = 'sentinel-glow';
    
    container.appendChild(glow);
    container.appendChild(sentinel);

    // Initial Physics State
    let posX = Math.random() * window.innerWidth;
    let posY = Math.random() * window.innerHeight;
    let velX = (Math.random() - 0.5) * 1.5;
    let velY = (Math.random() - 0.5) * 1.5;
    
    // Movement Target for wandering behavior
    let targetX = Math.random() * window.innerWidth;
    let targetY = Math.random() * window.innerHeight;
    let currentAngle = 0;

    function frame() {
        // Accelerate slowly towards the random target
        const diffX = targetX - posX;
        const diffY = targetY - posY;
        
        velX += diffX * 0.00008;
        velY += diffY * 0.00008;
        
        // Apply Speed Dampening (Friction/Air Resistance)
        const speed = Math.sqrt(velX * velX + velY * velY);
        const topSpeed = 1.2;
        if (speed > topSpeed) {
            velX = (velX / speed) * topSpeed;
            velY = (velY / speed) * topSpeed;
        }

        posX += velX;
        posY += velY;

        // Calculate rotation based on travel direction
        const travelAngle = Math.atan2(velY, velX) * (180 / Math.PI);
        currentAngle += (travelAngle - currentAngle) * 0.05;

        // Apply transformations to DOM elements
        sentinel.style.transform = `translate(${posX}px, ${posY}px) rotate(${currentAngle + 45}deg)`;
        glow.style.left = `${posX + 40}px`;
        glow.style.top = `${posY + 40}px`;

        // If very close to target, or every 500 frames, pick a new target
        const distToTarget = Math.sqrt(diffX * diffX + diffY * diffY);
        if (distToTarget < 100 || Math.random() < 0.002) {
            targetX = Math.random() * window.innerWidth;
            targetY = Math.random() * window.innerHeight;
        }

        // Screen boundary wrap logic (Teleport to opposite side)
        const buffer = 150;
        if (posX < -buffer) posX = window.innerWidth + buffer;
        if (posX > window.innerWidth + buffer) posX = -buffer;
        if (posY < -buffer) posY = window.innerHeight + buffer;
        if (posY > window.innerHeight + buffer) posY = -buffer;

        requestAnimationFrame(frame);
    }

    // Start the animation loop
    requestAnimationFrame(frame);

    // Dynamic resizing
    window.addEventListener('resize', () => {
        targetX = Math.random() * window.innerWidth;
        targetY = Math.random() * window.innerHeight;
    });
}
