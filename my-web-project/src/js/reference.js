// Show all references functionality
const showAllButton = document.getElementById('show-all-references');
showAllButton.addEventListener('click', function() {
    const hiddenReferences = document.querySelectorAll('.references-list .hidden, .reference-link .hidden');
    hiddenReferences.forEach(reference => {
        reference.classList.remove('hidden');
        reference.classList.add('show');
    });

    // 移除模糊效果
    const blurredReferences = document.querySelectorAll('.references-list .blurred, .references-list .heavy-blurred');
    blurredReferences.forEach(reference => {
        reference.classList.remove('blurred');
        reference.classList.remove('heavy-blurred');
    });

    showAllButton.style.display = 'none';
});