document.addEventListener('DOMContentLoaded', function () {
    const signInLink = document.getElementById('signInLink');
    const signOutLink = document.getElementById('signOutLink');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (signInLink && signOutLink) {
        signInLink.style.display = isLoggedIn ? 'none' : 'inline-flex';
        signOutLink.style.display = isLoggedIn ? 'inline-flex' : 'none';
    }
});

function signOut() {
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'imageseaechingEngine.html';
}
