/* ==========================================================================
   CONTACT FORM SUBMISSION (CONTACT.JS)
   ========================================================================== */
export function initContact() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (window.showToast) {
                window.showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            }
            contactForm.reset();
        });
    }
}
