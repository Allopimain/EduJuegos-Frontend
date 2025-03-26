const jwt = require('jsonwebtoken');

exports.verificarToken = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(401).json({ mensaje: 'Acceso denegado' });
    }

    try {
        const tokenSinBearer = token.replace("Bearer ", ""); // ✅ Eliminar "Bearer "
        const verificado = jwt.verify(tokenSinBearer, process.env.JWT_SECRET);
        req.docente = verificado;
        next();
    } catch (error) {
        res.status(400).json({ mensaje: 'Token no válido' });
    }
};
