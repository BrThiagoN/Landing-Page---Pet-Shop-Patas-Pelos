/* ==========================================================================
   DYNAMIC PRICING CALCULATOR & COUPONS (CALCULATOR.JS)
   ========================================================================== */
export function initCalculator() {
    const bookingForm = document.getElementById('booking-form');
    const calcTotal = document.getElementById('calc-total');
    
    // Service base prices mapping
    const prices = {
        dog: {
            small:  { banho: 60, tosa: 30, hidra: 25, unha: 15, consulta: 120 },
            medium: { banho: 75, tosa: 45, hidra: 25, unha: 15, consulta: 120 },
            large:  { banho: 95, tosa: 60, hidra: 25, unha: 15, consulta: 120 }
        },
        cat: {
            small:  { banho: 70, tosa: 40, hidra: 25, unha: 15, consulta: 120 },
            medium: { banho: 85, tosa: 55, hidra: 25, unha: 15, consulta: 120 },
            large:  { banho: 105, tosa: 70, hidra: 25, unha: 15, consulta: 120 }
        }
    };

    // Coupon codes config
    const couponCodes = {
        'PRIMEIRO10': 0.10,
        'PETLOVE15': 0.15
    };
    let appliedCoupon = null;

    function calculateTotal() {
        if (!bookingForm) return;

        // Get selected pet type
        const petType = bookingForm.querySelector('input[name="pet-type"]:checked').value;
        // Get selected size
        const petSize = bookingForm.querySelector('input[name="pet-size"]:checked').value;
        // Get checked services
        const selectedServices = Array.from(bookingForm.querySelectorAll('input[name="calc-service"]:checked'))
                                      .map(cb => cb.value);

        // Update individual price labels on screen dynamically
        const currentPrices = prices[petType][petSize];
        
        document.getElementById('p-banho').textContent = `+R$ ${currentPrices.banho}`;
        document.getElementById('p-tosa').textContent = `+R$ ${currentPrices.tosa}`;
        document.getElementById('p-hidra').textContent = `+R$ ${currentPrices.hidra}`;
        document.getElementById('p-unha').textContent = `+R$ ${currentPrices.unha}`;
        document.getElementById('p-consulta').textContent = `+R$ ${currentPrices.consulta}`;

        // Compute subtotal sum
        let subtotal = 0;
        selectedServices.forEach(service => {
            if (currentPrices[service] !== undefined) {
                subtotal += currentPrices[service];
            }
        });

        // Compute frequency discount
        const freqInput = bookingForm.querySelector('input[name="service-freq"]:checked');
        const frequency = freqInput ? freqInput.value : 'once';
        
        let freqDiscountRate = 0;
        if (frequency === 'weekly') freqDiscountRate = 0.10;
        else if (frequency === 'fortnightly') freqDiscountRate = 0.05;

        let freqDiscountVal = Math.round(subtotal * freqDiscountRate);
        let afterFreqDiscount = subtotal - freqDiscountVal;

        // Compute coupon discount
        let couponDiscountRate = 0;
        if (appliedCoupon && couponCodes[appliedCoupon] !== undefined) {
            couponDiscountRate = couponCodes[appliedCoupon];
        }
        let couponDiscountVal = Math.round(afterFreqDiscount * couponDiscountRate);
        let totalSum = afterFreqDiscount - couponDiscountVal;

        // Update detailed breakdown on screen
        const priceBreakdown = document.getElementById('price-breakdown');
        const valSubtotal = document.getElementById('val-subtotal');
        const valDiscountFreq = document.getElementById('val-discount-freq');
        const valDiscountCoupon = document.getElementById('val-discount-coupon');
        const rowDiscountFreq = document.getElementById('row-discount-freq');
        const rowDiscountCoupon = document.getElementById('row-discount-coupon');

        if (subtotal > 0 && (freqDiscountVal > 0 || couponDiscountVal > 0)) {
            if (priceBreakdown) priceBreakdown.style.display = 'block';
            if (valSubtotal) valSubtotal.textContent = `R$ ${subtotal},00`;
            
            if (freqDiscountVal > 0) {
                if (rowDiscountFreq) rowDiscountFreq.style.display = 'flex';
                if (valDiscountFreq) valDiscountFreq.textContent = `-R$ ${freqDiscountVal},00`;
            } else {
                if (rowDiscountFreq) rowDiscountFreq.style.display = 'none';
            }

            if (couponDiscountVal > 0) {
                if (rowDiscountCoupon) rowDiscountCoupon.style.display = 'flex';
                if (valDiscountCoupon) valDiscountCoupon.textContent = `-R$ ${couponDiscountVal},00 (${couponDiscountRate * 100}%)`;
            } else {
                if (rowDiscountCoupon) rowDiscountCoupon.style.display = 'none';
            }
        } else {
            if (priceBreakdown) priceBreakdown.style.display = 'none';
        }

        // Animate price total transition
        animatePriceValue(calcTotal, parseInt(calcTotal.textContent) || 0, totalSum, 400);
    }

    // Smooth value transition animation for pricing total
    function animatePriceValue(element, start, end, duration) {
        if (start === end) return;
        const range = end - start;
        let current = start;
        const increment = end > start ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range)) || 1;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    // Register on the shared namespace window.PetShop so booking module can reset/trigger recalculation
    window.PetShop = window.PetShop || {};
    window.PetShop.calculateTotal = calculateTotal;
    window.PetShop.resetCoupon = () => { appliedCoupon = null; };

    // Attach event listeners to all calculator inputs
    if (bookingForm) {
        bookingForm.querySelectorAll('input[name="pet-type"], input[name="pet-size"], input[name="calc-service"], input[name="service-freq"]').forEach(input => {
            input.addEventListener('change', calculateTotal);
        });

        // Coupon Application Event Listeners
        const btnApplyCoupon = document.getElementById('btn-apply-coupon');
        const couponCodeInput = document.getElementById('coupon-code');
        const couponFeedback = document.getElementById('coupon-feedback');

        if (btnApplyCoupon && couponCodeInput && couponFeedback) {
            btnApplyCoupon.addEventListener('click', () => {
                const enteredCode = couponCodeInput.value.trim().toUpperCase();
                
                if (!enteredCode) {
                    couponFeedback.textContent = 'Por favor, digite um cupom.';
                    couponFeedback.className = 'coupon-feedback error';
                    if (window.showToast) window.showToast('Por favor, digite um cupom.', 'error');
                    return;
                }

                if (couponCodes[enteredCode] !== undefined) {
                    appliedCoupon = enteredCode;
                    couponFeedback.textContent = `Cupom "${enteredCode}" aplicado! (${couponCodes[enteredCode] * 100}% de desconto)`;
                    couponFeedback.className = 'coupon-feedback success';
                    if (window.showToast) window.showToast(`Cupom "${enteredCode}" aplicado com sucesso!`, 'success');
                    calculateTotal();
                } else {
                    appliedCoupon = null;
                    couponFeedback.textContent = 'Cupom inválido.';
                    couponFeedback.className = 'coupon-feedback error';
                    if (window.showToast) window.showToast('Cupom inválido.', 'error');
                    calculateTotal();
                }
            });
        }
        
        // Initial sync
        calculateTotal();
    }
}
