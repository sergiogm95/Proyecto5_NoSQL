//Cambiado para llevar las rutas a movie.routes.js. La IA me ha ayudado a entender el cambio
//y redactar esta parte, porque no lo había hecho nunca. No lo he escrito yo, pero le he dado 
//bastantes vueltas hasta entender cada paso.

const express = require('express');
const { connect } = require('./utils/db');
const movieRoutes = require('./routes/movie.routes'); // Importamos rutas externas

connect(); // Conectamos con MongoDB

const app = express();
const PORT = 3000;

// Middleware para poder recibir JSON en POST y PUT
app.use(express.json());

// Montamos todas las rutas de movies bajo /movies
app.use('/movies', movieRoutes);

// Ruta de prueba para confirmar que el servidor funciona
app.get('/', (req, res) => {
  res.send('Servidor Movies API funcionando ✅');
});

// Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
