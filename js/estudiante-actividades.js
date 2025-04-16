// js/estudiante-actividades.js
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("tokenEstudiante");

  if (!token) {
    return window.location.href = "login-estudiante.html";
  }

  fetch("http://localhost:3005/api/estudiante/actividades", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("actividadesContainer");
    if (data.length === 0) {
      contenedor.innerHTML = `<p class="text-center">No tienes actividades asignadas aún.</p>`;
      return;
    }

    data.forEach(act => {
      const card = document.createElement("div");
      card.className = "col-md-6 mb-4";
      card.innerHTML = `
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">${act.titulo}</h5>
            <p class="card-text">${act.descripcion}</p>
            <p class="card-text"><strong>Inicio:</strong> ${act.fecha_inicio.split('T')[0]}</p>
            <p class="card-text"><strong>Fin:</strong> ${act.fecha_fin.split('T')[0]}</p>
          </div>
        </div>
      `;
      contenedor.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error al cargar actividades", error);
    alert("Ocurrió un error al obtener las actividades.");
  });
});
