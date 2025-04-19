import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('tokenEstudiante');
  
    if (!token) {
      alert('Por favor inicia sesión primero');
      window.location.href = 'login-estudiante.html';
      return;
    }
  
    try {
      const res = await fetch(`${API_BASE_URL}/api/estudiante/resultados`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      const resultados = await res.json();
  
      if (!res.ok) {
        throw new Error(resultados.mensaje || 'Error al obtener resultados');
      }
  
      const tbody = document.getElementById('tabla-resultados');
      tbody.innerHTML = '';
  
      if (resultados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3" class="text-center">Aún no tienes resultados disponibles.</td></tr>';
      } else {
        resultados.forEach(resultado => {
          const fila = `
            <tr>
              <td>${resultado.nombre_actividad || 'Sin título'}</td>
              <td>${resultado.calificacion}</td>
              <td>${resultado.fecha_resultado || 'Sin fecha'}</td>
            </tr>
          `;
          tbody.innerHTML += fila;
        });
      }
  
    } catch (error) {
      console.error(error);
      alert('Hubo un error al cargar los resultados');
    }
});
