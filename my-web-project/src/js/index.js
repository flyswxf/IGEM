// window.addEventListener('scroll', function() {
//     const image = document.querySelector('.scrolling-image');
//     const scrollPosition = window.scrollY;
//     image.style.transform = `translateY(-${scrollPosition * 1}px)`;
// });

window.addEventListener('scroll', function() {
    const image = document.querySelector('.scrolling-image');
    const overlayText = document.querySelector('.overlay-text');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const overlayTextRect = overlayText.getBoundingClientRect();
    const offset = 300; // 调整这个值来控制显示的偏移量

    image.style.transform = `translateY(-${scrollPosition * 1}px)`;

    if (overlayTextRect.top < windowHeight - offset && overlayTextRect.bottom-offset > 0) {
        overlayText.classList.add('visible');
    } else {
        overlayText.classList.remove('visible');
    }
});

