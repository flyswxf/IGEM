document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const readMoreBtn = document.querySelector('.read-more-btn');
    const modal = document.getElementById('strategy-modal');
    const closeBtn = document.querySelector('.close-btn');

    // 点击阅读更多按钮显示弹窗
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    // 点击关闭按钮隐藏弹窗
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // 点击模态框外部区域关闭弹窗
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});