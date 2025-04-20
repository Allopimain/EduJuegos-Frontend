document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('loginError');

    console.log('🔵 Enviando datos al backend (docente):', { email, password });

    try {
        const response = await fetch('https://edujuegos-backend-production.up.railway.app/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log('🟣 Respuesta recibida (docente):', response);

        const data = await response.json();
        console.log('🟢 Datos parseados (docente):', data);

        if (response.ok) {
            localStorage.setItem('token', data.token);
            console.log('✅ Token guardado. Redirigiendo al dashboard docente.');
            window.location.href = 'dashboard.html';
        } else {
            loginError.textContent = data.mensaje;
            loginError.classList.remove('d-none');
            console.warn('⚠️ Login fallido (docente):', data.mensaje);
        }
    } catch (error) {
        loginError.textContent = 'Error de conexión';
        loginError.classList.remove('d-none');
        console.error('❌ Error de conexión (docente):', error);
    }
});
