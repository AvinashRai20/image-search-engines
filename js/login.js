document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'imageseaechingEngine.html';
        return;
    }

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'imageseaechingEngine.html';
    });
});
