document.querySelectorAll('.flip-btn').forEach(btn => {
    const frame = btn.closest('.frame');
    const frontFace = frame.querySelector('.face[data-face="front"]');
    const backFace = frame.querySelector('.face[data-face="back"]');
    const labelFront = btn.dataset.labelFront || '↷ VIEW GRADES';
    const labelBack = btn.dataset.labelBack || '↶ VIEW DIPLOMA';

    btn.addEventListener('click', () => {
        const showingBack = backFace.classList.contains('is-active');
        frontFace.classList.toggle('is-active', showingBack);
        backFace.classList.toggle('is-active', !showingBack);
        btn.textContent = showingBack ? labelFront : labelBack;
    });
});
