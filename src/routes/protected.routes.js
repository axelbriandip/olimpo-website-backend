// src/routes/protected.routes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');

// Esta es una ruta protegida
// El middleware 'authMiddleware' se ejecuta antes que la función de la ruta
router.get('/profile', authMiddleware, (req, res) => {
    // Aquí podemos acceder a la información del usuario gracias al middleware
    res.status(200).json({
        message: '¡Bienvenido! Esta es tu información de perfil.',
        user: req.userData,
    });
});

module.exports = router;