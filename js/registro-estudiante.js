document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-registro-estudiante");
    const mensajeDiv = document.getElementById("mensaje");
  
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const nombre = document.getElementById("nombre").value;
      const edad = parseInt(document.getElementById("edad").value);
      const grado = document.getElementById("grado").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      try {
        const respuesta = await fetch("http://localhost:3005/api/estudiantes/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ nombre, edad, grado, email, password })
        });
  
        const data = await respuesta.json();
  
        if (respuesta.ok) {
          mensajeDiv.innerHTML = `<div class="alert alert-success">${data.mensaje}</div>`;
          formulario.reset();
        } else {
          mensajeDiv.innerHTML = `<div class="alert alert-danger">${data.mensaje}</div>`;
        }
      } catch (error) {
        console.error("Error en el registro:", error);
        mensajeDiv.innerHTML = `<div class="alert alert-danger">Ocurrió un error al registrar</div>`;
      }
    });
  });
   
