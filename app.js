/* ==========================================================================
   "can u cut my hair??" - Birthday Party Confetti & Yippee Script
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

    // YES Button Handler (Triggers Birthday Confetti Ribbon Burst!)
    btnYes.addEventListener('click', () => {
        questionStage.classList.add('hidden');
        successStage.classList.remove('hidden');
        startBirthdayConfetti();
    });

    // Reset Handler
    btnReplay.addEventListener('click', () => {
        dodgeCount = 0;
        questionHeading.textContent = "can u cut my hair??";
        btnNo.style.transform = 'translate(0, 0)';
        successStage.classList.add('hidden');
        questionStage.classList.remove('hidden');
    });

    // BIRTHDAY PARTY RECTANGULAR CONFETTI SYSTEM
    function startBirthdayConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particles = [];
        const colors = [
            '#ff2d55', '#00f2fe', '#f2c94c', '#9b51e0', 
            '#27ae60', '#ff5252', '#ffeb3b', '#e91e63', '#ffffff'
        ];

        for (let i = 0; i < 110; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                w: Math.random() * 8 + 6,   // Rectangular width
                h: Math.random() * 14 + 8,  // Rectangular height
                color: colors[Math.floor(Math.random() * colors.length)],
                vy: Math.random() * 3 + 2,
                vx: (Math.random() - 0.5) * 3,
                angle: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.15,
                opacity: 1
            });
        }

        function drawConfetti() {
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            particles.forEach((p) => {
                p.y += p.vy;
                p.x += p.vx;
                p.angle += p.vRot;

                if (p.y > confettiCanvas.height) {
                    p.y = -20;
                    p.x = Math.random() * confettiCanvas.width;
                }

                confettiCtx.save();
                confettiCtx.translate(p.x, p.y);
                confettiCtx.rotate(p.angle);
                confettiCtx.fillStyle = p.color;
                confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                confettiCtx.restore();
            });

            if (!successStage.classList.contains('hidden')) {
                requestAnimationFrame(drawConfetti);
            } else {
                confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            }
        }
        drawConfetti();
    }
});
