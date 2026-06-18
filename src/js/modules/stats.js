/* ==========================================================================
   STATS COUNTER ANIMATION (STATS.JS)
   ========================================================================== */
export function initStats() {
    const stats = document.querySelectorAll('.stat-number');
    if (stats.length === 0) return;

    const animateStats = () => {
        stats.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-target'));
            const isFloat = target % 1 !== 0;
            const speed = 1500; // time in ms
            const increment = target / (speed / 16); // ~60fps
            
            let count = 0;
            const updateCount = () => {
                count += increment;
                if (count < target) {
                    stat.textContent = isFloat ? count.toFixed(1) : Math.floor(count);
                    setTimeout(updateCount, 16);
                } else {
                    stat.textContent = isFloat ? target.toFixed(1) : Math.floor(target);
                }
            };
            updateCount();
        });
    };

    // Use Intersection Observer to trigger counting when visible
    const observerOptions = {
        root: null,
        threshold: 0.1
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}
