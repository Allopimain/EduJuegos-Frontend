const db = require('../config/db');

const Actividad = {
    crear: (titulo, descripcion, fecha_inicio, fecha_fin, id_docente, callback) => {
        const sql = `INSERT INTO actividades (titulo, descripcion, fecha_inicio, fecha_fin, id_docente) VALUES (?, ?, ?, ?, ?)`;
        db.query(sql, [titulo, descripcion, fecha_inicio, fecha_fin, id_docente], callback);
    },
    obtenerTodas: (callback) => {
        const sql = `SELECT * FROM actividades`;
        db.query(sql, callback);
    },
    obtenerPorId: (id, callback) => {
        const sql = `SELECT * FROM actividades WHERE id = ?`;
        db.query(sql, [id], callback);
    },
    actualizar: (id, titulo, descripcion, fecha_inicio, fecha_fin, callback) => {
        const sql = `UPDATE actividades SET titulo = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ? WHERE id = ?`;
        db.query(sql, [titulo, descripcion, fecha_inicio, fecha_fin, id], callback);
    },
    eliminar: (id, callback) => {
        const sql = `DELETE FROM actividades WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};

module.exports = Actividad;
