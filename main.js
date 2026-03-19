/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 5.0 - Premium Space "Snow" Edition
 * This file handles global animations and shared components.
 */

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalAnimationStyles();
    initGlobalShortcuts();
    injectSharedComponents();
    
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initStarfield(animContainer);
        // Premium "Snowing Stars" effect
        initSnowEffect(animContainer);
    }

    trackPageEngagement();
});

/**
 * Injects required CSS for the global space theme
 */
function injectGlobalAnimationStyles() {
    if (document.getElementById('ecosystem-styles')) return;
    const style = document.createElement('style');
    style.id = 'ecosystem-styles';
    style.innerHTML = `
        #animation-container { 
            background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%); 
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
        }
        .snow-particle {
            position: absolute;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            filter: blur(1px);
            opacity: 0.6;
            z-index: 2;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Static Deep Space Starfield Background
 */
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

    // Generate initial star distribution
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.beginPath(); 
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); 
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Premium "Show/Snow" Effect: Falling Cosmic Particles
 * Creates a graceful, professional atmosphere.
 */
function initSnowEffect(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '2';
    canvas.style.pointerEvents = 'none';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 60;

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();

    class CosmicSnow {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height; // Start at random Y on first load
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.8 + 0.2;
            this.velX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }

        update() {
            this.y += this.speed;
            this.x += this.velX;

            if (this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`; // Signature Indigo tint
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0; 
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length === 0) {
            for(let i=0; i<particleCount; i++) particles.push(new CosmicSnow());
        }
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Navigation Shortcuts (ESC Key to return home)
 */
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
}

/**
 * Shared Component Injection (Footer)
 */
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

/**
 * Memory Logic: Tracks link engagement to optimize AI focus (Future-ready)
 */
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
