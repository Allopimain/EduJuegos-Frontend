import API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/index.html";
        return;
    }

    const cargarEstudiantes = async () => {
        const response = await fetch(`${API_BASE_URL}api/estudiantes`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiantes = await response.json();
        const tbody = document.getElementById("estudiantesLista");
        tbody.innerHTML = "";

        estudiantes.forEach(est => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${est.nombre}</td>
                <td>${est.edad}</td>
                <td>${est.grado}</td>
                <td>
                    <button onclick="editarEstudiante(${est.id})" class="btn btn-warning btn-sm">✏ Editar</button>
                    <button onclick="eliminarEstudiante(${est.id})" class="btn btn-danger btn-sm">🗑 Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    };

    document.getElementById("estudianteForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const grado = document.getElementById("grado").value;
        const estudianteId = document.getElementById("estudianteId").value;

        let response;
        if (estudianteId) {
            response = await fetch(`${API_BASE_URL}api/estudiantes/${estudianteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, edad, grado })
            });
        } else {
            response = await fetch(`${API_BASE_URL}api/estudiantes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, edad, grado })
            });
        }

        if (response.ok) {
            cargarEstudiantes();
            document.getElementById("estudianteForm").reset();
            document.getElementById("estudianteId").value = "";
        }
    });

    window.eliminarEstudiante = async (id) => {
        if (confirm("¿Seguro que quieres eliminar este estudiante?")) {
            await fetch(`${API_BASE_URL}api/estudiantes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            cargarEstudiantes();
        }
    };

    window.editarEstudiante = async (id) => {
        const response = await fetch(`${API_BASE_URL}api/estudiantes/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiante = await response.json();

        document.getElementById("nombre").value = estudiante.nombre;
        document.getElementById("edad").value = estudiante.edad;
        document.getElementById("grado").value = estudiante.grado;
        document.getElementById("estudianteId").value = estudiante.id;
    };

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../pages/index.html";
    });

    cargarEstudiantes();
});
