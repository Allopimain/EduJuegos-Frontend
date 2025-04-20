document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("tokenEstudiante");

    if (!token) {
        window.location.href = "/pages/login-estudiante.html";
        return;
    }

    fetch("https://edujuegos-backend-production.up.railway.app/api/estudiantes/auth/perfil", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.mensaje === "Token inválido") {
            localStorage.removeItem("tokenEstudiante");
            window.location.href = "/pages/login-estudiante.html";
        } else {
            document.getElementById("estudianteNombre").innerText = data.nombre;
        }
    })
    .catch(error => {
        console.error("Error al obtener perfil del estudiante:", error);
        window.location.href = "/pages/login-estudiante.html";
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("tokenEstudiante");
        window.location.href = "/pages/login-estudiante.html";
    });
});
