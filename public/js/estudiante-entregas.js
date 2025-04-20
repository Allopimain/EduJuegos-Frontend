import API_BASE_URL from './config.js'; // Importamos la URL de la API desde config.js

document.addEventListener("DOMContentLoaded", () => {
  // Obtenemos el formulario y el div para mostrar mensajes
  const formEntrega = document.getElementById("formEntrega");
  const mensajeDiv = document.getElementById("mensaje");

  formEntrega.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturamos los datos del formulario
    const actividadId = document.getElementById("actividadId").value.trim();
    const contenido = document.getElementById("contenido").value.trim();
    const fechaEntrega = document.getElementById("fechaEntrega").value;

    // Obtenemos el token del estudiante; 
    // Aquí es importante: si durante el login guardaste el token con la clave 'tokenEstudiante'
    const token = localStorage.getItem("tokenEstudiante");

    if (!token) {
      // Si no hay token, redirige al login-estudiante
      return window.location.href = "login-estudiante.html";
    }

    try {
      // Usamos la URL base del backend desde config.js
      const res = await fetch(`${API_BASE_URL}/api/entregas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Envía el token para autenticar
        },
        body: JSON.stringify({
          id_actividad: actividadId,
          contenido: contenido,
          fecha_entrega: fechaEntrega
        })
      });

      const data = await res.json();

      if (res.ok) {
        // Mensaje de éxito si la entrega fue registrada
        mensajeDiv.innerHTML = `<div class="alert alert-success">Entrega registrada exitosamente.</div>`;
        formEntrega.reset();
      } else {
        // Si hubo error, se muestra un mensaje adecuado
        mensajeDiv.innerHTML = `<div class="alert alert-danger">${data.mensaje || 'Error al enviar la entrega.'}</div>`;
      }
    } catch (error) {
      console.error("Error al enviar entrega:", error);
      mensajeDiv.innerHTML = `<div class="alert alert-danger">Ocurrió un error de conexión.</div>`;
    }
  });
});

  