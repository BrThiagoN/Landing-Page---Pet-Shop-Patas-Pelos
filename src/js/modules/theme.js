/* ==========================================================================
   THEME TOGGLE (DARK MODE) (THEME.JS)
   ========================================================================== */
export function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleIcon = themeToggle ? themeToggle.querySelector('.theme-toggle-icon') : null;
    
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeToggleIcon) {
            themeToggleIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
    };

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            if (window.showToast) {
                window.showToast(`Modo ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado!`, 'info');
            }
        });
    }
}
