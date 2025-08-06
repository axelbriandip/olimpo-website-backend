// src/controllers/authController.js
const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Función para el registro
exports.register = async (req, res) => {
    const { email, password, displayName } = req.body;

    try {
        // 1. Registrar el usuario en la tabla de autenticación
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            // Supabase permite incluir data adicional en el registro inicial
            options: {
                data: {
                    display_name: displayName // Usamos la convención snake_case
                }
            }
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const { user } = data;

        // 2. Generar el JWT
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(201).json({ token, user });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Función para el inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar el JWT para el usuario autenticado
        const token = jwt.sign({ userId: data.user.id, email: data.user.email }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ token });

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};

// Función para recuperar contraseña
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            // Esta es la URL de tu frontend a la que Supabase redirigirá al usuario
            // cuando haga clic en el enlace del email.
            // Debes configurar esto en tu proyecto de Supabase o en el .env
            redirectTo: 'https://tu-sitio.com/cambiar-contrasena',
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        // Por razones de seguridad, es mejor no confirmar si el email existe
        // Simplemente le dices al usuario que revise su bandeja de entrada
        res.status(200).json({ message: 'Si el email existe, se ha enviado un enlace de recuperación.' });

    } catch (err) {
        res.status(500).json({ error: 'Error del servidor' });
    }
};