document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById('formLoginEstudiante');
  
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
  
      try {
        const res = await fetch('http://localhost:3005/api/estudiantes/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
  
        const data = await res.json();
  
        if (res.ok) {
          // Guardar token en localStorage
          localStorage.setItem('tokenEstudiante', data.token);
          alert('Login exitoso');
  
          // Redirigir al dashboard del estudiante dentro de /pages/
          window.location.href = "dashboard-estudiante.html";
        } else {
          alert(data.mensaje || 'Error al iniciar sesión');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
      }
    });
  });
  