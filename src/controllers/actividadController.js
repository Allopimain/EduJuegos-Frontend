const Actividad = require('../models/Actividad');

exports.crearActividad = (req, res) => {
    const { titulo, descripcion, fecha_inicio, fecha_fin } = req.body;
    const id_docente = req.docente.id; // El docente autenticado

    if (!titulo || !descripcion || !fecha_inicio || !fecha_fin) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    Actividad.crear(titulo, descripcion, fecha_inicio, fecha_fin, id_docente, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al crear la actividad' });
        res.status(201).json({ mensaje: 'Actividad creada correctamente' });
    });
};

exports.obtenerActividades = (req, res) => {
    Actividad.obtenerTodas((err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener las actividades' });
        res.json(results);
    });
};

exports.obtenerActividadPorId = (req, res) => {
    const { id } = req.params;

    Actividad.obtenerPorId(id, (err, results) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener la actividad' });
        if (results.length === 0) return res.status(404).json({ mensaje: 'Actividad no encontrada' });
        res.json(results[0]);
    });
};

exports.actualizarActividad = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_fin } = req.body;

    Actividad.actualizar(id, titulo, descripcion, fecha_inicio, fecha_fin, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar la actividad' });
        res.json({ mensaje: 'Actividad actualizada correctamente' });
    });
};

exports.eliminarActividad = (req, res) => {
    const { id } = req.params;

    Actividad.eliminar(id, (err) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar la actividad' });
        res.json({ mensaje: 'Actividad eliminada correctamente' });
    });
};
