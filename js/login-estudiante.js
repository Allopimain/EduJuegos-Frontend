document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById('formLoginEstudiante');

  formulario.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

      console.log('🔵 Enviando datos al backend (estudiante):', { email, password });

      try {
          const res = await fetch('https://edujuegos-backend-production.up.railway.app/api/estudiantes/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          console.log('🟣 Respuesta recibida (estudiante):', res);

          const data = await res.json();
          console.log('🟢 Datos parseados (estudiante):', data);

          if (res.ok) {
              localStorage.setItem('tokenEstudiante', data.token);
              console.log('✅ Token guardado. Redirigiendo al dashboard estudiante.');
              alert('Login exitoso');
              window.location.href = "dashboard-estudiante.html";
          } else {
              console.warn('⚠️ Login fallido (estudiante):', data.mensaje);
              alert(data.mensaje || 'Error al iniciar sesión');
          }
      } catch (error) {
          console.error('❌ Error de conexión (estudiante):', error);
          alert('Error de conexión con el servidor');
      }
  });
});


  