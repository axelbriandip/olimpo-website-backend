// server.js
require('dotenv').config();
const express = require('express');
const app = express();

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Importar rutas
const authRoutes = require('./src/routes/auth.routes.js');
const protectedRoutes = require('./src/routes/protected.routes.js'); // Importar la nueva ruta

// Usar rutas
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoutes); // Usar la nueva ruta protegida

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});