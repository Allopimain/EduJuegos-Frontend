document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3005/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token); // Guardar el token en localStorage
        window.location.href = "../pages/dashboard.html";
 // ✅ Redirigir al dashboard
    } else {
        document.getElementById("errorMensaje").innerText = data.mensaje;
    }
});
