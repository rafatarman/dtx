/**
 * Md. Rafat Uddin Arman - Professional Ecosystem Shared Logic
 * This file handles global maintenance, shared components, and keyboard navigation
 * for all 20+ service pages in the repository.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Global Keyboard Shortcuts
    initGlobalShortcuts();

    // 2. Setup Shared UI (Injection)
    injectSharedComponents();

    // 3. Shared Page Entry Effects
    console.log('%c Ecosystem Portal: Shared Logic Initialized ', 'background: #6366f1; color: #fff; font-weight: bold;');
});

/**
 * Handle global keyboard interactions across all sub-pages.
 */
function initGlobalShortcuts() {
    document.addEventListener('keydown', (e) => {
        // ESC key logic: Instantly return to the main Hub (index.html)
        if (e.key === 'Escape') {
            window.location.href = 'index.html';
        }
    });
}

/**
 * Injects shared UI components into predefined containers.
 * This ensures that if you change a piece of info (like a year or social link),
 * it updates across all 20+ pages instantly.
 */
function injectSharedComponents() {
    // Shared Footer Injection
    const footerTarget = document.getElementById('global-footer');
    if (footerTarget) {
        const currentYear = new Date().getFullYear();
        footerTarget.innerHTML = `
            <footer class="mt-20 py-10 border-t border-white/5 text-center">
                <p class="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
                    &copy; ${currentYear} Md. Rafat Uddin Arman • Principal Engineering Hub
                </p>
                <div class="mt-4 flex justify-center gap-6 text-[9px] font-bold text-gray-500 tracking-widest uppercase">
                    <a href="index.html" class="hover:text-white transition">Hub</a>
                    <a href="about.html" class="hover:text-white transition">Contact</a>
                    <a href="portfolio.html" class="hover:text-white transition">Portfolio</a>
                </div>
            </footer>
        `;
    }

    // Optional: Shared Header Logic can be added here
}

/**
 * Shared utility for dynamic theme adjustments if needed in the future
 */
window.Ecosystem = {
    goBack: () => window.location.href = 'index.html',
    logAction: (action) => console.log(`[Ecosystem Log]: ${action}`)
};
