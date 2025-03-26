const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verificarToken } = require('../middlewares/authMiddleware'); // 🔹 Importar middleware de autenticación

router.post('/register', authController.registrarDocente);
router.post('/login', authController.loginDocente);
router.get('/perfil', verificarToken, authController.obtenerPerfil); // 🔹 Nueva ruta para obtener datos del docente autenticado

module.exports = router;
