const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Simulacion de Base de datos
//Aqui deberiamos importar nuestra base de datos de preferencia y hacer una busqueda del usuario
const users = [
  { id: 1, username: 'user', password: 'password' },
  { id: 2, username: 'admin', password: 'adminpassword' }
];

// Obtiene la clave secreta desde la variable de entorno
const SECRET_KEY = process.env.SECRET_KEY;

//Ruta para inicias sesion
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica las credenciales del usuario
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales Incorrectas' });
  }

  // Genera un token JWT con la clave secreta
  const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });

  // Configura la cookie con el token JWT
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hora de expiración

  // Devuelve el token como respuesta
  res.json({ token });
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  // Limpia la cookie
  res.clearCookie('token');

  res.status(200).json({ message: 'Sesión cerrada exitosamente' });
});

module.exports = router;
