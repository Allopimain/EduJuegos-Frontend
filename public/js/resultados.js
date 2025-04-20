vimport API_BASE_URL from "./config.js";

document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../pages/index.html";
        return;
    }

    const cargarOpciones = async () => {
        const estudiantesRes = await fetch(`${API_BASE_URL}api/estudiantes`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const actividadesRes = await fetch(`${API_BASE_URL}api/actividades`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const estudiantes = await estudiantesRes.json();
        const actividades = await actividadesRes.json();

        const selectEstudiantes = document.getElementById("id_estudiante");
        const selectActividades = document.getElementById("id_actividad");

        estudiantes.forEach(est => {
            let option = document.createElement("option");
            option.value = est.id;
            option.textContent = est.nombre;
            selectEstudiantes.appendChild(option);
        });

        actividades.forEach(act => {
            let option = document.createElement("option");
            option.value = act.id;
            option.textContent = act.titulo;
            selectActividades.appendChild(option);
        });
    };

    const cargarResultados = async () => {
        const response = await fetch(`${API_BASE_URL}api/resultados`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const resultados = await response.json();
        const tbody = document.getElementById("resultadosLista");
        tbody.innerHTML = "";

        resultados.forEach(res => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${res.id_estudiante}</td>
                <td>${res.id_actividad}</td>
                <td>${res.calificacion}</td>
                <td>${res.comentarios}</td>
                <td>
                    <button onclick="editarResultado(${res.id})" class="btn btn-warning btn-sm">✏️ Editar</button>
                    <button onclick="eliminarResultado(${res.id})" class="btn btn-danger btn-sm">🗑 Eliminar</button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    };

    document.getElementById("resultadoForm").addEventListener("submit", async (event) => {
        event.preventDefault();
        await agregarResultado(event);
    });

    window.eliminarResultado = async (id) => {
        if (confirm("¿Seguro que quieres eliminar este resultado?")) {
            await fetch(`${API_BASE_URL}api/resultados/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            cargarResultados();
        }
    };

    window.editarResultado = async (id) => {
        const response = await fetch(`${API_BASE_URL}api/resultados/${id}`, {
            headers: { "Authorization": `Bearer ${token}` }
        });

        const resultado = await response.json();
        document.getElementById("id_estudiante").value = resultado.id_estudiante;
        document.getElementById("id_actividad").value = resultado.id_actividad;
        document.getElementById("calificacion").value = resultado.calificacion;
        document.getElementById("comentarios").value = resultado.comentarios;

        const submitButton = document.querySelector('button[type="submit"]');
        submitButton.textContent = "Actualizar Resultado";
        submitButton.removeEventListener("click", agregarResultado);
        submitButton.addEventListener("click", (event) => actualizarResultado(event, id));
    };

    const actualizarResultado = async (event, id) => {
        event.preventDefault();

        const id_estudiante = document.getElementById("id_estudiante").value;
        const id_actividad = document.getElementById("id_actividad").value;
        const calificacion = document.getElementById("calificacion").value;
        const comentarios = document.getElementById("comentarios").value;

        const response = await fetch(`${API_BASE_URL}api/resultados/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id_estudiante, id_actividad, calificacion, comentarios })
        });

        if (response.ok) {
            cargarResultados();
            document.getElementById("resultadoForm").reset();
            const submitButton = document.querySelector('button[type="submit"]');
            submitButton.textContent = "Asignar Calificación";
            submitButton.removeEventListener("click", actualizarResultado);
            submitButton.addEventListener("click", agregarResultado);
        }
    };

    const agregarResultado = async (event) => {
        event.preventDefault();

        const id_estudiante = document.getElementById("id_estudiante").value;
        const id_actividad = document.getElementById("id_actividad").value;
        const calificacion = document.getElementById("calificacion").value;
        const comentarios = document.getElementById("comentarios").value;

        const response = await fetch(`${API_BASE_URL}api/resultados`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ id_estudiante, id_actividad, calificacion, comentarios })
        });

        if (response.ok) {
            cargarResultados();
            document.getElementById("resultadoForm").reset();
        }
    };

    await cargarOpciones();
    cargarResultados();
});

