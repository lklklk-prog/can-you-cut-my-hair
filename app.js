/* ==========================================================================
   "can u cut my hair??" - Logic Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const questionHeading = document.getElementById('questionHeading');
    const questionStage = document.getElementById('questionStage');
    const successStage = document.getElementById('successStage');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const btnReplay = document.getElementById('btnReplay');

    let dodgeCount = 0;

    // Dodge Physics & Counter for NO button
    function dodgeNoButton(e) {
        if (e) e.preventDefault();

        dodgeCount++;

        // After trying ~5 times, append "heh" to the question!
        if (dodgeCount >= 5) {
            questionHeading.textContent = "can u cut my hair?? heh";
        }

        // Random movement across viewport
        const maxOffsetX = Math.min(window.innerWidth * 0.35, 220);
        const maxOffsetY = Math.min(window.innerHeight * 0.35, 160);

        const randomX = (Math.random() - 0.5) * maxOffsetX * 2;
        const randomY = (Math.random() - 0.5) * maxOffsetY * 2;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    btnNo.addEventListener('mouseenter', dodgeNoButton);
    btnNo.addEventListener('touchstart', dodgeNoButton);
    btnNo.addEventListener('click', dodgeNoButton);

    // YES Button Handler
    btnYes.addEventListener('click', () => {
        questionStage.classList.add('hidden');
        successStage.classList.remove('hidden');
    });

    // Reset Handler
    btnReplay.addEventListener('click', () => {
        dodgeCount = 0;
        questionHeading.textContent = "can u cut my hair??";
        btnNo.style.transform = 'translate(0, 0)';
        successStage.classList.add('hidden');
        questionStage.classList.remove('hidden');
    });
});
