/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * VERSION: 4.0 - Multi-Ship "Cat Fight" AI Edition
 */

document.addEventListener('DOMContentLoaded', () => {
    injectGlobalAnimationStyles();
    initGlobalShortcuts();
    injectSharedComponents();
    
    const animContainer = document.getElementById('animation-container');
    if (animContainer) {
        initStarfield(animContainer);
        // Initialize the Multi-Ship System (2 Ships)
        initMultiShipAI(animContainer, 2);
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
            font-size: 8px;
            color: #6366f1;
            font-family: 'Inter', monospace;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 0.2em;
            background: rgba(0,0,0,0.85);
            padding: 2px 8px;
            border-radius: 4px;
            border: 1px solid rgba(99, 102, 241, 0.5);
            white-space: nowrap;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        }
        .hologram-screen {
            position: absolute;
            top: -85px; left: 50%;
            width: 50px; height: 35px;
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
            animation: scan 1.5s linear infinite;
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

    for(let i=0; i<120; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.2,
            speed: Math.random() * 0.04 + 0.01
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.y += s.speed;
            if (s.y > canvas.height) s.y = -5;
            ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

/**
 * Multi-Ship AI Logic
 */
function initMultiShipAI(container, count) {
    const ships = [];
    const mouse = { x: -2000, y: -2000 };
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    class SpaceCat {
        constructor(id, color) {
            this.id = id;
            this.color = color;
            this.el = document.createElement('div');
            this.el.className = 'ship-sprite';
            
            this.statusBox = document.createElement('div');
            this.statusBox.className = 'ship-status';
            this.el.appendChild(this.statusBox);

            this.hologram = document.createElement('div');
            this.hologram.className = 'hologram-screen';
            this.hologram.style.display = 'none';
            this.hologram.innerHTML = '<div class="hologram-line"></div>';
            this.el.appendChild(this.hologram);

            this.el.insertAdjacentHTML('beforeend', `
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 10L85 85H15L50 10Z" stroke="${color}" stroke-width="4" fill="black" />
                    <circle cx="50" cy="55" r="6" fill="white" opacity="0.8" />
                    <rect x="42" y="85" width="16" height="8" fill="${color}" opacity="0.6" id="thruster-${id}" />
                </svg>
            `);

            container.appendChild(this.el);

            this.posX = Math.random() * window.innerWidth;
            this.posY = Math.random() * window.innerHeight;
            this.velX = 0;
            this.velY = 0;
            this.angle = 0;
            this.targetX = this.posX;
            this.targetY = this.posY;
            this.behavior = 'wandering';
            this.behaviorTimer = 0;
            this.isDueling = false;

            this.el.addEventListener('mousedown', () => this.boost());
        }

        setStatus(text) {
            this.statusBox.innerText = text;
            this.statusBox.style.opacity = '1';
            setTimeout(() => { if(this.statusBox.innerText === text) this.statusBox.style.opacity = '0'; }, 2500);
        }

        boost() {
            this.velX += (Math.random() - 0.5) * 60;
            this.velY += (Math.random() - 0.5) * 60;
            this.setStatus('PURR_BOOST');
        }

        update() {
            if (this.isDueling) return; // Logic handled externally in battle mode

            const dx = mouse.x - this.posX;
            const dy = mouse.y - this.posY;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (--this.behaviorTimer <= 0) {
                if (dist < 250) {
                    this.behavior = 'curious';
                    this.setStatus('SNIFFING_USER');
                } else {
                    const roll = Math.random();
                    if (roll < 0.15) {
                        this.behavior = 'watchingTV';
                        this.setStatus('DATA_NAP');
                        this.hologram.style.display = 'flex';
                    } else if (roll < 0.3) {
                        this.behavior = 'grooming';
                        this.setStatus('SELF_CHECK');
                        this.hologram.style.display = 'none';
                    } else {
                        this.behavior = 'wandering';
                        this.setStatus('ROAMING');
                        this.hologram.style.display = 'none';
                        this.targetX = Math.random() * window.innerWidth;
                        this.targetY = Math.random() * window.innerHeight;
                    }
                    this.behaviorTimer = Math.random() * 300 + 200;
                }
            }

            // Movement Logic
            let accel = 0.0001;
            let targetX = this.targetX;
            let targetY = this.targetY;

            if (this.behavior === 'curious') {
                targetX = mouse.x; targetY = mouse.y; accel = 0.0012;
            } else if (this.behavior === 'watchingTV' || this.behavior === 'grooming') {
                this.velX *= 0.85; this.velY *= 0.85;
                if (this.behavior === 'grooming') this.angle += 12;
            }

            this.velX += (targetX - this.posX) * accel;
            this.velY += (targetY - this.posY) * accel;
            this.velX *= 0.98; this.velY *= 0.98;

            this.posX += this.velX;
            this.posY += this.velY;

            if (this.behavior !== 'grooming') {
                const travelAngle = Math.atan2(this.velY, this.velX) * 180 / Math.PI;
                this.angle += (travelAngle + 90 - this.angle) * 0.1;
            }

            this.applyStyles();
            this.screenWrap();
        }

        applyStyles() {
            this.el.style.left = `${this.posX}px`;
            this.el.style.top = `${this.posY}px`;
            this.el.style.transform = `rotate(${this.angle}deg)`;
            const thruster = this.el.querySelector(`#thruster-${this.id}`);
            if (thruster) thruster.style.opacity = Math.random() > 0.5 ? 1 : 0.3;
        }

        screenWrap() {
            if (this.posX < -150) this.posX = window.innerWidth + 50;
            if (this.posX > window.innerWidth + 150) this.posX = -100;
            if (this.posY < -150) this.posY = window.innerHeight + 50;
            if (this.posY > window.innerHeight + 150) this.posY = -100;
        }
    }

    // Initialize the two cats
    ships.push(new SpaceCat(1, '#6366f1'));
    ships.push(new SpaceCat(2, '#06b6d4'));

    let battleTimer = 0;

    function loop() {
        const [s1, s2] = ships;
        
        // Combat/Play Fight Detection
        const dx = s1.posX - s2.posX;
        const dy = s1.posY - s2.posY;
        const dist = Math.sqrt(dx*dx + dy*dy);

        if (dist < 120 && !s1.isDueling && battleTimer <= 0) {
            s1.isDueling = s2.isDueling = true;
            battleTimer = 180; // 3 seconds at 60fps
            s1.setStatus('CLASH_INITIATED');
            s2.setStatus('FIGHT_PLAY_MODE');
        }

        if (battleTimer > 0) {
            battleTimer--;
            // Rapid Orbit around each other
            const centerX = (s1.posX + s2.posX) / 2;
            const centerY = (s1.posY + s2.posY) / 2;
            const time = Date.now() * 0.015;
            
            s1.posX = centerX + Math.cos(time) * 60;
            s1.posY = centerY + Math.sin(time) * 60;
            s1.angle += 30;

            s2.posX = centerX + Math.cos(time + Math.PI) * 60;
            s2.posY = centerY + Math.sin(time + Math.PI) * 60;
            s2.angle += 30;

            if (battleTimer === 1) {
                // Final "Explosion" / Bounce away
                s1.velX = (s1.posX - centerX) * 0.5;
                s1.velY = (s1.posY - centerY) * 0.5;
                s2.velX = (s2.posX - centerX) * 0.5;
                s2.velY = (s2.posY - centerY) * 0.5;
                s1.isDueling = s2.isDueling = false;
                s1.setStatus('REBOOTING...');
                s2.setStatus('VICTORY_PURR');
                battleTimer = -300; // Cooldown before next fight
            }
        } else {
            if (battleTimer < 0) battleTimer++;
            s1.update();
            s2.update();
        }

        s1.applyStyles();
        s2.applyStyles();

        requestAnimationFrame(loop);
    }

    loop();
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
