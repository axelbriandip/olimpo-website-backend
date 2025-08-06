// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// Rutas públicas
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;