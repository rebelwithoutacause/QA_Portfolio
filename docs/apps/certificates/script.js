document.querySelectorAll('.flip-btn').forEach(btn => {
    const frame = btn.closest('.frame');
    const frontFace = frame.querySelector('.face[data-face="front"]');
    const backFace = frame.querySelector('.face[data-face="back"]');

    btn.addEventListener('click', () => {
        const showingBack = backFace.classList.contains('is-active');
        frontFace.classList.toggle('is-active', showingBack);
        backFace.classList.toggle('is-active', !showingBack);
        btn.textContent = showingBack ? '↷ VIEW GRADES' : '↶ VIEW DIPLOMA';
    });
});
