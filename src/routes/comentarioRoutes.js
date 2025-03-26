const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController');
const { verificarToken } = require('../middlewares/authMiddleware');

router.post('/', verificarToken, comentarioController.crearComentario);
router.get('/', verificarToken, comentarioController.obtenerComentarios);
router.get('/:id', verificarToken, comentarioController.obtenerComentarioPorId);
router.put('/:id', verificarToken, comentarioController.actualizarComentario);
router.delete('/:id', verificarToken, comentarioController.eliminarComentario);

module.exports = router;
