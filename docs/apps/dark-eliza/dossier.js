// Shared VHS static noise for the case-file pages (info/eliza/harvester/facts).
// Same effect as the main app's runStaticNoise(), split out so these
// standalone pages don't need to load the full chat engine.
(function runStaticNoise() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    const canvas = document.getElementById('staticNoise');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function drawNoise() {
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        const buffer = imageData.data;
        for (let i = 0; i < buffer.length; i += 4) {
            const shade = Math.random() * 255;
            buffer[i] = shade;
            buffer[i + 1] = shade;
            buffer[i + 2] = shade;
            buffer[i + 3] = 255;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function loop() {
        drawNoise();
        setTimeout(() => requestAnimationFrame(loop), 120);
    }
    loop();
})();
