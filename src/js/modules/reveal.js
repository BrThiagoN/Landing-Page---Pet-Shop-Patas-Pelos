/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (REVEAL.JS)
   ========================================================================== */
export function initReveal() {
    const revealElements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-zoom'
    );
    
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }
}
