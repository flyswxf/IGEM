document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-box');
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const contentInitialTop = content.offsetTop;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (window.pageYOffset >= contentInitialTop) {
            sidebar.classList.add('visible');
            sidebar.classList.add('fixed');
        } else {
            sidebar.classList.remove('visible');
            sidebar.classList.remove('fixed');
        }
    });

    document.body.addEventListener('mousemove', function(e) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });

    
    
});