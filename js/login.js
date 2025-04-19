import API_BASE_URL from './config.js';

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    try {
        const response = await fetch(`${API_BASE_URL}api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = data.mensaje || 'Credenciales incorrectas';
            loginError.classList.remove('d-none');
        }
    } catch (error) {
        loginError.textContent = 'Error de conexión';
        loginError.classList.remove('d-none');
    }
});

