document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/index.html";
        return; // Redirigir si no hay sesión activa
    }

    // Función para cargar los estudiantes
    const cargarEstudiantes = async () => {
        const response = await fetch("http://localhost:3005/api/estudiantes", {
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

    // Función para agregar estudiante
    document.getElementById("estudianteForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const edad = document.getElementById("edad").value;
        const grado = document.getElementById("grado").value;

        // Si existe un estudiante con id, se va a actualizar, de lo contrario, es un nuevo estudiante
        const estudianteId = document.getElementById("estudianteId").value;

        let response;
        if (estudianteId) {
            // Actualizar estudiante
            response = await fetch(`http://localhost:3005/api/estudiantes/${estudianteId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ nombre, edad, grado })
            });
        } else {
            // Agregar nuevo estudiante
            response = await fetch("http://localhost:3005/api/estudiantes", {
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
            document.getElementById("estudianteId").value = ""; // Limpiar ID del estudiante
        }
    });

    // Función para eliminar estudiante
    window.eliminarEstudiante = async (id) => {
        if (confirm("¿Seguro que quieres eliminar este estudiante?")) {
            await fetch(`http://localhost:3005/api/estudiantes/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            cargarEstudiantes();
        }
    };

    // Función para editar estudiante
    window.editarEstudiante = async (id) => {
        const response = await fetch(`http://localhost:3005/api/estudiantes/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiante = await response.json();

        // Rellenar el formulario con los datos del estudiante
        document.getElementById("nombre").value = estudiante.nombre;
        document.getElementById("edad").value = estudiante.edad;
        document.getElementById("grado").value = estudiante.grado;
        document.getElementById("estudianteId").value = estudiante.id; // Agregar el ID para actualizarlo
    };

    // Función para cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../pages/index.html"; // Redirigir al login
    });

    // Cargar estudiantes al inicio
    cargarEstudiantes();
});

