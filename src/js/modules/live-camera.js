/* ==========================================================================
   LIVE CAM SIMULATOR (LIVE-CAMERA.JS)
   ========================================================================== */
export function initLiveCamera() {
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
            if (window.showToast) window.showToast('Conectando às câmeras ao vivo...', 'info');
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
                if (window.showToast) window.showToast(`Alternando para ${btn.textContent.trim()}...`, 'info');
            }
        });
    });
}
