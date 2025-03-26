const db = require('../config/db');

const Docente = {
    crear: (nombre, email, password, callback) => {
        const sql = 'INSERT INTO docentes (nombre, email, password) VALUES (?, ?, ?)';
        db.query(sql, [nombre, email, password], callback);
    },
    buscarPorEmail: (email, callback) => {
        const sql = 'SELECT * FROM docentes WHERE email = ?';
        db.query(sql, [email], callback);
    }
};

module.exports = Docente;
