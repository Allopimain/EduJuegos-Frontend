const Estudiante = require('../models/Estudiante');

exports.crearEstudiante = (req, res) => {
    const { nombre, edad, grado } = req.body;
    const id_docente = req.docente.id; // El docente autenticado

    if (!nombre || !edad || !grado) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Estudiante.crear(nombre, edad, grado, id_docente, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar el estudiante' });
        res.status(201).json({ mensaje: 'Estudiante registrado correctamente' });
    });
};

exports.obtenerEstudiantes = (req, res) => {
    Estudiante.obtenerTodos((err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener los estudiantes' });
        res.json(results);
    });
};

exports.obtenerEstudiantePorId = (req, res) => {
    const { id } = req.params;

    Estudiante.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener el estudiante' });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Estudiante no encontrado' });
        res.json(results[0]);
    });
};

exports.actualizarEstudiante = (req, res) => {
    const { id } = req.params;
    const { nombre, edad, grado } = req.body;

    Estudiante.actualizar(id, nombre, edad, grado, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar el estudiante' });
        res.json({ mensaje: 'Estudiante actualizado correctamente' });
    });
};

exports.eliminarEstudiante = (req, res) => {
    const { id } = req.params;

    Estudiante.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar el estudiante' });
        res.json({ mensaje: 'Estudiante eliminado correctamente' });
    });
};
