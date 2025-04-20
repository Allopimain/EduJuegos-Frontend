import API_BASE_URL from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
  // Obtener el token del estudiante (asegúrate de haberlo guardado con la clave "tokenEstudiante")
  const token = localStorage.getItem("tokenEstudiante");

  if (!token) {
    alert("Por favor, inicia sesión primero.");
    window.location.href = "login-estudiante.html"; 
    return;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/api/estudiante/comentarios`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    const comentarios = await res.json();

    if (!res.ok) {
      throw new Error(comentarios.mensaje || "Error al obtener comentarios");
    }

    const tbody = document.getElementById("tabla-comentarios");
    tbody.innerHTML = "";

    if (comentarios.length === 0) {
      tbody.innerHTML = `<tr><td colspan="3" class="text-center">Aún no tienes comentarios.</td></tr>`;
    } else {
      comentarios.forEach(comentario => {
        // Suponiendo que el objeto comentario tiene:
        // - "nombre_docente" (o similar) para identificar al docente
        // - "mensaje" para el comentario
        // - "fecha" para el timestamp (formatearla si es necesario)
        const fila = `
          <tr>
            <td>${comentario.nombre_docente || "Desconocido"}</td>
            <td>${comentario.mensaje}</td>
            <td>${comentario.fecha ? new Date(comentario.fecha).toLocaleDateString() : "Sin fecha"}</td>
          </tr>
        `;
        tbody.innerHTML += fila;
      });
    }
  } catch (error) {
    console.error("Error al cargar comentarios:", error);
    alert("Hubo un error al cargar los comentarios.");
  }

  // Implementar la función para cerrar sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("tokenEstudiante");
    window.location.href = "login-estudiante.html";
  });
});

