const express = require('express');
const bodyParser = require('body-parser');
// Carga las variables de entorno desde el archivo .env
require ("dotenv").config();
//Extraer las rutas de Auth
const authRoutes = require('./routes/auth');
// Permitir consultar de diferentes origenes para que el front pueda hacer peticiones
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Rutas estaticas
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
