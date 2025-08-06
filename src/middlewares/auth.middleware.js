// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. Obtener el token del encabezado de la petición
        const token = req.headers.authorization.split(' ')[1]; // El formato es "Bearer TOKEN"

        // 2. Verificar el token usando el secreto
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Agregar los datos del usuario al objeto 'req' para usarlo en el controlador
        req.userData = { userId: decodedToken.userId, email: decodedToken.email };
        next(); // Pasar al siguiente middleware o controlador

    } catch (error) {
        // Si hay un error, el token es inválido o no existe
        return res.status(401).json({ error: 'Autenticación fallida. Token inválido.' });
    }
};