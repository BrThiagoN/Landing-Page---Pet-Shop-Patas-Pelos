/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (REVEAL.JS)
   ========================================================================== */
export function initReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                } else {
                    entry.target.classList.remove('reveal-active');
                }
            });
        }, {
            root: null,
            threshold: 0.10,
            rootMargin: '0px 0px -20px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
}
