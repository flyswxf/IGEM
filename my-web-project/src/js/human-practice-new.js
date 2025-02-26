// document.addEventListener('DOMContentLoaded', function() {
//     // 获取元素
//     const readMoreBtn = document.querySelector('.read-more-btn');
//     const modal = document.getElementById('strategy-modal');
//     const closeBtn = document.querySelector('.close-btn');

//     // 点击阅读更多按钮显示弹窗
//     if (readMoreBtn) {
//         readMoreBtn.addEventListener('click', () => {
//             modal.style.display = 'block';
//         });
//     }

//     // 点击关闭按钮隐藏弹窗
//     if (closeBtn) {
//         closeBtn.addEventListener('click', () => {
//             modal.style.display = 'none';
//         });
//     }

//     // 点击模态框外部区域关闭弹窗
//     window.addEventListener('click', (event) => {
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // 通用弹窗控制函数
    function modalController() {
        const modals = document.querySelectorAll('.modal');
        
        // 按钮点击事件（使用事件委托）
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.read-more-btn')) {
                const btn = e.target.closest('.read-more-btn');
                const modalId = btn.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) modal.style.display = 'block';
            }
            
            if (e.target.closest('.close-btn')) {
                const closeBtn = e.target.closest('.close-btn');
                const modalId = closeBtn.dataset.modal;
                const modal = document.getElementById(modalId);
                if (modal) modal.style.display = 'none';
            }
        });

        // 外部点击关闭
        window.addEventListener('click', (e) => {
            modals.forEach(modal => {
                if (e.target === modal) modal.style.display = 'none';
            });
        });
    }

    modalController();
});