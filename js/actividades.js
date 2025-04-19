import API_BASE_URL from './config.js';

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "../pages/index.html";
    return;
  }

  // Función para cargar actividades
  const cargarActividades = async () => {
    const response = await fetch(`${API_BASE_URL}api/actividades`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const actividades = await response.json();
    const tbody = document.getElementById("actividadesLista");
    tbody.innerHTML = "";

    actividades.forEach(act => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${act.titulo}</td>
        <td>${act.descripcion}</td>
        <td>${act.fecha_inicio}</td>
        <td>${act.fecha_fin}</td>
        <td>
          <button onclick="editarActividad(${act.id})" class="btn btn-warning btn-sm">✏️ Editar</button>
          <button onclick="eliminarActividad(${act.id})" class="btn btn-danger btn-sm">🗑 Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  };

  // Función para editar actividad
  window.editarActividad = async (id) => {
    const response = await fetch(`${API_BASE_URL}api/actividades/${id}`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const actividad = await response.json();

    document.getElementById("titulo").value = actividad.titulo;
    document.getElementById("descripcion").value = actividad.descripcion;
    document.getElementById("fecha_inicio").value = actividad.fecha_inicio;
    document.getElementById("fecha_fin").value = actividad.fecha_fin;

    const btnSubmit = document.querySelector("#actividadForm button[type='submit']");
    btnSubmit.textContent = "Actualizar Actividad";
    document.getElementById("actividadForm").dataset.id = actividad.id;
  };

  // Agregar o actualizar actividad
  document.getElementById("actividadForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descripcion = document.getElementById("descripcion").value;
    const fecha_inicio = document.getElementById("fecha_inicio").value;
    const fecha_fin = document.getElementById("fecha_fin").value;
    const id = document.getElementById("actividadForm").dataset.id;

    let url = `${API_BASE_URL}api/actividades`;
    let method = "POST";

    if (id) {
      url = `${API_BASE_URL}api/actividades/${id}`;
      method = "PUT";
    }

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ titulo, descripcion, fecha_inicio, fecha_fin })
    });

    if (response.ok) {
      cargarActividades();
      document.getElementById("actividadForm").reset();
      document.getElementById("actividadForm").removeAttribute("data-id");
      document.querySelector("#actividadForm button[type='submit']").textContent = "Agregar Actividad";
    }
  });

  // Eliminar actividad
  window.eliminarActividad = async (id) => {
    if (confirm("¿Seguro que quieres eliminar esta actividad?")) {
      await fetch(`${API_BASE_URL}api/actividades/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      cargarActividades();
    }
  };

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../pages/index.html";
  });

  // Carga inicial
  cargarActividades();
});
