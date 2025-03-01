const heroSection = document.getElementById('heroSection');
const overlayCon = document.getElementById('overlayCon');
const overlayBtn = document.getElementById('overlayBtn');

overlayBtn.addEventListener('click', () => {
    heroSection.classList.toggle('right-panel-active');

    overlayBtn.classList.remove('btnScaled');
    window.requestAnimationFrame( () => {
        overlayBtn.classList.add ('btnScaled')
    })
});
