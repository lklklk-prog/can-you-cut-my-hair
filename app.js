/* ==========================================================================
   "can u cut my hair??" - Super Fast Dodge & Yippee Sparks Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const questionHeading = document.getElementById('questionHeading');
    const questionStage = document.getElementById('questionStage');
    const successStage = document.getElementById('successStage');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnReplay = document.getElementById('btnReplay');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');

    let dodgeCount = 0;

    // Super Fast & Wide Dodge Physics for NO Button
    function dodgeNoButton(e) {
        if (e) e.preventDefault();

        dodgeCount++;

        if (dodgeCount >= 5) {
            questionHeading.textContent = "can u cut my hair?? heh";
        }

        // Extremely wide dodge range across screen
        const maxOffsetX = Math.min(window.innerWidth * 0.42, 320);
        const maxOffsetY = Math.min(window.innerHeight * 0.4, 220);

        const randomX = (Math.random() - 0.5) * maxOffsetX * 2;
        const randomY = (Math.random() - 0.5) * maxOffsetY * 2;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', dodgeNoButton);
    btnNo.addEventListener('mousemove', dodgeNoButton);
    btnNo.addEventListener('click', dodgeNoButton);

    // YES Button Handler (Triggers Colorful Sparks Explosion!)
    btnYes.addEventListener('click', () => {
        questionStage.classList.add('hidden');
        successStage.classList.remove('hidden');
        startColorSparks();
    });

    // Reset Handler
    btnReplay.addEventListener('click', () => {
        dodgeCount = 0;
        questionHeading.textContent = "can u cut my hair??";
        btnNo.style.transform = 'translate(0, 0)';
        successStage.classList.add('hidden');
        questionStage.classList.remove('hidden');
    });

    // COLORFUL SPARKS PARTICLES SYSTEM
    function startColorSparks() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff2d55', '#00f2fe', '#f2c94c', '#9b51e0', '#27ae60', '#ff003c', '#ffffff'];

        for (let i = 0; i < 95; i++) {
            particles.push({
                x: confettiCanvas.width / 2 + (Math.random() - 0.5) * 40,
                y: confettiCanvas.height / 2 + (Math.random() - 0.5) * 40,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 6 + 3,
                vy: (Math.random() - 0.6) * 7,
                vx: (Math.random() - 0.5) * 8,
                alpha: 1,
                decay: Math.random() * 0.015 + 0.008
            });
        }

        function drawSparks() {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            particles.forEach((p, idx) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.12; // gravity
                p.alpha -= p.decay;

                if (p.alpha > 0) {
                    confettiCtx.fillStyle = p.color;
                    confettiCtx.globalAlpha = Math.max(0, p.alpha);
                    confettiCtx.beginPath();
                    confettiCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    confettiCtx.fill();
                }
            });

            if (!successStage.classList.contains('hidden')) {
                requestAnimationFrame(drawSparks);
            } else {
                confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        drawSparks();
    }
});
