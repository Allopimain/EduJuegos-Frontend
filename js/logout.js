document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("token"); // Eliminar token
            window.location.href = "../pages/index.html"; // ✅ Redirigir al login
        });
    }
});
