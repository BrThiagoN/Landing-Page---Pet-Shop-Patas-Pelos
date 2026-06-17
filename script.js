document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       TOAST NOTIFICATION SYSTEM
       ========================================================================== */
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

    /* ==========================================================================
       THEME TOGGLE (DARK MODE)
       ========================================================================== */
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
            showToast(`Modo ${newTheme === 'dark' ? 'Escuro' : 'Claro'} ativado!`, 'info');
        });
    }

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER ON SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       DYNAMIC PRICING CALCULATOR
       ========================================================================== */
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

        // Update individual price labels on screen dynamically based on current pet type & size
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

        // Animate price total transition in DOM
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

    // Attach event listeners to all calculator interactive inputs
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
                    showToast('Por favor, digite um cupom.', 'error');
                    return;
                }

                if (couponCodes[enteredCode] !== undefined) {
                    appliedCoupon = enteredCode;
                    couponFeedback.textContent = `Cupom "${enteredCode}" aplicado! (${couponCodes[enteredCode] * 100}% de desconto)`;
                    couponFeedback.className = 'coupon-feedback success';
                    showToast(`Cupom "${enteredCode}" aplicado com sucesso!`, 'success');
                    calculateTotal();
                } else {
                    appliedCoupon = null;
                    couponFeedback.textContent = 'Cupom inválido.';
                    couponFeedback.className = 'coupon-feedback error';
                    showToast('Cupom inválido.', 'error');
                    calculateTotal();
                }
            });
        }
        
        // Initial invocation to sync defaults
        calculateTotal();
    }

    /* ==========================================================================
       STATS COUNTER ANIMATION
       ========================================================================== */
    const stats = document.querySelectorAll('.stat-number');
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

    /* ==========================================================================
       SCROLL HIGHLIGHT ACTIVE NAV LINK
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    });

    /* ==========================================================================
       BOOKING FORM SUBMISSION & SUCCESS DIALOG
       ========================================================================== */
    const successModal = document.getElementById('success-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    
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
            document.getElementById('modal-summary-total').textContent = `R$ ${calcTotal.textContent},00`;

            // Display success modal
            successModal.classList.add('open');
            showToast('Agendamento pré-registrado com sucesso!', 'success');
        });

        // Close modal listener
        if (btnCloseModal) {
            btnCloseModal.addEventListener('click', () => {
                successModal.classList.remove('open');
                bookingForm.reset(); // reset form back to default state
                appliedCoupon = null;
                const couponFeedback = document.getElementById('coupon-feedback');
                const couponCodeInput = document.getElementById('coupon-code');
                if (couponFeedback) couponFeedback.textContent = '';
                if (couponCodeInput) couponCodeInput.value = '';
                calculateTotal(); // reset calculations back to initial small dog banho
            });
        }

        // Close modal when clicking outside the dialog card
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('open');
                bookingForm.reset();
                appliedCoupon = null;
                const couponFeedback = document.getElementById('coupon-feedback');
                const couponCodeInput = document.getElementById('coupon-code');
                if (couponFeedback) couponFeedback.textContent = '';
                if (couponCodeInput) couponCodeInput.value = '';
                calculateTotal();
            }
        });
    }

    /* ==========================================================================
       FAQ ACCORDION
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items for a clean single-accordion behavior
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       LIVE CAM SIMULATOR
       ========================================================================== */
    const liveCamModal = document.getElementById('live-cam-modal');
    const btnOpenCameras = document.getElementById('btn-open-cameras');
    const btnCloseLiveCam = document.getElementById('btn-close-live-cam');
    const btnCamSelects = document.querySelectorAll('.btn-cam-select');
    const liveCamFeed = document.getElementById('live-cam-feed');
    const cctvTitle = document.getElementById('cctv-title');
    const cctvClock = document.getElementById('cctv-clock');
    let cctvInterval = null;

    const camMetadata = {
        recreacao: { title: '🔴 REC-01 [SALÃO DE RECREAÇÃO]', bg: 'recreacao' },
        banho: { title: '🔴 EST-02 [SALA DE ESTÉTICA & BANHO]', bg: 'banho' },
        hotel: { title: '🔴 HTL-03 [SUÍTES DO HOTEL]', bg: 'hotel' }
    };

    function startCCTVClock() {
        if (cctvInterval) clearInterval(cctvInterval);
        
        const updateTime = () => {
            const now = new Date();
            const pad = (n) => String(n).padStart(2, '0');
            const dateStr = `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`;
            const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
            if (cctvClock) {
                cctvClock.textContent = `${dateStr} ${timeStr}`;
            }
        };
        updateTime();
        cctvInterval = setInterval(updateTime, 1000);
    }

    if (btnOpenCameras && liveCamModal) {
        btnOpenCameras.addEventListener('click', () => {
            liveCamModal.classList.add('open');
            startCCTVClock();
            showToast('Conectando às câmeras ao vivo...', 'info');
        });
    }

    if (btnCloseLiveCam && liveCamModal) {
        btnCloseLiveCam.addEventListener('click', () => {
            liveCamModal.classList.remove('open');
            if (cctvInterval) clearInterval(cctvInterval);
        });
        
        liveCamModal.addEventListener('click', (e) => {
            if (e.target === liveCamModal) {
                liveCamModal.classList.remove('open');
                if (cctvInterval) clearInterval(cctvInterval);
            }
        });
    }

    btnCamSelects.forEach(btn => {
        btn.addEventListener('click', () => {
            btnCamSelects.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const camKey = btn.getAttribute('data-cam');
            const metadata = camMetadata[camKey];
            
            if (metadata && liveCamFeed && cctvTitle) {
                liveCamFeed.setAttribute('data-cam-bg', metadata.bg);
                cctvTitle.textContent = metadata.title;
                showToast(`Alternando para ${btn.textContent.trim()}...`, 'info');
            }
        });
    });

    /* ==========================================================================
       CONTACT FORM INTERCEPT
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        });
    }

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS
       ========================================================================== */
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
});
