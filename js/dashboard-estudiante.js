// js/dashboard-estudiante.js
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("tokenEstudiante"); // ✅ Token correcto para estudiantes

    if (!token) {
        window.location.href = "login-estudiante.html"; // ✅ Redirigir a su login si no hay token
        return;
    }

    fetch("http://localhost:3005/api/estudiantes/auth/perfil", {
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
            window.location.href = "login-estudiante.html";
        } else {
            document.getElementById("estudianteNombre").innerText = data.nombre;
        }
    })
    .catch(error => {
        console.error("Error al obtener perfil del estudiante:", error);
        window.location.href = "login-estudiante.html";
    });

    // 🔐 Cerrar sesión limpiamente
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("tokenEstudiante"); // ✅ Borrar token correcto
        window.location.href = "login-estudiante.html";
    });
});
