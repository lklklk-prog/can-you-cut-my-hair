/* ==========================================================================
   "can u cut my hair??" - Slow Motion Yippee Confetti Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const questionHeading = document.getElementById('questionHeading');
    const questionStage = document.getElementById('questionStage');
    const successStage = document.getElementById('successStage');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnReplay = document.getElementById('btnReplay');
    const localConfettiCanvas = document.getElementById('localConfettiCanvas');
    const confettiCtx = localConfettiCanvas.getContext('2d');

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

    // YES Button Handler (Triggers Slow Motion Local Confetti Burst!)
    btnYes.addEventListener('click', () => {
        questionStage.classList.add('hidden');
        successStage.classList.remove('hidden');
        startSlowLocalConfetti();
    });

    // Reset Handler
    btnReplay.addEventListener('click', () => {
        dodgeCount = 0;
        questionHeading.textContent = "can u cut my hair??";
        btnNo.style.transform = 'translate(0, 0)';
        successStage.classList.add('hidden');
        questionStage.classList.remove('hidden');
    });

    // SLOW MOTION BIRTHDAY CONFETTI AROUND CREATURE
    function startSlowLocalConfetti() {
        const width = 220;
        const height = 220;
        localConfettiCanvas.width = width;
        localConfettiCanvas.height = height;

        const particles = [];
        const colors = [
            '#ff2d55', '#00f2fe', '#f2c94c', '#9b51e0', 
            '#27ae60', '#ff5252', '#ffeb3b', '#e91e63', '#ffffff'
        ];

        // Gentle, slow-motion confetti ribbons
        for (let i = 0; i < 30; i++) {
            particles.push({
                x: width / 2,
                y: height / 2 - 10,
                w: Math.random() * 5 + 4,
                h: Math.random() * 8 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: (Math.random() - 0.5) * 2.8,   // Slower horizontal velocity
                vy: (Math.random() - 0.65) * 3.2,  // Slower vertical pop
                angle: Math.random() * Math.PI * 2,
                vRot: (Math.random() - 0.5) * 0.08, // Slow rotation
                opacity: 1,
                decay: Math.random() * 0.006 + 0.004 // Slow fade out like video
            });
        }

        function drawSlowConfetti() {
            confettiCtx.clearRect(0, 0, width, height);
            let activeParticles = 0;

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy += 0.045; // Slow floaty gravity
                p.angle += p.vRot;
                p.opacity -= p.decay;

                if (p.opacity > 0) {
                    activeParticles++;
                    confettiCtx.save();
                    confettiCtx.translate(p.x, p.y);
                    confettiCtx.rotate(p.angle);
                    confettiCtx.fillStyle = p.color;
                    confettiCtx.globalAlpha = Math.max(0, p.opacity);
                    confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                    confettiCtx.restore();
                }
            });

            if (!successStage.classList.contains('hidden') && activeParticles > 0) {
                requestAnimationFrame(drawSlowConfetti);
            } else if (successStage.classList.contains('hidden')) {
                confettiCtx.clearRect(0, 0, width, height);
            }
        }
        drawSlowConfetti();
    }
});
