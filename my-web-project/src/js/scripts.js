document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.content-box, .text-content, .h2');
    const navLinks = document.querySelectorAll('.sidebar ul li a');
    const sidebar = document.querySelector('.sidebar');
    const content = document.querySelector('.content');
    const contentInitialTop = content.offsetTop;

    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });

        if (scrollPosition >= contentInitialTop) {
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

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.sidebar ul li a');

    for (const link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// document.addEventListener('DOMContentLoaded', function() {
//     // 修正选择器，确保选中目标元素（假设.h2应为h2标签）
//     const sections = document.querySelectorAll('.content-box, .text-content, h2');
//     const navLinks = document.querySelectorAll('.sidebar ul li a');
//     const sidebar = document.querySelector('.sidebar');
//     const content = document.querySelector('.content');
//     // 改用侧边栏自身的位置作为参考点
//     const sidebarInitialTop = sidebar.offsetTop;
//     const contentInitialTop = content.offsetTop;

//     // 添加节流函数优化性能
//     let isScrolling;
//     window.addEventListener('scroll', function() {
//         window.clearTimeout(isScrolling);
//         isScrolling = setTimeout(() => {
//             let current = '';
//             const scrollPosition = window.scrollY;
            
//             // 使用逆向循环找到第一个符合条件的section
//             Array.from(sections).reverse().some(section => {
//                 const sectionTop = section.offsetTop;
//                 if (scrollPosition >= sectionTop - window.innerHeight * 0.2) {
//                     current = section.getAttribute('id');
//                     return true; // 找到后立即退出循环
//                 }
//                 return false;
//             });

//             // 更新导航链接状态
//             navLinks.forEach(link => {
//                 link.classList.remove('active');
//                 const href = link.getAttribute('href').substring(1);
//                 // link.classList.toggle('active', href === current);
//                 if (href.includes(current)) {
//                     link.classList.add('active');
//                 }
//             });

//             // 控制侧边栏固定状态
//             // sidebar.classList.toggle('fixed', scrollPosition >= sidebarInitialTop);
//             // sidebar.classList.toggle('visible', scrollPosition >= sidebarInitialTop);
//             if (scrollPosition >= contentInitialTop) {
//                 sidebar.classList.add('visible');
//                 sidebar.classList.add('fixed');
//             } else {
//                 sidebar.classList.remove('visible');
//                 sidebar.classList.remove('fixed');
//             }
//         }, 50);
//     }, { passive: true });

//     // 波纹效果（保持原样）
//     document.body.addEventListener('mousemove', function(e) {
//         const ripple = document.createElement('div');
//         ripple.className = 'ripple';
//         ripple.style.left = `${e.clientX}px`;
//         ripple.style.top = `${e.clientY}px`;
//         document.body.appendChild(ripple);
//         setTimeout(() => ripple.remove(), 1000);
//     });
// });

// // 平滑滚动（保持原样）
// document.addEventListener('DOMContentLoaded', function() {
//     const links = document.querySelectorAll('.sidebar ul li a');
//     links.forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const target = document.getElementById(this.hash.substring(1));
//             target && window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
//         });
//     });
// });