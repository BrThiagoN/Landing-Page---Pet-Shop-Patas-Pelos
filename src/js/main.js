/* ==========================================================================
   MAIN JAVASCRIPT ENTRY POINT (MAIN.JS)
   ========================================================================== */
import { initToast } from './modules/toast.js';
import { initTheme } from './modules/theme.js';
import { initNavigation } from './modules/navigation.js';
import { initCalculator } from './modules/calculator.js';
import { initStats } from './modules/stats.js';
import { initBooking } from './modules/booking.js';
import { initLiveCamera } from './modules/live-camera.js';
import { initContact } from './modules/contact.js';
import { initFaq } from './modules/faq.js';
import { initReveal } from './modules/reveal.js';

// Setup DOM listener
document.addEventListener('DOMContentLoaded', () => {
    initToast();
    initTheme();
    initNavigation();
    initCalculator();
    initStats();
    initBooking();
    initLiveCamera();
    initContact();
    initFaq();
    initReveal();
});
