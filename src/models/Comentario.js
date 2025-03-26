const db = require('../config/db');

const Comentario = {
    crear: (id_docente, id_estudiante, mensaje, callback) => {
        const sql = `INSERT INTO comentarios (id_docente, id_estudiante, mensaje) VALUES (?, ?, ?)`;
        db.query(sql, [id_docente, id_estudiante, mensaje], callback);
    },
    obtenerTodos: (callback) => {
        const sql = `SELECT * FROM comentarios`;
        db.query(sql, callback);
    },
    obtenerPorId: (id, callback) => {
        const sql = `SELECT * FROM comentarios WHERE id = ?`;
        db.query(sql, [id], callback);
    },
    actualizar: (id, mensaje, callback) => {
        const sql = `UPDATE comentarios SET mensaje = ? WHERE id = ?`;
        db.query(sql, [mensaje, id], callback);
    },
    eliminar: (id, callback) => {
        const sql = `DELETE FROM comentarios WHERE id = ?`;
        db.query(sql, [id], callback);
    }
};

module.exports = Comentario;
