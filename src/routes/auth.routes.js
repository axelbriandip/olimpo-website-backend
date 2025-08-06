// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

// Ruta para solicitar el enlace de recuperación
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;