require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

// Inicializar Express
const app = express();
app.use(express.json());
app.use(cors());

// Prueba de conexión
app.get('/', (req, res) => {
    res.send('🚀 Servidor EduJuegos en funcionamiento');
});

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const actividadRoutes = require('./routes/actividadRoutes');
const estudianteRoutes = require('./routes/estudianteRoutes');
const resultadoRoutes = require('./routes/resultadoRoutes');
const comentarioRoutes = require('./routes/comentarioRoutes'); // ✅ Nueva ruta añadida

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api/actividades', actividadRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/resultados', resultadoRoutes);
app.use('/api/comentarios', comentarioRoutes); // ✅ Nueva ruta añadida

// Iniciar servidor
const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

