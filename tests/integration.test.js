/* ==========================================================================
   INTEGRATION TESTS - MOCHA & CHAI (INTEGRATION.TEST.JS)
   ========================================================================== */
describe('🐾 Testes de Integração da Landing Page', function() {
    let iframe, iframeDoc, iframeWin;

    // Before running tests, get iframe hooks
    before(function(done) {
        iframe = document.getElementById('app-iframe');
        iframeWin = iframe.contentWindow;
        iframeDoc = iframe.contentDocument || iframeWin.document;
        
        // Ensure iframe window and DOM are loaded
        if (iframeWin.document.readyState === 'complete') {
            done();
        } else {
            iframe.addEventListener('load', () => {
                iframeDoc = iframe.contentDocument || iframeWin.document;
                done();
            });
        }
    });

    // Reset simulator between tests to guarantee clean states
    beforeEach(function() {
        if (iframeWin.PetShop && iframeWin.PetShop.resetCoupon) {
            iframeWin.PetShop.resetCoupon();
        }
        const form = iframeDoc.getElementById('booking-form');
        if (form) {
            form.reset();
        }
        // Set defaults
        const dogInput = iframeDoc.querySelector('input[name="pet-type"][value="dog"]');
        const smallInput = iframeDoc.querySelector('input[name="pet-size"][value="small"]');
        if (dogInput) dogInput.click();
        if (smallInput) smallInput.click();
        
        // Deselect all services
        iframeDoc.querySelectorAll('input[name="calc-service"]').forEach(cb => cb.checked = false);
        
        if (iframeWin.PetShop && iframeWin.PetShop.calculateTotal) {
            iframeWin.PetShop.calculateTotal();
        }
    });

    describe('🧮 Simulador de Preço e Serviços', function() {
        it('Deve iniciar com o valor total em zero quando nenhum serviço for escolhido', function() {
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('0');
        });

        it('Deve somar corretamente o preço base de cão pequeno ao selecionar serviços', function() {
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // clicks Banho (Cão pequeno base: R$ 60)
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('60');
        });

        it('Deve alterar o preço base de forma dinâmica ao alternar para gato e porte grande', function() {
            const catRadio = iframeDoc.querySelector('input[name="pet-type"][value="cat"]');
            const largeRadio = iframeDoc.querySelector('input[name="pet-size"][value="large"]');
            catRadio.click();
            largeRadio.click();
            
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // clicks Banho (Gato grande base: R$ 105)
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('105');
        });

        it('Deve aplicar o desconto de frequência semanal de 10%', function() {
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // R$ 60
            
            const weeklyRadio = iframeDoc.querySelector('input[name="service-freq"][value="weekly"]');
            weeklyRadio.click(); // 10% discount on R$ 60 = R$ 6
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('54'); // 60 - 6 = 54
        });
    });

    describe('🏷️ Validação de Regras de Cupons', function() {
        it('Deve aplicar com sucesso o cupom PRIMEIRO10 ao selecionar Banho', function() {
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // R$ 60
            
            const couponInput = iframeDoc.getElementById('coupon-code');
            const applyButton = iframeDoc.getElementById('btn-apply-coupon');
            
            couponInput.value = 'PRIMEIRO10';
            applyButton.click(); // Applies 10% discount (R$ 60 - 10% = R$ 54)
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('54');
        });

        it('Deve rejeitar cupom PRIMEIRO10 caso nenhum serviço de banho ou tosa esteja selecionado', function() {
            const unhaCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="unha"]');
            unhaCheckbox.click(); // R$ 15 (Corte de Unhas)
            
            const couponInput = iframeDoc.getElementById('coupon-code');
            const applyButton = iframeDoc.getElementById('btn-apply-coupon');
            
            couponInput.value = 'PRIMEIRO10';
            applyButton.click(); // Should reject because PRIMEIRO10 requires banho or tosa
            
            const feedback = iframeDoc.getElementById('coupon-feedback');
            expect(feedback.className).to.contain('error');
            expect(feedback.textContent).to.contain('requer serviço de Banho ou Tosa');
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('15'); // Remains R$ 15 without discount
        });

        it('Deve rejeitar o cupom PETLOVE15 se o valor total for inferior a R$ 150', function() {
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // R$ 60
            
            const couponInput = iframeDoc.getElementById('coupon-code');
            const applyButton = iframeDoc.getElementById('btn-apply-coupon');
            
            couponInput.value = 'PETLOVE15';
            applyButton.click(); // Should reject because R$ 60 < R$ 150
            
            const feedback = iframeDoc.getElementById('coupon-feedback');
            expect(feedback.className).to.contain('error');
            expect(feedback.textContent).to.contain('exige valor mínimo de R$ 150');
        });

        it('Deve aplicar com sucesso o cupom PETLOVE15 se o valor total for igual ou superior a R$ 150', function() {
            // Select all services to exceed R$ 150
            iframeDoc.querySelectorAll('input[name="calc-service"]').forEach(cb => cb.click());
            // Cão pequeno base: banho (60) + tosa (30) + hidra (25) + unha (15) + consulta (120) = R$ 250
            
            const couponInput = iframeDoc.getElementById('coupon-code');
            const applyButton = iframeDoc.getElementById('btn-apply-coupon');
            
            couponInput.value = 'PETLOVE15';
            applyButton.click(); // 15% discount on R$ 250 = R$ 38. Total should be 250 - 38 = R$ 212
            
            const totalVal = iframeDoc.getElementById('calc-total').textContent;
            expect(totalVal).to.equal('212');
        });
    });

    describe('🌙 Funcionalidade de Dark / Light Mode', function() {
        it('Deve alternar o tema do documento HTML ao clicar no botão de tema', function() {
            const themeBtn = iframeDoc.getElementById('theme-toggle');
            const initialTheme = iframeDoc.documentElement.getAttribute('data-theme');
            
            themeBtn.click();
            const toggledTheme = iframeDoc.documentElement.getAttribute('data-theme');
            expect(toggledTheme).to.not.equal(initialTheme);
            
            themeBtn.click(); // toggle back
            const restoredTheme = iframeDoc.documentElement.getAttribute('data-theme');
            expect(restoredTheme).to.equal(initialTheme);
        });
    });

    describe('🎥 Monitor CCTV de Câmeras ao Vivo', function() {
        it('Deve alterar o atributo data-cam-bg do feed ao clicar nos botões do sidebar', function() {
            const hotelBtn = iframeDoc.querySelector('.btn-cam-select[data-cam="hotel"]');
            hotelBtn.click();
            
            const liveFeed = iframeDoc.getElementById('live-cam-feed');
            expect(liveFeed.getAttribute('data-cam-bg')).to.equal('hotel');
        });
    });

    describe('❓ Sanidade e Funcionamento do FAQ Accordion', function() {
        it('Deve abrir um item do FAQ e fechar os outros ao clicar', function() {
            const questions = iframeDoc.querySelectorAll('.faq-question');
            if (questions.length < 2) return;

            // Click the first question
            questions[0].click();
            expect(questions[0].parentElement.classList.contains('active')).to.be.true;

            // Click the second question, first one should close, second one should open
            questions[1].click();
            expect(questions[0].parentElement.classList.contains('active')).to.be.false;
            expect(questions[1].parentElement.classList.contains('active')).to.be.true;
        });
    });

    describe('📬 Sistema de Toast Notifications', function() {
        it('Deve instanciar um container de toasts e adicionar o toast na tela', function() {
            iframeWin.showToast('Testando notificação', 'success');
            
            const toastContainer = iframeDoc.getElementById('toast-container');
            expect(toastContainer).to.not.be.null;
            
            const toast = toastContainer.querySelector('.toast-success');
            expect(toast).to.not.be.null;
            expect(toast.textContent).to.contain('Testando notificação');
        });
    });

    describe('📋 Fluxo de Agendamento (Booking Form e Modal de Sucesso)', function() {
        it('Deve preencher os dados do formulário, enviar e exibir o modal com os dados corretos', function() {
            const banhoCheckbox = iframeDoc.querySelector('input[name="calc-service"][value="banho"]');
            banhoCheckbox.click(); // R$ 60

            iframeDoc.getElementById('tut-name').value = 'John Doe';
            iframeDoc.getElementById('pet-name').value = 'Rex';
            iframeDoc.getElementById('tut-phone').value = '(11) 99999-9999';
            iframeDoc.getElementById('tut-date').value = '2026-06-30';

            const form = iframeDoc.getElementById('booking-form');
            form.dispatchEvent(new iframeWin.Event('submit'));

            const successModal = iframeDoc.getElementById('success-modal');
            expect(successModal.classList.contains('open')).to.be.true;

            expect(iframeDoc.getElementById('modal-tut-name').textContent).to.equal('John Doe');
            expect(iframeDoc.getElementById('modal-pet-name').textContent).to.equal('Rex');
            expect(iframeDoc.getElementById('modal-phone').textContent).to.equal('(11) 99999-9999');
            expect(iframeDoc.getElementById('modal-date').textContent).to.equal('30/06/2026');
            expect(iframeDoc.getElementById('modal-summary-total').textContent).to.equal('R$ 60,00');

            const closeBtn = iframeDoc.getElementById('btn-close-modal');
            closeBtn.click();
            expect(successModal.classList.contains('open')).to.be.false;
        });
    });
});
