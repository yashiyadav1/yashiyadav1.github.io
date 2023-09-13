function changeBackground() {
    document.body.classList.add('hovered-bg');
}

function resetBackground() {
    document.body.classList.remove('hovered-bg');
}

function navigateTo(page) {
    window.location.href = page;
}
