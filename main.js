/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 5.2 - Finalized Global Footer & Space Snow
 */

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalAnimationStyles();
    initGlobalShortcuts();
    injectSharedComponents();
    
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initStarfield(animContainer);
        initSnowEffect(animContainer);
    }

    // Initialize global utilities if present on the page
    if (typeof initTabSystem === 'function') initTabSystem();
    trackPageEngagement();
});

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
        stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: Math.random() * 1.5, opacity: Math.random() * 0.5 + 0.2 });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

function initSnowEffect(container) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0'; canvas.style.left = '0';
    canvas.style.width = '100%'; canvas.style.height = '100%';
    canvas.style.zIndex = '2';
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize);
    resize();
    class CosmicSnow {
        constructor() { this.reset(); this.y = Math.random() * canvas.height; }
        reset() { this.x = Math.random() * canvas.width; this.y = -20; this.size = Math.random() * 2 + 1; this.speed = Math.random() * 0.8 + 0.2; this.velX = (Math.random() - 0.5) * 0.3; this.opacity = Math.random() * 0.5 + 0.1; }
        update() { this.y += this.speed; this.x += this.velX; if (this.y > canvas.height) this.reset(); }
        draw() {
            ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
            ctx.shadowBlur = 10; ctx.shadowColor = "rgba(99, 102, 241, 0.5)";
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;
        }
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (particles.length === 0) for(let i=0; i<60; i++) particles.push(new CosmicSnow());
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }
    animate();
}

function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !window.location.pathname.endsWith('index.html')) {
            window.location.href = 'index.html';
        }
    });
}

/**
 * Injects the persistent copyright text across all portals
 */
function injectSharedComponents() {
    const footerTarget = document.getElementById('global-footer');
    if (footerTarget) {
        const currentYear = new Date().getFullYear();
        footerTarget.innerHTML = `
            <footer class="mt-20 py-12 border-t border-white/5 text-center relative z-20">
                <p class="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-black">
                    &copy; ${currentYear} Md. Rafat Uddin Arman • Principal Engineering Hub
                </p>
                <p class="text-[8px] text-gray-700 uppercase tracking-[0.2em] mt-2">
                    All Rights Reserved • High-Fidelity Ecosystem v5.2
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
