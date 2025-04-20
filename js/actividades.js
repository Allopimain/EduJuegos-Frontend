document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/index.html"; // Redirigir al login si no hay token
        return;
    }

    // Función para cargar las actividades
    const cargarActividades = async () => {
        const response = await fetch("http://localhost:3005/api/actividades", {
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
        const response = await fetch(`http://localhost:3005/api/actividades/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const actividad = await response.json();

        // Rellenamos el formulario con los datos de la actividad
        document.getElementById("titulo").value = actividad.titulo;
        document.getElementById("descripcion").value = actividad.descripcion;
        document.getElementById("fecha_inicio").value = actividad.fecha_inicio;
        document.getElementById("fecha_fin").value = actividad.fecha_fin;

        // Cambiamos el botón para que guarde los cambios
        const btnSubmit = document.querySelector("#actividadForm button[type='submit']");
        btnSubmit.textContent = "Actualizar Actividad";

        // Establecer el id de la actividad a actualizar
        document.getElementById("actividadForm").dataset.id = actividad.id;
    };

    // Función para agregar o actualizar actividad
    document.getElementById("actividadForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const descripcion = document.getElementById("descripcion").value;
        const fecha_inicio = document.getElementById("fecha_inicio").value;
        const fecha_fin = document.getElementById("fecha_fin").value;

        const id = document.getElementById("actividadForm").dataset.id; // Obtener id de la actividad

        let response;
        if (id) {
            // Si hay un id, significa que estamos actualizando una actividad
            response = await fetch(`http://localhost:3005/api/actividades/${id}`, {
                method: "PUT", // Usamos PUT para actualizar
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ titulo, descripcion, fecha_inicio, fecha_fin })
            });
        } else {
            // Si no hay id, estamos agregando una nueva actividad
            response = await fetch("http://localhost:3005/api/actividades", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ titulo, descripcion, fecha_inicio, fecha_fin })
            });
        }

        if (response.ok) {
            cargarActividades(); // Recargar las actividades
            document.getElementById("actividadForm").reset(); // Resetear el formulario
            document.getElementById("actividadForm").removeAttribute("data-id"); // Limpiar el id

            const btnSubmit = document.querySelector("#actividadForm button[type='submit']");
            btnSubmit.textContent = "Agregar Actividad"; // Cambiar el texto del botón de vuelta a "Agregar"
        }
    });

    // Función para eliminar actividad
    window.eliminarActividad = async (id) => {
        if (confirm("¿Seguro que quieres eliminar esta actividad?")) {
            await fetch(`http://localhost:3005/api/actividades/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            cargarActividades();
        }
    };

    // Función para cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token"); // Eliminar token
        window.location.href = "../pages/index.html"; // Redirigir al login correcto
    });

    // Cargar actividades al inicio
    cargarActividades();
});
