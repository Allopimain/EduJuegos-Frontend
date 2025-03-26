const Resultado = require('../models/Resultado');

exports.crearResultado = (req, res) => {
    const { id_estudiante, id_actividad, calificacion, comentarios } = req.body;

    if (!id_estudiante || !id_actividad || !calificacion) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Resultado.crear(id_estudiante, id_actividad, calificacion, comentarios, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar el resultado' });
        res.status(201).json({ mensaje: 'Resultado registrado correctamente' });
    });
};

exports.obtenerResultados = (req, res) => {
    Resultado.obtenerTodos((err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener los resultados' });
        res.json(results);
    });
};

exports.obtenerResultadoPorId = (req, res) => {
    const { id } = req.params;

    Resultado.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener el resultado' });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Resultado no encontrado' });
        res.json(results[0]);
    });
};

exports.actualizarResultado = (req, res) => {
    const { id } = req.params;
    const { calificacion, comentarios } = req.body;

    Resultado.actualizar(id, calificacion, comentarios, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar el resultado' });
        res.json({ mensaje: 'Resultado actualizado correctamente' });
    });
};

exports.eliminarResultado = (req, res) => {
    const { id } = req.params;

    Resultado.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar el resultado' });
        res.json({ mensaje: 'Resultado eliminado correctamente' });
    });
};
