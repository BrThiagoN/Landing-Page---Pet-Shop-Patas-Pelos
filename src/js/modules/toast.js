/* ==========================================================================
   TOAST NOTIFICATION SYSTEM (TOAST.JS)
   ========================================================================== */
export function initToast() {
    window.showToast = function(message, type = 'info') {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        toast.innerHTML = `
            <div class="toast-content">${message}</div>
            <button class="toast-close">&times;</button>
            <div class="toast-progress">
                <div class="toast-progress-bar"></div>
            </div>
        `;

        container.appendChild(toast);

        // Close button listener
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => {
            toast.style.animation = 'toastIn 0.3s ease reverse forwards';
            setTimeout(() => toast.remove(), 300);
        });

        // Auto remove
        setTimeout(() => {
            if (toast.parentNode) {
                toast.style.animation = 'toastIn 0.3s ease reverse forwards';
                setTimeout(() => toast.remove(), 300);
            }
        }, 4000);
    };
}
