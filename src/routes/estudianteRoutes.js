const express = require('express');
const router = express.Router();
const estudianteController = require('../controllers/estudianteController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, estudianteController.crearEstudiante);
router.get('/', verificarToken, estudianteController.obtenerEstudiantes);
router.get('/:id', verificarToken, estudianteController.obtenerEstudiantePorId);
router.put('/:id', verificarToken, estudianteController.actualizarEstudiante);
router.delete('/:id', verificarToken, estudianteController.eliminarEstudiante);

module.exports = router;
