document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "../index.html"; // Si no hay token, redirigir a login
        return;
    }

    fetch("http://localhost:3005/api/auth/perfil", {  // ✅ Ruta corregida
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error("Error:", data.error);
            document.getElementById("docenteNombre").innerText = "Error al cargar usuario";
        } else {
            document.getElementById("docenteNombre").innerText = data.nombre;
        }
    })
    .catch(error => console.error("Error al obtener perfil:", error));

    // Funcionalidad para cerrar sesión
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "../pages/index.html";
; // ✅ Redirección corregida
    });
});

