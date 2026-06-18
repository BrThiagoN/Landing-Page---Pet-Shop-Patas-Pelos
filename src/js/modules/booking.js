/* ==========================================================================
   BOOKING FORM SUBMISSION & SUCCESS DIALOG (BOOKING.JS)
   ========================================================================== */
export function initBooking() {
    const bookingForm = document.getElementById('booking-form');
    const successModal = document.getElementById('success-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const calcTotal = document.getElementById('calc-total');
    
    if (bookingForm && successModal) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent standard browser redirect
            
            // Collect customer inputs
            const tutorName = document.getElementById('tut-name').value;
            const petName = document.getElementById('pet-name').value;
            const phoneVal = document.getElementById('tut-phone').value;
            const rawDate = document.getElementById('tut-date').value;

            // Format date nicely (DD/MM/YYYY)
            let formattedDate = 'Selecione';
            if (rawDate) {
                const dateParts = rawDate.split('-');
                formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            }

            // Fill placeholders in modal card
            document.getElementById('modal-tut-name').textContent = tutorName;
            document.getElementById('modal-pet-name').textContent = petName;
            document.getElementById('modal-phone').textContent = phoneVal;
            document.getElementById('modal-date').textContent = formattedDate;

            // Fill summary fields inside success modal
            const freqInput = bookingForm.querySelector('input[name="service-freq"]:checked');
            const freqVal = freqInput ? freqInput.value : 'once';
            const freqTextMap = { once: 'Único', weekly: 'Semanal (10% OFF)', fortnightly: 'Quinzenal (5% OFF)' };
            
            document.getElementById('modal-summary-freq').textContent = freqTextMap[freqVal] || 'Único';
            if (calcTotal) {
                document.getElementById('modal-summary-total').textContent = `R$ ${calcTotal.textContent},00`;
            }

            // Display success modal
            successModal.classList.add('open');
            if (window.showToast) window.showToast('Agendamento pré-registrado com sucesso!', 'success');
        });

        const resetForm = () => {
            successModal.classList.remove('open');
            bookingForm.reset(); // reset form
            
            // Clear coupons and recalculate
            if (window.PetShop) {
                if (window.PetShop.resetCoupon) window.PetShop.resetCoupon();
                if (window.PetShop.calculateTotal) window.PetShop.calculateTotal();
            }
            
            const couponFeedback = document.getElementById('coupon-feedback');
            const couponCodeInput = document.getElementById('coupon-code');
            if (couponFeedback) couponFeedback.textContent = '';
            if (couponCodeInput) couponCodeInput.value = '';
        };

        // Close modal listeners
        if (btnCloseModal) {
            btnCloseModal.addEventListener('click', resetForm);
        }

        // Close modal when clicking outside the dialog card
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                resetForm();
            }
        });
    }
}
