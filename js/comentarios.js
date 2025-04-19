import API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/index.html";
        return;
    }

    // Cargar estudiantes en el select
    const cargarEstudiantes = async () => {
        const response = await fetch(`${API_BASE_URL}api/estudiantes`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiantes = await response.json();
        const selectEstudiantes = document.getElementById("id_estudiante");

        estudiantes.forEach(est => {
            let option = document.createElement("option");
            option.value = est.id;
            option.textContent = est.nombre;
            selectEstudiantes.appendChild(option);
        });
    };

    // Cargar los comentarios
    const cargarComentarios = async () => {
        const responseComentarios = await fetch(`${API_BASE_URL}api/comentarios`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const comentarios = await responseComentarios.json();
        const tbody = document.getElementById("comentariosLista");
        tbody.innerHTML = "";

        const responseEstudiantes = await fetch(`${API_BASE_URL}api/estudiantes`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiantes = await responseEstudiantes.json();

        comentarios.forEach(com => {
            const estudiante = estudiantes.find(est => est.id === com.id_estudiante);
            const nombreEstudiante = estudiante ? estudiante.nombre : "Desconocido";

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${nombreEstudiante}</td>  
                <td>${com.mensaje}</td>
                <td>
                    <button onclick="eliminarComentario(${com.id})" class="btn btn-danger btn-sm">🗑 Eliminar</button>
                    <button onclick="editarComentario(${com.id})" class="btn btn-warning btn-sm">✏ Editar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    };

    // Agregar comentario
    document.getElementById("comentarioForm").addEventListener("submit", async (event) => {
        event.preventDefault();

        const id_estudiante = document.getElementById("id_estudiante").value;
        const mensaje = document.getElementById("mensaje").value;

        const response = await fetch(`${API_BASE_URL}api/comentarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id_estudiante, mensaje })
        });

        if (response.ok) {
            cargarComentarios();
            document.getElementById("comentarioForm").reset();
        }
    });

    // Eliminar comentario
    window.eliminarComentario = async (id) => {
        if (confirm("¿Seguro que quieres eliminar este comentario?")) {
            await fetch(`${API_BASE_URL}api/comentarios/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            cargarComentarios();
        }
    };

    // Editar comentario
    window.editarComentario = (id) => {
        const comentario = document.querySelector(`button[onclick="editarComentario(${id})"]`).closest('tr');
        const mensaje = comentario.cells[1].innerText;

        document.getElementById("editComentarioForm").classList.remove("d-none");
        document.getElementById("comentarioForm").classList.add("d-none");

        document.getElementById("editMensaje").value = mensaje;

        document.getElementById("editComentarioForm").addEventListener("submit", async (event) => {
            event.preventDefault();

            const nuevoMensaje = document.getElementById("editMensaje").value;

            const response = await fetch(`${API_BASE_URL}api/comentarios/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ mensaje: nuevoMensaje })
            });

            if (response.ok) {
                cargarComentarios();
                document.getElementById("editComentarioForm").classList.add("d-none");
                document.getElementById("comentarioForm").classList.remove("d-none");
            }
        });
    };

    await cargarEstudiantes();
    cargarComentarios();
});
