const express = require('express');
const router = express.Router();
const actividadController = require('../controllers/actividadController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, actividadController.crearActividad);
router.get('/', verificarToken, actividadController.obtenerActividades);
router.get('/:id', verificarToken, actividadController.obtenerActividadPorId);
router.put('/:id', verificarToken, actividadController.actualizarActividad);
router.delete('/:id', verificarToken, actividadController.eliminarActividad);

module.exports = router;
