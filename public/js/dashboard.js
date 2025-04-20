// js/dashboard.js
import API_BASE_URL from './config.js';

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Si no hay token, volvemos al inicio
    window.location.href = "/";
    return;
  }

  // Obtener perfil del docente desde tu backend en Railway
  fetch(`${API_BASE_URL}api/auth/perfil`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.error || data.mensaje === "Token inválido") {
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      document.getElementById("docenteNombre").innerText = data.nombre;
    }
  })
  .catch(err => {
    console.error("Error al obtener perfil:", err);
    // En caso de fallo, forzamos logout
    localStorage.removeItem("token");
    window.location.href = "/";
  });

  // Botón Cerrar Sesión
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  });
});

