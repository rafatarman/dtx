/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 5.6 - State-Agnostic Bootstrapper & Sandbox Hardening
 * This file handles global space animations and core infrastructure.
 */

(function() {
    // Global state guard
    window._ecosystemInit = window._ecosystemInit || false;

    const startEcosystem = () => {
        if (window._ecosystemInit) return;
        window._ecosystemInit = true;

        try {
            injectGlobalAnimationStyles();
            initGlobalShortcuts();
            injectSharedComponents();
            
            const animContainer = document.getElementById('animation-container');
            if (animContainer) {
                initStarfield(animContainer);
                initSnowEffect(animContainer);
            }

            // Tab logic for Product Lab
            initTabSystem();
        } catch (error) {
            console.warn("Ecosystem component failed to initialize:", error.message);
        }
    };

    // Robust readyState handling
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startEcosystem);
    } else {
        startEcosystem();
    }
})();

/**
 * Standardizes global space aesthetics
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
        .tab-trigger.active {
            background: #6366f1 !important;
            color: white !important;
            border-color: #6366f1 !important;
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.4);
        }
        .product-card.hidden { display: none; }
        @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(10px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
    `;
    document.head.appendChild(style);
}

/**
 * Handles tab-based navigation for Product Lab
 */
function initTabSystem() {
    const triggers = document.querySelectorAll('.tab-trigger');
    const items = document.querySelectorAll('.filter-item');
    if (!triggers || triggers.length === 0) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const category = trigger.getAttribute('data-category');
            if (!category) return;

            triggers.forEach(t => t.classList.remove('active'));
            trigger.classList.add('active');

            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-type') === category) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    void item.offsetHeight; 
                    item.style.animation = 'fadeIn 0.4s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Background Starfield Logic
 */
function initStarfield(container) {
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let stars = [];
    
    const setupCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', setupCanvas);
    setupCanvas();

    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 1.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.beginPath(); 
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); 
            ctx.fill();
        });
        requestAnimationFrame(animate);
    };
    animate();
}

/**
 * Particle "Cosmic Snow" Logic
 */
function initSnowEffect(container) {
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '2';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const setupCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', setupCanvas);
    setupCanvas();

    class Particle {
        constructor() {
            this.reset(true);
        }
        reset(randomY = false) {
            this.x = Math.random() * window.innerWidth;
            this.y = randomY ? Math.random() * window.innerHeight : -20;
            this.size = Math.random() * 2 + 1;
            this.speed = Math.random() * 0.8 + 0.2;
            this.velX = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.y += this.speed;
            this.x += this.velX;
            if (this.y > window.innerHeight) this.reset();
        }
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const animate = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length === 0) {
            for(let i=0; i<60; i++) particles.push(new Particle());
        }
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    };
    animate();
}

/**
 * Standardized Navigation
 */
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const path = window.location.pathname;
            const isIndex = path === '/' || path.endsWith('index.html') || path === '';
            if (!isIndex) {
                window.location.href = 'index.html';
            }
        }
    });
}

/**
 * Shared Infrastructure Injection
 */
function injectSharedComponents() {
    const footerTarget = document.getElementById('global-footer');
    if (footerTarget) {
        const year = new Date().getFullYear();
        footerTarget.innerHTML = `
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20">
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black">
                    &copy; ${year} Md. Rafat Uddin Arman • Principal Engineering Hub
                </p>
                <p class="text-[8px] text-gray-700 uppercase tracking-[0.2em] mt-2">
                    All Rights Reserved • System Stability v5.6
                </p>
            </footer>
        `;
    }
}
