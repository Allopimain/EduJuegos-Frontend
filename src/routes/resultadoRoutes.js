const express = require('express');
const router = express.Router();
const resultadoController = require('../controllers/resultadoController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, resultadoController.crearResultado);
router.get('/', verificarToken, resultadoController.obtenerResultados);
router.get('/:id', verificarToken, resultadoController.obtenerResultadoPorId);
router.put('/:id', verificarToken, resultadoController.actualizarResultado);
router.delete('/:id', verificarToken, resultadoController.eliminarResultado);

module.exports = router;
